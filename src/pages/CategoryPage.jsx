import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Heart, Filter, Loader2, X, Star, ShoppingBag, ChevronDown, ChevronUp } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const CategoryPage = () => {
  const { categoryId, subCategory } = useParams();
  const location = useLocation();
  const { addToCart } = useCart();
  const { toggleWishlist, wishlistItems } = useWishlist();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false); // Mobile drawer state
  
  const [priceRange, setPriceRange] = useState(5000);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedConcerns, setSelectedConcerns] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [openSections, setOpenSections] = useState({
    price: true,
    brands: true,
    rating: true,
    concern: true
  });

  const masterBrands = ["Lakme", "L'Oreal", "Maybelline", "Minimalist", "Mamaearth", "The Ordinary", "Lamel"];
  const allConcerns = ["Dryness", "Oily Skin", "Acne", "Aging", "Dullness"];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const searchParams = new URLSearchParams(location.search);
        const searchQuery = searchParams.get('q');
        
        let response;
        if (searchQuery) {
          response = await axios.get(`https://thebeautyvault-backend.onrender.com/api/products/search`, {
            params: { q: searchQuery }
          });
        } else {
          const activeCategory = subCategory || categoryId;
          response = await axios.get(`https://thebeautyvault-backend.onrender.com/api/products`, {
             params: { category: activeCategory } 
          });
        }

        if (response.data && response.data.products) {
          setProducts(response.data.products);
        } else {
          setProducts(Array.isArray(response.data) ? response.data : []);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        setProducts([]);
      } finally {
        setLoading(false); 
      }
    };
    fetchProducts();
  }, [categoryId, subCategory, location.search]); 

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const filteredProducts = products.filter(p => {
    const matchesPrice = p.price <= priceRange;
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(p.brand);
    const matchesRating = p.rating >= selectedRating;
    const matchesStock = !onlyInStock || p.countInStock > 0;
    const matchesConcern = selectedConcerns.length === 0 || selectedConcerns.some(c => p.description?.includes(c));
    return matchesPrice && matchesBrand && matchesRating && matchesStock && matchesConcern;
  });

  if (loading) return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <Loader2 className="animate-spin text-[#5C4033]" size={40} />
      <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Opening the Vault...</span>
    </div>
  );

  // Filter content component to avoid repetition
  const FilterContent = () => (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="flex items-center gap-2 font-black uppercase text-[12px] text-[#5C4033] tracking-[0.2em]">
          <Filter size={16} /> Filters
        </h2>
        <button 
          onClick={() => {setSelectedBrands([]); setSelectedConcerns([]); setPriceRange(5000); setSelectedRating(0); setOnlyInStock(false);}}
          className="text-[9px] font-bold text-red-500 uppercase hover:underline"
        >
          Reset
        </button>
      </div>

      <div className="mb-8 border-b border-gray-50 pb-6">
        <button onClick={() => toggleSection('price')} className="flex justify-between w-full text-[10px] font-black uppercase mb-4 text-gray-400">
          Price Range {openSections.price ? <ChevronUp size={12}/> : <ChevronDown size={12}/>}
        </button>
        {openSections.price && (
          <>
            <input 
              type="range" min="100" max="5000" step="100"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#5C4033]"
            />
            <div className="flex justify-between mt-3 text-[10px] font-bold text-[#5C4033]">
              <span>₹100</span>
              <span className="bg-[#E8D7D0] px-2 py-1 rounded">UP TO ₹{priceRange}</span>
            </div>
          </>
        )}
      </div>

      <div className="mb-8 border-b border-gray-50 pb-6">
        <button onClick={() => toggleSection('brands')} className="flex justify-between w-full text-[10px] font-black uppercase mb-4 text-gray-400">
          Brands {openSections.brands ? <ChevronUp size={12}/> : <ChevronDown size={12}/>}
        </button>
        {openSections.brands && (
          <div className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar">
            {masterBrands.map(brand => (
              <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand])}
                  className="w-4 h-4 border-gray-200 rounded accent-[#5C4033]"
                />
                <span className="text-[11px] font-bold uppercase text-gray-500 group-hover:text-[#5C4033]">{brand}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="mb-8 border-b border-gray-50 pb-6">
        <button onClick={() => toggleSection('rating')} className="flex justify-between w-full text-[10px] font-black uppercase mb-4 text-gray-400">
          Ratings {openSections.rating ? <ChevronUp size={12}/> : <ChevronDown size={12}/>}
        </button>
        {openSections.rating && (
          <div className="space-y-3">
            {[4, 3, 2].map(star => (
              <label key={star} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="radio" name="rating"
                  checked={selectedRating === star}
                  onChange={() => setSelectedRating(star)}
                  className="w-4 h-4 accent-[#5C4033]"
                />
                <span className="flex items-center gap-1 text-[11px] font-bold uppercase text-gray-500 group-hover:text-black">
                  {star} <Star size={10} className="fill-yellow-400 text-yellow-400"/> & Up
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="mb-8 border-b border-gray-50 pb-6">
        <button onClick={() => toggleSection('concern')} className="flex justify-between w-full text-[10px] font-black uppercase mb-4 text-gray-400">
          Concerns {openSections.concern ? <ChevronUp size={12}/> : <ChevronDown size={12}/>}
        </button>
        {openSections.concern && (
          <div className="flex flex-wrap gap-2">
            {allConcerns.map(concern => (
              <button 
                key={concern}
                onClick={() => setSelectedConcerns(prev => prev.includes(concern) ? prev.filter(c => c !== concern) : [...prev, concern])}
                className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase border transition-all ${
                  selectedConcerns.includes(concern) ? 'bg-[#5C4033] text-white border-[#5C4033]' : 'bg-white text-gray-400 border-gray-100 hover:border-gray-300'
                }`}
              >
                {concern}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mb-6">
        <label className="flex items-center gap-3 cursor-pointer group">
          <input 
            type="checkbox"
            checked={onlyInStock}
            onChange={(e) => setOnlyInStock(e.target.checked)}
            className="w-4 h-4 border-gray-200 rounded accent-[#5C4033]"
          />
          <span className="text-[11px] font-black uppercase text-gray-500 group-hover:text-black">In Stock Only</span>
        </label>
      </div>
    </>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 flex flex-col md:flex-row gap-8 md:gap-12 bg-white min-h-screen">
      
      {/* --- MOBILE FILTER TOGGLE --- */}
      <div className="md:hidden flex items-center justify-between border-b pb-4 sticky top-0 bg-white z-20">
         <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
            {filteredProducts.length} Items Found
         </p>
         <button 
            onClick={() => setIsFilterDrawerOpen(true)}
            className="flex items-center gap-2 bg-[#5C4033] text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest"
         >
            <Filter size={14} /> Filter
         </button>
      </div>

      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="hidden md:block w-64 border-r border-gray-100 pr-8">
        <FilterContent />
      </aside>

      {/* --- MOBILE FILTER DRAWER --- */}
      <div className={`fixed inset-0 z-[100] transition-visibility duration-300 md:hidden ${isFilterDrawerOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isFilterDrawerOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsFilterDrawerOpen(false)} />
        <div className={`absolute left-0 top-0 bottom-0 w-[85%] max-w-sm bg-white p-6 transition-transform duration-300 shadow-2xl overflow-y-auto ${isFilterDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <button onClick={() => setIsFilterDrawerOpen(false)} className="absolute top-6 right-6 text-gray-400"><X size={24}/></button>
            <FilterContent />
            <button 
                onClick={() => setIsFilterDrawerOpen(false)}
                className="w-full bg-[#5C4033] text-white py-4 mt-4 font-black uppercase text-[11px] tracking-widest rounded-xl shadow-lg"
            >
                View Results
            </button>
        </div>
      </div>

      {/* --- MAIN GRID --- */}
      <main className="flex-1">
        <header className="mb-8 md:mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-black italic uppercase text-[#5C4033] tracking-tighter">
            {new URLSearchParams(location.search).get('q') 
              ? `Search: ${new URLSearchParams(location.search).get('q')}` 
              : (subCategory || categoryId || "Collection").replace(/-/g, ' ')}
          </h1>
          <p className="hidden md:block text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-2">
            {filteredProducts.length} Items Found
          </p>
        </header>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {filteredProducts.map((product) => (
              <div key={product._id} className="group">
                <div className="relative rounded-xl md:rounded-2xl bg-gray-50 aspect-[4/5] flex items-center justify-center p-3 md:p-6 mb-3 md:mb-4 overflow-hidden">
                  <button 
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-2 right-2 md:top-4 md:right-4 z-10 p-1.5 md:p-2 bg-white rounded-full shadow-sm text-gray-200 hover:text-red-500 transition-colors"
                  >
                    <Heart size={14} fill={wishlistItems?.some(item => item._id === product._id) ? "#ef4444" : "none"} stroke={wishlistItems?.some(item => item._id === product._id) ? "#ef4444" : "currentColor"} className="md:w-4 md:h-4" />
                  </button>
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" />
                  {product.countInStock === 0 && (
                    <div className="absolute inset-0 bg-white/40 flex items-center justify-center backdrop-blur-[1px]">
                      <span className="bg-black text-white text-[8px] md:text-[9px] font-black uppercase px-2 py-1">Out of Stock</span>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between items-start mb-0.5 md:mb-1">
                  <h3 className="text-[8px] md:text-[10px] font-black text-[#5C4033]/50 uppercase tracking-widest">{product.brand}</h3>
                  {product.rating > 0 && (
                    <span className="flex items-center gap-1 text-[9px] md:text-[10px] font-bold"><Star size={8} className="fill-yellow-400 text-yellow-400 md:w-[10px]"/> {product.rating}</span>
                  )}
                </div>
                <h2 className="text-[11px] md:text-[13px] font-bold text-gray-800 mb-2 md:mb-3 h-8 md:h-10 line-clamp-2 uppercase tracking-tighter leading-tight">{product.name}</h2>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm md:text-lg font-black text-[#5C4033]">₹{product.price}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    disabled={product.countInStock === 0}
                    className="bg-[#5C4033] text-white p-2 md:p-2.5 rounded-full transition-all hover:bg-black disabled:bg-gray-200"
                  >
                    <ShoppingBag size={14} className="md:w-4 md:h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 md:py-32 bg-gray-50 rounded-2xl md:rounded-3xl border-2 border-dashed border-gray-100">
            <p className="text-[10px] md:text-[11px] font-black text-gray-400 uppercase tracking-[0.4em]">The Vault is empty.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default CategoryPage;