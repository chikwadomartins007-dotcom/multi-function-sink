import React, { useState, useEffect, useRef } from 'react';
import { calculateOrderPricing, formatNaira } from '../utils/pricing';
import { NIGERIAN_STATES, SUPPORT_PHONE, SUPPORT_WHATSAPP_LINK } from '../data/productData';
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
  Truck, 
  Phone, 
  MapPin, 
  User, 
  Mail, 
  Plus, 
  Minus, 
  AlertCircle, 
  MessageCircle,
  RefreshCw
} from 'lucide-react';

interface OrderFormProps {
  initialQuantity?: number;
  onOrderComplete: (orderData: OrderFormData) => void;
  onInitiateCheckout?: () => void;
}

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xljdoogd';

export const OrderForm: React.FC<OrderFormProps> = ({ 
  initialQuantity = 1, 
  onOrderComplete,
  onInitiateCheckout 
}) => {
  const [quantity, setQuantity] = useState<number>(initialQuantity);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [altPhone, setAltPhone] = useState('');
  const [email, setEmail] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [state, setState] = useState('Lagos State');
  const [city, setCity] = useState('');
  const [preferredDeliveryOption, setPreferredDeliveryOption] = useState<'standard' | 'priority'>('standard');
  const [notes, setNotes] = useState('');
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const hasFiredCheckoutRef = useRef(false);

  useEffect(() => {
    if (initialQuantity && initialQuantity >= 1) {
      setQuantity(initialQuantity);
    }
  }, [initialQuantity]);

  const pricing = calculateOrderPricing(quantity);

  const fireInitiateCheckoutOnce = (qty: number) => {
    if (hasFiredCheckoutRef.current) return;
    hasFiredCheckoutRef.current = true;
    const currentPrice = calculateOrderPricing(qty);
    const checkoutEventId = generateEventId('InitiateCheckout');
    trackDualEvent('InitiateCheckout', {
      content_name: PRODUCT_NAME,
      content_type: 'product',
      content_ids: [PRODUCT_ID],
      currency: 'NGN',
      value: currentPrice.subtotal,
      num_items: qty,
    }, { eventId: checkoutEventId });

    if (onInitiateCheckout) {
      onInitiateCheckout();
    }
  };

  const handleQuantityChange = (newQty: number) => {
    const validQty = Math.max(1, newQty);
    setQuantity(validQty);
    fireInitiateCheckoutOnce(validQty);
  };

  const handleInputFocus = () => {
    fireInitiateCheckoutOnce(quantity);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 3) {
      newErrors.fullName = 'Please enter your full name (at least 3 characters).';
    }

    const cleanPhone = phone.replace(/[^0-9+]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phone = 'Please provide a valid active phone number for delivery confirmation.';
    }

    if (!deliveryAddress.trim() || deliveryAddress.trim().length < 8) {
      newErrors.deliveryAddress = 'Please provide a complete street address with landmarks.';
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
      const firstErrorKey = Object.keys(errors)[0];
      const el = document.getElementById(`field-${firstErrorKey}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
      _replyto: email.trim() || 'maxluxurybathrooms@gmail.com',
      _subject: `NEW ORDER (${orderId}): ${pricing.quantity}x Kitchen Sink - ${pricing.formattedSubtotal} - ${fullName.trim()}`,
      target_email: 'maxluxurybathrooms@gmail.com',
      admin_notification_email: 'maxluxurybathrooms@gmail.com',
      full_name: fullName.trim(),
      phone: phone.trim(),
      alternative_phone: altPhone.trim() || 'N/A',
      email: email.trim() || 'Not provided',
      delivery_address: deliveryAddress.trim(),
      state,
      city: city.trim() || 'Not specified',
      quantity: pricing.quantity,
      unit_price: pricing.formattedUnitPrice,
      total_price: pricing.formattedSubtotal,
      numeric_total: pricing.subtotal,
      product_name: PRODUCT_NAME,
      currency: 'NGN',
      order_id: orderId,
      order_date: orderDate,
      preferred_delivery: preferredDeliveryOption === 'priority' ? 'Priority Dispatch' : 'Standard Delivery',
      delivery_notes: notes.trim() || 'None',
      payment_method: 'Payment on Delivery',
      utm_source: attribution.utm_source || 'direct',
      utm_medium: attribution.utm_medium || 'none',
      utm_campaign: attribution.utm_campaign || 'none',
      utm_content: attribution.utm_content || 'none',
      utm_term: attribution.utm_term || 'none',
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
          email: email.trim() || undefined,
          phone: phone.trim(),
          fullName: fullName.trim(),
          city: city.trim() || undefined,
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
          email: email.trim(),
          deliveryAddress: deliveryAddress.trim(),
          state,
          city: city.trim(),
          quantity: pricing.quantity,
          preferredDeliveryOption,
          notes: notes.trim(),
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
        onOrderComplete(orderData);
      } else {
        console.error('[Formspree Failed]', response.status);
        setSubmitError(
          'We encountered an issue submitting your order to the dispatch queue. Please check your details and try again, or contact us directly on WhatsApp.'
        );
        setIsSubmitting(false);
      }
    } catch (netErr: any) {
      console.error('[Order Submission Network Error]', netErr);
      setSubmitError(
        'A network connection error occurred while submitting your order. Please verify your internet connection and tap Submit again.'
      );
      setIsSubmitting(false);
    }
  };

  const attribution = getAttribution();

  return (
    <section id="order-form-section" className="py-16 sm:py-20 bg-white border-t border-gray-200 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <span className="bg-red-50 text-[#DC2626] border border-red-200 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#DC2626]" />
            100% Payment on Delivery Available
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#111827] tracking-tight text-balance">
            ORDER YOUR MULTIFUNCTION KITCHEN SINK
          </h2>
          <p className="mt-2 text-sm text-[#111827] font-medium max-w-2xl mx-auto">
            Fill in your correct delivery details below. A representative will contact you via phone call or WhatsApp to confirm your order before dispatch.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-xl p-6 sm:p-8">
          
          <form 
            action={FORMSPREE_ENDPOINT} 
            method="POST" 
            onSubmit={handleSubmit} 
            noValidate 
            className="space-y-6"
          >
            {/* Hidden tracking & meta fields */}
            <input type="hidden" name="_to" value="maxluxurybathrooms@gmail.com" />
            <input type="hidden" name="_cc" value="maxluxurybathrooms@gmail.com" />
            <input type="hidden" name="target_email" value="maxluxurybathrooms@gmail.com" />
            <input type="hidden" name="admin_notification_email" value="maxluxurybathrooms@gmail.com" />
            <input type="hidden" name="_subject" value={`NEW ORDER: Multifunction Luxury Kitchen Sink (${pricing.quantity} Units) - ${pricing.formattedSubtotal}`} />
            <input type="hidden" name="product_name" value={PRODUCT_NAME} />
            <input type="hidden" name="currency" value="NGN" />
            <input type="hidden" name="unit_price" value={pricing.formattedUnitPrice} />
            <input type="hidden" name="total_price" value={pricing.formattedSubtotal} />
            <input type="hidden" name="utm_source" value={attribution.utm_source} />
            <input type="hidden" name="utm_medium" value={attribution.utm_medium} />
            <input type="hidden" name="utm_campaign" value={attribution.utm_campaign} />
            <input type="hidden" name="utm_content" value={attribution.utm_content} />
            <input type="hidden" name="fbclid" value={attribution.fbclid} />
            <input type="hidden" name="landing_page" value={attribution.landing_page} />

            {/* Error Banner */}
            {submitError && (
              <div className="p-4 bg-red-50 border border-red-300 rounded-xl text-xs sm:text-sm text-[#111827] flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-black text-[#DC2626]">Order Submission Alert</p>
                  <p className="mt-0.5 font-medium">{submitError}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSubmitError(null)}
                      className="bg-[#DC2626] hover:bg-[#b91c1c] text-white px-3 py-1.5 rounded text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Try Again
                    </button>
                    <a
                      href={SUPPORT_WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#DC2626] font-black hover:underline flex items-center gap-1 text-xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> Order on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Select Quantity */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-5">
              <label className="block text-sm font-black text-[#111827] uppercase tracking-wider mb-3">
                1. Select Quantity:
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
                {[1, 2, 3, 4].map((q) => {
                  const p = calculateOrderPricing(q);
                  const isSelected = quantity === q;
                  return (
                    <button
                      type="button"
                      key={q}
                      onClick={() => handleQuantityChange(q)}
                      className={`p-3 rounded-lg border text-left transition-all cursor-pointer relative bg-white ${
                        isSelected
                          ? 'border-2 border-[#DC2626] bg-red-50/40 ring-1 ring-[#DC2626]'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {q === 2 && (
                        <span className="absolute -top-2 right-2 bg-[#DC2626] text-white text-[9px] font-black px-1.5 rounded">
                          POPULAR
                        </span>
                      )}
                      {q >= 3 && (
                        <span className="absolute -top-2 right-2 bg-[#111827] text-white text-[9px] font-black px-1.5 rounded">
                          BEST DEAL
                        </span>
                      )}
                      <div className="font-black text-[#111827] text-sm">
                        {q} {q === 1 ? 'Piece' : 'Pieces'}
                      </div>
                      <div className="text-xs text-[#DC2626] font-black tabular-nums mt-0.5">
                        {formatNaira(p.unitPrice)} ea
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200 text-xs">
                <span className="text-[#111827] font-bold">Adjust Quantity:</span>
                <div className="flex items-center gap-3 bg-white border border-gray-300 rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="p-1.5 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-40 text-[#111827] transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-black text-[#111827] text-sm px-2 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="p-1.5 rounded bg-gray-100 hover:bg-gray-200 text-[#111827] transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <input type="hidden" name="quantity" value={quantity} />
            </div>

            {/* Step 2: Customer Contact Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-black text-[#111827] uppercase tracking-wider border-b border-gray-200 pb-2">
                2. Customer & Delivery Information:
              </h3>

              {/* Full Name */}
              <div id="field-fullName">
                <label className="block text-xs font-bold text-[#111827] mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#DC2626]" />
                  <span>Full Name (Surname First or First Name) *</span>
                </label>
                <input
                  type="text"
                  name="full_name"
                  required
                  placeholder="e.g. Babatunde Adebayo"
                  value={fullName}
                  onFocus={handleInputFocus}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`w-full bg-white border rounded-lg px-4 py-2.5 text-sm text-[#111827] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-[#DC2626] transition-all ${
                    errors.fullName ? 'border-[#DC2626] ring-1 ring-[#DC2626]' : 'border-gray-300'
                  }`}
                />
                {errors.fullName && (
                  <p className="text-[#DC2626] text-xs mt-1 flex items-center gap-1 font-bold">
                    <AlertCircle className="w-3 h-3" />
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Phone Numbers Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div id="field-phone">
                  <label className="block text-xs font-bold text-[#111827] mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#DC2626]" />
                    <span>Active Phone Number *</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="e.g. 08012345678"
                    value={phone}
                    onFocus={handleInputFocus}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`w-full bg-white border rounded-lg px-4 py-2.5 text-sm text-[#111827] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-[#DC2626] transition-all ${
                      errors.phone ? 'border-[#DC2626] ring-1 ring-[#DC2626]' : 'border-gray-300'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[#DC2626] text-xs mt-1 flex items-center gap-1 font-bold">
                      <AlertCircle className="w-3 h-3" />
                      {errors.phone}
                    </p>
                  )}
                  <span className="text-[11px] text-gray-500 mt-1 block font-medium">
                    Our agent will call this line before dispatch.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#111827] mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    <span>Alternative Phone (Optional)</span>
                  </label>
                  <input
                    type="tel"
                    name="alternative_phone"
                    placeholder="e.g. 08147778029"
                    value={altPhone}
                    onFocus={handleInputFocus}
                    onChange={(e) => setAltPhone(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-[#111827] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-[#DC2626] transition-all"
                  />
                  <span className="text-[11px] text-gray-500 mt-1 block font-medium">
                    Backup number if first line is unreachable.
                  </span>
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-[#111827] mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#DC2626]" />
                  <span>Email Address (Optional for order confirmation receipt)</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="e.g. name@example.com"
                  value={email}
                  onFocus={handleInputFocus}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-[#111827] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-[#DC2626] transition-all"
                />
              </div>

              {/* State and City Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div id="field-state">
                  <label className="block text-xs font-bold text-[#111827] mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#DC2626]" />
                    <span>State *</span>
                  </label>
                  <select
                    name="state"
                    value={state}
                    onFocus={handleInputFocus}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-[#DC2626] transition-all font-semibold"
                  >
                    {NIGERIAN_STATES.map((s) => (
                      <option key={s} value={s} className="bg-white text-[#111827]">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#111827] mb-1.5">
                    <span>City / Town / LGA</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="e.g. Lekki Phase 1, Ikeja, Wuse 2"
                    value={city}
                    onFocus={handleInputFocus}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-[#111827] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-[#DC2626] transition-all"
                  />
                </div>
              </div>

              {/* Delivery Address */}
              <div id="field-deliveryAddress">
                <label className="block text-xs font-bold text-[#111827] mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#DC2626]" />
                  <span>Exact Delivery Street Address & Nearest Landmark *</span>
                </label>
                <textarea
                  name="delivery_address"
                  required
                  rows={3}
                  placeholder="e.g. Flat 4, Block B, Silver Crest Estate, Near Total Filling Station, Lekki, Lagos"
                  value={deliveryAddress}
                  onFocus={handleInputFocus}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className={`w-full bg-white border rounded-lg px-4 py-2.5 text-sm text-[#111827] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-[#DC2626] transition-all ${
                    errors.deliveryAddress ? 'border-[#DC2626] ring-1 ring-[#DC2626]' : 'border-gray-300'
                  }`}
                />
                {errors.deliveryAddress && (
                  <p className="text-[#DC2626] text-xs mt-1 flex items-center gap-1 font-bold">
                    <AlertCircle className="w-3 h-3" />
                    {errors.deliveryAddress}
                  </p>
                )}
              </div>

              {/* Preferred Delivery Option */}
              <div>
                <label className="block text-xs font-bold text-[#111827] mb-1.5">
                  Preferred Delivery Timing:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <label
                    className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all bg-white ${
                      preferredDeliveryOption === 'standard'
                        ? 'border-2 border-[#DC2626] bg-red-50/30'
                        : 'border-gray-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="preferred_delivery"
                      value="Standard Delivery"
                      checked={preferredDeliveryOption === 'standard'}
                      onChange={() => setPreferredDeliveryOption('standard')}
                      className="mt-0.5 text-[#DC2626] focus:ring-[#DC2626]"
                    />
                    <div>
                      <div className="font-black text-[#111827]">Standard Delivery</div>
                      <div className="text-[#111827] mt-0.5 font-normal">
                        Delivered via standard logistics route after phone confirmation.
                      </div>
                    </div>
                  </label>

                  <label
                    className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all bg-white ${
                      preferredDeliveryOption === 'priority'
                        ? 'border-2 border-[#DC2626] bg-red-50/30'
                        : 'border-gray-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="preferred_delivery"
                      value="Priority Dispatch"
                      checked={preferredDeliveryOption === 'priority'}
                      onChange={() => setPreferredDeliveryOption('priority')}
                      className="mt-0.5 text-[#DC2626] focus:ring-[#DC2626]"
                    />
                    <div>
                      <div className="font-black text-[#111827]">Priority Dispatch</div>
                      <div className="text-[#111827] mt-0.5 font-normal">
                        Immediate agent callback for expedited dispatch.
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Optional notes */}
              <div>
                <label className="block text-xs font-bold text-[#111827] mb-1.5">
                  Special Delivery Instructions (Optional)
                </label>
                <input
                  type="text"
                  name="delivery_notes"
                  placeholder="e.g. Call before coming, Deliver after 2pm"
                  value={notes}
                  onFocus={handleInputFocus}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-[#111827] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:border-[#DC2626] transition-all"
                />
              </div>

            </div>

            {/* Dynamic Price Calculation Summary */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#111827] border-b border-gray-200 pb-2 flex items-center justify-between">
                <span>Order Summary & Live Total:</span>
                <span className="text-[#DC2626] font-black">
                  {quantity} {quantity === 1 ? 'Unit' : 'Units'}
                </span>
              </h4>

              <div className="space-y-1.5 text-xs sm:text-sm">
                <div className="flex justify-between text-[#111827] font-medium">
                  <span>Unit Price:</span>
                  <span className="font-black text-[#111827] tabular-nums">
                    {pricing.formattedUnitPrice} each
                  </span>
                </div>

                {quantity > 1 && (
                  <div className="flex justify-between text-[#DC2626] font-bold">
                    <span>Quantity Discount:</span>
                    <span>Applied ({formatNaira(pricing.discountPerUnit)} off regular per unit)</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-400 font-medium">
                  <span>Original Combined Price:</span>
                  <span className="line-through tabular-nums">
                    {pricing.formattedOriginalTotal}
                  </span>
                </div>

                <div className="flex justify-between text-[#111827] font-black">
                  <span>Your Total Promotional Savings:</span>
                  <span className="tabular-nums text-[#DC2626]">
                    Save {pricing.formattedSavings}
                  </span>
                </div>

                <div className="pt-2 border-t border-gray-200 flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-black text-[#111827] block">TOTAL PAYABLE:</span>
                    <span className="text-[11px] text-gray-500 font-medium">
                      (Pay on delivery upon inspection)
                    </span>
                  </div>
                  <span className="text-2xl sm:text-3xl font-black text-[#DC2626] tabular-nums">
                    {pricing.formattedSubtotal}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment On Delivery Notice */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 text-xs text-[#111827]">
              <ShieldCheck className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
              <div>
                <span className="font-black text-[#DC2626] block mb-0.5">
                  PAYMENT ON DELIVERY AVAILABLE
                </span>
                <span className="font-medium">
                  Place your order online and pay when your order is delivered, subject to delivery availability in your location. Inspect your sink upon arrival before payment.
                </span>
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#DC2626] hover:bg-[#b91c1c] text-white font-black text-base py-4 px-6 rounded-xl shadow-xl shadow-red-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 tracking-wide disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>TRANSMITTING ORDER DETAILS...</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5 text-white" />
                  <span>CONFIRM ORDER (PAY ON DELIVERY) — {pricing.formattedSubtotal}</span>
                </>
              )}
            </button>

            {/* Reassurance text */}
            <div className="text-center text-xs text-[#111827] space-y-1 font-medium">
              <p>
                Need to speak with an agent before ordering? Call{' '}
                <a href={`tel:${SUPPORT_PHONE}`} className="text-[#DC2626] font-black hover:underline">
                  {SUPPORT_PHONE}
                </a>
              </p>
              <p className="text-[11px] text-gray-500">
                🔒 Your details are transmitted securely to our dispatch team for phone confirmation.
              </p>
            </div>

          </form>

        </div>

      </div>
    </section>
  );
};
