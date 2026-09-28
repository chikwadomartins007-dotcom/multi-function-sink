import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, ShieldCheck, Truck, Droplets, CheckCircle, Sparkles } from 'lucide-react';
import { PRODUCT_IMAGES } from '../data/productData';
import { ORIGINAL_SINGLE_PRICE, PROMO_PRICE_1, PROMO_PRICE_2, PROMO_PRICE_3_PLUS, formatNaira } from '../utils/pricing';
import { HeroCountdownBanner } from './HeroCountdownBanner';

interface HeroSectionProps {
  onOrderClick: () => void;
  onExploreGallery: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOrderClick, onExploreGallery }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const heroThumbnails = [
    PRODUCT_IMAGES[0],
    PRODUCT_IMAGES[1],
    PRODUCT_IMAGES[2],
    PRODUCT_IMAGES[3],
  ];

  return (
    <section id="overview" className="relative pt-6 pb-12 lg:pt-10 lg:pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Limited Time Offer Countdown Timer */}
        <HeroCountdownBanner onOrderClick={onOrderClick} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Direct-Response Sales Copy */}
          <div className="lg:col-span-6 flex flex-col space-y-5 text-left">
            {/* Category kicker */}
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#DC2626] uppercase">
              <span>MAX Luxury Bathrooms</span>
              <span aria-hidden="true" className="text-gray-300">·</span>
              <span className="text-[#111827]">All-In-One Kitchen Workstation</span>
              <span aria-hidden="true" className="text-gray-300">·</span>
              <span className="text-emerald-700">In Stock</span>
            </div>

            {/* Primary Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#111827] leading-[1.15] text-balance">
              UPGRADE YOUR KITCHEN WITH A <span className="text-[#DC2626]">MULTIFUNCTION LUXURY SINK</span>
            </h1>

            {/* Supporting Headline */}
            <p className="text-base sm:text-lg text-[#111827] font-medium leading-relaxed text-pretty">
              A modern all-in-one kitchen workstation designed to make washing, rinsing, and daily kitchen tasks easier.
            </p>

            {/* Core Offer Box */}
            <div className="bg-white border-2 border-[#DC2626] rounded-xl p-4 sm:p-5 shadow-sm relative overflow-hidden">
              <div className="flex flex-wrap items-baseline gap-3 mb-3">
                <span className="text-xs uppercase tracking-wider text-[#111827] font-bold">Special Promo Price:</span>
                <span className="text-gray-400 line-through text-lg font-medium">
                  {formatNaira(ORIGINAL_SINGLE_PRICE)}
                </span>
                <span className="text-3xl sm:text-4xl font-black text-[#DC2626] tracking-tight tabular-nums">
                  NOW {formatNaira(PROMO_PRICE_1)}
                </span>
                <span className="bg-[#DC2626] text-white text-[11px] font-black px-2 py-0.5 rounded shadow-xs">
                  SAVE ₦15,000
                </span>
              </div>

              {/* Quantity Discounts Banner inside Price Box */}
              <div className="pt-3 border-t border-gray-200">
                <p className="text-xs font-bold text-[#111827] uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#DC2626]" />
                  <span>Buy More & Save More Quantity Discounts:</span>
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white border border-gray-200 rounded-lg p-2.5 flex flex-col justify-between shadow-xs">
                    <span className="text-[#111827] font-semibold">BUY 2 UNITS</span>
                    <span className="text-[#DC2626] font-black text-sm tabular-nums">
                      {formatNaira(PROMO_PRICE_2)} <span className="text-[10px] font-normal text-gray-600">EACH</span>
                    </span>
                    <span className="text-[10px] text-[#111827] font-bold mt-0.5">Save ₦40,000 total</span>
                  </div>
                  <div className="bg-white border-2 border-[#DC2626] rounded-lg p-2.5 flex flex-col justify-between relative overflow-hidden shadow-xs">
                    <div className="absolute top-0 right-0 bg-[#DC2626] text-white font-black text-[9px] px-1.5 rounded-bl">
                      BEST VALUE
                    </div>
                    <span className="text-[#111827] font-semibold">BUY 3+ UNITS</span>
                    <span className="text-[#DC2626] font-black text-sm tabular-nums">
                      {formatNaira(PROMO_PRICE_3_PLUS)} <span className="text-[10px] font-normal text-gray-600">EACH</span>
                    </span>
                    <span className="text-[10px] text-[#111827] font-bold mt-0.5">Save ₦75,000+</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                onClick={onOrderClick}
                className="w-full sm:w-auto bg-[#DC2626] hover:bg-[#b91c1c] text-white font-black text-base py-3.5 px-8 rounded-lg shadow-lg shadow-red-600/25 hover:shadow-red-600/40 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 tracking-wide"
              >
                <ShoppingBag className="w-5 h-5 text-white" />
                <span>ORDER NOW</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={onOrderClick}
                className="w-full sm:w-auto bg-[#111827] hover:bg-black text-white font-bold text-sm py-3.5 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-white" />
                <span>GET YOURS TODAY</span>
              </button>
            </div>

            {/* Trust Markers */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-[#111827] text-xs border-t border-gray-200">
              <div className="flex items-center gap-1.5 font-bold">
                <Truck className="w-4 h-4 text-[#DC2626] shrink-0" />
                <span className="text-[11px] sm:text-xs">Nationwide Delivery</span>
              </div>
              <div className="flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-4 h-4 text-[#DC2626] shrink-0" />
                <span className="text-[11px] sm:text-xs">Pay on Delivery</span>
              </div>
              <div className="flex items-center gap-1.5 font-bold">
                <CheckCircle className="w-4 h-4 text-[#DC2626] shrink-0" />
                <span className="text-[11px] sm:text-xs">Phone Support</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Product Image Display */}
          <div className="lg:col-span-6 flex flex-col space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-xl aspect-[4/3] group">
              {/* Product Badge */}
              <div className="absolute top-3 left-3 z-10 bg-white/95 backdrop-blur-md border border-gray-200 text-[#111827] text-xs font-bold px-3 py-1 rounded shadow-sm flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-[#DC2626]" />
                <span>Waterfall Rainfall Feature</span>
              </div>

              <div className="absolute top-3 right-3 z-10 bg-[#111827] text-white text-xs font-black px-2.5 py-1 rounded shadow-sm">
                100% Real Product Photo
              </div>

              <img
                src={heroThumbnails[activeImageIndex].src}
                alt={heroThumbnails[activeImageIndex].alt}
                className="w-full h-full object-cover object-center transition-all duration-300"
                referrerPolicy="no-referrer"
              />

              {/* Bottom caption overlay */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent p-4 pt-10 text-left">
                <h3 className="text-white font-bold text-sm sm:text-base">
                  {heroThumbnails[activeImageIndex].title}
                </h3>
                <p className="text-xs text-gray-200 mt-0.5 line-clamp-1">
                  {heroThumbnails[activeImageIndex].caption}
                </p>
              </div>
            </div>

            {/* Thumbnail switcher */}
            <div className="grid grid-cols-4 gap-2.5">
              {heroThumbnails.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative rounded-lg overflow-hidden border-2 transition-all aspect-[4/3] bg-white ${
                    activeImageIndex === idx
                      ? 'border-[#DC2626] scale-[1.02] shadow-md ring-2 ring-red-500/20'
                      : 'border-gray-200 hover:border-gray-400 opacity-80 hover:opacity-100'
                  }`}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>

            <p className="text-center text-xs text-[#111827] font-semibold">
              Tap any thumbnail to preview features · Integrated waterfall outlet, pull-down faucet, cup washer & workstation accessories.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
