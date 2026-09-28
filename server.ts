import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Server-side price calculation and validation
// 1 unit = ₦115,000 | 2 units = ₦110,000 each | 3+ units = ₦105,000 each
const calculateServerPrice = (qty: number) => {
  const quantity = Math.max(1, Math.floor(Number(qty) || 1));
  let unitPrice = 115000;
  if (quantity === 1) {
    unitPrice = 115000;
  } else if (quantity === 2) {
    unitPrice = 110000;
  } else {
    unitPrice = 105000;
  }
  return {
    quantity,
    unitPrice,
    totalPrice: quantity * unitPrice,
  };
};

// SHA-256 normalization and hashing helper for Meta Conversions API
const hashValue = (value?: string | null): string | undefined => {
  if (!value || typeof value !== 'string') return undefined;
  const clean = value.trim().toLowerCase();
  if (!clean) return undefined;
  return crypto.createHash('sha256').update(clean).digest('hex');
};

const hashPhone = (phone?: string | null): string | undefined => {
  if (!phone || typeof phone !== 'string') return undefined;
  // Remove all non-digits
  let digits = phone.replace(/\D/g, '');
  if (!digits) return undefined;
  // Standardize Nigerian numbers starting with 0 (e.g. 08147778029 -> 2348147778029)
  if (digits.startsWith('0') && digits.length === 11) {
    digits = '234' + digits.slice(1);
  }
  return crypto.createHash('sha256').update(digits).digest('hex');
};

// Healthcheck endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'MAX Luxury Bathrooms API' });
});

// Meta Conversions API (CAPI) Endpoint
app.post('/api/meta-capi', async (req, res) => {
  try {
    const {
      event_name,
      event_id,
      event_time,
      event_source_url,
      customer_info,
      user_data,
      custom_data,
    } = req.body;

    if (!event_name || !event_id) {
      return res.status(400).json({ error: 'event_name and event_id are required' });
    }

    const pixelId = process.env.META_PIXEL_ID || '1730802201545460';
    const accessToken = process.env.META_ACCESS_TOKEN;
    const testEventCode = process.env.META_TEST_EVENT_CODE;

    // Server-side recalculation of order value for security
    let validatedValue = 115000;
    const rawQuantity = custom_data?.num_items || custom_data?.quantity || 1;
    const pricing = calculateServerPrice(rawQuantity);
    validatedValue = pricing.totalPrice;

    // Client IP & User Agent
    const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress || '';
    const clientUserAgent = req.headers['user-agent'] || '';

    // Split full name if provided
    let firstName = '';
    let lastName = '';
    if (customer_info?.fullName) {
      const parts = customer_info.fullName.trim().split(/\s+/);
      firstName = parts[0] || '';
      lastName = parts.slice(1).join(' ') || '';
    }

    // Prepare normalized, hashed user_data according to Meta specifications
    const formattedUserData: Record<string, any> = {
      client_ip_address: clientIp,
      client_user_agent: clientUserAgent,
    };

    if (customer_info?.email) {
      formattedUserData.em = [hashValue(customer_info.email)];
    }
    if (customer_info?.phone) {
      formattedUserData.ph = [hashPhone(customer_info.phone)];
    }
    if (firstName) {
      formattedUserData.fn = [hashValue(firstName)];
    }
    if (lastName) {
      formattedUserData.ln = [hashValue(lastName)];
    }
    if (customer_info?.city) {
      formattedUserData.ct = [hashValue(customer_info.city.replace(/\s+/g, ''))];
    }
    if (customer_info?.state) {
      formattedUserData.st = [hashValue(customer_info.state)];
    }
    formattedUserData.country = [hashValue('ng')];

    if (customer_info?.orderId) {
      formattedUserData.external_id = [hashValue(customer_info.orderId)];
    }

    // Pass through cookies (_fbp and _fbc) unhashed as required by Meta
    const fbp = user_data?.fbp || customer_info?.fbp;
    const fbc = user_data?.fbc || customer_info?.fbc;
    if (fbp) formattedUserData.fbp = fbp;
    if (fbc) formattedUserData.fbc = fbc;

    const capiEvent: any = {
      event_name,
      event_time: event_time || Math.floor(Date.now() / 1000),
      event_id,
      event_source_url: event_source_url || req.headers.referer || '',
      action_source: 'website',
      user_data: formattedUserData,
      custom_data: {
        currency: 'NGN',
        value: validatedValue,
        content_name: 'Multifunction Luxury Kitchen Sink',
        content_type: 'product',
        content_ids: ['MAX-LUXURY-SINK-01'],
        num_items: pricing.quantity,
        order_id: customer_info?.orderId || custom_data?.order_id,
        ...custom_data,
      },
    };

    const payload: any = {
      data: [capiEvent],
    };

    if (testEventCode) {
      payload.test_event_code = testEventCode;
    }

    // Check if Meta Access Token is configured
    if (accessToken && accessToken !== 'ADD_YOUR_META_CONVERSIONS_API_ACCESS_TOKEN_HERE') {
      const metaUrl = `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`;
      const metaResp = await fetch(metaUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const metaData = await metaResp.json();
      if (!metaResp.ok) {
        console.warn('[Meta CAPI Warning] Non-200 from Graph API:', metaData);
        return res.status(200).json({
          success: false,
          warning: 'Meta API rejected payload',
          metaResponse: metaData,
        });
      }

      console.log(`[Meta CAPI Success] "${event_name}" (event_id: ${event_id}) dispatched to Meta.`);
      return res.json({ success: true, metaResponse: metaData });
    } else {
      // Safe fallback: Log structured payload and acknowledge
      console.log(`[Meta CAPI Ready] Event "${event_name}" (event_id: ${event_id}) prepared with value ₦${validatedValue}. Set META_ACCESS_TOKEN in environment to stream live to Meta.`);
      return res.json({
        success: true,
        simulated: true,
        message: 'Conversions API endpoint active. Add META_ACCESS_TOKEN in secrets/environment to stream live.',
        event_id,
        validated_value: validatedValue,
      });
    }
  } catch (err: any) {
    console.error('[Meta CAPI Route Error]', err?.message || err);
    // Return 200 with error details so client order process never breaks
    return res.status(200).json({
      success: false,
      error: err?.message || 'Server CAPI processing error',
    });
  }
});

// Vite middleware in dev or static files in production
const isProd = process.env.NODE_ENV === 'production';

if (!isProd) {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: {
      middlewareMode: true,
      port: PORT,
      host: '0.0.0.0',
    },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`MAX Luxury Bathrooms server listening on port ${PORT}`);
});
