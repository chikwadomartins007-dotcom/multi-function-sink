import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { PROMO_PRICE_1, formatNaira } from '../utils/pricing';

interface MobileStickyCTAProps {
  onOrderClick: () => void;
}

export const MobileStickyCTA: React.FC<MobileStickyCTAProps> = ({ onOrderClick }) => {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 shadow-2xl safe-area-bottom">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-bold text-[#111827] tracking-wider">
            MULTIFUNCTION SINK
          </span>
          <span className="text-base font-black text-[#DC2626] tabular-nums leading-tight">
            {formatNaira(PROMO_PRICE_1)}
          </span>
        </div>

        <button
          onClick={onOrderClick}
          className="bg-[#DC2626] hover:bg-[#b91c1c] text-white font-black text-xs sm:text-sm py-2.5 px-6 rounded-lg shadow-md shadow-red-600/25 flex items-center gap-1.5 cursor-pointer active:scale-95 whitespace-nowrap"
        >
          <ShoppingBag className="w-4 h-4 text-white" />
          <span>ORDER NOW</span>
        </button>
      </div>
    </div>
  );
};
