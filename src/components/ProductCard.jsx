import React from 'react';
import { ShoppingBag, Heart, Star, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Luxury Discount Calculation
  const elitePrice = Math.floor(product.price * 0.9);

  return (
    <div className="bg-white flex flex-col h-full group transition-all duration-500">
      {/* --- IMAGE SECTION --- */}
      <div className="relative aspect-[3/4] mb-4 bg-[#FBFBFB] overflow-hidden shrink-0 border border-gray-50">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover mix-blend-multiply transition-transform duration-1000 group-hover:scale-110"
        />
        
        {/* TOP BADGES */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.oldPrice && (
            <span className="bg-pink-500 text-white text-[8px] font-black uppercase tracking-widest px-2 py-1">
              Offer
            </span>
          )}
        </div>

        {/* WISHLIST OVERLAY */}
        <button 
          onClick={() => toggleWishlist(product)}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:bg-white transition-all transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 hidden md:block"
        >
          <Heart 
            size={16} 
            className={isInWishlist(product._id) ? "fill-pink-500 text-pink-500" : "text-gray-900"} 
          />
        </button>
        
        {/* Mobile Heart - Always Visible */}
        <button 
          onClick={() => toggleWishlist(product)}
          className="md:hidden absolute top-3 right-3 p-1.5"
        >
          <Heart 
            size={18} 
            className={isInWishlist(product._id) ? "fill-pink-500 text-pink-500" : "text-gray-400"} 
          />
        </button>

        {/* QUICK ADD - DESKTOP ONLY */}
        <button 
          onClick={() => addToCart(product)}
          className="absolute bottom-0 left-0 w-full bg-gray-900/90 backdrop-blur-sm text-white py-4 text-[10px] font-black uppercase tracking-[0.2em] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden md:flex items-center justify-center gap-2"
        >
          <Plus size={14} /> Quick Add
        </button>
      </div>

      {/* --- INFO SECTION --- */}
      <div className="flex flex-col flex-grow px-1">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-pink-500">
            {product.brand}
          </h3>
          <div className="flex items-center gap-1 opacity-60">
            <span className="text-[9px] font-bold">{product.rating || '4.8'}</span>
            <Star size={8} className="fill-gray-900 text-gray-900" />
          </div>
        </div>

        <p className="text-sm font-serif italic text-gray-800 line-clamp-2 leading-tight mb-3 min-h-[40px]">
          {product.name}
        </p>
        
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-lg font-light text-gray-900">₹{product.price.toLocaleString()}</span>
          {product.oldPrice && (
            <span className="text-[10px] text-gray-400 line-through">₹{product.oldPrice.toLocaleString()}</span>
          )}
        </div>

        {/* ELITE PRICE - Stylized Label */}
        <div className="mt-auto border-t border-gray-100 pt-3 mb-4">
          <div className="flex justify-between items-center text-[10px] tracking-widest uppercase">
            <span className="text-gray-400 font-bold">Elite Member</span>
            <span className="text-gray-900 font-black">₹{elitePrice.toLocaleString()}</span>
          </div>
        </div>

        {/* MOBILE ACTION */}
        <button 
          onClick={() => addToCart(product)}
          className="md:hidden w-full border border-gray-900 py-3 text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 active:bg-gray-900 active:text-white transition-colors"
        >
          <ShoppingBag size={12} />
          Add to Bag
        </button>
      </div>
    </div>
  );
};

export default ProductCard;