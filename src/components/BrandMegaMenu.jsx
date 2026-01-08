import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BrandMegaMenu = ({ categorizedBrands = {}, closeMenu }) => {
  const categories = Object.keys(categorizedBrands || {});
  const [activeTab, setActiveTab] = useState("");

  // Set the first category as active once data loads
  useEffect(() => {
    if (categories.length > 0 && !activeTab) {
      setActiveTab(categories[0]);
    }
  }, [categories, activeTab]);

  if (categories.length === 0) return null;

  return (
    <div className="absolute left-0 w-full bg-white shadow-2xl border-t border-gray-100 z-50 flex animate-in fade-in slide-in-from-top-2">
      <div className="max-w-7xl mx-auto flex w-full min-h-[400px]">
        
        {/* Left Sidebar: Brand Categories */}
        <div className="w-64 bg-gray-50 border-r border-gray-100 py-6">
          {categories.map((cat) => (
            <div 
              key={cat}
              onMouseEnter={() => setActiveTab(cat)}
              className={`px-8 py-4 text-[11px] font-black uppercase tracking-widest cursor-pointer flex justify-between items-center transition-all ${
                activeTab === cat 
                ? 'bg-white text-[#91278f] border-l-4 border-[#91278f]' 
                : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {cat} <ChevronRight size={12} />
            </div>
          ))}
        </div>

        {/* Right Content: Flowing Brand Grid */}
        <div className="flex-1 p-10 bg-white">
          <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
            <h4 className="text-[12px] font-black text-gray-900 uppercase tracking-widest">
              {activeTab} <span className="text-gray-300 ml-1">Popular Brands</span>
            </h4>
            <Link 
              to="/brands" 
              onClick={closeMenu}
              className="text-[#91278f] text-[10px] font-bold uppercase hover:underline"
            >
              View All Brands →
            </Link>
          </div>

          <div className="grid grid-cols-3 lg:grid-cols-4 gap-y-5 gap-x-12">
            {categorizedBrands[activeTab]?.map((brand) => (
              <Link 
                key={brand}
                to={`/search?brand=${brand}`}
                onClick={closeMenu}
                className="group flex items-center gap-3"
              >
                {/* Reference-style bullet point */}
                <div className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#91278f] transition-colors" />
                <span className="text-[11px] font-bold text-gray-500 group-hover:text-black uppercase tracking-tight transition-colors">
                  {brand}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandMegaMenu;