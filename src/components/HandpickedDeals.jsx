import React from 'react';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const HandpickedDeals = () => {
  const { addToCart } = useCart();
  const { toggleWishlist, wishlistItems } = useWishlist();

  const products = [
    {
      _id: "hp1",
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
    <section className="bg-white py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- SECTION HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-pink-500">Curated For You</span>
            <h2 className="text-4xl md:text-5xl font-serif italic text-gray-900 tracking-tighter">Handpicked <span className="font-light not-italic text-gray-400">Deals</span></h2>
          </div>
          <button className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-gray-900 border-b border-gray-900 pb-2 transition-all hover:text-pink-500 hover:border-pink-500 w-fit">
            View All Collections <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* --- PRODUCT GRID --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-x-10">
          {products.map((p) => {
            const isWishlisted = wishlistItems?.some(item => item._id === p._id);

            return (
              <div key={p._id} className="group flex flex-col h-full">
                
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-[#FBFBFB] border border-gray-50">
                  {/* Badge */}
                  <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3 py-1 text-[8px] font-black uppercase tracking-widest text-gray-900 shadow-sm">
                    {p.offers}
                  </div>

                  {/* Wishlist */}
                  <button 
                    onClick={() => toggleWishlist(p)}
                    className="absolute top-4 right-4 z-20 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:scale-110 transition-all"
                  >
                    <Heart 
                      size={15} 
                      fill={isWishlisted ? "#ec4899" : "none"} 
                      className={isWishlisted ? "text-pink-500" : "text-gray-900"} 
                    />
                  </button>

                  <img 
                    src={p.image} 
                    alt={p.name} 
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110" 
                  />
                  
                  {/* Quick Add Button (Desktop Only) */}
                  <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out hidden md:block">
                    <button 
                      onClick={() => addToCart(p)}
                      className="w-full bg-gray-900 text-white py-4 text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-2xl hover:bg-pink-600 transition-colors"
                    >
                      <ShoppingBag size={14} /> Add to Bag
                    </button>
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="flex flex-col flex-grow px-1">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">{p.brand}</span>
                  <h3 className="text-sm font-serif italic text-gray-800 line-clamp-2 h-10 leading-snug mb-3">
                    {p.name}
                  </h3>
                  
                  <div className="mt-auto flex items-center gap-3">
                    <span className="text-lg font-light text-gray-900 tracking-tighter">₹{p.price}</span>
                    <span className="text-xs text-gray-300 line-through">₹{p.mrp}</span>
                    <span className="text-[9px] font-black text-pink-500 uppercase tracking-widest">{p.discount}</span>
                  </div>

                  {/* Mobile Mobile Add to Bag (Always visible on mobile) */}
                  <button 
                    onClick={() => addToCart(p)}
                    className="md:hidden mt-4 w-full border border-gray-900 text-gray-900 py-3 text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={12} /> Add to Bag
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HandpickedDeals;