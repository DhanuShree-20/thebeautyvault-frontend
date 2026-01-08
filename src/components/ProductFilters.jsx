import React, { useState } from 'react';
import { Star, Filter, X } from 'lucide-react';

const ProductFilters = ({ filters, setFilters, brands }) => {
  const [isOpen, setIsOpen] = useState(false); // Mobile toggle state

  const selectedBrands = filters.brand || [];
  const selectedSkinTypes = filters.skinType || [];

  const handleBrandToggle = (brandName) => {
    const updatedBrands = selectedBrands.includes(brandName)
      ? selectedBrands.filter(b => b !== brandName)
      : [...selectedBrands, brandName];
    setFilters({ ...filters, brand: updatedBrands });
  };

  const handleSkinTypeToggle = (type) => {
    const updatedTypes = selectedSkinTypes.includes(type)
      ? selectedSkinTypes.filter(t => t !== type)
      : [...selectedSkinTypes, type];
    setFilters({ ...filters, skinType: updatedTypes });
  };

  const clearFilters = () => {
    setFilters({
      price: 2000,
      brand: [],
      rating: 0,
      skinType: [],
      availability: false
    });
  };

  // Internal Filter UI to reuse for both Desktop and Mobile
  const FilterContent = () => (
    <div className="flex flex-col gap-6 md:gap-8 p-4 md:p-0">
      <div className="flex justify-between items-center md:hidden border-b pb-4 mb-2">
        <h2 className="text-sm font-black uppercase tracking-widest">Filters</h2>
        <button onClick={() => setIsOpen(false)}><X size={20}/></button>
      </div>

      {/* PRICE FILTER */}
      <div>
        <h3 className="text-[10px] md:text-[11px] font-black uppercase tracking-widest mb-4">Price Range</h3>
        <input 
          type="range" min="100" max="5000" 
          value={filters.price || 2000}
          onChange={(e) => setFilters({ ...filters, price: e.target.value })}
          className="w-full accent-[#5C4033] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] font-bold text-gray-400 mt-2">
          <span>₹100</span>
          <span>₹{filters.price || 2000}</span>
        </div>
      </div>

      {/* BRAND FILTER */}
      <div className="border-t border-gray-100 pt-6">
        <h3 className="text-[10px] md:text-[11px] font-black uppercase tracking-widest mb-4">Brands</h3>
        <div className="flex flex-col gap-2 max-h-40 md:max-h-48 overflow-y-auto pr-2 custom-scrollbar">
          {brands && brands.map((brand) => {
            const name = typeof brand === 'object' ? brand.name : brand;
            return (
              <label key={name} className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox"
                  checked={selectedBrands.includes(name)}
                  onChange={() => handleBrandToggle(name)}
                  className="w-3.5 h-3.5 rounded border-gray-300 text-[#5C4033] focus:ring-0" 
                />
                <span className="text-[10px] font-bold text-gray-500 group-hover:text-black uppercase">{name}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* SKIN CONCERN */}
      <div className="border-t border-gray-100 pt-6">
        <h3 className="text-[10px] md:text-[11px] font-black uppercase tracking-widest mb-4">Skin Concern</h3>
        <div className="flex flex-wrap gap-2">
          {['Dryness', 'Oily Skin', 'Acne', 'Aging', 'Dullness'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => handleSkinTypeToggle(type)}
              className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase transition-all border ${
                selectedSkinTypes.includes(type)
                  ? 'bg-[#5C4033] text-white border-[#5C4033]'
                  : 'bg-white text-gray-400 border-gray-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <button onClick={() => { clearFilters(); setIsOpen(false); }} className="w-full bg-gray-100 text-gray-600 text-[10px] font-black uppercase tracking-widest py-3 rounded-lg mt-4">
        Clear All
      </button>

      {/* Apply Button for Mobile only */}
      <button onClick={() => setIsOpen(false)} className="md:hidden w-full bg-[#5C4033] text-white text-[10px] font-black uppercase tracking-widest py-4 rounded-xl">
        Apply Filters
      </button>
    </div>
  );

  return (
    <>
      {/* MOBILE FILTER TRIGGER BUTTON */}
      <div className="md:hidden flex justify-between items-center mb-4 bg-white p-3 border rounded-xl shadow-sm">
        <span className="text-xs font-bold text-gray-500">{selectedBrands.length + selectedSkinTypes.length} Filters Applied</span>
        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-[#5C4033] text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest"
        >
          <Filter size={14}/> Filter
        </button>
      </div>

      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:block sticky top-24">
        <FilterContent />
      </div>

      {/* MOBILE DRAWER OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="absolute bottom-0 left-0 w-full bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
            <FilterContent />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductFilters;