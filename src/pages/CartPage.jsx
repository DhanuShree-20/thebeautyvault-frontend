import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  // Destructure with default values to prevent the 'undefined' error
  const { cartItems = [], addToCart, removeFromCart } = useCart() || {};

  // Calculate totals
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  // If cart is empty, show a nice empty state
  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 inline-block">
          <div className="bg-indigo-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trash2 className="text-indigo-600" size={32} />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
          <Link to="/" className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition flex items-center gap-2 justify-center">
            <ArrowLeft size={18} />
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-black text-gray-900 mb-10">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center gap-6 shadow-sm">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-contain bg-gray-50 rounded-xl" />
                
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                  <p className="text-indigo-600 font-black text-xl">${item.price}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-xl">
                  {/* Note: This logic assumes your addToCart handles incrementing */}
                  <button className="p-1 hover:text-indigo-600" onClick={() => removeFromCart(item._id)}>
                    <Minus size={18} />
                  </button>
                  <span className="font-bold w-4 text-center">{item.qty}</span>
                  <button className="p-1 hover:text-indigo-600" onClick={() => addToCart(item)}>
                    <Plus size={18} />
                  </button>
                </div>

                <button 
                  onClick={() => removeFromCart(item._id)}
                  className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl sticky top-24">
              <h2 className="text-xl font-black mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold">Free</span>
                </div>
                <div className="border-t pt-4 flex justify-between text-xl font-black text-gray-900">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </div>

              <Link 
                to="/checkout"
                className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-indigo-600 transition flex items-center justify-center gap-3 shadow-lg shadow-gray-200"
              >
                <CreditCard size={20} />
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;