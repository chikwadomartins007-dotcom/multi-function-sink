/**
 * Meta Tracking & Conversions API (CAPI) Client Module
 * Official Pixel ID: 1730802201545460
 * Ensures unified event deduplication between browser Pixel and server CAPI using matching event_id.
 */

import { getAttribution } from './attribution';

export const META_PIXEL_ID = '1730802201545460';
export const PRODUCT_ID = 'MAX-LUXURY-SINK-01';
export const PRODUCT_NAME = 'Multifunction Luxury Kitchen Sink';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

/**
 * Generate a cryptographically strong unique event ID for Meta deduplication.
 */
export const generateEventId = (eventName: string, refId?: string): string => {
  let uniquePart: string;
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    uniquePart = crypto.randomUUID();
  } else {
    uniquePart = Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
  }
  const prefix = eventName.toLowerCase().replace(/[^a-z0-9]/g, '');
  const ref = refId ? `_${refId}` : '';
  return `${prefix}${ref}_${uniquePart}`;
};

/**
 * Generate a unique order ID conforming to requested format:
 * MLB-YYYYMMDD-XXXXXX
 */
export const generateOrderId = (): string => {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const randomHex = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `MLB-${yyyy}${mm}${dd}-${randomHex}`;
};

export interface CustomerMatchingInfo {
  email?: string;
  phone?: string;
  fullName?: string;
  city?: string;
  state?: string;
  orderId?: string;
  fbp?: string;
  fbc?: string;
}

/**
 * Dispatch event to Meta Pixel in browser with explicit eventID for deduplication
 */
export const trackBrowserPixel = (
  eventName: string,
  eventData?: Record<string, any>,
  eventId?: string
) => {
  try {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      if (eventId) {
        window.fbq('track', eventName, eventData || {}, { eventID: eventId });
      } else {
        window.fbq('track', eventName, eventData || {});
      }
      console.log(`[Meta Pixel Browser] "${eventName}" fired. eventID:`, eventId || 'none', eventData);
    } else {
      console.info(`[Meta Pixel Browser Log] "${eventName}"`, { eventId, eventData });
    }
  } catch (err) {
    console.warn('[Meta Pixel Browser Error]', err);
  }
};

/**
 * Dispatch event to Server-Side Conversions API via /api/meta-capi with matching event_id
 */
export const trackServerCapi = async (
  eventName: string,
  eventId: string,
  customData: Record<string, any>,
  customerInfo?: CustomerMatchingInfo
) => {
  try {
    const attribution = getAttribution();

    const payload = {
      event_name: eventName,
      event_id: eventId,
      event_time: Math.floor(Date.now() / 1000),
      event_source_url: typeof window !== 'undefined' ? window.location.href : '',
      customer_info: {
        ...customerInfo,
        fbp: customerInfo?.fbp || attribution.fbp,
        fbc: customerInfo?.fbc || attribution.fbc,
      },
      custom_data: {
        ...customData,
        currency: 'NGN',
        content_name: PRODUCT_NAME,
        content_type: 'product',
        content_ids: [PRODUCT_ID],
      },
    };

    const res = await fetch('/api/meta-capi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    console.log(`[Meta CAPI Server Response] "${eventName}" (event_id: ${eventId}):`, result);
    return result;
  } catch (err) {
    // Tracking failures must NEVER break the customer order flow
    console.warn('[Meta CAPI Server Dispatch Failed non-critically]', err);
    return null;
  }
};

/**
 * Dual Dispatch: Fires both Browser Meta Pixel & Server Conversions API with the EXACT SAME event_id
 */
export const trackDualEvent = async (
  eventName: 'PageView' | 'ViewContent' | 'InitiateCheckout' | 'Lead' | 'Purchase',
  customData: Record<string, any>,
  options?: {
    eventId?: string;
    customerInfo?: CustomerMatchingInfo;
  }
): Promise<string> => {
  const eventId = options?.eventId || generateEventId(eventName, options?.customerInfo?.orderId);

  // 1. Browser Meta Pixel
  trackBrowserPixel(eventName, customData, eventId);

  // 2. Server Meta Conversions API (asynchronous, non-blocking)
  trackServerCapi(eventName, eventId, customData, options?.customerInfo).catch(() => {});

  return eventId;
};
