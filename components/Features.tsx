import React from 'react';
import { FeatureProps } from '../types';
import { THEME_COLOR } from '../config';

const FeatureCard: React.FC<FeatureProps> = ({ title, description, price, icon, image, reverse }) => {
  const isBlue = THEME_COLOR === 'BLUE';
  
  // Updated Colors: Using Teal/Cyan for "Blue" theme to match Deep Teal bg
  const iconBg = isBlue ? 'bg-teal-500/10 text-teal-400 border-teal-500/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
  const priceTag = isBlue ? 'text-cyan-300 border-cyan-500/30 bg-cyan-500/10' : 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';

  return (
    <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16 py-20 border-b border-white/5 last:border-0`}>
      
      {/* TEXT BLOCK */}
      <div className="w-full lg:w-1/2 space-y-6">
        <div className={`w-14 h-14 rounded-lg ${iconBg} flex items-center justify-center border mb-4`}>
          {icon}
        </div>
        <h3 className="text-3xl font-bold text-white tracking-tight">{title}</h3>
        {price && (
          <div className={`inline-flex items-center px-4 py-2 rounded-md border ${priceTag} font-mono font-medium`}>
            <span className="mr-2">Potential Earnings:</span>
            <span className="text-white font-bold">{price}</span>
          </div>
        )}
        <div className="text-gray-400 text-lg leading-relaxed text-justify">
          {description}
        </div>
      </div>

      {/* IMAGE BLOCK */}
      <div className="w-full lg:w-1/2">
        <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10 group">
          <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-transparent transition-all duration-500 z-10"></div>
          <img 
            src={image || "https://picsum.photos/600/400"} 
            alt={title} 
            className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" 
          />
        </div>
      </div>

    </div>
  );
};

export const Features: React.FC = () => {
  const isBlue = THEME_COLOR === 'BLUE';
  const features: FeatureProps[] = [
    {
      title: "Audio Collaboration",
      price: "$1.5 (₦1,550)",
      description: "Audio Collab allows Streamers to collaborate directly with artists, record labels, and music distributors by engaging with official audio content. Instead of passively listening, you generate revenue. Stream promoted songs, participate in engagement activities tied to music releases, and support artists' growth campaigns.",
      image: "image2.jpg",
      icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
    },
    {
      title: "Video Collaboration",
      price: "$2.7 (₦2,750)",
      description: "Connect directly with movie studios, production houses, and global distributors. This feature enables collaboration on official video content including movie trailers, film promos, brand videos, and campaign reels. Stream transforms the simple act of viewing into a powerful, high-value income channel.",
      image: "image3.jpg",
      reverse: true,
      icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    },
    {
      title: "Visual & Design Collab",
      price: "$1.1 (₦1,100)",
      description: "The visual economy on Stream allows users to collaborate with artists, record labels, and design firms. By engaging with official visuals such as artworks, posters, illustrations, and campaign creatives, you support brand visibility and earn financially.",
      image: "image4.jpg",
      icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
    },
    {
      title: "Digital Asset Downloads",
      price: "$1 (₦1,000)",
      description: "A robust system allowing Streamers to earn by supporting creators and brands through content downloads. This includes music files, documents, creative resources, and promotional materials. On Stream, even the simplest digital action is monetized.",
      image: "image5.jpg",
      reverse: true,
      icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
    },
    {
      title: "Livestream Ecosystem",
      description: "Revolutionizing the livestreaming model. On Stream, the host, co-streamers, and active viewers all earn. By joining sessions hosted by verified partners and studios, your presence generates direct profit.",
      image: "image6.jpg",
      icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
    },
    {
      title: "TikTok Creators Network",
      description: "The TCN allows creators of all sizes to earn steady monthly income by creating content about Stream on TikTok. Rewards are based on consistency and output, with guaranteed monthly pay.",
      image: "image7.jpg",
      reverse: true,
      icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" /></svg>
    }
  ];

  return (
    <section id="features" className="py-24 bg-stream-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white mb-6">Earning Ecosystem</h2>
          <div className={`w-24 h-1 ${isBlue ? 'bg-teal-500' : 'bg-stream-green'} mx-auto rounded-full mb-6`}></div>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            A comprehensive suite of tools designed to monetize digital engagement through multiple high-value streams.
          </p>
        </div>

        {/* Access Fee & Benefits Card - Resized to Medium (max-w-3xl) */}
        <div className="mb-24 relative z-10 max-w-3xl mx-auto">
          {/* Updated Gradient to match Deep Teal/Cyan */}
          <div className={`rounded-3xl p-0.5 bg-gradient-to-r ${isBlue ? 'from-teal-600 to-cyan-600' : 'from-stream-green to-emerald-600'} shadow-2xl`}>
            <div className="bg-[#0f2e2e] rounded-[1.4rem] p-6 md:p-8 grid md:grid-cols-2 gap-8 items-center border border-white/5">
              
              {/* Access Fee Section */}
              <div className="text-center md:text-left space-y-3">
                <div className={`inline-block px-3 py-1 rounded-full border ${isBlue ? 'border-cyan-500/30 bg-cyan-900/30 text-cyan-300' : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'} text-xs font-bold uppercase tracking-widest`}>
                  Membership Pass
                </div>
                <div>
                    <h3 className="text-gray-400 font-medium text-xs uppercase tracking-wider mb-1">One-Time Access Fee</h3>
                    <div className="flex items-baseline justify-center md:justify-start gap-2">
                        <span className="text-4xl md:text-5xl font-extrabold text-white">₦12,000</span>
                        <span className="text-lg text-gray-500 font-medium">/ Lifetime</span>
                    </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed font-medium">
                   Unlock full access to the streaming ecosystem!!!
                </p>
              </div>

              {/* Benefits List */}
              <div className={`border-t md:border-t-0 md:border-l ${isBlue ? 'border-teal-500/20' : 'border-emerald-500/20'} pt-6 md:pt-0 md:pl-8`}>
                <h3 className="text-white font-bold text-base mb-4">What You Get</h3>
                <ul className="space-y-3">
                  {[
                    "Lifetime Platform Access",
                    "Unlock All Income Channels",
                    "Daily & Weekly Withdrawals",
                    "Access to Stream Academy",
                    "24/7 Priority Support"
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-gray-300 group">
                       <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center ${isBlue ? 'bg-cyan-500/20 text-cyan-400' : 'bg-emerald-500/20 text-stream-green'}`}>
                         <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                         </svg>
                       </div>
                       <span className="text-sm font-medium group-hover:text-white transition-colors">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};