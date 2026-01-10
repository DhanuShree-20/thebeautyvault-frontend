import React from 'react';
import { useNavigate } from 'react-router-dom';

// Import global components from your project structure
import BrandSlider from '../components/BrandSlider';
import Footer from '../components/Footer';
import HelpSection from '../components/HelpSection';
import HandpickedDeals from '../components/HandpickedDeals';

// --- 1. HERO SECTION (Responsive & High-Glam) ---
const ModernHero = () => {
  return (
    <section className="relative min-h-[80vh] lg:h-[85vh] flex items-center bg-[#f9f8f6] overflow-hidden py-12 lg:py-0">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 items-center gap-12">
        <div className="z-10 order-2 lg:order-1 text-center lg:text-left">
          <span className="inline-block px-4 py-1 mb-6 text-[10px] font-bold tracking-widest uppercase bg-pink-100 text-pink-600 rounded-full">
            New Collection 2026
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-gray-900 leading-tight mb-6">
            Beauty <br className="hidden md:block" /> <span className="italic text-pink-500">Redefined.</span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed">
            Curated skincare and makeup essentials designed to celebrate your natural glow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="bg-gray-900 text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-pink-600 transition duration-300">
              Shop The Drop
            </button>
          </div>
        </div>
        <div className="relative order-1 lg:order-2 h-[40vh] md:h-[60vh] lg:h-[70vh]">
          <img 
            src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2070&auto=format&fit=crop" 
            alt="Beauty Model" 
            className="w-full h-full object-cover rounded-tl-[80px] rounded-br-[80px] shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

// --- 2. BENTO CATEGORY GRID (Unified Transitions) ---
const BentoCategories = () => {
  const navigate = useNavigate();

  // Unified class string for all grid images
  const imageClasses = "w-full h-full object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-110 transition-transform duration-700 ease-in-out";
  const overlayClasses = "absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-6 md:p-8";

  return (
    <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-12">
        <h2 className="text-3xl md:text-4xl font-serif text-gray-900">The Collections</h2>
        <button className="hidden md:block text-gray-900 font-bold border-b-2 border-pink-500 pb-1">View All</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[650px]">
        {/* Skin Care Rituals */}
        <div onClick={() => navigate('/category/skin-care')} className="md:col-span-2 md:row-span-2 relative group cursor-pointer overflow-hidden h-[350px] md:h-auto">
          <img src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800" className={imageClasses} alt="Skin Care" />
          <div className={overlayClasses}>
            <h3 className="text-2xl md:text-3xl text-white font-serif italic">Skin Care Rituals</h3>
          </div>
        </div>

        {/* Artistic Makeup */}
        <div onClick={() => navigate('/category/makeup')} className="md:col-span-2 relative group cursor-pointer overflow-hidden h-[250px] md:h-auto">
          <img src="https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&q=80&w=800" className={imageClasses} alt="Makeup" />
          <div className={overlayClasses}>
            <h3 className="text-xl md:text-2xl text-white font-serif italic">Makeup</h3>
          </div>
        </div>

        {/* Hair Care (Fixed & Unified) */}
        <div onClick={() => navigate('/category/hair-care')} className="relative group cursor-pointer overflow-hidden h-[200px] md:h-auto">
          <img src="https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&q=80&w=600" className={imageClasses} alt="Hair Care" />
          <div className={overlayClasses}>
            <h3 className="text-lg text-white font-serif italic">Hair Care</h3>
          </div>
        </div>

        {/* Bath & Body */}
        <div onClick={() => navigate('/category/body-care')} className="relative group cursor-pointer overflow-hidden h-[200px] md:h-auto">
          <img src="https://images.unsplash.com/photo-1552046122-03184de85e08?auto=format&fit=crop&q=80&w=800" className={imageClasses} alt="Body" />
          <div className={overlayClasses}>
            <h3 className="text-lg text-white font-serif italic">Bath & Body</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- 3. EDITOR'S CHOICE ---
const EditorsChoice = () => {
  return (
    <section className="py-20 md:py-24 bg-[#1a1a1a] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-16 items-center">
          <div className="lg:col-span-1 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">The <br/>Editor's <br/>Choice</h2>
            <p className="text-gray-400 mb-8">This month's essentials for a radiant barrier.</p>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-white/5 p-8 border border-white/10 hover:border-pink-500 transition-all cursor-pointer">
              <span className="text-pink-500 font-bold mb-4 block text-xs tracking-widest uppercase">01 / HYDRATION</span>
              <h4 className="text-xl font-serif mb-2">Moisture Surge Mask</h4>
            </div>
            <div className="bg-white/5 p-8 border border-white/10 hover:border-pink-500 transition-all cursor-pointer">
              <span className="text-pink-500 font-bold mb-4 block text-xs tracking-widest uppercase">02 / RADIANCE</span>
              <h4 className="text-xl font-serif mb-2">Gold Particle Serum</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- MAIN PAGE ---
const HomePage = () => {
  return (
    <div className="bg-white selection:bg-pink-200">
      {/* IMPORTANT: To hide the Navbar on mobile, ensure your <Navbar /> 
          component has the "hidden lg:block" class on its desktop container 
          and your Mobile Tab Bar has "lg:hidden". 
      */}
      
      <ModernHero />
      
      {/* Social Proof Bar */}
      <div className="bg-gray-50 py-10 border-y border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex justify-around items-center gap-8 opacity-40 grayscale">
           <span className="font-serif text-xl md:text-2xl font-bold">VOGUE</span>
           <span className="font-serif text-xl md:text-2xl font-bold">ELLE</span>
           <span className="hidden sm:block font-serif text-xl md:text-2xl font-bold">GLAMOUR</span>
           <span className="hidden sm:block font-serif text-xl md:text-2xl font-bold">BAZAAR</span>
        </div>
      </div>

      <BentoCategories />

      <HandpickedDeals />

      {/* Brand Slider Section */}
      <div className="py-16 md:py-20">
        <h2 className="text-center text-2xl md:text-3xl font-serif mb-12 text-gray-800 uppercase tracking-widest">Shop By Brand</h2>
        <BrandSlider />
      </div>

      <HelpSection />
      <Footer />

      {/* Padding for Mobile Tab Bar at the bottom */}
      <div className="h-24 lg:hidden"></div>
    </div>
  );
};

export default HomePage;