import React from 'react';
import { MessageCircle } from 'lucide-react';
import { SUPPORT_WHATSAPP_LINK } from '../data/productData';

export const WhatsAppFloatingButton: React.FC = () => {
  return (
    <a
      href={SUPPORT_WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 sm:p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group active:scale-95"
      aria-label="Chat with MAX Luxury Bathrooms on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 fill-white" />
      <span className="hidden sm:inline-block max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 text-xs font-bold pl-0 group-hover:pl-2">
        Chat with Support
      </span>
    </a>
  );
};
