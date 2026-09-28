import React, { useState, useEffect } from 'react';
import { ShoppingBag, X, CheckCircle, Clock } from 'lucide-react';
import { PROMO_PRICE_1, formatNaira } from '../utils/pricing';

interface QuickOrderPopupProps {
  onOrderClick: () => void;
  onOpenQuickOrderModal?: () => void;
}

interface RecentOrder {
  name: string;
  location: string;
  quantity: number;
  timeAgo: string;
}

const RECENT_ORDERS: RecentOrder[] = [
  { name: 'Aisha B.', location: 'Lekki Phase 1, Lagos', quantity: 2, timeAgo: '2 mins ago' },
  { name: 'Engr. Chinedu O.', location: 'GRA Phase 2, Port Harcourt', quantity: 1, timeAgo: '4 mins ago' },
  { name: 'Alh. Ibrahim K.', location: 'Maitama, Abuja FCT', quantity: 3, timeAgo: 'Just now' },
  { name: 'Mrs. Folake A.', location: 'Bodija, Ibadan', quantity: 1, timeAgo: '6 mins ago' },
  { name: 'Dr. Emeka N.', location: 'Asaba, Delta State', quantity: 2, timeAgo: '8 mins ago' },
  { name: 'Grace M.', location: 'Ikeja GRA, Lagos', quantity: 1, timeAgo: '3 mins ago' },
  { name: 'Pastor Adeyemi', location: 'Abeokuta, Ogun State', quantity: 2, timeAgo: '11 mins ago' },
  { name: 'Chief Okon E.', location: 'Ewet Housing, Uyo', quantity: 1, timeAgo: '5 mins ago' },
  { name: 'David T.', location: 'Victoria Island, Lagos', quantity: 2, timeAgo: 'Just now' },
  { name: 'Hajiya Fatima', location: 'Gwarinpa, Abuja', quantity: 1, timeAgo: '7 mins ago' },
];

export const QuickOrderPopup: React.FC<QuickOrderPopupProps> = ({ onOrderClick, onOpenQuickOrderModal }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [orderIndex, setOrderIndex] = useState(0);

  useEffect(() => {
    // Show after initial 35 seconds, then repeat every 35 seconds
    const intervalTimer = setInterval(() => {
      setOrderIndex((prev) => (prev + 1) % RECENT_ORDERS.length);
      setIsVisible(true);

      // Auto-hide popup after 9 seconds of visibility
      const hideTimeout = setTimeout(() => {
        setIsVisible(false);
      }, 9000);

      return () => clearTimeout(hideTimeout);
    }, 35000);

    // Initial trigger at 35 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
      const hideTimeout = setTimeout(() => {
        setIsVisible(false);
      }, 9000);
      return () => clearTimeout(hideTimeout);
    }, 35000);

    return () => {
      clearInterval(intervalTimer);
      clearTimeout(initialTimer);
    };
  }, []);

  const currentOrder = RECENT_ORDERS[orderIndex];

  if (!isVisible) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      className="fixed z-50 bottom-20 left-4 sm:bottom-6 sm:left-6 max-w-[340px] sm:max-w-sm w-full bg-white border-2 border-[#DC2626] rounded-xl shadow-2xl p-3.5 transition-all duration-500 animate-in fade-in slide-in-from-bottom-5"
    >
      {/* Close button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 text-gray-400 hover:text-[#111827] p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
        aria-label="Dismiss quick order notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      <div className="flex items-start gap-3">
        {/* Product image thumbnail */}
        <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-gray-200 bg-white">
          <img
            src="/product/H60608c75431d41529296abdc09a27073j.png"
            alt="Multifunction Sink"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white" />
        </div>

        {/* Content */}
        <div className="flex-1 pr-4">
          <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-[#DC2626]">
            <CheckCircle className="w-3 h-3 text-[#DC2626]" />
            <span>Verified Recent Order</span>
          </div>

          <p className="text-xs font-black text-[#111827] leading-snug mt-0.5">
            {currentOrder.name}{' '}
            <span className="font-medium text-gray-600">from</span>{' '}
            <span className="text-[#111827]">{currentOrder.location}</span>
          </p>

          <p className="text-[11px] text-gray-600 mt-0.5">
            Ordered <strong className="text-[#111827] font-black">{currentOrder.quantity} {currentOrder.quantity > 1 ? 'Units' : 'Unit'}</strong>{' '}
            <span className="text-[#DC2626] font-bold">({formatNaira(PROMO_PRICE_1)})</span>
          </p>

          <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-400">
            <span className="flex items-center gap-0.5 font-medium">
              <Clock className="w-2.5 h-2.5" />
              {currentOrder.timeAgo}
            </span>
            <span>·</span>
            <span className="text-emerald-700 font-bold">Pay on Delivery</span>
          </div>
        </div>
      </div>

      {/* Action button */}
      <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
        <span className="text-[10px] text-gray-500 font-medium">Limited stock available</span>
        <button
          onClick={() => {
            setIsVisible(false);
            if (onOpenQuickOrderModal) {
              onOpenQuickOrderModal();
            } else {
              onOrderClick();
            }
          }}
          className="bg-[#DC2626] hover:bg-[#b91c1c] text-white text-xs font-black px-3.5 py-1.5 rounded-lg shadow-sm transition-all flex items-center gap-1 cursor-pointer active:scale-95"
        >
          <ShoppingBag className="w-3 h-3 text-white" />
          <span>Quick Order</span>
        </button>
      </div>
    </div>
  );
};
