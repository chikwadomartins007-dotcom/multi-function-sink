import React from 'react';
import { ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { ORIGINAL_SINGLE_PRICE, PROMO_PRICE_1, PROMO_PRICE_2, PROMO_PRICE_3_PLUS, formatNaira } from '../utils/pricing';
import { SUPPORT_PHONE } from '../data/productData';

interface FinalCTASectionProps {
  onOrderClick: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onOrderClick }) => {
  return (
    <section className="py-16 sm:py-20 bg-white border-t border-gray-200 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        
        <div className="text-xs font-bold text-[#DC2626] uppercase tracking-widest mb-2">
          Limited Promotional Window
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111827] tracking-tight leading-tight text-balance">
          READY TO UPGRADE YOUR KITCHEN?
        </h2>

        <p className="mt-4 text-base sm:text-lg text-[#111827] max-w-2xl mx-auto leading-relaxed font-medium text-pretty">
          Bring modern functionality and a premium look into your kitchen with the multifunction luxury kitchen sink.
        </p>

        {/* Price Card */}
        <div className="mt-8 bg-white border-2 border-[#DC2626] rounded-2xl p-6 sm:p-8 max-w-lg mx-auto shadow-lg">
          <div className="flex items-center justify-center gap-3">
            <span className="text-gray-400 line-through text-lg font-medium">
              {formatNaira(ORIGINAL_SINGLE_PRICE)}
            </span>
            <span className="text-3xl sm:text-4xl font-black text-[#DC2626] tabular-nums">
              NOW {formatNaira(PROMO_PRICE_1)}
            </span>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-center gap-4 text-xs font-bold text-[#111827]">
            <span className="bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-xs">
              BUY 2 — <strong className="text-[#DC2626] font-black">{formatNaira(PROMO_PRICE_2)}</strong> EACH
            </span>
            <span className="bg-white px-3 py-1.5 rounded-lg border border-[#DC2626] shadow-xs">
              BUY 3+ — <strong className="text-[#DC2626] font-black">{formatNaira(PROMO_PRICE_3_PLUS)}</strong> EACH
            </span>
          </div>

          {/* Big CTA */}
          <button
            type="button"
            onClick={onOrderClick}
            className="w-full mt-6 bg-[#DC2626] hover:bg-[#b91c1c] text-white font-black text-base py-4 px-8 rounded-xl shadow-xl shadow-red-600/30 hover:shadow-red-600/50 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 tracking-wide"
          >
            <ShoppingBag className="w-5 h-5 text-white" />
            <span>ORDER YOURS NOW</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          {/* Under CTA */}
          <div className="mt-4 flex items-center justify-center gap-1.5 text-xs font-black text-[#DC2626]">
            <ShieldCheck className="w-4 h-4" />
            <span>PAYMENT ON DELIVERY AVAILABLE</span>
          </div>
        </div>

        {/* Direct phone option */}
        <div className="mt-8 text-xs text-[#111827] font-semibold">
          <span>Prefer ordering by phone or WhatsApp? Call </span>
          <a href={`tel:${SUPPORT_PHONE}`} className="text-[#DC2626] font-black underline">
            {SUPPORT_PHONE}
          </a>
        </div>

      </div>
    </section>
  );
};
