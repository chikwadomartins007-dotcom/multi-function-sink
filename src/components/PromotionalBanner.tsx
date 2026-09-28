import React from 'react';
import { Tag } from 'lucide-react';

interface PromotionalBannerProps {
  onOrderClick: () => void;
}

export const PromotionalBanner: React.FC<PromotionalBannerProps> = ({ onOrderClick }) => {
  return (
    <div className="bg-[#DC2626] text-white text-xs md:text-sm font-semibold py-2.5 px-4 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none py-0.5">
          <span className="bg-[#111827] text-white px-2.5 py-0.5 rounded text-[11px] font-black uppercase tracking-wider flex items-center gap-1">
            <Tag className="w-3 h-3 text-[#DC2626]" />
            Limited-Time Offer
          </span>
          <span className="font-extrabold tracking-tight text-white">
            MULTIFUNCTION LUXURY KITCHEN SINK
          </span>
          <span className="hidden sm:inline text-white/80">|</span>
          <span className="bg-white text-[#DC2626] px-2.5 py-0.5 rounded font-black text-xs">
            NOW ₦115,000
          </span>
          <span className="hidden md:inline text-white font-medium">
            (Buy 2 → ₦110,000 ea · Buy 3+ → ₦105,000 ea)
          </span>
        </div>

        <button
          type="button"
          onClick={onOrderClick}
          className="ml-auto bg-[#111827] hover:bg-black text-white hover:text-red-200 px-3.5 py-1 rounded text-xs font-black transition-colors shadow-sm flex items-center gap-1 cursor-pointer whitespace-nowrap"
        >
          Claim Offer
        </button>
      </div>
    </div>
  );
};
