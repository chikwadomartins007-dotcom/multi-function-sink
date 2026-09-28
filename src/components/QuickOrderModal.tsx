import React, { useState, useEffect, useRef } from 'react';
import { calculateOrderPricing, formatNaira } from '../utils/pricing';
import { NIGERIAN_STATES, SUPPORT_PHONE } from '../data/productData';
import { 
  trackDualEvent, 
  generateEventId, 
  generateOrderId, 
  CustomerMatchingInfo, 
  PRODUCT_NAME, 
  PRODUCT_ID 
} from '../utils/metaPixel';
import { getAttribution } from '../utils/attribution';
import { OrderFormData } from '../types';
import { 
  ShoppingBag, 
  ShieldCheck, 
  X, 
  Phone, 
  MapPin, 
  User, 
  Plus, 
  Minus, 
  AlertCircle, 
  Clock, 
  Check, 
  Sparkles
} from 'lucide-react';

interface QuickOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderComplete: (orderData: OrderFormData) => void;
  initialQuantity?: number;
}

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xljdoogd';

export const QuickOrderModal: React.FC<QuickOrderModalProps> = ({
  isOpen,
  onClose,
  onOrderComplete,
  initialQuantity = 1,
}) => {
  const [quantity, setQuantity] = useState<number>(initialQuantity);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [altPhone, setAltPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [state, setState] = useState('Lagos State');
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const hasFiredCheckoutRef = useRef(false);

  useEffect(() => {
    if (isOpen && initialQuantity && initialQuantity >= 1) {
      setQuantity(initialQuantity);
    }
  }, [isOpen, initialQuantity]);

  // When modal opens, track InitiateCheckout once
  useEffect(() => {
    if (isOpen && !hasFiredCheckoutRef.current) {
      hasFiredCheckoutRef.current = true;
      const currentPrice = calculateOrderPricing(quantity);
      const checkoutEventId = generateEventId('InitiateCheckout');
      trackDualEvent('InitiateCheckout', {
        content_name: PRODUCT_NAME,
        content_type: 'product',
        content_ids: [PRODUCT_ID],
        currency: 'NGN',
        value: currentPrice.subtotal,
        num_items: quantity,
      }, { eventId: checkoutEventId });
    }
  }, [isOpen, quantity]);

  if (!isOpen) return null;

  const pricing = calculateOrderPricing(quantity);

  const handleQuantityChange = (newQty: number) => {
    setQuantity(Math.max(1, newQty));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 3) {
      newErrors.fullName = 'Please enter your full name.';
    }

    const cleanPhone = phone.replace(/[^0-9+]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phone = 'Please provide a valid active phone number.';
    }

    if (!deliveryAddress.trim() || deliveryAddress.trim().length < 8) {
      newErrors.deliveryAddress = 'Please provide your full delivery address and landmark.';
    }

    if (!state.trim()) {
      newErrors.state = 'Please select your delivery state.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const orderId = generateOrderId();
    const orderDate = new Date().toLocaleString('en-NG', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    const attribution = getAttribution();

    const formspreePayload = {
      _to: 'maxluxurybathrooms@gmail.com',
      _cc: 'maxluxurybathrooms@gmail.com',
      _replyto: 'maxluxurybathrooms@gmail.com',
      _subject: `⚡ QUICK POPUP ORDER (${orderId}): ${pricing.quantity}x Sink - ${pricing.formattedSubtotal} - ${fullName.trim()}`,
      target_email: 'maxluxurybathrooms@gmail.com',
      admin_notification_email: 'maxluxurybathrooms@gmail.com',
      order_source: 'Quick Order Pop-Up Modal (Every 35s)',
      full_name: fullName.trim(),
      phone: phone.trim(),
      alternative_phone: altPhone.trim() || 'N/A',
      delivery_address: deliveryAddress.trim(),
      state,
      quantity: pricing.quantity,
      unit_price: pricing.formattedUnitPrice,
      total_price: pricing.formattedSubtotal,
      numeric_total: pricing.subtotal,
      product_name: PRODUCT_NAME,
      currency: 'NGN',
      order_id: orderId,
      order_date: orderDate,
      payment_method: 'Payment on Delivery',
      utm_source: attribution.utm_source || 'direct',
      utm_medium: attribution.utm_medium || 'none',
      utm_campaign: attribution.utm_campaign || 'none',
      fbclid: attribution.fbclid || 'none',
      fbp: attribution.fbp || 'none',
      fbc: attribution.fbc || 'none',
      landing_page: attribution.landing_page || (typeof window !== 'undefined' ? window.location.href : ''),
    };

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formspreePayload),
      });

      if (response.ok) {
        const leadEventId = generateEventId('Lead', orderId);
        const purchaseEventId = generateEventId('Purchase', orderId);

        const customerInfo: CustomerMatchingInfo = {
          phone: phone.trim(),
          fullName: fullName.trim(),
          state,
          orderId,
          fbp: attribution.fbp,
          fbc: attribution.fbc,
        };

        trackDualEvent('Lead', {
          content_name: PRODUCT_NAME,
          currency: 'NGN',
          value: pricing.subtotal,
          order_id: orderId,
        }, {
          eventId: leadEventId,
          customerInfo,
        });

        trackDualEvent('Purchase', {
          content_name: PRODUCT_NAME,
          content_type: 'product',
          content_ids: [PRODUCT_ID],
          currency: 'NGN',
          value: pricing.subtotal,
          quantity: pricing.quantity,
          num_items: pricing.quantity,
          order_id: orderId,
        }, {
          eventId: purchaseEventId,
          customerInfo,
        });

        const orderData: OrderFormData = {
          fullName: fullName.trim(),
          phone: phone.trim(),
          alternativePhone: altPhone.trim(),
          email: '',
          deliveryAddress: deliveryAddress.trim(),
          state,
          city: '',
          quantity: pricing.quantity,
          preferredDeliveryOption: 'standard',
          notes: 'Ordered via Quick Order Pop-Up',
          unitPrice: pricing.unitPrice,
          totalPrice: pricing.subtotal,
          savings: pricing.savings,
          orderDate,
          orderId,
        };

        try {
          const existingOrders = JSON.parse(localStorage.getItem('max_sink_orders') || '[]');
          existingOrders.unshift(orderData);
          localStorage.setItem('max_sink_orders', JSON.stringify(existingOrders));
        } catch (e) {}

        setIsSubmitting(false);
        onClose();
        onOrderComplete(orderData);
      } else {
        setSubmitError('Unable to transmit order. Please check your phone connection and try again.');
        setIsSubmitting(false);
      }
    } catch (err) {
      setSubmitError('Network connection error. Please tap Submit Order again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#111827]/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-white border-2 border-[#DC2626] rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl relative my-auto text-[#111827] max-h-[92vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-order-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-3.5 right-3.5 text-gray-400 hover:text-[#111827] bg-gray-100 hover:bg-gray-200 p-1.5 rounded-full transition-colors cursor-pointer"
          aria-label="Close quick order form"
        >
          <X className="w-5 h-5 text-[#111827]" />
        </button>

        {/* Modal Header */}
        <div className="text-center pb-3 border-b border-gray-100 pr-6">
          <div className="inline-flex items-center gap-1.5 bg-red-50 text-[#DC2626] border border-red-200 text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1.5">
            <Sparkles className="w-3 h-3 text-[#DC2626]" />
            <span>Quick Order · Payment on Delivery</span>
          </div>
          <h2 id="quick-order-title" className="text-xl sm:text-2xl font-black text-[#111827] tracking-tight leading-tight">
            ORDER MULTIFUNCTION SINK NOW
          </h2>
          <p className="text-xs text-gray-600 mt-1 font-medium">
            Fill your delivery details below. We call to confirm before dispatch.
          </p>
        </div>

        {/* Product Summary Preview Bar */}
        <div className="mt-3 bg-red-50/50 border border-red-100 rounded-xl p-3 flex items-center gap-3">
          <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-gray-200 bg-white">
            <img
              src="/product/H60608c75431d41529296abdc09a27073j.png"
              alt="Multifunction Luxury Sink"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xs font-black text-[#111827] truncate">
              Multifunction Luxury Kitchen Sink
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-gray-400 line-through">₦130,000</span>
              <span className="text-sm font-black text-[#DC2626] tabular-nums">
                {pricing.formattedUnitPrice}
              </span>
            </div>
            <div className="text-[10px] text-emerald-700 font-bold flex items-center gap-1 mt-0.5">
              <Check className="w-3 h-3 text-emerald-600" />
              <span>Full accessories & waterfall faucet included</span>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-3.5">
          {submitError && (
            <div className="p-3 bg-red-50 border border-red-300 rounded-lg text-xs text-[#DC2626] font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          {/* Quantity Selector */}
          <div>
            <label className="block text-xs font-black text-[#111827] uppercase tracking-wider mb-1.5">
              Select Quantity:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { qty: 1, label: '1 Piece', sub: '₦115,000' },
                { qty: 2, label: '2 Pieces', sub: '₦110,000 ea', badge: 'POPULAR' },
                { qty: 3, label: '3 Pieces', sub: '₦105,000 ea', badge: 'BEST DEAL' },
              ].map((item) => {
                const isSelected = quantity === item.qty;
                return (
                  <button
                    key={item.qty}
                    type="button"
                    onClick={() => handleQuantityChange(item.qty)}
                    className={`p-2 rounded-lg border text-center transition-all cursor-pointer relative bg-white ${
                      isSelected
                        ? 'border-2 border-[#DC2626] bg-red-50/50 ring-1 ring-[#DC2626]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {item.badge && (
                      <span className={`absolute -top-2 left-1/2 -translate-x-1/2 text-[8px] font-black px-1.5 rounded text-white ${
                        item.badge === 'POPULAR' ? 'bg-[#DC2626]' : 'bg-[#111827]'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    <div className="font-black text-[#111827] text-xs mt-0.5">{item.label}</div>
                    <div className="text-[10px] text-[#DC2626] font-black">{item.sub}</div>
                  </button>
                );
              })}
            </div>

            {/* Custom counter if user wants > 3 */}
            {quantity > 3 && (
              <div className="mt-2 flex items-center justify-between text-xs bg-gray-50 p-2 rounded-lg">
                <span className="font-bold text-[#111827]">Quantity selected:</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="p-1 rounded bg-white border border-gray-300 hover:bg-gray-100"
                  >
                    <Minus className="w-3 h-3 text-[#111827]" />
                  </button>
                  <span className="font-black text-[#111827] px-2">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="p-1 rounded bg-white border border-gray-300 hover:bg-gray-100"
                  >
                    <Plus className="w-3 h-3 text-[#111827]" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-[#111827] mb-1 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-[#DC2626]" />
              <span>Full Name *</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Babatunde Adebayo"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={`w-full bg-white border rounded-lg px-3 py-2 text-xs sm:text-sm text-[#111827] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-[#DC2626] ${
                errors.fullName ? 'border-[#DC2626]' : 'border-gray-300'
              }`}
            />
            {errors.fullName && (
              <p className="text-[#DC2626] text-[11px] mt-0.5 font-bold">{errors.fullName}</p>
            )}
          </div>

          {/* Phone Numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block text-xs font-bold text-[#111827] mb-1 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-[#DC2626]" />
                <span>Active Phone Number *</span>
              </label>
              <input
                type="tel"
                required
                placeholder="e.g. 08012345678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full bg-white border rounded-lg px-3 py-2 text-xs sm:text-sm text-[#111827] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-[#DC2626] ${
                  errors.phone ? 'border-[#DC2626]' : 'border-gray-300'
                }`}
              />
              {errors.phone && (
                <p className="text-[#DC2626] text-[11px] mt-0.5 font-bold">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-[#111827] mb-1">
                <span>Alternative Phone (Optional)</span>
              </label>
              <input
                type="tel"
                placeholder="e.g. 08147778029"
                value={altPhone}
                onChange={(e) => setAltPhone(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm text-[#111827] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-[#DC2626]"
              />
            </div>
          </div>

          {/* Delivery State */}
          <div>
            <label className="block text-xs font-bold text-[#111827] mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#DC2626]" />
              <span>Delivery State *</span>
            </label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-[#DC2626] font-semibold"
            >
              {NIGERIAN_STATES.map((s) => (
                <option key={s} value={s} className="text-[#111827]">
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Delivery Address */}
          <div>
            <label className="block text-xs font-bold text-[#111827] mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#DC2626]" />
              <span>Full Delivery Address & Landmark *</span>
            </label>
            <textarea
              required
              rows={2}
              placeholder="e.g. Flat 3, Block B, Silver Crest Estate, Near Total Filling Station, Lekki"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className={`w-full bg-white border rounded-lg px-3 py-2 text-xs sm:text-sm text-[#111827] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-[#DC2626] ${
                errors.deliveryAddress ? 'border-[#DC2626]' : 'border-gray-300'
              }`}
            />
            {errors.deliveryAddress && (
              <p className="text-[#DC2626] text-[11px] mt-0.5 font-bold">{errors.deliveryAddress}</p>
            )}
          </div>

          {/* Total Payable banner */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-gray-500 uppercase block">Total Payable:</span>
              <span className="text-xs text-[#DC2626] font-bold">Pay on Delivery</span>
            </div>
            <div className="text-right">
              <span className="text-xl font-black text-[#DC2626] tabular-nums">
                {pricing.formattedSubtotal}
              </span>
              {pricing.savings > 0 && (
                <span className="text-[10px] text-emerald-700 font-bold block">
                  (You Save {pricing.formattedSavings})
                </span>
              )}
            </div>
          </div>

          {/* Payment on delivery guarantee */}
          <div className="flex items-center gap-2 text-[11px] text-[#111827] font-semibold bg-red-50 p-2.5 rounded-lg border border-red-200">
            <ShieldCheck className="w-4 h-4 text-[#DC2626] shrink-0" />
            <span>Pay on delivery · Inspect item physically upon arrival before paying</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#DC2626] hover:bg-[#b91c1c] text-white font-black text-sm py-3.5 px-4 rounded-xl shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>PROCESSING ORDER...</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 text-white" />
                <span>SUBMIT QUICK ORDER — {pricing.formattedSubtotal}</span>
              </>
            )}
          </button>

          {/* Dismiss button */}
          <div className="text-center pt-1">
            <button
              type="button"
              onClick={onClose}
              className="text-xs text-gray-500 hover:text-[#111827] font-bold cursor-pointer hover:underline"
            >
              Continue browsing products (Remind me in 35s)
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
