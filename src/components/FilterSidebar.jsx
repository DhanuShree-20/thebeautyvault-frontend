import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Star } from 'lucide-react';

export default function EnhancedFilter({ brands = [] }) {
  const [openSection, setOpenSection] = useState({
    price: true,
    brands: true,
    rating: false,
    skinType: false
  });

  const toggleSection = (section) => {
    setOpenSection(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="w-64 flex flex-col gap-6 p-4 border-r border-gray-100 h-full bg-white">
      <h3 className="flex items-center gap-2 font-black text-sm uppercase tracking-wider border-b pb-3">
        <span className="w-1 h-5 bg-[#91278f]"></span> FILTERS
      </h3>

      {/* 1. Price Range (Your existing feature) */}
      <div className="border-b pb-4">
        <button onClick={() => toggleSection('price')} className="flex justify-between w-full text-[11px] font-black uppercase mb-4">
          Price Range {openSection.price ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
        </button>
        {openSection.price && (
          <div className="px-2">
            <input type="range" className="w-full accent-[#91278f]" min="100" max="1700" />
            <div className="flex justify-between text-[10px] font-bold text-gray-400 mt-2">
              <span>₹100</span>
              <span>₹1700</span>
            </div>
          </div>
        )}
      </div>

      {/* 2. Brand Filter (Dynamic) */}
      <div className="border-b pb-4">
        <button onClick={() => toggleSection('brands')} className="flex justify-between w-full text-[11px] font-black uppercase mb-4">
          Brands {openSection.brands ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
        </button>
        {openSection.brands && (
          <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
            {['Vela', 'Sunshine', 'Elf Cosmo', 'Ruby Blood'].map(brand => (
              <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-3 h-3 rounded border-gray-300 text-[#91278f] focus:ring-[#91278f]" />
                <span className="text-[10px] font-bold text-gray-500 group-hover:text-black uppercase">{brand}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 3. Customer Rating */}
      <div className="border-b pb-4">
        <button onClick={() => toggleSection('rating')} className="flex justify-between w-full text-[11px] font-black uppercase mb-4">
          Avg. Customer Rating {openSection.rating ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
        </button>
        {openSection.rating && (
          <div className="flex flex-col gap-2">
            {[4, 3, 2].map(rating => (
              <label key={rating} className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="rating" className="text-[#91278f] focus:ring-[#91278f]" />
                <span className="flex items-center text-[10px] font-bold text-gray-500">
                  {rating} <Star size={10} className="fill-yellow-400 text-yellow-400 ml-1 mr-1" /> & Above
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 4. Skin/Hair Type Filter */}
      <div className="border-b pb-4">
        <button onClick={() => toggleSection('skinType')} className="flex justify-between w-full text-[11px] font-black uppercase mb-4">
          Skin/Hair Type {openSection.skinType ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
        </button>
        {openSection.skinType && (
          <div className="flex flex-wrap gap-2">
            {['Oily', 'Dry', 'Normal', 'Sensitive', 'Curly'].map(type => (
              <button key={type} className="px-3 py-1 border border-gray-200 rounded-full text-[9px] font-bold uppercase hover:border-[#91278f] hover:text-[#91278f] transition-colors">
                {type}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Clear All Button */}
      <button className="w-full py-2 bg-gray-100 text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-colors">
        Clear All Filters
      </button>
    </div>
  );
}