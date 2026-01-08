import React from 'react';
import { ShoppingBag, Heart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 flex flex-col h-full group">
      {/* IMAGE SECTION */}
      <div className="relative aspect-square mb-4 bg-[#F9F9F9] rounded-xl overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* WISHLIST HEART - Positioned top-right of image */}
        <button 
          onClick={() => toggleWishlist(product)}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
        >
          <Heart 
            size={18} 
            className={isInWishlist(product._id) ? "fill-[#EC266B] text-[#EC266B]" : "text-gray-400"} 
          />
        </button>

        {/* RATING BADGE */}
        <div className="absolute bottom-3 left-3 bg-white/90 px-2 py-1 rounded flex items-center gap-1 shadow-sm">
          <span className="text-[10px] font-black">{product.rating || '4.5'}</span>
          <Star size={10} className="fill-green-600 text-green-600" />
          <span className="text-[10px] text-gray-400 border-l pl-1">| {product.numReviews || '1K'}</span>
        </div>
      </div>

      {/* INFO SECTION */}
      <div className="flex flex-col flex-grow">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-[#5C4033] mb-1">
          {product.brand}
        </h3>
        <p className="text-sm font-bold text-gray-800 line-clamp-2 leading-snug mb-3 min-h-[40px]">
          {product.name}
        </p>
        
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-lg font-black text-[#5C4033]">₹{product.price}</span>
          {product.oldPrice && (
            <span className="text-xs text-gray-400 line-through">₹{product.oldPrice}</span>
          )}
        </div>

        {/* ELITE MEMBER PRICE (Optional styling from your screenshot) */}
        <div className="bg-[#FFF9E5] border border-[#F5E1A4] rounded-lg px-3 py-2 mb-4 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-[8px] font-black text-[#B08900] uppercase">Elite Member Price</span>
            <span className="text-xs font-black text-[#5C4033]">₹{Math.floor(product.price * 0.9)}</span>
          </div>
          <Star size={14} className="fill-[#B08900] text-[#B08900]" />
        </div>

        {/* --- THE CONSISTENT ADD TO BAG BUTTON --- */}
        <button 
          onClick={() => addToCart(product)}
          className="w-full bg-[#EC266B] hover:bg-[#D61F5C] text-white py-3 rounded-xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 mt-auto"
        >
          <ShoppingBag size={16} />
          Add to Bag
        </button>
      </div>
    </div>
  );
};

export default ProductCard;