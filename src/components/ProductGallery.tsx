import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X, Check, Sparkles, Flame, ShoppingBag } from 'lucide-react';
import { PRODUCT_IMAGES } from '../data/productData';

interface ProductGalleryProps {
  onOrderClick: () => void;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ onOrderClick }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const currentImage = PRODUCT_IMAGES[selectedIndex];

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? PRODUCT_IMAGES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === PRODUCT_IMAGES.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="gallery" className="py-12 sm:py-16 bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="text-xs font-bold text-[#DC2626] uppercase tracking-widest mb-1.5">
            Photographic Showcase
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#111827] tracking-tight text-balance">
            PRODUCT IMAGE GALLERY & DETAILS
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#111827] font-medium">
            Examine the craftsmanship, integrated waterfall outlet, auxiliary tap, cup rinser, and workstation layout from every perspective.
          </p>
        </div>

        {/* Gallery Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Large Image (8 cols on desktop) */}
          <div className="lg:col-span-8 flex flex-col space-y-3">
            <div className="relative rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-md aspect-[4/3] sm:aspect-[16/10] flex items-center justify-center">
              
              {/* Floating Limited Time Offer Badge */}
              <div
                onClick={onOrderClick}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOrderClick();
                  }
                }}
                role="button"
                tabIndex={0}
                title="Limited Time Offer: Click to claim discount"
                className="absolute top-3 left-3 z-10 bg-white/95 backdrop-blur-md border-2 border-[#DC2626] rounded-xl py-1.5 px-2.5 sm:px-3 shadow-lg shadow-red-600/20 cursor-pointer hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group animate-in fade-in"
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center shrink-0">
                  <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#DC2626] animate-pulse" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#DC2626] flex items-center gap-1">
                      <span>Limited Time Offer</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] animate-ping inline-block" />
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-black text-[#111827] leading-none mt-0.5">
                    <span className="text-[#DC2626]">₦115,000</span>
                    <span className="text-[10px] text-gray-400 line-through">₦130,000</span>
                    <span className="text-[9px] bg-red-100 text-[#DC2626] font-extrabold px-1.5 py-0.5 rounded uppercase">
                      Save ₦15k
                    </span>
                  </div>
                </div>
              </div>

              <img
                src={currentImage.src}
                alt={currentImage.alt}
                className="w-full h-full object-contain bg-white transition-all duration-300"
                referrerPolicy="no-referrer"
              />

              {/* Navigation Arrows */}
              <button
                onClick={handlePrev}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-[#111827]/85 hover:bg-[#111827] text-white p-2.5 rounded-full backdrop-blur-sm border border-neutral-700 transition-all cursor-pointer hover:scale-105"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#111827]/85 hover:bg-[#111827] text-white p-2.5 rounded-full backdrop-blur-sm border border-neutral-700 transition-all cursor-pointer hover:scale-105"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Lightbox Trigger */}
              <button
                onClick={() => setLightboxOpen(true)}
                aria-label="View fullscreen photo"
                className="absolute top-3 right-3 bg-[#111827]/85 hover:bg-[#111827] text-white p-2 rounded-lg backdrop-blur-sm border border-neutral-700 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
              >
                <Maximize2 className="w-4 h-4 text-[#DC2626]" />
                <span className="hidden sm:inline">Zoom</span>
              </button>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 pt-10 text-left pointer-events-none">
                <span className="text-red-400 text-xs font-bold uppercase tracking-wider block">
                  Photo {selectedIndex + 1} of {PRODUCT_IMAGES.length}
                </span>
                <h3 className="text-white font-bold text-base sm:text-lg">
                  {currentImage.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-200 mt-1">
                  {currentImage.caption}
                </p>
              </div>
            </div>

            {/* Mobile Indicators & Action */}
            <div className="flex items-center justify-between text-xs text-[#111827] px-1 font-semibold">
              <span>Use arrows or tap thumbnails below to explore all views</span>
              <button
                onClick={onOrderClick}
                className="text-[#DC2626] hover:underline font-bold"
              >
                Order this sink →
              </button>
            </div>
          </div>

          {/* Thumbnail Strip / Spec Breakdown (4 cols on desktop) */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#111827]">
              Select Angle / Feature:
            </h3>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-2 gap-2.5">
              {PRODUCT_IMAGES.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedIndex(idx)}
                  className={`group relative rounded-xl overflow-hidden border-2 transition-all aspect-[4/3] bg-white text-left ${
                    selectedIndex === idx
                      ? 'border-[#DC2626] ring-2 ring-red-500/30 shadow-md'
                      : 'border-gray-200 hover:border-gray-400 opacity-80 hover:opacity-100'
                  }`}
                >
                  {/* Floating Mini Offer Tag */}
                  <div className="absolute top-1 left-1 z-10 bg-[#DC2626] text-white text-[8px] font-black uppercase tracking-tight px-1.5 py-0.5 rounded shadow-xs flex items-center gap-0.5">
                    <span>SAVE ₦15K</span>
                  </div>

                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-[#111827]/90 px-1.5 py-1 text-[10px] font-semibold text-white truncate">
                    {img.title}
                  </div>
                </button>
              ))}
            </div>

            {/* Workstation Features Quick Checklist */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-4 text-xs space-y-2.5 mt-2 shadow-sm">
              <h4 className="font-black text-[#111827] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#DC2626]" />
                <span>Integrated Sink Features</span>
              </h4>
              <ul className="space-y-2 text-[#111827] font-medium">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                  <span>Waterfall & rainfall spray water outlet</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                  <span>High-arc pull-down kitchen faucet</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                  <span>Dedicated auxiliary filtered faucet</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                  <span>High-pressure cup and glass rinser</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                  <span>Sliding inner basin, colander, and solid chopping board</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                  <span>Modern square drainage with anti-clog basket</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-[#111827]/95 flex flex-col items-center justify-center p-4">
          
          {/* Floating Limited Time Offer Badge in Lightbox */}
          <div
            onClick={() => {
              setLightboxOpen(false);
              onOrderClick();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setLightboxOpen(false);
                onOrderClick();
              }
            }}
            role="button"
            tabIndex={0}
            title="Limited Time Offer: Click to claim discount"
            className="absolute top-4 left-4 z-10 bg-white border-2 border-[#DC2626] rounded-xl py-1.5 px-3 shadow-2xl cursor-pointer hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group"
          >
            <div className="w-6 h-6 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center shrink-0">
              <Flame className="w-3.5 h-3.5 text-[#DC2626] animate-pulse" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#DC2626]">
                  Limited Time Offer
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] animate-ping inline-block" />
              </div>
              <div className="flex items-center gap-1.5 text-xs font-black text-[#111827] leading-none mt-0.5">
                <span className="text-[#DC2626]">₦115,000</span>
                <span className="text-[9px] bg-red-100 text-[#DC2626] font-extrabold px-1 rounded uppercase">
                  Save ₦15k
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 bg-black/80 hover:bg-black text-white p-3 rounded-full border border-gray-700 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-[#DC2626]" />
          </button>

          <div className="max-w-5xl max-h-[80vh] relative">
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              className="max-h-[80vh] max-w-full object-contain mx-auto rounded-lg shadow-2xl bg-white"
              referrerPolicy="no-referrer"
            />
            <div className="text-center mt-4">
              <h4 className="text-white font-bold text-lg">{currentImage.title}</h4>
              <p className="text-gray-200 text-sm max-w-2xl mx-auto">{currentImage.caption}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={handlePrev}
              className="bg-black hover:bg-neutral-800 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <span className="text-gray-300 text-xs">
              {selectedIndex + 1} / {PRODUCT_IMAGES.length}
            </span>
            <button
              onClick={handleNext}
              className="bg-black hover:bg-neutral-800 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-1 cursor-pointer"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
