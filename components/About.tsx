import React from 'react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-stream-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
             <h2 className="text-sm font-bold text-stream-green uppercase tracking-widest mb-3">Our Vision</h2>
             <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
               The #1 Streaming Platform turning entertainment into income.
             </h3>
             <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
               <p>
                 Stream Africa is built on one powerful vision: to turn the act of <strong>streaming</strong> into income for everyday Africans and digital creators around the world.
               </p>
               <p>
                 Through strategic partnerships with record labels, movie studios, and content distribution companies, we create a <strong>streaming ecosystem</strong> where people don’t just watch, listen, or engage — they collaborate and earn from it.
               </p>
               <p>
                 Stream is not just a website. It is the premier <strong>digital streaming platform</strong> where creativity, attention, and community convert into real, sustainable wealth.
               </p>
             </div>
          </div>
          <div className="relative">
             <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent rounded-2xl transform rotate-3"></div>
             <img 
               src="image1.jpg" 
               alt="About Stream Africa" 
               className="relative rounded-2xl shadow-2xl border border-white/10 grayscale hover:grayscale-0 transition-all duration-700"
             />
          </div>
        </div>
      </div>
    </section>
  );
};