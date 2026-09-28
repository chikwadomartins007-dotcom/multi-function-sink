import React, { useState } from 'react';
import { FAQ_LIST, SUPPORT_PHONE } from '../data/productData';
import { ChevronDown, ChevronUp, HelpCircle, Phone } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-16 sm:py-20 bg-white border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="text-xs font-bold text-[#DC2626] uppercase tracking-widest mb-1.5 flex items-center justify-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-[#DC2626]" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#111827] tracking-tight">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="mt-2 text-sm text-[#111827] font-medium">
            Clear answers about pricing, payment on delivery, specifications, and fulfillment.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {FAQ_LIST.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden transition-colors shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-[#111827] text-sm sm:text-base">
                    {faq.question}
                  </span>
                  <div className="p-1 rounded-md bg-gray-100 text-[#111827] shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-[#DC2626]" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-[#111827] leading-relaxed border-t border-gray-100 pt-3 font-normal">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-10 p-5 rounded-xl bg-white border-2 border-gray-200 text-center flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm shadow-xs">
          <span className="text-[#111827] font-bold">
            Have a different question not listed here?
          </span>
          <a
            href={`tel:${SUPPORT_PHONE}`}
            className="text-[#DC2626] font-black hover:underline flex items-center gap-1.5"
          >
            <Phone className="w-4 h-4 text-[#DC2626]" />
            <span>Call Customer Support: {SUPPORT_PHONE}</span>
          </a>
        </div>

      </div>
    </section>
  );
};
