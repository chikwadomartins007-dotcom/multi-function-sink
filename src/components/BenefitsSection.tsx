import React from 'react';
import { PRODUCT_BENEFITS } from '../data/productData';
import { ShoppingBag, ArrowRight } from 'lucide-react';

interface BenefitsSectionProps {
  onOrderClick: () => void;
}

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({ onOrderClick }) => {
  return (
    <section id="benefits" className="py-16 sm:py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="text-xs font-bold text-[#DC2626] uppercase tracking-widest mb-2">
            Engineered For Culinary Excellence
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#111827] tracking-tight text-balance">
            WHY YOUR KITCHEN NEEDS THIS SINK
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#111827] font-medium text-pretty">
            Move beyond standard traditional basins. Upgrade to an integrated multi-tier workstation designed for modern cooking and effortless cleaning.
          </p>
        </div>

        {/* 6 Benefit Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCT_BENEFITS.map((b) => (
            <div
              key={b.number}
              className="bg-white border-2 border-gray-200 hover:border-[#DC2626] rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-gray-300 group-hover:text-[#DC2626] transition-colors tabular-nums">
                    {b.number}
                  </span>
                  <span className="text-[11px] font-bold text-[#111827] uppercase tracking-wider bg-red-50 border border-red-100 px-2 py-0.5 rounded">
                    {b.highlight}
                  </span>
                </div>

                <h3 className="text-lg font-black text-[#111827] mb-2.5 group-hover:text-[#DC2626] transition-colors">
                  {b.title}
                </h3>

                <p className="text-sm text-[#111827] leading-relaxed font-normal">
                  {b.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center text-xs font-bold text-[#DC2626]">
                <span>Workstation Benefit</span>
              </div>
            </div>
          ))}
        </div>

        {/* Section CTA strip */}
        <div className="mt-12 text-center bg-white border-2 border-gray-200 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="text-left">
            <h4 className="text-[#111827] font-black text-base sm:text-lg">
              Ready to transform your daily kitchen experience?
            </h4>
            <p className="text-[#111827] text-xs sm:text-sm mt-0.5 font-medium">
              Available at the promotional price of ₦115,000 with Payment on Delivery.
            </p>
          </div>

          <button
            onClick={onOrderClick}
            className="bg-[#DC2626] hover:bg-[#b91c1c] text-white font-bold px-6 py-3 rounded-lg text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer shrink-0 active:scale-95"
          >
            <ShoppingBag className="w-4 h-4 text-white" />
            <span>ORDER YOUR SINK</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
