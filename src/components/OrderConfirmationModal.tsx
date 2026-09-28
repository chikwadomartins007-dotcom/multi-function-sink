import React from 'react';
import { OrderFormData } from '../types';
import { formatNaira } from '../utils/pricing';
import { SUPPORT_PHONE, SUPPORT_EMAIL } from '../data/productData';
import { CheckCircle, MessageCircle, X, ShieldCheck, Printer } from 'lucide-react';

interface OrderConfirmationModalProps {
  order: OrderFormData;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({ order, onClose }) => {
  const whatsappMessage = encodeURIComponent(
    `Hello MAX Luxury Bathrooms,\nI just submitted an order on your website!\n\nOrder ID: ${order.orderId}\nName: ${order.fullName}\nPhone: ${order.phone}\nAddress: ${order.deliveryAddress}, ${order.state}\nQuantity: ${order.quantity} Piece(s)\nTotal: ${formatNaira(order.totalPrice)}\nPayment Method: Pay on Delivery\n\nPlease confirm my order dispatch.`
  );

  const whatsappUrl = `https://wa.me/2348147778029?text=${whatsappMessage}`;

  return (
    <div className="fixed inset-0 z-50 bg-[#111827]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border-2 border-gray-200 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-8 text-[#111827]">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-[#111827] p-2 rounded-full cursor-pointer transition-colors"
          aria-label="Close confirmation dialog"
        >
          <X className="w-5 h-5 text-[#111827]" />
        </button>

        {/* Success Icon & Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-red-50 border-2 border-[#DC2626] rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-10 h-10 text-[#DC2626]" />
          </div>
          <span className="text-xs font-black text-[#DC2626] uppercase tracking-wider">
            Order Submitted Successfully
          </span>
          <h3 className="text-2xl font-black text-[#111827] mt-1">
            THANK YOU FOR YOUR ORDER!
          </h3>
          <p className="text-xs sm:text-sm text-[#111827] mt-2 font-medium">
            Your order has been recorded. Our team will contact you shortly via phone to confirm dispatch details.
          </p>
        </div>

        {/* Order Receipt Box */}
        <div className="bg-white border-2 border-gray-200 rounded-xl p-4 sm:p-5 space-y-3 text-xs sm:text-sm text-[#111827]">
          <div className="flex justify-between items-center pb-2.5 border-b border-gray-200 font-bold">
            <span className="text-gray-500">Order Reference:</span>
            <span className="text-[#111827] text-base font-black tracking-wider">{order.orderId}</span>
          </div>

          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between">
              <span className="text-gray-500">Customer Name:</span>
              <span className="text-[#111827] font-semibold">{order.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Primary Phone:</span>
              <span className="text-[#111827] font-semibold">{order.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">State / Location:</span>
              <span className="text-[#111827] font-semibold">{order.state}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Delivery Address:</span>
              <span className="text-[#111827] font-semibold text-right max-w-[200px] truncate">
                {order.deliveryAddress}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Item:</span>
              <span className="text-[#111827] font-semibold">Multifunction Luxury Sink</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Quantity:</span>
              <span className="text-[#111827] font-black">{order.quantity} Unit(s)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Payment Method:</span>
              <span className="text-[#DC2626] font-black">Payment on Delivery</span>
            </div>
          </div>

          <div className="pt-2.5 border-t border-gray-200 flex justify-between items-baseline text-[#111827]">
            <span className="font-bold">Total Amount Due:</span>
            <span className="text-xl sm:text-2xl font-black text-[#DC2626] tabular-nums">
              {formatNaira(order.totalPrice)}
            </span>
          </div>
        </div>

        {/* Payment on Delivery reminder */}
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2.5 text-xs text-[#111827] font-semibold">
          <ShieldCheck className="w-4 h-4 shrink-0 text-[#DC2626]" />
          <span>Pay upon delivery after physical inspection of your package.</span>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>SPEED UP DISPATCH ON WHATSAPP</span>
          </a>

          <button
            type="button"
            onClick={() => window.print()}
            className="w-full bg-white hover:bg-gray-50 text-[#111827] font-bold text-xs py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-gray-300"
          >
            <Printer className="w-3.5 h-3.5 text-[#111827]" />
            <span>Print / Save Receipt</span>
          </button>
        </div>

        {/* Support contact info */}
        <div className="mt-4 text-center text-xs text-[#111827] space-y-1">
          <div>
            <span>Questions regarding this order? Call </span>
            <a href={`tel:${SUPPORT_PHONE}`} className="text-[#DC2626] font-black underline">
              {SUPPORT_PHONE}
            </a>
            <span> or email </span>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="text-[#DC2626] font-black underline">
              {SUPPORT_EMAIL}
            </a>
          </div>
          <div className="text-[11px] text-gray-500 font-medium">
            A confirmation notice has been dispatched to {SUPPORT_EMAIL} for warehouse processing.
          </div>
        </div>

      </div>
    </div>
  );
};
