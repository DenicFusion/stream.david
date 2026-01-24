import React from 'react';
import { THEME_COLOR } from '../config';

export const Verification: React.FC = () => {
  const isBlue = THEME_COLOR === 'BLUE';

  return (
    <section className="relative py-24 border-y border-white/10 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="cac.jpg" 
          alt="CAC Registration Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${isBlue ? 'bg-sky-500/10 border-sky-500/20' : 'bg-emerald-500/10 border-emerald-500/20'} mb-6 border backdrop-blur-md`}>
          <svg className={`w-8 h-8 ${isBlue ? 'text-sky-400' : 'text-emerald-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Officially Registered & Verified</h2>
        <p className="text-gray-200 text-lg leading-relaxed max-w-2xl mx-auto mb-8 font-medium">
          STREAM AFRICA is fully registered and certified with the Corporate Affairs Commission (CAC) of Nigeria (BN 9093054). We operate with transparency, responsibility, and integrity.
        </p>
        <div className={`inline-block px-6 py-3 border ${isBlue ? 'border-sky-500/30 bg-sky-900/30' : 'border-emerald-500/30 bg-emerald-900/30'} rounded-lg backdrop-blur-md`}>
          <span className={`${isBlue ? 'text-sky-300' : 'text-emerald-400'} font-bold tracking-wide uppercase text-sm`}>The Brand You Can Trust 💎</span>
        </div>
      </div>
    </section>
  );
};