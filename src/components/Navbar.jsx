import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { 
  ShoppingCart, Heart, User, Search, 
  ChevronDown, ChevronRight, Sparkles, Tag,
  Home, Menu, X, ArrowRight, LogOut
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

const FALLBACK_BRANDS = ["Lakme", "Lamel", "Elle 18", "Good Vibes", "DermDoc", "Vela", "Ruby Blood", "Petunia", "L.A Girl", "Revolution", "Maybelline", "L'Oreal", "Minimalist", "The Ordinary"];

const STORE_CATEGORIES = {
  "Hair Care": ["Shampoo", "Conditioner", "Hair Oil", "Hair Mask", "Serums"],
  "Skin Care": ["Face Wash", "Face Serums", "Moisturizer", "Sunscreen", "Toners"],
  "Body Care": ["Body Lotion", "Body Wash", "Body Scrub", "soap"],
  "Makeup": ["Lipstick", "Lipliner", "lipbalm", "Foundation", "compact", "colorPalette", "Mascara", "Eyeliner", "Kajal", "Primer"],
  "Pedicure": ["Foot Cream", "Foot Scrub", "Tools & Kits"]
};

export default function Navbar() {
  const navigate = useNavigate();
  const currentLocation = useLocation();
  
  const [activeCategory, setActiveCategory] = useState(null); 
  const [showBrandsMenu, setShowBrandsMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { cartItems = [], removeFromCart } = useCart() || {}; 
  const { user, logout } = useAuth() || {};
  const { wishlistItems = [] } = useWishlist() || {};
  
  const cartBadgeCount = cartItems.reduce((acc, item) => acc + (item.qty || 1), 0);
  const wishlistBadgeCount = wishlistItems.length;

  const getCategorizedBrands = (brandList) => {
    return brandList.reduce((acc, name) => {
      if (name && typeof name === 'string') {
        const firstLetter = name.toUpperCase().charAt(0);
        if (!acc[firstLetter]) acc[firstLetter] = [];
        if (!acc[firstLetter].includes(name)) acc[firstLetter].push(name);
      }
      return acc;
    }, {});
  };

  const [categorizedBrands, setCategorizedBrands] = useState(getCategorizedBrands(FALLBACK_BRANDS));

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const { data } = await axios.get('https://thebeautyvault-backend.onrender.com/api/products/brands');
        if (data && data.length > 0) {
          const brandNames = data.map(b => typeof b === 'object' ? b.name : b);
          setCategorizedBrands(getCategorizedBrands(brandNames));
        }
      } catch (err) { console.log("Using local brand list"); }
    };
    fetchBrands();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      <header className="bg-white sticky top-0 z-[200] font-sans antialiased" onMouseLeave={() => { setActiveCategory(null); setShowBrandsMenu(false); }}>
        {/* --- PROMO BAR --- */}
        <div className="bg-[#1a1a1a] text-white text-[9px] md:text-[11px] py-2.5 text-center font-medium tracking-[0.2em] uppercase px-4">
          Complimentary shipping on orders above ₹500 • <span className="text-pink-400">Code: VAULT20</span>
        </div>

        <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-md relative">
          <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-24 flex items-center justify-between">
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 -ml-2 text-gray-900"><Menu size={24} /></button>

            <Link to="/" className="flex flex-col lg:static absolute left-1/2 -translate-x-1/2 lg:translate-x-0">
                <span className="text-lg md:text-3xl font-serif tracking-tighter text-gray-900">
                    THE BEAUTY <span className="italic font-light">VAULT</span>
                </span>
            </Link>

            <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-md relative mx-12">
              <input 
                type="text" value={query} onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, brands..." 
                className="w-full bg-transparent border-none py-3 text-sm outline-none border-b border-gray-200 focus:border-pink-500"
              />
              <button type="submit" className="absolute right-0 top-3 text-gray-400"><Search size={18} /></button>
            </form>

            <div className="flex items-center gap-4 md:gap-8">
              <button className="lg:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}><Search size={22} /></button>
              <div className="hidden lg:flex items-center gap-8 text-gray-800">
                <Link to="/wishlist" className="relative"><Heart size={22} />{wishlistBadgeCount > 0 && <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[8px] rounded-full h-4 w-4 flex items-center justify-center">{wishlistBadgeCount}</span>}</Link>
                <button onClick={() => setIsCartOpen(true)} className="relative"><ShoppingCart size={22} />{cartBadgeCount > 0 && <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-[8px] rounded-full h-4 w-4 flex items-center justify-center">{cartBadgeCount}</span>}</button>
                {user ? (
                  <Link to="/profile" className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-pink-600 font-bold text-xs border border-pink-100">{user.name?.charAt(0).toUpperCase()}</Link>
                ) : (
                  <Link to="/login" className="text-[10px] font-black uppercase tracking-widest border-b-2 border-gray-900 pb-0.5">Login</Link>
                )}
              </div>
            </div>
          </div>

          {/* --- DESKTOP MEGA MENU NAVIGATION --- */}
          <div className="hidden lg:block border-t border-gray-50 bg-white">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">
              <div className="flex gap-12 items-center">
                <div onMouseEnter={() => { setActiveCategory('Skin Care'); setShowBrandsMenu(false); }} className={`cursor-pointer flex items-center gap-2 hover:text-pink-600 ${activeCategory ? 'text-pink-600' : ''}`}>
                  Collections <ChevronDown size={14} />
                </div>
                <div onMouseEnter={() => { setShowBrandsMenu(true); setActiveCategory(null); }} className={`cursor-pointer flex items-center gap-2 hover:text-pink-600 ${showBrandsMenu ? 'text-pink-600' : ''}`}>
                  The Brands <ChevronDown size={14} />
                </div>
              </div>
              <div className="flex gap-10">
                <Link to="/search?q=new" className="hover:text-pink-600 flex items-center gap-2"><Sparkles size={14} className="text-pink-400" /> New Arrivals</Link>
                <Link to="/offers" className="hover:text-pink-600 flex items-center gap-2"><Tag size={14} /> Curated Deals</Link>
              </div>
            </div>

            {/* Brands Dropdown */}
            {showBrandsMenu && (
              <div className="absolute left-0 w-full bg-white shadow-2xl border-t border-gray-100 z-50 animate-in fade-in duration-300">
                <div className="max-w-7xl mx-auto flex min-h-[400px]">
                  <div className="w-48 bg-gray-50/50 py-8 overflow-y-auto max-h-[500px]">
                    {Object.keys(categorizedBrands).sort().map(letter => (
                      <div key={letter} className="w-full py-2 text-center text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">{letter}</div>
                    ))}
                  </div>
                  <div className="flex-1 p-16 grid grid-cols-4 gap-6">
                    {Object.values(categorizedBrands).flat().sort().map(brand => (
                      <Link key={brand} to={`/search?brand=${encodeURIComponent(brand)}`} onClick={() => setShowBrandsMenu(false)} className="text-[12px] font-medium text-gray-500 hover:text-pink-600 uppercase tracking-widest">{brand}</Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Collections Dropdown */}
            {activeCategory && (
              <div className="absolute left-0 w-full bg-white shadow-2xl border-t border-gray-100 z-50 animate-in fade-in duration-300">
                <div className="max-w-7xl mx-auto flex min-h-[400px]">
                  <div className="w-72 bg-gray-50/30 border-r border-gray-50 py-6">
                    {Object.keys(STORE_CATEGORIES).map(cat => (
                      <div key={cat} onMouseEnter={() => setActiveCategory(cat)} className={`px-12 py-5 text-[11px] font-bold uppercase tracking-[0.2em] cursor-pointer flex justify-between items-center ${activeCategory === cat ? 'bg-white text-pink-600' : 'text-gray-400'}`}>
                        {cat} <ChevronRight size={14} />
                      </div>
                    ))}
                  </div>
                  <div className="flex-1 p-16">
                    <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.5em] mb-10 border-b pb-4">Selected {activeCategory}</h4>
                    <div className="grid grid-cols-3 gap-6">
                      {STORE_CATEGORIES[activeCategory].map(topic => (
                        <Link key={topic} to={`/category/${activeCategory.toLowerCase().replace(/\s+/g, '-')}/${topic.toLowerCase().replace(/\s+/g, '-')}`} onClick={() => setActiveCategory(null)} className="text-[13px] text-gray-600 hover:text-pink-600 transition-colors">
                          {topic}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* --- CART DRAWER --- */}
      <div className={`fixed inset-0 z-[400] transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl transition-transform duration-500 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full p-6">
            <div className="flex justify-between items-center mb-8 border-b pb-4">
              <h2 className="text-lg font-serif italic uppercase tracking-widest">My Bag ({cartBadgeCount})</h2>
              <button onClick={() => setIsCartOpen(false)}><X size={24} /></button>
            </div>
            <div className="flex-1 overflow-y-auto pr-2">
              {cartItems.length === 0 ? (
                <div className="text-center py-20 text-[10px] uppercase text-gray-400 tracking-widest">Your bag is empty</div>
              ) : (
                cartItems.map((item) => (
                  <div key={item._id} className="flex gap-4 mb-6">
                    <img src={item.image} className="w-16 h-20 object-cover bg-gray-50 border" alt={item.name} />
                    <div className="flex-1">
                      <p className="text-[9px] font-black uppercase text-pink-500">{item.brand}</p>
                      <p className="text-xs font-serif italic mb-1">{item.name}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold">₹{item.price} x {item.qty}</span>
                        <button onClick={() => removeFromCart(item._id)} className="text-[9px] underline uppercase">Remove</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="pt-6 border-t mt-auto">
              <Link to="/cart" onClick={() => setIsCartOpen(false)} className="w-full bg-gray-900 text-white py-4 text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                Checkout Now <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* --- MOBILE SIDEBAR --- */}
      <div className={`fixed inset-0 z-[500] transition-transform duration-500 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/20" onClick={() => setIsMobileMenuOpen(false)} />
        <div className="absolute left-0 top-0 h-full w-[85%] bg-white flex flex-col p-8">
          <div className="flex justify-between items-center mb-10">
            <span className="font-serif italic text-xl">NAVIGATION</span>
            <button onClick={() => setIsMobileMenuOpen(false)}><X size={28} /></button>
          </div>
          <nav className="flex flex-col gap-6 text-2xl font-serif italic">
            {Object.keys(STORE_CATEGORIES).map(cat => (
              <Link key={cat} to={`/category/${cat.toLowerCase().replace(/\s+/g, '-')}`} onClick={() => setIsMobileMenuOpen(false)}>{cat}</Link>
            ))}
          </nav>
          {user && (
            <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="mt-auto flex items-center gap-3 text-red-500 text-[10px] font-black tracking-widest uppercase">
              <LogOut size={16} /> SIGN OUT
            </button>
          )}
        </div>
      </div>

      {/* MOBILE BOTTOM BAR */}
      <div className="lg:hidden fixed bottom-6 left-4 right-4 bg-white/95 backdrop-blur-xl border border-white/20 px-4 py-4 z-[150] flex justify-around items-center shadow-xl rounded-3xl">
        <Link to="/" className="text-gray-400"><Home size={18} /></Link>
        <button onClick={() => navigate('/search')} className="text-gray-400"><Search size={18} /></button>
        <button onClick={() => setIsCartOpen(true)} className="relative text-gray-400">
          <ShoppingCart size={18} />
          {cartBadgeCount > 0 && <span className="absolute -top-1 -right-2 bg-black text-white text-[7px] rounded-full h-4 w-4 flex items-center justify-center">{cartBadgeCount}</span>}
        </button>
        <Link to="/profile" className="text-gray-400"><User size={18} /></Link>
      </div>
    </>
  );
}