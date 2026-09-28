import React from 'react';
import { Phone, MessageCircle, MapPin, ShieldCheck, Mail } from 'lucide-react';
import { BRAND_NAME, SUPPORT_PHONE, SUPPORT_EMAIL, SUPPORT_WHATSAPP_LINK } from '../data/productData';

interface FooterProps {
  onOrderClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOrderClick }) => {
  return (
    <footer className="bg-white border-t border-gray-200 text-[#111827] text-xs py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-1.5">
              <span className="text-[#DC2626] font-black text-xl tracking-wider">MAX</span>
              <span className="text-[#111827] font-black text-sm tracking-widest border-l border-gray-300 pl-2">
                LUXURY BATHROOMS
              </span>
            </div>
            
            <p className="text-[#111827] text-xs leading-relaxed max-w-sm font-medium">
              Your premier Nigerian destination for modern kitchen workstations, luxury bathroom fixtures, and contemporary home improvements.
            </p>

            <div className="space-y-1.5 pt-2 text-[#111827] text-[11px] font-medium">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#DC2626] shrink-0 mt-0.5" />
                <span>Shop 4, 2nd Floor Mac Austin Plaza, Freedom Line, Odunade Market Coker, Orile, Lagos State, Nigeria.</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#DC2626] shrink-0" />
                <span className="text-[#111827] font-bold">CAC Registered Nigerian Enterprise (BN: 8158204)</span>
              </div>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-black text-[#111827] uppercase tracking-wider text-xs">
              Quick Navigation
            </h4>
            <ul className="space-y-2 font-bold">
              <li>
                <a href="#overview" className="hover:text-[#DC2626] transition-colors">
                  Home / Overview
                </a>
              </li>
              <li>
                <button
                  onClick={onOrderClick}
                  className="hover:text-[#DC2626] transition-colors text-left cursor-pointer"
                >
                  Order Now (Pay on Delivery)
                </button>
              </li>
              <li>
                <a href="#delivery-policy" className="hover:text-[#DC2626] transition-colors">
                  Delivery Policy
                </a>
              </li>
              <li>
                <a href="#delivery-policy" className="hover:text-[#DC2626] transition-colors">
                  Return Policy & Issues
                </a>
              </li>
              <li>
                <a href="#delivery-policy" className="hover:text-[#DC2626] transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#DC2626] transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Support & Contact (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-black text-[#111827] uppercase tracking-wider text-xs">
              Product & Order Support
            </h4>
            <p className="text-[#111827] font-medium">
              Need assistance with an existing order or have product questions?
            </p>

            <div className="pt-2 space-y-2 font-bold">
              <a
                href={`tel:${SUPPORT_PHONE}`}
                className="flex items-center gap-2 text-[#111827] hover:text-[#DC2626] transition-colors text-sm"
              >
                <Phone className="w-4 h-4 text-[#DC2626]" />
                <span>Call Us: {SUPPORT_PHONE}</span>
              </a>

              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="flex items-center gap-2 text-[#111827] hover:text-[#DC2626] transition-colors text-xs sm:text-sm"
              >
                <Mail className="w-4 h-4 text-[#DC2626]" />
                <span>Email: {SUPPORT_EMAIL}</span>
              </a>

              <a
                href={SUPPORT_WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#111827] font-bold hover:text-[#DC2626] transition-colors text-sm"
              >
                <MessageCircle className="w-4 h-4 text-[#DC2626]" />
                <span>WhatsApp: {SUPPORT_PHONE}</span>
              </a>
            </div>

            <div className="pt-2">
              <span className="text-[11px] text-gray-500 block font-medium">
                Support Hours: Mon – Sat (8:00 AM – 7:00 PM)
              </span>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#111827] font-semibold">
          <p>
            © {new Date().getFullYear()} MAX Luxury Bathrooms. All rights reserved.
          </p>

          <p className="flex items-center gap-2">
            <span className="text-[#111827] font-bold">Payment on Delivery</span>
            <span>·</span>
            <span>Nationwide Logistics</span>
            <span>·</span>
            <span className="text-[#DC2626] font-black">Verified Customer Support</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
