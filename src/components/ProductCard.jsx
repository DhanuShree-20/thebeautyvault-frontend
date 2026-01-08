import React from 'react';
import { ShoppingBag, Heart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  return (
    <div className="bg-white rounded-xl md:rounded-2xl p-2.5 md:p-4 shadow-sm border border-gray-100 flex flex-col h-full group transition-all hover:shadow-md">
      {/* IMAGE SECTION */}
      <div className="relative aspect-square mb-3 bg-[#F9F9F9] rounded-lg md:rounded-xl overflow-hidden shrink-0">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain p-2 md:p-4 group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* WISHLIST HEART */}
        <button 
          onClick={() => toggleWishlist(product)}
          className="absolute top-2 right-2 p-1.5 md:p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors z-10"
        >
          <Heart 
            size={16} 
            className={isInWishlist(product._id) ? "fill-[#EC266B] text-[#EC266B]" : "text-gray-400"} 
          />
        </button>

        {/* RATING BADGE - Hidden on very small screens to save space, or made smaller */}
        <div className="absolute bottom-2 left-2 bg-white/95 px-1.5 py-0.5 rounded flex items-center gap-1 shadow-sm border border-gray-50">
          <span className="text-[9px] md:text-[10px] font-black">{product.rating || '4.5'}</span>
          <Star size={8} className="fill-green-600 text-green-600" />
          <span className="hidden xs:inline text-[9px] text-gray-400 border-l pl-1 ml-0.5"> {product.numReviews || '1K'}</span>
        </div>
      </div>

      {/* INFO SECTION */}
      <div className="flex flex-col flex-grow">
        <h3 className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-[#5C4033] mb-0.5 truncate">
          {product.brand}
        </h3>
        <p className="text-xs md:text-sm font-bold text-gray-800 line-clamp-2 leading-tight mb-2 min-h-[32px] md:min-h-[40px]">
          {product.name}
        </p>
        
        <div className="flex items-center gap-2 mb-2">
          <span className="text-base md:text-lg font-black text-[#5C4033]">₹{product.price}</span>
          {product.oldPrice && (
            <span className="text-[10px] md:text-xs text-gray-400 line-through">₹{product.oldPrice}</span>
          )}
        </div>

        {/* ELITE MEMBER PRICE - Optimized for mobile layout */}
        <div className="bg-[#FFF9E5] border border-[#F5E1A4] rounded-lg px-2 py-1.5 md:px-3 md:py-2 mb-3 flex justify-between items-center mt-auto">
          <div className="flex flex-col">
            <span className="text-[7px] md:text-[8px] font-black text-[#B08900] uppercase leading-none">Elite Price</span>
            <span className="text-[10px] md:text-xs font-black text-[#5C4033]">₹{Math.floor(product.price * 0.9)}</span>
          </div>
          <Star size={12} className="fill-[#B08900] text-[#B08900] shrink-0" />
        </div>

        {/* ADD TO BAG BUTTON */}
        <button 
          onClick={() => addToCart(product)}
          className="w-full bg-[#EC266B] hover:bg-[#D61F5C] text-white py-2.5 md:py-3 rounded-lg md:rounded-xl font-black text-[9px] md:text-[11px] uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          <ShoppingBag size={14} className="md:w-4 md:h-4" />
          <span>Add to Bag</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;