import React, { useState } from 'react';
import { Phone, Menu, X, ShoppingBag } from 'lucide-react';
import { SUPPORT_PHONE } from '../data/productData';

interface NavbarProps {
  onOrderClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOrderClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-[39px] z-30 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand wordmark */}
        <a
          href="#"
          className="text-base sm:text-xl font-black tracking-wider text-[#111827] uppercase flex items-center gap-1.5 group"
        >
          <span className="text-[#DC2626] group-hover:opacity-90 transition-opacity">
            MAX
          </span>
          <span className="text-[#111827] font-extrabold text-xs sm:text-sm tracking-widest border-l border-gray-300 pl-2">
            LUXURY BATHROOMS
          </span>
        </a>

        {/* Nav links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-[#111827]">
          <a
            href="#overview"
            className="hover:text-[#DC2626] transition-colors py-1"
          >
            Overview
          </a>
          <a
            href="#gallery"
            className="hover:text-[#DC2626] transition-colors py-1"
          >
            Gallery
          </a>
          <a
            href="#benefits"
            className="hover:text-[#DC2626] transition-colors py-1"
          >
            Benefits
          </a>
          <a
            href="#how-it-works"
            className="hover:text-[#DC2626] transition-colors py-1"
          >
            How It Works
          </a>
          <a
            href="#compare"
            className="hover:text-[#DC2626] transition-colors py-1 flex items-center gap-1"
          >
            <span>Compare</span>
            <span className="text-[10px] bg-red-100 text-[#DC2626] font-extrabold px-1.5 py-0.2 rounded">VS</span>
          </a>
          <a
            href="#pricing"
            className="hover:text-[#DC2626] transition-colors py-1"
          >
            Pricing & Savings
          </a>
          <a
            href="#faq"
            className="hover:text-[#DC2626] transition-colors py-1"
          >
            FAQ
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <a
            href={`tel:${SUPPORT_PHONE}`}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#111827] hover:text-[#DC2626] font-bold transition-colors px-3 py-1.5 rounded border border-gray-300 hover:border-[#DC2626]"
            title="Call Support"
          >
            <Phone className="w-3.5 h-3.5 text-[#DC2626]" />
            <span>{SUPPORT_PHONE}</span>
          </a>

          <button
            onClick={onOrderClick}
            className="bg-[#DC2626] hover:bg-[#b91c1c] text-white font-black px-4 py-2 rounded text-xs sm:text-sm tracking-wide shadow-md shadow-red-600/20 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-95"
          >
            <ShoppingBag className="w-4 h-4 text-white" />
            <span>ORDER NOW</span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded text-[#111827] hover:text-[#DC2626] hover:bg-gray-100 border border-gray-200"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#111827]" /> : <Menu className="w-5 h-5 text-[#111827]" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-5 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-2 text-sm font-bold text-[#111827]">
            <button
              onClick={() => handleNavClick('#overview')}
              className="text-left py-2 px-3 rounded hover:bg-red-50 hover:text-[#DC2626]"
            >
              Overview
            </button>
            <button
              onClick={() => handleNavClick('#gallery')}
              className="text-left py-2 px-3 rounded hover:bg-red-50 hover:text-[#DC2626]"
            >
              Product Gallery
            </button>
            <button
              onClick={() => handleNavClick('#benefits')}
              className="text-left py-2 px-3 rounded hover:bg-red-50 hover:text-[#DC2626]"
            >
              Why You Need This Sink
            </button>
            <button
              onClick={() => handleNavClick('#how-it-works')}
              className="text-left py-2 px-3 rounded hover:bg-red-50 hover:text-[#DC2626]"
            >
              How It Works
            </button>
            <button
              onClick={() => handleNavClick('#compare')}
              className="text-left py-2 px-3 rounded hover:bg-red-50 hover:text-[#DC2626] font-black text-[#DC2626]"
            >
              Luxury Sink vs Standard Sink
            </button>
            <button
              onClick={() => handleNavClick('#pricing')}
              className="text-left py-2 px-3 rounded hover:bg-red-50 hover:text-[#DC2626]"
            >
              Pricing & Quantity Discounts
            </button>
            <button
              onClick={() => handleNavClick('#faq')}
              className="text-left py-2 px-3 rounded hover:bg-red-50 hover:text-[#DC2626]"
            >
              Frequently Asked Questions
            </button>
          </div>

          <div className="pt-2 border-t border-gray-200 flex items-center justify-between text-xs text-[#111827]">
            <span>Customer Support:</span>
            <a
              href={`tel:${SUPPORT_PHONE}`}
              className="text-[#DC2626] font-bold flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5" />
              {SUPPORT_PHONE}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
