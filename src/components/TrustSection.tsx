import React from 'react';
import { ShieldCheck, Truck, Phone, Award, Lock } from 'lucide-react';
import { SUPPORT_PHONE } from '../data/productData';

export const TrustSection: React.FC = () => {
  const trustPoints = [
    {
      icon: <Award className="w-6 h-6 text-[#DC2626]" />,
      title: 'QUALITY HOME PRODUCTS',
      description: 'Tested multifunction workstations crafted for durable everyday kitchen utility.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#DC2626]" />,
      title: 'PAYMENT ON DELIVERY',
      description: 'Order online with zero risk. Inspect your delivered item on arrival before paying.',
    },
    {
      icon: <Phone className="w-6 h-6 text-[#DC2626]" />,
      title: 'CUSTOMER ORDER SUPPORT',
      description: `Direct telephone and WhatsApp support at ${SUPPORT_PHONE} to answer all your questions.`,
    },
    {
      icon: <Lock className="w-6 h-6 text-[#DC2626]" />,
      title: 'SECURE ORDER FORM',
      description: 'Your contact and delivery information is handled securely and privately for dispatch only.',
    },
    {
      icon: <Truck className="w-6 h-6 text-[#DC2626]" />,
      title: 'DELIVERY TO MANY LOCATIONS',
      description: 'Reliable logistics connections delivering to verified residential and commercial addresses in Nigeria.',
    },
  ];

  return (
    <section className="py-14 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <div className="text-xs font-bold text-[#DC2626] uppercase tracking-widest mb-1.5">
            Why Buy With Confidence
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#111827]">
            TRUSTED LUXURY HOME IMPROVEMENT
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {trustPoints.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border-2 border-gray-200 rounded-xl p-5 text-center flex flex-col items-center justify-start group hover:border-[#DC2626] transition-colors shadow-xs"
            >
              <div className="p-3 rounded-full bg-red-50 border border-red-100 mb-3 group-hover:scale-105 transition-transform">
                {item.icon}
              </div>
              <h3 className="font-black text-[#111827] text-xs sm:text-sm uppercase tracking-wide mb-1.5">
                {item.title}
              </h3>
              <p className="text-xs text-[#111827] leading-relaxed font-normal">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
