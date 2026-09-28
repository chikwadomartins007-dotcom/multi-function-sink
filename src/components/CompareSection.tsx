import React from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Droplets, 
  Flame, 
  Trophy,
  Layers,
  VolumeX,
  SlidersHorizontal,
  Wine
} from 'lucide-react';

interface CompareSectionProps {
  onOrderClick: () => void;
}

interface ComparisonFeature {
  title: string;
  category: string;
  luxurySink: {
    title: string;
    description: string;
    isAdvantage: boolean;
  };
  standardSink: {
    title: string;
    description: string;
    isAdvantage: boolean;
  };
}

const COMPARISON_DATA: ComparisonFeature[] = [
  {
    title: 'Steel Quality & Thickness',
    category: 'Durability',
    luxurySink: {
      title: '3.0mm Commercial Nano SUS304',
      description: 'Honeycomb embossed surface prevents scratch marks, denting, and rust. Withstands boiling water & heavy pots effortlessly.',
      isAdvantage: true,
    },
    standardSink: {
      title: '0.6mm Thin Stamped Metal',
      description: 'Thin pressed sheet that easily dents under heavy iron pots, scratches easily, and develops rust spots within months.',
      isAdvantage: false,
    },
  },
  {
    title: 'Waterfall & Pull-Out Faucet',
    category: 'Functionality',
    luxurySink: {
      title: 'Integrated Waterfall + 360° Pull-Out Sprayer',
      description: 'Dual outlets with wide gentle rainfall for delicate vegetables, plus a 3-mode high-pressure pull-out sprayer reaching every corner.',
      isAdvantage: true,
    },
    standardSink: {
      title: 'Basic Rigid Fixed Tap (Sold Separately)',
      description: 'Water splashes violently all over your clothes and counter. Zero flexible reach; you must purchase a tap separately.',
      isAdvantage: false,
    },
  },
  {
    title: 'High-Pressure Glass & Cup Rinser',
    category: 'Innovation',
    luxurySink: {
      title: 'Built-in 9-Hole Pressurized Rinser',
      description: 'Press any glass, baby bottle, blender jug, or tumbler upside down for an instant 2-second deep pressurized rinse.',
      isAdvantage: true,
    },
    standardSink: {
      title: 'Not Available',
      description: 'Requires buying special brushes and manually scrubbing deep inside drink tumblers, baby bottles, and narrow cups.',
      isAdvantage: false,
    },
  },
  {
    title: 'Sliding Workstation Accessories',
    category: 'Prep Efficiency',
    luxurySink: {
      title: '3-Piece Integrated Sliding Suite Included',
      description: 'Solid wood cutting board, perforated stainless draining colander, and inner prep basin slide seamlessly across sink tracks.',
      isAdvantage: true,
    },
    standardSink: {
      title: 'Zero Accessories (Empty Basin)',
      description: 'Just an empty bowl. Food prep clutter spills all over your limited countertop space with messy water drips.',
      isAdvantage: false,
    },
  },
  {
    title: 'Pure Drinking Water Spout',
    category: 'Hygiene',
    luxurySink: {
      title: 'Dedicated Purified Water Faucet Included',
      description: 'Connect directly to your reverse osmosis or filtration system without drilling extra holes into your expensive granite.',
      isAdvantage: true,
    },
    standardSink: {
      title: 'Not Included',
      description: 'Requires paying a mason to cut extra holes in your quartz or marble countertop, risking countertop cracks.',
      isAdvantage: false,
    },
  },
  {
    title: 'Sound & Condensation Protection',
    category: 'Cabinet Health',
    luxurySink: {
      title: '3mm Acoustic Pads + Anti-Sweat Coating',
      description: 'Thick sound-dampening rubber undercoating eliminates water drum noise, while moisture-barrier coating prevents cabinet mold & wood rot.',
      isAdvantage: true,
    },
    standardSink: {
      title: 'Bare Metal (No Insulation)',
      description: 'Loud hollow banging when water runs. Condensation drips into your under-sink cabinetry, causing rot, mold, and termite damage.',
      isAdvantage: false,
    },
  },
  {
    title: 'Drainage & Odour Prevention',
    category: 'Cleanliness',
    luxurySink: {
      title: 'X-Flume Vortex Drain + Anti-Odour Trap',
      description: 'Guided slope channels water immediately with no standing puddles. Large removable debris basket stops blockages and sewage smell.',
      isAdvantage: true,
    },
    standardSink: {
      title: 'Flat Center Drain',
      description: 'Water and food particles pool at the bottom. Frequent blockages and foul sewer odors rising up into your kitchen.',
      isAdvantage: false,
    },
  },
  {
    title: 'Purchase Guarantee',
    category: 'Confidence',
    luxurySink: {
      title: '100% Pay on Delivery After Physical Inspection',
      description: 'Inspect the sink, accessories, and steel finish in person at your doorstep before handing over a single kobo.',
      isAdvantage: true,
    },
    standardSink: {
      title: 'Pay Upfront / No Return Policy',
      description: 'Most local suppliers demand advance payment with strict "no return, no exchange" policies if the item is substandard.',
      isAdvantage: false,
    },
  },
];

export const CompareSection: React.FC<CompareSectionProps> = ({ onOrderClick }) => {
  return (
    <section id="compare" className="py-16 lg:py-20 bg-gray-50 border-t border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-red-50 text-[#DC2626] border border-red-200 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <Trophy className="w-3.5 h-3.5 text-[#DC2626]" />
            <span>Why Upgrade Your Kitchen Sink?</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#111827] tracking-tight uppercase">
            OUR LUXURY MULTIFUNCTION SINK <br className="hidden sm:block" />
            <span className="text-[#DC2626]">VS. ORDINARY KITCHEN SINKS</span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-gray-600 font-medium">
            See the undeniable differences in steel thickness, functionality, and daily kitchen convenience. 
            Invest in an all-in-one workstation that upgrades your home for years to come.
          </p>
        </div>

        {/* Comparison Table for Tablet & Desktop */}
        <div className="hidden md:block bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-12 bg-[#111827] text-white">
            <div className="col-span-4 p-5 font-black text-sm uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-red-500" />
              <span>Features & Specifications</span>
            </div>
            
            {/* Our Luxury Sink Header */}
            <div className="col-span-4 p-5 bg-[#DC2626] text-white font-black text-center relative border-l border-r border-red-700">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-[#DC2626] text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow-sm">
                ★ 100% All-in-One Luxury
              </span>
              <div className="text-base sm:text-lg font-black tracking-tight mt-1">
                MAX LUXURY SINK
              </div>
              <div className="text-xs font-bold text-red-100 mt-0.5">
                Promo Price: ₦115,000 (Full Kit)
              </div>
            </div>

            {/* Standard Sink Header */}
            <div className="col-span-4 p-5 text-gray-300 font-black text-center bg-gray-900">
              <div className="text-base sm:text-lg font-bold tracking-tight">
                Standard Kitchen Sink
              </div>
              <div className="text-xs text-gray-400 mt-0.5">
                Market Average: ₦75,000 - ₦95,000 (Sink Only)
              </div>
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-gray-200">
            {COMPARISON_DATA.map((item, idx) => (
              <div 
                key={idx} 
                className={`grid grid-cols-12 items-stretch transition-colors ${
                  idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                }`}
              >
                {/* Feature Name */}
                <div className="col-span-4 p-5 flex flex-col justify-center border-r border-gray-200">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#DC2626]">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-black text-[#111827] mt-0.5">
                    {item.title}
                  </h3>
                </div>

                {/* Our Sink Column */}
                <div className="col-span-4 p-5 bg-red-50/20 border-r border-gray-200 flex flex-col justify-center">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-[#111827]">
                        {item.luxurySink.title}
                      </h4>
                      <p className="text-xs text-gray-600 font-medium mt-1 leading-relaxed">
                        {item.luxurySink.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Standard Sink Column */}
                <div className="col-span-4 p-5 bg-white flex flex-col justify-center">
                  <div className="flex items-start gap-2.5">
                    <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-gray-700">
                        {item.standardSink.title}
                      </h4>
                      <p className="text-xs text-gray-500 font-normal mt-1 leading-relaxed">
                        {item.standardSink.description}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Mobile Card-Based Comparison */}
        <div className="md:hidden space-y-4">
          {COMPARISON_DATA.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#DC2626] bg-red-50 px-2 py-0.5 rounded">
                  {item.category}
                </span>
                <span className="text-xs font-black text-[#111827]">
                  {item.title}
                </span>
              </div>

              {/* Our Luxury Sink Card Box */}
              <div className="bg-emerald-50/50 border border-emerald-200 rounded-lg p-3 mb-2.5">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 block">
                      OUR LUXURY SINK
                    </span>
                    <h4 className="text-xs font-black text-[#111827] mt-0.5">
                      {item.luxurySink.title}
                    </h4>
                    <p className="text-[11px] text-gray-600 mt-1 leading-relaxed font-medium">
                      {item.luxurySink.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Ordinary Sink Card Box */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                      STANDARD ORDINARY SINK
                    </span>
                    <h4 className="text-xs font-bold text-gray-700 mt-0.5">
                      {item.standardSink.title}
                    </h4>
                    <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                      {item.standardSink.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Comparison Conclusion & Call-to-Action */}
        <div className="mt-10 bg-white border-2 border-[#DC2626] rounded-2xl p-6 sm:p-8 shadow-xl text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#DC2626] bg-red-50 border border-red-200 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#DC2626]" />
            <span>The Clear Winner for Modern Nigerian Homes</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-[#111827] uppercase tracking-tight">
            Stop Settling for Outdated Sinks. Upgrade Today with Zero Risk.
          </h3>

          <p className="text-xs sm:text-sm text-gray-600 mt-2 max-w-2xl mx-auto font-medium leading-relaxed">
            When you consider that buying a basic sink, pull-out faucet, glass washer, chopping board, and colander separately 
            costs well over <strong>₦185,000</strong>, our complete multifunction set for only <strong>₦115,000</strong> is an unbeatable investment.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOrderClick}
              type="button"
              className="w-full sm:w-auto bg-[#DC2626] hover:bg-[#b91c1c] text-white font-black text-sm px-8 py-3.5 rounded-xl shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>CLAIM YOUR LUXURY SINK — ₦115,000</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>

          <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-gray-500 font-bold">
            <span className="flex items-center gap-1 text-emerald-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% Payment on Delivery
            </span>
            <span>·</span>
            <span className="text-[#111827]">Free Delivery to All States</span>
            <span>·</span>
            <span className="text-[#DC2626]">Save ₦15,000 Today</span>
          </div>
        </div>

      </div>
    </section>
  );
};
