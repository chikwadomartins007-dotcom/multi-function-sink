import React, { useState, useEffect } from 'react';
import { Clock, Flame, ShieldAlert, ArrowRight, Sparkles } from 'lucide-react';

interface HeroCountdownBannerProps {
  onOrderClick: () => void;
}

const COUNTDOWN_STORAGE_KEY = 'max_luxury_sink_countdown_target';
// 2 hours, 48 minutes, 35 seconds of persistent urgency
const DEFAULT_DURATION_SECONDS = 2 * 3600 + 48 * 60 + 35;

function getSessionTargetTime(): number {
  if (typeof window === 'undefined') {
    return Date.now() + DEFAULT_DURATION_SECONDS * 1000;
  }

  try {
    const saved = sessionStorage.getItem(COUNTDOWN_STORAGE_KEY);
    if (saved) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed) && parsed > Date.now()) {
        return parsed;
      }
    }

    const newTarget = Date.now() + DEFAULT_DURATION_SECONDS * 1000;
    sessionStorage.setItem(COUNTDOWN_STORAGE_KEY, newTarget.toString());
    return newTarget;
  } catch (e) {
    return Date.now() + DEFAULT_DURATION_SECONDS * 1000;
  }
}

export const HeroCountdownBanner: React.FC<HeroCountdownBannerProps> = ({ onOrderClick }) => {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  }>({ hours: 2, minutes: 48, seconds: 35 });

  useEffect(() => {
    const targetTime = getSessionTargetTime();

    const updateTimer = () => {
      const now = Date.now();
      const diff = Math.max(0, targetTime - now);

      if (diff <= 0) {
        // Reset for another short interval to prevent negative values
        const refreshed = Date.now() + 45 * 60 * 1000; // 45 minutes
        try {
          sessionStorage.setItem(COUNTDOWN_STORAGE_KEY, refreshed.toString());
        } catch (e) {}
        setTimeLeft({ hours: 0, minutes: 45, seconds: 0 });
        return;
      }

      const totalSeconds = Math.floor(diff / 1000);
      const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimeLeft({ hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="w-full bg-white border-2 border-[#DC2626] rounded-xl sm:rounded-2xl p-3.5 sm:p-4 mb-6 shadow-md transition-all">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
        
        {/* Left: Urgency & Scarcity Description */}
        <div className="flex items-center gap-3 text-left w-full md:w-auto">
          <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center shrink-0">
            <Flame className="w-5 h-5 text-[#DC2626] animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-[#DC2626] bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] animate-ping" />
                Limited Time Promo
              </span>
              <span className="text-[11px] font-bold text-gray-500 hidden sm:inline">
                Price reverts to ₦130,000 when timer ends
              </span>
            </div>

            <p className="text-xs sm:text-sm font-black text-[#111827] mt-0.5">
              TODAY'S SPECIAL OFFER: <span className="text-[#DC2626]">SAVE ₦15,000</span> + FREE NATIONWIDE DELIVERY
            </p>
          </div>
        </div>

        {/* Right: Live Countdown Display & Claim CTA */}
        <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-gray-100">
          
          {/* Digits Display */}
          <div className="flex items-center gap-1.5">
            <div className="text-center">
              <div className="bg-[#111827] text-white font-black text-sm sm:text-base px-2 py-1 rounded-md min-w-[34px] tabular-nums shadow-xs">
                {formatNumber(timeLeft.hours)}
              </div>
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter block mt-0.5">
                HRS
              </span>
            </div>

            <span className="text-[#DC2626] font-black text-sm -mt-3.5">:</span>

            <div className="text-center">
              <div className="bg-[#111827] text-white font-black text-sm sm:text-base px-2 py-1 rounded-md min-w-[34px] tabular-nums shadow-xs">
                {formatNumber(timeLeft.minutes)}
              </div>
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter block mt-0.5">
                MIN
              </span>
            </div>

            <span className="text-[#DC2626] font-black text-sm -mt-3.5">:</span>

            <div className="text-center">
              <div className="bg-[#DC2626] text-white font-black text-sm sm:text-base px-2 py-1 rounded-md min-w-[34px] tabular-nums shadow-xs">
                {formatNumber(timeLeft.seconds)}
              </div>
              <span className="text-[9px] font-bold text-[#DC2626] uppercase tracking-tighter block mt-0.5">
                SEC
              </span>
            </div>
          </div>

          {/* Quick Claim Button */}
          <button
            onClick={onOrderClick}
            type="button"
            className="bg-[#DC2626] hover:bg-[#b91c1c] text-white text-xs font-black px-3.5 py-2 rounded-lg shadow-sm transition-all flex items-center gap-1 cursor-pointer active:scale-95 shrink-0"
          >
            <span>Claim Discount</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>

      {/* Progress Tracker (Scarcity) */}
      <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] gap-2">
        <div className="flex items-center gap-1.5 text-gray-600 font-semibold">
          <Clock className="w-3 h-3 text-[#DC2626]" />
          <span>Offer reserved for this session only</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-20 sm:w-28 bg-gray-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-[#DC2626] h-full w-[84%] rounded-full" />
          </div>
          <span className="text-[10px] font-black text-[#DC2626]">84% Claimed</span>
        </div>
      </div>
    </div>
  );
};
