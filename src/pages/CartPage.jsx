import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, CreditCard, Truck, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cartItems = [], addToCart, removeFromCart, clearCart } = useCart() || {};
  const [paymentMethod, setPaymentMethod] = useState('online'); // 'online' or 'cod'

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <div className="inline-block">
          <div className="relative mb-8 flex justify-center">
            <ShoppingBag size={80} strokeWidth={0.5} className="text-gray-200" />
            <span className="absolute inset-0 flex items-center justify-center text-xs font-serif italic text-gray-400 mt-4">Empty</span>
          </div>
          <h2 className="text-3xl font-serif text-gray-900 mb-4">Your Shopping Bag is <span className="italic">Reserved</span></h2>
          <p className="text-gray-500 mb-10 text-sm tracking-widest uppercase">Start adding items to your beauty collection.</p>
          <Link to="/" className="inline-flex items-center gap-3 bg-gray-900 text-white px-10 py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-pink-600 transition-all">
            <ArrowLeft size={14} /> Back to Boutique
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 border-b border-gray-100 pb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-2">Shopping <span className="italic">Bag</span></h1>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold">Review Your Selection</p>
          </div>
          <button 
            onClick={() => clearCart()} 
            className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors font-bold"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* --- Cart Items List --- */}
          <div className="lg:col-span-8 space-y-10">
            {cartItems.map((item) => (
              <div key={item._id} className="group flex flex-row items-start gap-6 pb-10 border-b border-gray-50">
                {/* Product Image */}
                <div className="w-24 h-32 md:w-32 md:h-40 bg-gray-50 overflow-hidden shrink-0 border border-gray-100">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                </div>
                
                {/* Product Info */}
                <div className="flex-1 flex flex-col h-full justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900 text-sm md:text-base uppercase tracking-wider">{item.name}</h3>
                      <button onClick={() => removeFromCart(item._id)} className="text-gray-300 hover:text-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-pink-500 font-serif italic text-lg">₹{item.price.toLocaleString()}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center border border-gray-200 rounded-none">
                      <button className="p-2 hover:bg-gray-50 transition" onClick={() => removeFromCart(item._id)}>
                        <Minus size={14} />
                      </button>
                      <span className="text-xs font-bold w-10 text-center">{item.qty}</span>
                      <button className="p-2 hover:bg-gray-50 transition" onClick={() => addToCart(item)}>
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      Subtotal: <span className="text-gray-900">₹{(item.price * item.qty).toLocaleString()}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* --- Order Summary --- */}
          <div className="lg:col-span-4">
            <div className="bg-gray-50 p-8 sticky top-24 border border-gray-100">
              <h2 className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-black mb-8">Summary</h2>
              
              {/* Payment Method Selection */}
              <div className="mb-8">
                <p className="text-[10px] uppercase tracking-widest text-gray-900 font-black mb-4">Payment Method</p>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setPaymentMethod('online')}
                    className={`flex flex-col items-center gap-2 py-4 border text-[9px] font-bold uppercase transition-all ${paymentMethod === 'online' ? 'bg-white border-pink-500 text-pink-500 shadow-sm' : 'bg-transparent border-gray-200 text-gray-400'}`}
                  >
                    <CreditCard size={16} /> Online
                  </button>
                  <button 
                    onClick={() => setPaymentMethod('cod')}
                    className={`flex flex-col items-center gap-2 py-4 border text-[9px] font-bold uppercase transition-all ${paymentMethod === 'cod' ? 'bg-white border-pink-500 text-pink-500 shadow-sm' : 'bg-transparent border-gray-200 text-gray-400'}`}
                  >
                    <Truck size={16} /> Cash on Delivery
                  </button>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-xs text-gray-500 uppercase tracking-widest">
                  <span>Bag Total</span>
                  <span className="text-gray-900 font-bold">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500 uppercase tracking-widest">
                  <span>Shipping</span>
                  <span className="text-pink-500 font-black italic">Complimentary</span>
                </div>
                <div className="border-t border-gray-200 pt-6 flex justify-between items-baseline">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">Total Investment</span>
                  <span className="text-3xl font-serif text-gray-900">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <Link 
                to="/checkout"
                state={{ paymentMethod }}
                className="w-full bg-gray-900 text-white py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-pink-600 transition-all flex items-center justify-center gap-3"
              >
                Checkout Securely
              </Link>
              
              <p className="mt-6 text-[9px] text-gray-400 text-center uppercase tracking-widest leading-relaxed">
                Taxes and Duties calculated at checkout <br /> Free returns on all eligible orders
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;