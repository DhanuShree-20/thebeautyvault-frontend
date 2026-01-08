import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';

const WishlistPage = () => {
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <div className="text-center py-20">
        <Heart className="mx-auto text-gray-300 mb-4" size={64} />
        <h2 className="text-2xl font-bold text-gray-900">Your wishlist is empty</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-black mb-8">My Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistItems.map((product) => (
          <div key={product._id} className="bg-white p-4 rounded-2xl border shadow-sm relative">
            <button 
              onClick={() => toggleWishlist(product)}
              className="absolute top-2 right-2 p-2 text-red-500 bg-white rounded-full shadow-md"
            >
              <Trash2 size={18} />
            </button>
            <img src={product.image} alt={product.name} className="h-40 w-full object-contain mb-4" />
            <h3 className="font-bold truncate">{product.name}</h3>
            <p className="text-indigo-600 font-bold mb-4">${product.price}</p>
            <button 
              onClick={() => addToCart(product)}
              className="w-full bg-gray-900 text-white py-2 rounded-xl flex items-center justify-center gap-2"
            >
              <ShoppingCart size={18} /> Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;