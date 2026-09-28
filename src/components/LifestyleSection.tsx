import React from 'react';
import { Sparkles, Check, ArrowRight } from 'lucide-react';

interface LifestyleSectionProps {
  onOrderClick: () => void;
}

export const LifestyleSection: React.FC<LifestyleSectionProps> = ({ onOrderClick }) => {
  return (
    <section className="py-16 sm:py-20 bg-white border-t border-gray-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="text-xs font-bold text-[#DC2626] uppercase tracking-widest mb-2 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Modern Living Space</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#111827] tracking-tight text-balance">
            TURN YOUR KITCHEN INTO A MODERN WORKSPACE
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#111827] leading-relaxed font-medium text-pretty">
            Upgrade your everyday kitchen experience with a multifunction sink that combines modern design with practical functionality.
          </p>
        </div>

        {/* 3 Lifestyle Showcase Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          
          {/* Panel 1 */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md flex flex-col group hover:border-[#DC2626] transition-all">
            <div className="relative aspect-[4/3] overflow-hidden bg-white">
              <img
                src="/product/H60608c75431d41529296abdc09a27073j.png"
                alt="Multifunction Sink in Graphite Countertop"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 left-3 bg-[#111827]/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-0.5 rounded shadow-sm">
                Quartz Countertop Fit
              </span>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-[#111827] font-black text-base mb-2 group-hover:text-[#DC2626] transition-colors">
                  Seamless Countertop Integration
                </h3>
                <p className="text-xs sm:text-sm text-[#111827] leading-relaxed font-normal">
                  Clean recessed rim rests flush against quartz, granite, or solid wood countertops for a smooth, wipeable surface.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-xs text-[#111827] font-bold">
                <Check className="w-3.5 h-3.5 text-[#DC2626]" />
                <span>Fits standard Nigerian kitchen layouts</span>
              </div>
            </div>
          </div>

          {/* Panel 2 */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md flex flex-col group hover:border-[#DC2626] transition-all">
            <div className="relative aspect-[4/3] overflow-hidden bg-white">
              <img
                src="/product/Hfec5865118904e37aaef4004e8b7a2fdT.png"
                alt="Multifunction Sink Island Installation"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 left-3 bg-[#111827]/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-0.5 rounded shadow-sm">
                Kitchen Island Centerpiece
              </span>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-[#111827] font-black text-base mb-2 group-hover:text-[#DC2626] transition-colors">
                  The Centerpiece of Your Kitchen
                </h3>
                <p className="text-xs sm:text-sm text-[#111827] leading-relaxed font-normal">
                  Deep basin depth provides generous room for cooking pots, heavy tableware, and food preparation without countertop splashes.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-xs text-[#111827] font-bold">
                <Check className="w-3.5 h-3.5 text-[#DC2626]" />
                <span>Built for heavy daily family usage</span>
              </div>
            </div>
          </div>

          {/* Panel 3 */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md flex flex-col group hover:border-[#DC2626] transition-all">
            <div className="relative aspect-[4/3] overflow-hidden bg-white">
              <img
                src="/product/H65c874a26a1d4d839ad890071f2d90f5M.png"
                alt="Designer Kitchen Workstation Setup"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 left-3 bg-[#111827]/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-0.5 rounded shadow-sm">
                All Fixtures Included
              </span>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-[#111827] font-black text-base mb-2 group-hover:text-[#DC2626] transition-colors">
                  Unified Aesthetics & Finish
                </h3>
                <p className="text-xs sm:text-sm text-[#111827] leading-relaxed font-normal">
                  Gooseneck pull-down tap, auxiliary tap, cup rinser, and knurled brass dial coordinate harmoniously in premium dark grey.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-xs text-[#111827] font-bold">
                <Check className="w-3.5 h-3.5 text-[#DC2626]" />
                <span>No separate mismatched accessories needed</span>
              </div>
            </div>
          </div>

        </div>

        {/* Visual Call To Action */}
        <div className="text-center">
          <button
            onClick={onOrderClick}
            className="inline-flex items-center gap-2 bg-[#DC2626] hover:bg-[#b91c1c] text-white font-bold px-8 py-3.5 rounded-lg text-sm transition-all shadow-md shadow-red-600/20 cursor-pointer active:scale-95"
          >
            <span>Upgrade Your Kitchen Today</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
