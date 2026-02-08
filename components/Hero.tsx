import React from 'react';
import { Button } from './Button';
import { THEME_COLOR } from '../config';

export const Hero: React.FC<{ onSignup: () => void }> = ({ onSignup }) => {
  const isBlue = THEME_COLOR === 'BLUE';

  return (
    <div className="relative overflow-hidden bg-stream-dark pt-24 pb-20 sm:pb-32">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#022c22] via-stream-dark to-[#0f172a]"></div>
        <img 
          src="image1.jpg" 
          alt="Background" 
          className="w-full h-full object-cover opacity-10 mix-blend-overlay grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stream-dark via-transparent to-transparent"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-teal-400 mr-3 animate-pulse"></span>
          <span className="text-gray-300 text-sm font-medium tracking-wide uppercase">The Wait Is Over</span>
        </div>
        
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight">
          Life in Motion. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-white">
            Income in Continuous Flow.
          </span>
        </h1>
        
        <p className="mt-2 max-w-2xl text-xl text-gray-300 mb-10 leading-relaxed">
          This is more than a brand. This is the ultimate <strong>streaming platform</strong> redefining the digital economy in 2026. 
          Stream audio, video, and live content to earn. Welcome to the future of <strong>streaming</strong>.
        </p>

        {/* Dynamic Buttons Container */}
        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto items-center justify-center">
          
          {/* Start Earning Now - Dynamic Gradient & Shimmer */}
          <Button 
            onClick={onSignup} 
            className="group relative !rounded-full !px-10 !py-4 text-lg overflow-hidden !bg-white !shadow-none ring-1 ring-white/10 w-auto min-w-[200px]"
          >
            {/* Button Text & Icon - Text is now handled by Button variant (Black) */}
            <span className="relative z-20 flex items-center justify-center gap-2 font-bold">
              Start Streaming Now
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </span>
          </Button>

          {/* Learn More - Dynamic Glassmorphism */}
          <Button 
            variant="outline" 
            onClick={() => document.getElementById('about')?.scrollIntoView({behavior: 'smooth'})} 
            className="!rounded-full !px-10 !py-4 text-lg !border-white/20 !text-white hover:!bg-white/10 hover:!border-white/40 backdrop-blur-md transition-all duration-300 w-auto min-w-[200px]"
          >
            Learn More
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4 w-full max-w-5xl border-t border-white/5 pt-12">
          <div className="text-center group">
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-teal-500/20 transition-colors duration-300">
                <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="text-xl font-bold text-white mb-1">CAC Verified</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">Fully Registered</div>
          </div>
          
          <div className="text-center group">
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-teal-500/20 transition-colors duration-300">
                <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="text-xl font-bold text-white mb-1">Global Access</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">No Borders</div>
          </div>

          <div className="text-center group">
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-teal-500/20 transition-colors duration-300">
                <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="text-xl font-bold text-white mb-1">Daily Flow</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">Continuous Earnings</div>
          </div>

          <div className="text-center group">
             <div className="flex justify-center mb-3">
              <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-teal-500/20 transition-colors duration-300">
                <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
            <div className="text-xl font-bold text-white mb-1">Secure</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">Trusted Platform</div>
          </div>
        </div>
      </div>
    </div>
  );
}