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

  // --- DATA STATES ---
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // --- FILTER STATES ---
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

  // Master lists ensure brands show even if products are still loading
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
          response = await axios.get(`http://localhost:5000/api/products/search`, {
            params: { q: searchQuery }
          });
        } else {
          const activeCategory = subCategory || categoryId;
          response = await axios.get(`http://localhost:5000/api/products`, {
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

  // --- HANDLERS ---
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-12 bg-white">
      {/* --- SIDEBAR --- */}
      <aside className="w-full md:w-64 border-r border-gray-100 pr-8">
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

        {/* 1. PRICE */}
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

        {/* 2. BRANDS */}
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

        {/* 3. RATINGS */}
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

        {/* 4. CONCERNS */}
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

        {/* 5. AVAILABILITY */}
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
      </aside>

      {/* --- GRID --- */}
      <main className="flex-1">
        <header className="mb-10">
          <h1 className="text-4xl font-black italic uppercase text-[#5C4033] tracking-tighter">
            {new URLSearchParams(location.search).get('q') 
              ? `Search: ${new URLSearchParams(location.search).get('q')}` 
              : (subCategory || categoryId || "Collection").replace(/-/g, ' ')}
          </h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-2">
            {filteredProducts.length} Items Found
          </p>
        </header>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product._id} className="group">
                <div className="relative rounded-2xl bg-gray-50 aspect-[4/5] flex items-center justify-center p-6 mb-4 overflow-hidden">
                  <button 
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-sm text-gray-200 hover:text-red-500 transition-colors"
                  >
                    <Heart size={16} fill={wishlistItems?.some(item => item._id === product._id) ? "#ef4444" : "none"} stroke={wishlistItems?.some(item => item._id === product._id) ? "#ef4444" : "currentColor"} />
                  </button>
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" />
                  {product.countInStock === 0 && (
                    <div className="absolute inset-0 bg-white/40 flex items-center justify-center backdrop-blur-[1px]">
                      <span className="bg-black text-white text-[9px] font-black uppercase px-3 py-1">Out of Stock</span>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-[10px] font-black text-[#5C4033]/50 uppercase tracking-widest">{product.brand}</h3>
                  {product.rating > 0 && (
                    <span className="flex items-center gap-1 text-[10px] font-bold"><Star size={10} className="fill-yellow-400 text-yellow-400"/> {product.rating}</span>
                  )}
                </div>
                <h2 className="text-[13px] font-bold text-gray-800 mb-3 h-10 line-clamp-2 uppercase tracking-tighter">{product.name}</h2>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-black text-[#5C4033]">₹{product.price}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    disabled={product.countInStock === 0}
                    className="bg-[#5C4033] text-white p-2.5 rounded-full transition-all hover:bg-black disabled:bg-gray-200"
                  >
                    <ShoppingBag size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100">
            <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.4em]">The Vault is empty.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default CategoryPage;