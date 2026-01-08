import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { 
  ShoppingCart, Heart, User, Search, 
  ChevronDown, ChevronRight, Sparkles, Tag,
  Home, Menu, X 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

// --- DATA CONSTANTS ---
const FALLBACK_BRANDS = [
  "Lakme", "Lamel", "Elle 18", "Good Vibes", "DermDoc", 
  "Vela", "Ruby Blood", "Petunia", "L.A Girl", "Revolution",
  "Maybelline", "L'Oreal", "Minimalist", "The Ordinary"
];

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

  const { cartItems = [] } = useCart() || {}; 
  const { user } = useAuth() || {};
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
  const isNotMainPage = currentLocation.pathname !== '/';

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
    if (query.trim()) navigate(`/search?q=${query}`);
  };

  return (
    <>
      <header className="bg-white sticky top-0 z-50 shadow-sm font-sans">
        {/* Promo Bar */}
        <div className="bg-[#E8D7D0] text-[#5C4033] text-[10px] md:text-xs py-2 text-center font-bold tracking-[0.1em] uppercase">
          Free Shipping on all Vault Orders over ₹500 | Code: <span className="underline">VAULT20</span>
        </div>

        <nav className="border-b relative bg-white">
          {/* Main Header */}
          <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between gap-4 md:gap-8">
            
            {/* LOGO */}
            <Link to="/" className="flex items-center gap-2 md:gap-3 group shrink-0">
              <div className="bg-[#5C4033] w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-sm">
                <span className="text-[#E8D7D0] font-serif text-lg md:text-xl italic">Bv</span>
              </div>
              <div className="flex flex-col">
                <span className="text-base md:text-xl font-bold text-[#5C4033] tracking-tighter uppercase leading-none">The Beauty</span>
                <span className="text-[8px] md:text-[10px] font-medium text-gray-400 tracking-[0.3em] uppercase leading-none mt-1">Vault</span>
              </div>
            </Link>

            {/* Search Bar (Desktop) */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl relative">
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for skincare, brands..." 
                className="w-full bg-gray-50 border border-gray-100 rounded-full py-2 px-6 text-sm outline-none focus:border-[#5C4033]/30 transition-all"
              />
              <button type="submit" className="absolute right-4 top-2 text-gray-400 hover:text-[#5C4033]">
                <Search size={18} />
              </button>
            </form>

            {/* Desktop User Actions */}
            <div className="hidden md:flex items-center gap-6">
              <Link to="/wishlist" className="flex flex-col items-center text-gray-400 relative hover:text-[#5C4033] transition-colors">
                <Heart size={22} />
                {wishlistBadgeCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] rounded-full h-3 w-3 flex items-center justify-center">
                    {wishlistBadgeCount}
                  </span>
                )}
                <span className="text-[9px] font-bold mt-1 uppercase">Wishlist</span>
              </Link>
              
              <Link to="/cart" className="flex flex-col items-center text-gray-400 hover:text-[#5C4033] transition-colors">
                <div className="relative">
                  <ShoppingCart size={22} />
                  {cartBadgeCount > 0 && (
                    <span className="absolute -top-1 -right-2 bg-[#5C4033] text-white text-[8px] rounded-full h-4 w-4 flex items-center justify-center">
                      {cartBadgeCount}
                    </span>
                  )}
                </div>
                <span className="text-[9px] font-bold mt-1 uppercase">Bag</span>
              </Link>

              {user ? (
                <Link to="/profile" className="flex flex-col items-center text-gray-400 hover:text-[#5C4033]">
                   <div className="w-6 h-6 bg-[#E8D7D0] rounded-full flex items-center justify-center text-[#5C4033] font-bold text-[10px]">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-[9px] font-bold mt-1 uppercase">Profile</span>
                </Link>
              ) : (
                <Link to="/login" className="text-[#5C4033] text-[10px] font-bold uppercase tracking-widest border border-[#5C4033] px-4 py-2 rounded hover:bg-[#5C4033] hover:text-white transition-all">
                  Login
                </Link>
              )}
            </div>

            {/* Mobile "Categories" Trigger - Just a simple button now */}
            <button 
              className="md:hidden text-[#5C4033] font-bold text-[10px] uppercase tracking-widest border border-[#E8D7D0] px-3 py-1.5 rounded-full"
              onClick={() => navigate('/search')}
            >
              Shop All
            </button>
          </div>

          {/* --- DESKTOP NAVIGATION (Large Screens Only) --- */}
          <div className="hidden lg:block border-t border-gray-50 bg-white">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between text-[12px] font-bold uppercase text-gray-500 tracking-[0.15em]">
              <div className="flex gap-10 items-center">
                {isNotMainPage && (
                  <Link to="/" className="text-[#5C4033] hover:scale-110 transition-transform pr-4 border-r border-gray-100">
                    <Home size={18} />
                  </Link>
                )}
                <div 
                  onMouseEnter={() => { setActiveCategory('Skin Care'); setShowBrandsMenu(false); }} 
                  className={`cursor-pointer transition-all hover:text-[#5C4033] flex items-center gap-1 ${activeCategory ? 'text-[#5C4033]' : ''}`}
                >
                  Shop Category <ChevronDown size={16} />
                </div>
                <div 
                  onMouseEnter={() => { setShowBrandsMenu(true); setActiveCategory(null); }} 
                  className={`cursor-pointer transition-all hover:text-[#5C4033] flex items-center gap-1 ${showBrandsMenu ? 'text-[#5C4033]' : ''}`}
                >
                  Our Brands <ChevronDown size={16} />
                </div>
              </div>
              
              <div className="flex gap-10">
                <Link to="/search?q=new" className="hover:text-[#5C4033] flex items-center gap-1.5 transition-colors">
                  <Sparkles size={14} className="text-amber-500" /> New & Trending
                </Link>
                <Link to="/offers" className="hover:text-[#5C4033] flex items-center gap-1.5 transition-colors">
                  <Tag size={14} className="text-red-500" /> Offers
                </Link>
              </div>
            </div>

            {/* Brands Mega Menu */}
            <div onMouseLeave={() => setShowBrandsMenu(false)}>
              {showBrandsMenu && (
                <div className="absolute left-0 w-full bg-white shadow-2xl border-t border-gray-100 z-50 flex animate-in fade-in slide-in-from-top-2">
                  <div className="max-w-7xl mx-auto flex w-full min-h-[450px]">
                    <div className="w-48 bg-gray-50/80 border-r border-gray-100 py-6 overflow-y-auto max-h-[500px]">
                      {Object.keys(categorizedBrands).sort().map((letter) => (
                        <div key={letter} className="w-full py-2 text-center text-[10px] font-black text-[#5C4033]/30 uppercase tracking-widest">
                          {letter}
                        </div>
                      ))}
                    </div>
                    <div className="flex-1 p-12 bg-white">
                      <div className="grid grid-cols-5 gap-y-6 gap-x-12">
                        {Object.values(categorizedBrands).flat().sort().map((brand) => (
                          <Link key={brand} to={`/search?brand=${encodeURIComponent(brand)}`} onClick={() => setShowBrandsMenu(false)} className="text-[13px] font-bold text-gray-500 hover:text-[#5C4033] transition-all uppercase">
                            {brand}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Categories Mega Menu */}
            <div onMouseLeave={() => setActiveCategory(null)}>
              {activeCategory && (
                <div className="absolute left-0 w-full bg-white shadow-2xl border-t border-gray-100 z-50 flex animate-in fade-in slide-in-from-top-2">
                  <div className="max-w-7xl mx-auto flex w-full min-h-[400px]">
                    <div className="w-64 bg-gray-50/50 border-r border-gray-100 py-4">
                      {Object.keys(STORE_CATEGORIES).map((cat) => (
                        <div 
                          key={cat} 
                          onMouseEnter={() => setActiveCategory(cat)} 
                          className={`px-10 py-4 text-[13px] font-bold uppercase tracking-widest cursor-pointer flex justify-between items-center transition-colors ${activeCategory === cat ? 'bg-white text-[#5C4033] border-l-4 border-[#5C4033]' : 'text-gray-400'}`}
                        >
                          {cat} <ChevronRight size={12} />
                        </div>
                      ))}
                    </div>
                    <div className="flex-1 p-12 bg-white">
                      <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-8">
                          <h4 className="text-[14px] font-black text-gray-900 uppercase tracking-[0.4em]">Explore {activeCategory}</h4>
                      </div>
                      <div className="grid grid-cols-3 gap-y-5 gap-x-16">
                        {STORE_CATEGORIES[activeCategory].map((topic) => (
                          <Link key={topic} to={`/category/${activeCategory.toLowerCase().replace(/\s+/g, '-')}/${topic.toLowerCase().replace(/\s+/g, '-')}`} onClick={() => setActiveCategory(null)} className="text-[14px] font-medium text-gray-600 hover:text-[#5C4033] flex items-center gap-3 transition-colors">
                            <div className="w-1.5 h-1.5 bg-gray-200 rounded-full"></div>{topic}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* --- NEW MOBILE BOTTOM TAB BAR --- */}
      {/* --- UPDATED MOBILE BOTTOM TAB BAR --- */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-2 py-3 z-[100] flex justify-around items-center shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        
        <Link to="/" className={`flex flex-col items-center gap-1 min-w-[60px] ${currentLocation.pathname === '/' ? 'text-[#5C4033]' : 'text-gray-400'}`}>
          <Home size={20} strokeWidth={currentLocation.pathname === '/' ? 3 : 2} />
          <span className="text-[9px] font-bold uppercase">Home</span>
        </Link>

        {/* OFFERS LINK ADDED HERE */}
        <Link to="/offers" className={`flex flex-col items-center gap-1 min-w-[60px] ${currentLocation.pathname === '/offers' ? 'text-red-600' : 'text-gray-400'}`}>
          <div className="relative">
            <Tag size={20} strokeWidth={currentLocation.pathname === '/offers' ? 3 : 2} className={currentLocation.pathname === '/offers' ? 'text-red-600' : ''} />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
          </div>
          <span className="text-[9px] font-bold uppercase">Offers</span>
        </Link>

        <Link to="/cart" className={`flex flex-col items-center gap-1 min-w-[60px] relative ${currentLocation.pathname === '/cart' ? 'text-[#5C4033]' : 'text-gray-400'}`}>
          <div className="relative">
            <ShoppingCart size={20} strokeWidth={currentLocation.pathname === '/cart' ? 3 : 2} />
            {cartBadgeCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#5C4033] text-white text-[8px] rounded-full h-3.5 w-3.5 flex items-center justify-center font-bold">
                {cartBadgeCount}
              </span>
            )}
          </div>
          <span className="text-[9px] font-bold uppercase">Bag</span>
        </Link>

        <Link to="/wishlist" className={`flex flex-col items-center gap-1 min-w-[60px] ${currentLocation.pathname === '/wishlist' ? 'text-[#5C4033]' : 'text-gray-400'}`}>
          <div className="relative">
            <Heart size={20} strokeWidth={currentLocation.pathname === '/wishlist' ? 3 : 2} />
            {wishlistBadgeCount > 0 && (
               <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[8px] rounded-full h-3.5 w-3.5 flex items-center justify-center font-bold">
                {wishlistBadgeCount}
              </span>
            )}
          </div>
          <span className="text-[9px] font-bold uppercase">Wishlist</span>
        </Link>

        <Link to="/profile" className={`flex flex-col items-center gap-1 min-w-[60px] ${currentLocation.pathname === '/profile' ? 'text-[#5C4033]' : 'text-gray-400'}`}>
          {user ? (
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${currentLocation.pathname === '/profile' ? 'bg-[#5C4033] text-white' : 'bg-[#E8D7D0] text-[#5C4033]'}`}>
              {user.name?.charAt(0).toUpperCase()}
            </div>
          ) : (
            <User size={20} strokeWidth={currentLocation.pathname === '/profile' ? 3 : 2} />
          )}
          <span className="text-[9px] font-bold uppercase">Account</span>
        </Link>
      </div>
      
      {/* Spacer for bottom nav so content doesn't get hidden behind it */}
      <div className="h-16 lg:hidden"></div>
    </>
  );
}