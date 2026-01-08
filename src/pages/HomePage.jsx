import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider';
import HandpickedDeals from '../components/HandpickedDeals';
import BrandDealsGrid from '../components/BrandDealsGrid';
import PromoGrid from '../components/PromoGrid';
import BrandSlider from '../components/BrandSlider';
import EditorsPick from '../components/EditorsPick';
import BrandDeals from '../components/BrandDeals';
import HelpSection from '../components/HelpSection';
import AppSpotlight from '../components/AppSpotlight';
import Footer from '../components/Footer';

// --- UPDATED COMPONENT: CategoryEssentials ---
const CategoryEssentials = () => {
  const navigate = useNavigate();

  const essentials = [
    {
      name: "MAKEUP ESSENTIALS",
      path: "/category/makeup",
      // Using Starfire for Makeup
      image:"https://i.pinimg.com/1200x/61/82/4f/61824fe5c2a5d45598fa0ca0e3bcb39b.jpg", 
      bgColor: "bg-[#fdfcf0]" // Soft yellow/cream
    },
    {
      name: "SKIN ESSENTIALS",
      path: "/category/skin-care",
      // Using Vela for Skin
      image: "https://i.pinimg.com/736x/bc/97/15/bc971507988bb8d78184f535927600ce.jpg", 
      bgColor: "bg-[#f7e8e6]" // Soft blush pink
    },
    {
      name: "HAIR ESSENTIALS",
      path: "/category/hair-care",
      // Using Srntro for Hair/Grooming
      image: "https://i.pinimg.com/736x/49/9c/bf/499cbff948d2e97f9596823a4e71cef7.jpg", 
      bgColor: "bg-[#e5e7eb]" // Sleek silver/grey
    },
    {
      name: "BATH & BODY ESSENTIALS",
      path: "/category/body-care",
      // Using Elf Cosmo for Body Care
      image: "https://i.pinimg.com/736x/ff/08/64/ff086418db7e141b85a86cbca3a85228.jpg", 
      bgColor: "bg-[#f5f3ff]" // Soft lavender
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
        {essentials.map((item, index) => (
          <div 
            key={index}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center cursor-pointer group"
          >
            {/* The Circular Frame */}
            <div className={`w-36 h-36 md:w-56 md:h-56 rounded-full ${item.bgColor} flex items-center justify-center overflow-hidden mb-6 transition-all duration-300 border-2 border-transparent group-hover:border-gray-100 group-hover:shadow-2xl group-hover:-translate-y-2`}>
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" 
              />
            </div>
            
            {/* The Bold Label */}
            <h3 className="text-center text-xs md:text-sm font-black tracking-[0.15em] text-gray-900 uppercase leading-tight group-hover:text-pink-600 transition-colors">
              {item.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

// --- MAIN HOMEPAGE ---
const HomePage = () => {
  return (
    <div className="bg-white font-sans antialiased">
      {/* 1. Main Promotion Banner */}
      <HeroSlider />

      {/* 2. CIRCULAR CATEGORY TILES */}
      <CategoryEssentials />

      {/* 3. Handpicked Product Carousel */}
      <HandpickedDeals />
      
      {/* 4. Brand Deals Grid (The 5-column layout we edited) */}
      <BrandDealsGrid />

      {/* 5. Multi-Brand Offer Tiles */}
      <PromoGrid />

      {/* 6. Secondary Large Brand Banner */}
      <BrandSlider />

      {/* 7. Editor's Pick with Add to Cart */}
      <EditorsPick />

      {/* 8. Amazing Deals Grid */}
      <BrandDeals />

      {/* 9. Service Icons & Mobile App */}
    
      <AppSpotlight />
      <HelpSection />
      <Footer />
    </div>
  );
};

export default HomePage;