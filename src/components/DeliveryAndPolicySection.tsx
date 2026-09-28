import React, { useState } from 'react';
import { Truck, RotateCcw, FileText, ChevronDown, ChevronUp, Phone } from 'lucide-react';
import { DELIVERY_TERMS, SUPPORT_PHONE } from '../data/productData';

export const DeliveryAndPolicySection: React.FC = () => {
  const [termsExpanded, setTermsExpanded] = useState(false);

  return (
    <section id="delivery-policy" className="py-16 sm:py-20 bg-white border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Delivery Information Box */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-red-50 rounded-xl border border-red-100">
              <Truck className="w-6 h-6 text-[#DC2626]" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#DC2626] uppercase tracking-wider">
                Logistics & Dispatch
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#111827]">
                DELIVERY INFORMATION
              </h3>
            </div>
          </div>

          <div className="space-y-3 text-sm text-[#111827] leading-relaxed font-normal">
            <p>
              We deliver orders to customers across available locations in Nigeria.
            </p>
            <p>
              Delivery time may vary depending on your location and logistics availability. Major transit routes such as Lagos, Abuja, Port Harcourt, Ibadan, and regional capitals generally have dedicated courier connections.
            </p>
            <p>
              A representative may contact you using the phone number provided to confirm your order and delivery details prior to dispatch.
            </p>
          </div>
        </div>

        {/* Two Panels: Delivery Terms & Returns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Delivery Terms & Conditions */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-5 h-5 text-[#DC2626]" />
                  <h4 className="font-black text-[#111827] text-base">
                    DELIVERY TERMS & CONDITIONS
                  </h4>
                </div>
                <button
                  onClick={() => setTermsExpanded(!termsExpanded)}
                  className="text-xs text-[#DC2626] font-black hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>{termsExpanded ? 'Collapse' : 'View All 9'}</span>
                  {termsExpanded ? <ChevronUp className="w-4 h-4 text-[#DC2626]" /> : <ChevronDown className="w-4 h-4 text-[#DC2626]" />}
                </button>
              </div>

              <ul className="space-y-2.5 text-xs text-[#111827] font-normal">
                {DELIVERY_TERMS.slice(0, termsExpanded ? DELIVERY_TERMS.length : 4).map((term, index) => (
                  <li key={index} className="flex items-start gap-2.5">
                    <span className="font-black text-[#DC2626] shrink-0 mt-0.5 tabular-nums">
                      {index + 1}.
                    </span>
                    <span>{term}</span>
                  </li>
                ))}
              </ul>
            </div>

            {!termsExpanded && (
              <button
                onClick={() => setTermsExpanded(true)}
                className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500 hover:text-[#111827] font-bold flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Read all 9 delivery terms</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Returns & Product Issues Policy */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <RotateCcw className="w-5 h-5 text-[#DC2626]" />
                  <h4 className="font-black text-[#111827] text-base">
                    RETURNS & PRODUCT ISSUES
                  </h4>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-[#111827] leading-relaxed font-normal">
                <p>
                  Customers should inspect the product upon delivery.
                </p>
                <p>
                  If the product arrives damaged, incorrect or materially different from what was ordered, contact MAX Luxury Bathrooms as soon as possible with details of the issue.
                </p>
                <p>
                  Returns or replacements are subject to verification of the reported issue and the applicable return conditions.
                </p>
                <p>
                  The product should be returned in an acceptable condition and with relevant accessories where a return is approved.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-[#111827] font-bold">Order issues or inquiries:</span>
              <a
                href={`tel:${SUPPORT_PHONE}`}
                className="text-[#DC2626] font-black hover:underline flex items-center gap-1"
              >
                <Phone className="w-3.5 h-3.5 text-[#DC2626]" />
                {SUPPORT_PHONE}
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
