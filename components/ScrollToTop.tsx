import React, { useState, useEffect } from 'react';
import { THEME_COLOR } from '../config';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const isBlue = THEME_COLOR === 'BLUE';

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 focus:outline-none transform hover:scale-110 active:scale-90 flex items-center justify-center group overflow-hidden ${
            isBlue 
            ? 'bg-gradient-to-br from-teal-500 to-cyan-600 shadow-teal-500/40' 
            : 'bg-gradient-to-br from-stream-green to-emerald-600 shadow-stream-green/40'
          }`}
          aria-label="Scroll to top"
        >
          {/* Subtle Inner Glow */}
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <svg className="w-6 h-6 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </>
  );
};