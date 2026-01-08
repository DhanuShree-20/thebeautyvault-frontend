import React from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const EditorsPick = () => {
  const { addToCart } = useCart();
  const { toggleWishlist, wishlistItems } = useWishlist();

  const product = [
    { 
      _id: "ep1", 
      name: "DermDoc 1% Hyaluronic Acid Tinted Lip Balm - Rose", 
      price: 220, 
      mrp: 300, 
      discount: "27% off", 
      image: "https://i.pinimg.com/736x/cb/2b/4c/cb2b4c2f150d14ae50b6cb5d5d64aa91.jpg"
    },
    { 
      _id: "ep2", 
      name: "DermDoc 1% Hyaluronic Acid Tinted Lip Balm - Berry", 
      price: 220, 
      mrp: 300, 
      discount: "27% off", 
      image: "https://i.pinimg.com/736x/14/6b/fd/146bfd18c985d865e85d2f47872e1cbe.jpg"
    },
    { 
      _id: "ep3", 
      name: "Ruby Blood Velvet Lip Repair Night Mask", 
      price: 450, 
      mrp: 600, 
      discount: "25% off", 
      image: "https://i.pinimg.com/1200x/59/66/39/5966399848c73ff7267dc5b161283f79.jpg"
    },
    { 
      _id: "ep4", 
      name: "Vela Petunia Botanical Lip Butter", 
      price: 320, 
      mrp: 450, 
      discount: "28% off", 
      image: "https://i.pinimg.com/1200x/2b/d6/de/2bd6dea2982017e698ae26471fc63bc3.jpg"
    },
  ];

  return (
    <section className="py-16 max-w-7xl mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="text-xl font-black uppercase tracking-[0.2em] text-gray-900">Editor's Pick</h2>
        <p className="text-[#91278f] text-xs font-bold mt-2 cursor-pointer uppercase tracking-tighter hover:tracking-widest transition-all">
          View All Lip Care →
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {product.map(p => {
          const isWishlisted = wishlistItems?.some(item => item._id === p._id);

          return (
            <div key={p._id} className="group border border-gray-100 p-4 rounded-2xl hover:shadow-xl transition-all duration-300 bg-white flex flex-col">
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-xl mb-4 aspect-square bg-gray-50">
                {/* Wishlist Heart */}
                <button 
                  onClick={() => toggleWishlist(p)}
                  className="absolute top-2 right-2 z-20 p-2 bg-white/80 backdrop-blur-md rounded-full text-gray-400 hover:text-red-500 transition-colors shadow-sm"
                >
                  <Heart size={14} fill={isWishlisted ? "#ef4444" : "none"} className={isWishlisted ? "text-red-500" : ""} />
                </button>

                <img 
                  src={p.image} 
                  alt={p.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                
                <div className="absolute top-2 left-2">
                   <span className="text-[9px] font-black text-[#91278f] uppercase bg-white/90 backdrop-blur-sm px-2 py-1 rounded shadow-sm">
                     GET A FREE GIFT
                   </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-2 flex-1">
                <h3 className="text-xs font-bold text-gray-800 h-10 line-clamp-2 leading-snug">
                  {p.name}
                </h3>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-gray-900">₹{p.price}</span>
                  <span className="text-[10px] text-gray-400 line-through font-bold">₹{p.mrp}</span>
                  <span className="text-[10px] text-green-600 font-bold">{p.discount}</span>
                </div>
                
                {/* Add to Cart Button */}
                <button 
                  onClick={() => addToCart(p)}
                  className="w-full mt-4 bg-white border-2 border-[#91278f] text-[#91278f] py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#91278f] hover:text-white transition-all shadow-sm"
                >
                  <ShoppingBag size={14} />
                  ADD TO CART
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default EditorsPick;