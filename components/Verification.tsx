import React from 'react';
import { THEME_COLOR } from '../config';

export const Verification: React.FC = () => {
  const isBlue = THEME_COLOR === 'BLUE';

  return (
    <section className="relative py-24 border-y border-white/10 overflow-hidden">
      {/* Background Image with Reduced Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="cac.jpg" 
          alt="CAC Registration Background" 
          className="w-full h-full object-cover"
        />
        {/* Removed backdrop-blur-sm and reduced opacity to 50% for clear visibility */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${isBlue ? 'bg-sky-500/10 border-sky-500/20' : 'bg-emerald-500/10 border-emerald-500/20'} mb-6 border backdrop-blur-md shadow-2xl`}>
          <svg className={`w-8 h-8 ${isBlue ? 'text-sky-400' : 'text-emerald-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        {/* Text Shadow added for better readability against the clear image */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 drop-shadow-md">Officially Registered & Verified</h2>
        
        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10 max-w-3xl mx-auto">
             <p className="text-gray-100 text-lg leading-relaxed font-medium">
            STREAM AFRICA is fully registered and certified with the Corporate Affairs Commission (CAC) of Nigeria (BN 9093054). We operate with transparency, responsibility, and integrity.
            </p>
        </div>

        <div className={`mt-8 inline-block px-6 py-3 border ${isBlue ? 'border-sky-500/30 bg-sky-900/60' : 'border-emerald-500/30 bg-emerald-900/60'} rounded-lg backdrop-blur-md shadow-lg`}>
          <span className={`${isBlue ? 'text-sky-300' : 'text-emerald-400'} font-bold tracking-wide uppercase text-sm`}>The Brand You Can Trust 💎</span>
        </div>
      </div>
    </section>
  );
};