import React from 'react';
import { Star } from 'lucide-react';

const ProductFilters = ({ filters, setFilters, brands }) => {
  
  // Defensive check: Ensure arrays exist before calling methods like .includes()
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

  return (
    <div className="flex flex-col gap-8 sticky top-24">
      {/* PRICE FILTER */}
      <div>
        <h3 className="text-[11px] font-black uppercase tracking-widest mb-4">Price Range</h3>
        <input 
          type="range" 
          min="100" 
          max="5000" 
          value={filters.price || 2000}
          onChange={(e) => setFilters({ ...filters, price: e.target.value })}
          className="w-full accent-[#91278f] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] font-bold text-gray-400 mt-2">
          <span>₹100</span>
          <span>₹{filters.price || 2000}</span>
        </div>
      </div>

      {/* BRAND FILTER */}
      <div className="border-t border-gray-100 pt-6">
        <h3 className="text-[11px] font-black uppercase tracking-widest mb-4">Brands</h3>
        <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
          {brands && brands.map((brand) => {
            const name = typeof brand === 'object' ? brand.name : brand;
            return (
              <label key={name} className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox"
                  checked={selectedBrands.includes(name)}
                  onChange={() => handleBrandToggle(name)}
                  className="w-3.5 h-3.5 rounded border-gray-300 text-[#91278f] focus:ring-0" 
                />
                <span className="text-[10px] font-bold text-gray-500 group-hover:text-black uppercase">{name}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* SKIN CONCERN */}
      <div className="border-t border-gray-100 pt-6">
        <h3 className="text-[11px] font-black uppercase tracking-widest mb-4">Skin Concern</h3>
        <div className="flex flex-wrap gap-2">
          {['Dryness', 'Oily Skin', 'Acne', 'Aging', 'Dullness'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => handleSkinTypeToggle(type)}
              className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase transition-all border ${
                selectedSkinTypes.includes(type)
                  ? 'bg-[#91278f] text-white border-[#91278f]'
                  : 'bg-white text-gray-400 border-gray-200 hover:border-gray-900'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* CLEAR ALL BUTTON */}
      <button 
        onClick={clearFilters}
        className="w-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest py-4 rounded-xl hover:bg-black transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default ProductFilters;