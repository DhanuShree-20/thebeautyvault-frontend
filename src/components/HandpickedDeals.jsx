import React from 'react';
import { Heart, ShoppingBag } from 'lucide-react'; // Importing icons
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const HandpickedDeals = () => {
  const { addToCart } = useCart();
  const { toggleWishlist, wishlistItems } = useWishlist();

  const products = [
    {
      _id: "hp1", // Changed to _id to match typical MongoDB/Context patterns
      brand: "Vela",
      name: "Petunia Botanical Face Cream - 50ml",
      price: 1250,
      mrp: 1800,
      discount: "30% off",
      offers: "Bestseller",
      image: "https://i.pinimg.com/1200x/41/54/d9/4154d938005cdc3c1b3a421ac6163522.jpg" 
    },
    {
      _id: "hp2",
      brand: "Srntro",
      name: "Men's Premium Styling Gel & Beard Oil Kit",
      price: 899,
      mrp: 1200,
      discount: "25% off",
      offers: "New Launch",
      image: "https://i.pinimg.com/736x/39/7d/99/397d99744307c876c04c926ab436c44d.jpg"
    },
    {
      _id: "hp3",
      brand: "Starfire",
      name: "Moon Light Radiance Serum with Gold Flakes",
      price: 2100,
      mrp: 2800,
      discount: "25% off",
      offers: "Free Gift",
      image: "https://i.pinimg.com/736x/f8/6a/d2/f86ad27c6ceae85d765b33fb91ae294a.jpg"
    },
    {
      _id: "hp4",
      brand: "Ruby Blood",
      name: "Deep Crimson Velvet Night Repair Mask",
      price: 1550,
      mrp: 2000,
      discount: "22% off",
      offers: "Limited Edition",
      image: "https://i.pinimg.com/736x/d6/bd/48/d6bd486960ae8e9a18ff16fec560eb50.jpg"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Section Header */}
      <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-xl font-black uppercase tracking-widest text-gray-900">Handpicked For You</h2>
          <p className="text-xs text-gray-400 font-medium mt-1">Curated premium beauty essentials</p>
        </div>
        <button className="text-[#91278f] text-xs font-black uppercase tracking-tighter hover:tracking-widest transition-all">
          View All Collections →
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {products.map((p) => {
          const isWishlisted = wishlistItems?.some(item => item._id === p._id);

          return (
            <div key={p._id} className="group relative flex flex-col">
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden mb-4 bg-gray-50 rounded-2xl shadow-sm group-hover:shadow-md transition-shadow">
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[9px] font-black px-2 py-1 rounded-full text-gray-800 shadow-sm z-10">
                  {p.brand}
                </span>

                {/* Wishlist Button */}
                <button 
                  onClick={() => toggleWishlist(p)}
                  className="absolute top-3 right-3 z-20 p-2 bg-white/80 backdrop-blur-md rounded-full text-gray-400 hover:text-red-500 transition-colors shadow-sm"
                >
                  <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} className={isWishlisted ? "text-red-500" : ""} />
                </button>

                <img 
                  src={p.image} 
                  alt={p.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                
                {/* Hover Add to Cart Button */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button 
                    onClick={() => addToCart(p)}
                    className="w-full bg-[#5C4033] text-[#E8D7D0] py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl"
                  >
                    <ShoppingBag size={14} />
                    Add to Bag
                  </button>
                </div>
              </div>
              
              {/* Product Info */}
              <div className="space-y-1.5 px-1 flex-1">
                <span className="text-[10px] font-bold text-[#91278f] uppercase tracking-widest">{p.offers}</span>
                <h3 className="text-sm font-bold text-gray-800 line-clamp-1">{p.name}</h3>
                <div className="flex items-center gap-3">
                  <span className="text-base font-black text-gray-900">₹{p.price}</span>
                  <span className="text-xs text-gray-400 line-through font-medium">₹{p.mrp}</span>
                  <span className="text-xs text-green-600 font-bold">{p.discount}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* PROMOTIONAL BANNER */}
      <div className="relative w-full bg-gradient-to-r from-[#fce4ec] to-[#fde9f1] rounded-[2rem] flex items-center justify-between p-8 md:p-12 overflow-hidden group">
        <div className="absolute right-10 top-1/2 -translate-y-1/2 text-8xl font-black text-pink-200/40 select-none rotate-[-10deg] group-hover:rotate-0 transition-transform duration-1000">
          ELITE Pro
        </div>

        <div className="z-10 max-w-lg">
          <h3 className="text-2xl md:text-4xl font-light text-[#91278f] uppercase tracking-tight mb-2">
            YOUR FREE GIFT <span className="font-black">IS HERE!</span>
          </h3>
          <p className="text-sm text-gray-600 font-semibold mb-8">Select any product of your choice</p>
          
          <div className="flex flex-col sm:flex-row gap-6 mb-10">
            <div className="flex items-center gap-3 text-xs font-bold uppercase text-gray-700">
              <span className="bg-[#91278f] w-8 h-8 flex items-center justify-center rounded-lg text-white shadow-lg shadow-pink-200">🎂</span> 
              Free Birthday Gift
            </div>
            <div className="flex items-center gap-3 text-xs font-bold uppercase text-gray-700">
              <span className="bg-[#91278f] w-8 h-8 flex items-center justify-center rounded-lg text-white shadow-lg shadow-pink-200">🚚</span> 
              Free Shipping on ₹749+
            </div>
          </div>

          <button className="bg-gray-900 text-white px-10 py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-xl hover:bg-pink-600 transition-all transform hover:-translate-y-1">
            GET IT NOW
          </button>
        </div>
        
        <div className="hidden lg:flex items-center gap-6 relative pr-10">
            <div className="relative">
              <img src="https://i.pinimg.com/1200x/12/ec/5b/12ec5b4da13062c3afdf8b95c05eb8b6.jpg" className="w-32 h-44 object-cover rounded-xl shadow-2xl rotate-[-5deg] group-hover:rotate-0 transition-transform duration-500" alt="Gift 1" />
              <div className="absolute -top-2 -right-2 bg-white text-[10px] font-black px-2 py-1 rounded shadow-md text-pink-600">FREE</div>
            </div>
            <div className="relative mt-12">
              <img src="https://i.pinimg.com/1200x/ac/cc/14/accc1416ef680902b40190b5e2b0641a.jpg" className="w-32 h-44 object-cover rounded-xl shadow-2xl rotate-[5deg] group-hover:rotate-0 transition-transform duration-500" alt="Gift 2" />
              <div className="absolute -top-2 -right-2 bg-white text-[10px] font-black px-2 py-1 rounded shadow-md text-pink-600">FREE</div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HandpickedDeals;