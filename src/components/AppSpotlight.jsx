import React from 'react';

const AppSpotlight = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Foundation Finder: Modern Glassmorphism Card */}
        <div className="lg:col-span-7 group relative overflow-hidden rounded-[2.5rem] bg-gray-900 shadow-2xl cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
          <img 
            src="https://i.pinimg.com/736x/68/82/b8/6882b8f9aa5ee523439f40cab364e32e.jpg" 
            alt="Foundation Finder Tool" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          
          <div className="absolute bottom-0 left-0 w-full p-8 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
            <p className="text-pink-400 font-bold tracking-[0.2em] text-xs uppercase mb-2">Beauty Tech</p>
            <h2 className="text-white text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
              Find Your <br/> Perfect Shade
            </h2>
            <button className="bg-white text-black px-8 py-3 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-pink-500 hover:text-white transition-colors">
              Try It Now
            </button>
          </div>
        </div>

        {/* App Section: Minimalist & Clean */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-[#fff5f7] rounded-[2.5rem] p-10 relative overflow-hidden shadow-inner">
          {/* Subtle Background Pattern */}
          <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-pink-200/30 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <h3 className="text-gray-400 font-bold tracking-widest text-xs uppercase mb-6">Shop on the go</h3>
            <h2 className="text-gray-900 text-3xl font-extrabold leading-tight mb-4">
              The Beauty World <br/> In Your Pocket
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-8 max-w-[280px]">
              The Purplle BFF APP is now fully loaded with exclusive deals and AI beauty tools.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <a href="#playstore" className="transition-transform hover:scale-105 active:scale-95">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" className="h-10" alt="Get it on Google Play" />
              </a>
              <a href="#appstore" className="transition-transform hover:scale-105 active:scale-95">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" className="h-10" alt="Download on the App Store" />
              </a>
            </div>
          </div>

      
         
        </div>

      </div>
    </div>
  );
};

export default AppSpotlight;