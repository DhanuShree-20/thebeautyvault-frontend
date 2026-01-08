import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, ShoppingBag } from 'lucide-react';
import confetti from 'canvas-confetti'; // Optional: npm install canvas-confetti

const OrderSuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger a celebration confetti effect
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#4f46e5', '#818cf8', '#22c55e']
    });
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Animated Icon */}
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-25"></div>
          <div className="relative bg-green-50 p-6 rounded-full inline-block">
            <CheckCircle size={80} className="text-green-500" strokeWidth={1.5} />
          </div>
        </div>

        {/* Success Text */}
        <div className="space-y-3">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            Order Placed!
          </h1>
          <p className="text-gray-500 font-medium px-4">
            Your payment was successful and your package is being prepared for shipment.
          </p>
        </div>

        {/* Order Card */}
        <div className="bg-gray-50 border border-gray-100 rounded-[2rem] p-6 space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400 font-bold uppercase tracking-widest">Status</span>
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-[10px] font-black">
              PAID & CONFIRMED
            </span>
          </div>
          <div className="flex items-center gap-4 text-left">
            <div className="bg-white p-3 rounded-2xl border border-gray-100">
              <Package className="text-indigo-600" />
            </div>
            <div>
              <p className="text-sm font-black text-gray-800">Estimated Delivery</p>
              <p className="text-xs text-gray-500 font-bold">3-5 Business Days</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 gap-4">
          <button 
            onClick={() => navigate('/my-orders')}
            className="group flex items-center justify-center gap-2 w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-[0.98]"
          >
            Track My Order <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 w-full bg-white text-gray-600 py-4 rounded-2xl font-black border-2 border-gray-100 hover:bg-gray-50 transition-all"
          >
            <ShoppingBag size={20} /> Continue Shopping
          </button>
        </div>

        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          A confirmation email has been sent to your registered address.
        </p>
      </div>
    </div>
  );
};

export default OrderSuccessPage;