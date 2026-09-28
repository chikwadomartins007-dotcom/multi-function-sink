import React from 'react';
import { PRICING_TIERS, formatNaira, ORIGINAL_SINGLE_PRICE } from '../utils/pricing';
import { Check, ShoppingBag, ShieldCheck } from 'lucide-react';

interface PricingSectionProps {
  onSelectTier: (quantity: number) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectTier }) => {
  return (
    <section id="pricing" className="py-16 sm:py-20 bg-white border-t border-gray-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="text-xs font-bold text-[#DC2626] uppercase tracking-widest mb-2">
            Clear, Transparent Pricing
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#111827] tracking-tight text-balance">
            GET YOUR MULTIFUNCTION KITCHEN SINK TODAY
          </h2>
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="text-gray-400 line-through text-lg font-medium">
              WAS {formatNaira(ORIGINAL_SINGLE_PRICE)}
            </span>
            <span className="text-2xl sm:text-3xl font-black text-[#DC2626] tabular-nums">
              NOW {formatNaira(115000)}
            </span>
          </div>
          <p className="mt-3 text-sm text-[#111827] font-medium">
            The more you buy, the more you save. Choose your preferred quantity below to claim promotional savings.
          </p>
        </div>

        {/* 3 Pricing Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.quantity}
              className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative bg-white ${
                tier.isPopular
                  ? 'border-2 border-[#DC2626] shadow-xl md:-translate-y-2'
                  : 'border-2 border-gray-200 hover:border-gray-300 shadow-sm'
              }`}
            >
              {/* Badge */}
              {tier.badge && (
                <div
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-black px-3 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap ${
                    tier.isPopular
                      ? 'bg-[#DC2626] text-white shadow-sm'
                      : tier.isBestValue
                      ? 'bg-[#111827] text-white shadow-sm'
                      : 'bg-white text-[#111827] border border-gray-300'
                  }`}
                >
                  {tier.badge}
                </div>
              )}

              <div>
                <div className="text-center pb-5 border-b border-gray-100">
                  <h3 className="text-lg font-black text-[#111827] uppercase tracking-wider">
                    {tier.label}
                  </h3>
                  <div className="mt-3">
                    <span className="text-3xl sm:text-4xl font-black text-[#111827] tabular-nums">
                      {formatNaira(tier.unitPrice)}
                    </span>
                    <span className="text-xs text-gray-500 font-semibold block mt-1">
                      EACH
                    </span>
                  </div>
                  <div className="mt-2 text-xs font-bold text-[#DC2626]">
                    Total: {formatNaira(tier.totalPrice)} {tier.quantity > 1 ? `(Save ${formatNaira(tier.savings)})` : `(Save ₦15,000)`}
                  </div>
                </div>

                {/* Features included */}
                <ul className="py-5 space-y-3 text-xs sm:text-sm text-[#111827] font-medium">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                    <span>Multifunction Workstation Sink</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                    <span>Waterfall & pull-down faucet system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                    <span>Inner basin, colander & cutting board</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                    <span>Payment on Delivery Available</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                    <span>Inspection before payment</span>
                  </li>
                </ul>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectTier(tier.quantity)}
                className={`w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-black tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95 ${
                  tier.isPopular
                    ? 'bg-[#DC2626] hover:bg-[#b91c1c] text-white'
                    : 'bg-[#111827] hover:bg-black text-white'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>SELECT & ORDER ({tier.quantity} {tier.quantity === 1 ? 'UNIT' : 'UNITS'})</span>
              </button>
            </div>
          ))}
        </div>

        {/* Pricing note */}
        <div className="mt-8 text-center text-xs text-[#111827] font-bold flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#DC2626]" />
          <span>Pay safely on delivery · Confirm package upon arrival before making payment</span>
        </div>

      </div>
    </section>
  );
};
