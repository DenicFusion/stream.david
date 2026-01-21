import React from 'react';
import { FeatureProps } from '../types';

const FeatureCard: React.FC<FeatureProps> = ({ title, description, price, icon, image, reverse }) => {
  return (
    // Note on Flex Logic: 
    // - flex-col: Stacks vertically. Since text block is 1st in HTML now, Text is Top, Image is Bottom on Mobile.
    // - lg:flex-row: Text Left, Image Right.
    // - lg:flex-row-reverse: Text Right, Image Left.
    <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16 py-20 border-b border-white/5 last:border-0`}>
      
      {/* TEXT BLOCK - Placed First for Mobile Priority */}
      <div className="w-full lg:w-1/2 space-y-6">
        <div className="w-14 h-14 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20 mb-4">
          {icon}
        </div>
        <h3 className="text-3xl font-bold text-white tracking-tight">{title}</h3>
        {price && (
          <div className="inline-flex items-center px-4 py-2 rounded-md bg-white/5 border border-white/10 text-emerald-400 font-mono font-medium">
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
  const features: FeatureProps[] = [
    {
      title: "Audio Collaboration",
      price: "$1.5 (₦1,550)",
      description: "Audio Collab allows Streamers to collaborate directly with artists, record labels, and music distributors by engaging with official audio content. Instead of passively listening, you generate revenue. Stream promoted songs, participate in engagement activities tied to music releases, and support artists' growth campaigns. Every interaction is backed by real brand partnerships, making your time a valuable asset.",
      image: "image2.jpg",
      icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
    },
    {
      title: "Video Collaboration",
      price: "$2.7 (₦2,750)",
      description: "Connect directly with movie studios, production houses, and global distributors. This feature enables collaboration on official video content including movie trailers, film promos, brand videos, and campaign reels. Participants aid in distribution and promotion, allowing brands to reach wider audiences. Stream transforms the simple act of viewing into a powerful, high-value income channel.",
      image: "image3.jpg",
      reverse: true,
      icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    },
    {
      title: "Visual & Design Collab",
      price: "$1.1 (₦1,100)",
      description: "The visual economy on Stream allows users to collaborate with artists, record labels, and design firms. By engaging with official visuals such as artworks, posters, illustrations, and campaign creatives, you support brand visibility. Every interaction rewards you financially, effectively converting your attention and aesthetic engagement into currency.",
      image: "image4.jpg",
      icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
    },
    {
      title: "Digital Asset Downloads",
      price: "$1 (₦1,000)",
      description: "A robust system allowing Streamers to earn by supporting creators and brands through content downloads. This includes music files, documents, creative resources, and promotional materials. Each download assists content owners in expanding their reach and distribution network. On Stream, even the simplest digital action is monetized.",
      image: "image5.jpg",
      reverse: true,
      icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
    },
    {
      title: "Livestream Ecosystem",
      description: "Revolutionizing the livestreaming model. On most platforms, only the host benefits. On Stream, the host, co-streamers, and active viewers all earn. By joining sessions hosted by verified partners and studios, your presence and engagement generate direct profit. Livestreaming is no longer just entertainment; it is a collaborative income stream.",
      image: "image6.jpg",
      icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
    },
    {
      title: "TikTok Creators Network",
      description: "The TCN allows creators of all sizes to earn steady monthly income by creating content about Stream on TikTok. Rewards are based on consistency and output, with guaranteed monthly pay and bonuses for viral content. All submissions are managed via the dashboard, ensuring a professional and reliable earning process.",
      image: "image7.jpg",
      reverse: true,
      icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" /></svg>
    },
    {
      title: "WishHub Rewards",
      description: "WishHub converts your platform earnings into real-world rewards. Through Wish Vouchers, users can acquire physical items, services, and exclusive products simply by participating in the ecosystem. It is a motivation system built directly into the platform, ensuring your effort results in tangible value.",
      image: "image8.jpg",
      icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>
    },
    {
      title: "Stream Bazaar Marketplace",
      description: "Your personal digital marketplace integrated within the platform. Users can sell products, offer professional services, upload digital items, and promote business offers. This feature allows you to build a dedicated business channel, growing trust and revenue within the community.",
      image: "image9.jpg",
      reverse: true,
      icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
    },
    {
      title: "Professional Skill Development",
      description: "The learning hub for modern digital professionals. Gain practical, high-income skills such as Social Media Management, Copywriting, UI/UX Design, and App Development. The unique advantage is the ability to learn while simultaneously earning from other Stream features.",
      image: "image10.jpg",
      icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" /></svg>
    }
  ];

  return (
    <section id="features" className="py-24 bg-stream-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-extrabold text-white mb-6">Earning Ecosystem</h2>
          <div className="w-24 h-1 bg-stream-green mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            A comprehensive suite of tools designed to monetize digital engagement through multiple high-value streams.
          </p>
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