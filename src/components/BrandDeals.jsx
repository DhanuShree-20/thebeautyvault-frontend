import React, { useState } from 'react';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';

const BrandDeals = () => {
  // Local state to simulate wishlist toggling for demo purposes
  const [wishlistedBrands, setWishlistedBrands] = useState({});

  const toggleWishlist = (brandName) => {
    setWishlistedBrands(prev => ({
      ...prev,
      [brandName]: !prev[brandName]
    }));
  };

  const deals = [
    { 
      brand: "LAMEL", 
      sub: "L.A Girl Revolution", 
      discount: "MINIMUM 15% OFF", 
      on: "on entire brand",
      img: "https://media6.ppl-media.com//tr:h-750,w-750,c-at_max,dpr-2,q-40,f-avif/static/img/product/359681/makeup-revolution-satin-kiss-lipstick-icon-nude-3-5-g_1_display_1689674250_e42158e0.jpg",
      bg: "bg-[#fdfcf0]" 
    },
    { 
      brand: "ELLE 18", 
      sub: "On Entire Brand", 
      discount: "UPTO 50% OFF", 
      on: "on entire brand",
      img: "https://media6.ppl-media.com/tr:h-235,w-235,c-at_max,dpr-2/static/img/product/399199/elle-18-lasting-glow-compact-9hrs-oil-free-vitamin-e-and-c-matte-finish-marble-9-gm_1_display_1746009619_c5b17157.jpg",
      bg: "bg-[#f7e8e6]"
    },
    { 
      brand: "Good Vibes", 
      sub: "Revolution", 
      discount: "MINIMUM 15% OFF", 
      on: "on entire brand",
      img: "https://media6.ppl-media.com//tr:h-750,w-750,c-at_max,dpr-2,q-40,f-avif/static/img/product/359681/makeup-revolution-satin-kiss-lipstick-icon-nude-3-5-g_1_display_1689674250_e42158e0.jpg",
      bg: "bg-[#f5f3ff]" 
    },
    { 
      brand: "Lakme", 
      sub: "On Entire Brand", 
      discount: "UPTO 20% OFF", 
      on: "on entire brand",
      img: "https://media6.ppl-media.com/tr:h-235,w-235,c-at_max,dpr-2/static/img/product/401838/elle-18-ace-base-primer-10ml_1_display_1709204737_44009f1f.jpg",
      bg: "bg-[#e5e7eb]" 
    },
  ];

  return (
    <div className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-[0.3em] text-gray-900 text-center">
            The Brand Gallery
          </h2>
          <div className="h-1 w-20 bg-[#91278f] mt-4 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {deals.map((deal, index) => (
            <div 
              key={index} 
              className="group relative flex flex-col items-center"
            >
              {/* Main Card Container */}
              <div className={`relative w-full aspect-[4/5] rounded-[2.5rem] ${deal.bg} overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-3 flex items-center justify-center p-8`}>
                
                {/* Wishlist Icon */}
                <button 
                  onClick={() => toggleWishlist(deal.brand)}
                  className="absolute top-6 right-6 z-20 p-3 bg-white/80 backdrop-blur-md rounded-full text-gray-400 hover:text-red-500 transition-all duration-300 shadow-sm active:scale-90"
                >
                  <Heart 
                    size={20} 
                    fill={wishlistedBrands[deal.brand] ? "#ef4444" : "none"} 
                    className={wishlistedBrands[deal.brand] ? "text-red-500" : ""} 
                  />
                </button>

                {/* The "Podium" and Product Image */}
                <div className="relative z-10">
                   <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-black/10 blur-xl rounded-full scale-x-150 group-hover:opacity-50 transition-opacity"></div>
                   <img 
                    src={deal.img} 
                    alt={deal.brand} 
                    className="w-40 h-40 object-contain drop-shadow-2xl transform transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-3" 
                   />
                </div>

                {/* Floating "Add to Bag" Button Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-30">
                  <button className="w-full bg-gray-900 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-2xl hover:bg-[#91278f] transition-colors">
                    <ShoppingBag size={14} />
                    Shop Collection
                  </button>
                </div>
              </div>

              {/* Text Info Section */}
              <div className="mt-6 text-center space-y-1">
                <span className="text-[10px] font-black text-[#91278f] uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full">
                  {deal.discount}
                </span>
                <h3 className="text-lg font-black text-gray-900 uppercase tracking-tighter pt-2">
                  {deal.brand}
                </h3>
                <p className="text-[11px] text-gray-500 font-bold uppercase tracking-tight">
                  {deal.on}
                </p>
                
                <button className="flex items-center gap-2 mx-auto text-[10px] font-black text-gray-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                  View Details <ArrowRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandDeals;