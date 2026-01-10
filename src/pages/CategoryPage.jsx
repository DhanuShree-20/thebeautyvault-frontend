import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Heart, Filter, Loader2, X, Star, ShoppingBag, ChevronDown, ChevronUp, ArrowRight, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const CategoryPage = () => {
  const { categoryId, subCategory } = useParams();
  const location = useLocation();
  const { addToCart } = useCart();
  const { toggleWishlist, wishlistItems } = useWishlist();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  
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
    <div className="flex flex-col justify-center items-center h-screen gap-6 bg-white">
      <div className="relative">
        <Loader2 className="animate-spin text-pink-500" size={48} strokeWidth={1} />
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
        </div>
      </div>
      <span className="text-[10px] font-black uppercase text-gray-400 tracking-[0.4em] animate-pulse">Curating the Vault</span>
    </div>
  );

  const FilterContent = () => (
    <div className="space-y-10">
      <div className="flex justify-between items-baseline border-b border-gray-900 pb-4">
        <h2 className="font-serif italic text-xl text-gray-900">Filters</h2>
        <button 
          onClick={() => {setSelectedBrands([]); setSelectedConcerns([]); setPriceRange(5000); setSelectedRating(0); setOnlyInStock(false);}}
          className="text-[9px] font-black text-pink-500 uppercase tracking-widest hover:text-gray-900 transition-colors"
        >
          Reset All
        </button>
      </div>

      {/* PRICE SECTION */}
      <div className="border-b border-gray-100 pb-8">
        <button onClick={() => toggleSection('price')} className="flex justify-between w-full text-[10px] font-black uppercase tracking-widest mb-6 text-gray-900">
          Price Range {openSections.price ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
        </button>
        {openSections.price && (
          <div className="px-1">
            <input 
              type="range" min="100" max="5000" step="100"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full h-[2px] bg-gray-200 appearance-none cursor-pointer accent-gray-900"
            />
            <div className="flex justify-between mt-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              <span>₹100</span>
              <span className="text-gray-900">Under ₹{priceRange}</span>
            </div>
          </div>
        )}
      </div>

      {/* BRANDS SECTION */}
      <div className="border-b border-gray-100 pb-8">
        <button onClick={() => toggleSection('brands')} className="flex justify-between w-full text-[10px] font-black uppercase tracking-widest mb-6 text-gray-900">
          Brands {openSections.brands ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
        </button>
        {openSections.brands && (
          <div className="space-y-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
            {masterBrands.map(brand => (
              <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                    <input 
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand])}
                      className="peer h-4 w-4 appearance-none border border-gray-300 checked:bg-gray-900 checked:border-gray-900 transition-all"
                    />
                    <X size={10} className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                </div>
                <span className="text-[11px] font-medium text-gray-500 group-hover:text-gray-900 uppercase tracking-widest transition-colors">{brand}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* RATING SECTION */}
      <div className="border-b border-gray-100 pb-8">
        <button onClick={() => toggleSection('rating')} className="flex justify-between w-full text-[10px] font-black uppercase tracking-widest mb-6 text-gray-900">
          Member Rating {openSections.rating ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
        </button>
        {openSections.rating && (
          <div className="space-y-4">
            {[4, 3, 2].map(star => (
              <label key={star} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="radio" name="rating"
                  checked={selectedRating === star}
                  onChange={() => setSelectedRating(star)}
                  className="h-4 w-4 border-gray-300 text-gray-900 focus:ring-0 appearance-none rounded-full border checked:border-[5px] checked:border-gray-900 transition-all"
                />
                <span className="flex items-center gap-2 text-[11px] font-medium text-gray-500 group-hover:text-black uppercase tracking-widest transition-colors">
                  {star} <Star size={10} className="fill-pink-500 text-pink-500"/> & Above
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* CONCERNS SECTION */}
      <div className="border-b border-gray-100 pb-8">
        <button onClick={() => toggleSection('concern')} className="flex justify-between w-full text-[10px] font-black uppercase tracking-widest mb-6 text-gray-900">
          By Concern {openSections.concern ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
        </button>
        {openSections.concern && (
          <div className="flex flex-wrap gap-2">
            {allConcerns.map(concern => (
              <button 
                key={concern}
                onClick={() => setSelectedConcerns(prev => prev.includes(concern) ? prev.filter(c => c !== concern) : [...prev, concern])}
                className={`px-4 py-2 text-[9px] font-black uppercase tracking-widest border transition-all ${
                  selectedConcerns.includes(concern) ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-400 border-gray-100 hover:border-gray-900 hover:text-gray-900'
                }`}
              >
                {concern}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="pt-2">
        <label className="flex items-center gap-3 cursor-pointer group">
          <input 
            type="checkbox"
            checked={onlyInStock}
            onChange={(e) => setOnlyInStock(e.target.checked)}
            className="peer h-4 w-4 appearance-none border border-gray-300 checked:bg-pink-500 checked:border-pink-500 transition-all"
          />
          <span className="text-[11px] font-black uppercase tracking-widest text-gray-900">In Stock Only</span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-16 flex flex-col md:flex-row gap-12">
        
        {/* --- MOBILE FILTER HEADER --- */}
        <div className="md:hidden flex items-center justify-between border-b border-gray-900 pb-6">
           <div className="flex flex-col">
             <h1 className="text-2xl font-serif italic text-gray-900 uppercase">Collection</h1>
             <span className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em]">{filteredProducts.length} Results Found</span>
           </div>
           <button 
             onClick={() => setIsFilterDrawerOpen(true)}
             className="flex items-center gap-3 bg-gray-900 text-white px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em]"
           >
             <Filter size={14} /> Filter
           </button>
        </div>

        {/* --- DESKTOP SIDEBAR --- */}
        <aside className="hidden md:block w-72 shrink-0">
          <div className="sticky top-32">
            <FilterContent />
          </div>
        </aside>

        {/* --- MOBILE FILTER DRAWER --- */}
        <div className={`fixed inset-0 z-[600] md:hidden transition-all duration-500 ${isFilterDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsFilterDrawerOpen(false)} />
          <div className={`absolute left-0 top-0 bottom-0 w-[85%] bg-white p-8 transition-transform duration-500 shadow-2xl overflow-y-auto ${isFilterDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
              <button onClick={() => setIsFilterDrawerOpen(false)} className="mb-8 p-2 -ml-2"><X size={28} strokeWidth={1}/></button>
              <FilterContent />
              <button 
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="w-full bg-gray-900 text-white py-5 mt-10 font-black uppercase text-[11px] tracking-[0.3em]"
              >
                  Apply Selection
              </button>
          </div>
        </div>

        {/* --- MAIN GRID --- */}
        <main className="flex-1">
          <header className="mb-12 hidden md:block border-b border-gray-100 pb-8 text-left">
            <h1 className="text-5xl font-serif italic text-gray-900 mb-4 capitalize">
              {new URLSearchParams(location.search).get('q') 
                ? `Results for: ${new URLSearchParams(location.search).get('q')}` 
                : (subCategory || categoryId || "Vault Collection").replace(/-/g, ' ')}
            </h1>
            <p className="text-[10px] font-bold text-pink-500 uppercase tracking-[0.4em]">
              Showing {filteredProducts.length} curated beauty essentials
            </p>
          </header>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-6 md:gap-x-10">
              {filteredProducts.map((product) => (
                <div key={product._id} className="group relative flex flex-col h-full">
                  {/* Image Holder */}
                  <div className="relative aspect-[3/4] bg-[#FBFBFB] overflow-hidden mb-4 border border-gray-50">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover mix-blend-multiply transition-transform duration-1000 group-hover:scale-110" 
                    />
                    
                    {/* Hover Actions */}
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <button 
                      onClick={() => toggleWishlist(product)}
                      className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm"
                    >
                      <Heart 
                        size={16} 
                        className={wishlistItems?.some(item => item._id === product._id) ? "fill-pink-500 text-pink-500" : "text-gray-900"} 
                      />
                    </button>

                    {product.countInStock === 0 && (
                      <div className="absolute inset-0 bg-white/60 flex items-center justify-center backdrop-blur-[2px]">
                        <span className="bg-gray-900 text-white text-[9px] font-black uppercase tracking-widest px-4 py-2">Sold Out</span>
                      </div>
                    )}

                    <button 
                      onClick={() => addToCart(product)}
                      disabled={product.countInStock === 0}
                      className="absolute bottom-0 left-0 w-full bg-gray-900 text-white py-4 text-[10px] font-black uppercase tracking-[0.2em] translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden md:flex items-center justify-center gap-2"
                    >
                      <ShoppingBag size={14} /> Quick Bag
                    </button>
                  </div>
                  
                  {/* Info */}
                  <div className="flex flex-col flex-grow px-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-pink-500">{product.brand}</h3>
                      <div className="flex items-center gap-1 opacity-40">
                         <span className="text-[9px] font-bold">{product.rating || '0'}</span>
                         <Star size={8} className="fill-gray-900" />
                      </div>
                    </div>
                    
                    <h2 className="text-sm font-serif italic text-gray-800 mb-3 line-clamp-2 h-10 leading-snug">
                      {product.name}
                    </h2>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-lg font-light text-gray-900 tracking-tighter">₹{product.price.toLocaleString()}</span>
                      <button 
                        onClick={() => addToCart(product)}
                        disabled={product.countInStock === 0}
                        className="md:hidden text-gray-900 hover:text-pink-500"
                      >
                        <ShoppingBag size={20} strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-32 border border-dashed border-gray-100">
              <div className="inline-flex p-6 bg-gray-50 rounded-full mb-6">
                <Search size={32} strokeWidth={1} className="text-gray-300" />
              </div>
              <h3 className="font-serif italic text-2xl text-gray-900 mb-2">The Vault is Empty</h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Adjust your filters to discover more treasures</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CategoryPage;