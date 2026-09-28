import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../data/productData';
import { Droplet, Waves, LayoutGrid, CheckCircle2 } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const stepIcons = [
    <Droplet className="w-5 h-5 text-[#DC2626]" key="wash" />,
    <Waves className="w-5 h-5 text-[#DC2626]" key="rinse" />,
    <LayoutGrid className="w-5 h-5 text-[#DC2626]" key="organize" />,
    <CheckCircle2 className="w-5 h-5 text-[#DC2626]" key="drain" />,
  ];

  return (
    <section id="how-it-works" className="py-14 sm:py-18 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="text-xs font-bold text-[#DC2626] uppercase tracking-widest mb-1.5">
            Intuitive Workflow
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#111827] tracking-tight">
            HOW IT WORKS IN YOUR KITCHEN
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#111827] font-medium">
            Four simple stages that turn meal preparation and cleaning into an organized, efficient routine.
          </p>
        </div>

        {/* 4 Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {HOW_IT_WORKS_STEPS.map((step, idx) => (
            <div
              key={step.title}
              className="bg-white border-2 border-gray-200 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between group hover:border-[#DC2626] shadow-sm transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black text-[#DC2626] uppercase tracking-wider bg-red-50 px-2 py-0.5 rounded border border-red-100">
                  {step.step}
                </span>
                <div className="p-2 rounded-lg bg-red-50 border border-red-100">
                  {stepIcons[idx]}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-black text-[#111827] tracking-wide mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#111827] leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-[#111827] font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
                <span>Effortless daily utility</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
