import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { auth } from '../config/firebase';
import { 
  Loader2, Package, CheckCircle2, Clock, 
  CreditCard, Truck, ChevronRight, ShoppingBag 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!auth.currentUser) return;
        const token = await auth.currentUser.getIdToken();
        
        const { data } = await axios.get('https://thebeautyvault-backend.onrender.com/api/orders/myorders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-pink-500 mb-4" size={48} strokeWidth={1} />
        <p className="font-serif italic text-gray-400 tracking-widest">Retrieving your vault...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 md:py-12 bg-white">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 border-b border-gray-100 pb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-2">My <span className="italic font-light">Orders</span></h1>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold">Curated History</p>
        </div>
        <div className="flex items-center gap-2 text-pink-500 text-[10px] font-bold tracking-widest uppercase">
          <ShoppingBag size={14} />
          {orders.length} Shipments Secured
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="bg-gray-50/50 rounded-none p-12 md:p-24 text-center border border-gray-100">
          <p className="text-xl text-gray-400 font-serif italic mb-6">Your vault is currently empty.</p>
          <Link to="/search" className="inline-block bg-gray-900 text-white text-[10px] font-bold uppercase tracking-[0.2em] px-8 py-4 hover:bg-pink-600 transition-colors">
            Start Exploring
          </Link>
        </div>
      ) : (
        <div className="space-y-16">
          {orders.map((order) => (
            <div key={order._id} className="group transition-all duration-500">
              
              {/* Order Metadata Bar */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-4 px-2 bg-gray-50/50 border-y border-gray-100 mb-6 gap-4">
                <div className="flex items-center gap-8">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-black mb-1">REFERENCE</p>
                    <p className="text-[11px] font-mono font-medium text-gray-600">#{order._id.slice(-8).toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-black mb-1">PLACED ON</p>
                    <p className="text-[11px] font-bold text-gray-900">
                      {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  {/* Payment Method Badge */}
                  <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black tracking-widest border ${
                    order.paymentMethod === 'Razorpay' 
                    ? 'bg-white text-gray-900 border-gray-200' 
                    : 'bg-amber-50 text-amber-600 border-amber-100'
                  }`}>
                    {order.paymentMethod === 'Razorpay' ? <CreditCard size={10} /> : <Truck size={10} />}
                    {order.paymentMethod.toUpperCase()}
                  </span>

                  {/* Payment Status Badge */}
                  <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black tracking-widest border ${
                    order.isPaid 
                    ? 'bg-pink-50 text-pink-600 border-pink-100' 
                    : 'bg-rose-50 text-rose-600 border-rose-100'
                  }`}>
                    {order.isPaid ? <CheckCircle2 size={10} /> : <Clock size={10} />}
                    {order.isPaid ? 'CONFIRMED' : 'AWAITING'}
                  </span>
                </div>
              </div>

              {/* Order Content Grid */}
              <div className="grid md:grid-cols-3 gap-12 px-2">
                {/* Product List */}
                <div className="md:col-span-2 space-y-8">
                  {order.orderItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-6 group/item cursor-pointer">
                      <div className="relative w-24 h-32 bg-gray-50 overflow-hidden shrink-0 border border-gray-100">
                        <img 
                          src={item.image || 'https://placehold.co/400x500?text=Product'} 
                          alt={item.name} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110" 
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-1">{item.name}</h4>
                        <p className="text-xs text-gray-400 font-medium">
                          Quantity: {item.qty} &bull; <span className="text-pink-500 font-bold">₹{item.price}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping & Summary */}
                <div className="border border-gray-100 p-8 flex flex-col justify-between bg-white shadow-sm group-hover:shadow-md transition-shadow duration-500">
                  <div>
                    <h5 className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-black mb-4">Destination</h5>
                    <address className="not-italic text-xs text-gray-600 leading-relaxed font-medium">
                      <span className="text-gray-900 font-bold uppercase">{order.shippingAddress.address}</span><br />
                      {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br />
                      IN
                    </address>
                  </div>
                  
                  <div className="mt-10 pt-6 border-t border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Investment</span>
                      <span className="text-2xl font-serif text-gray-900">₹{order.totalPrice.toLocaleString()}</span>
                    </div>
                    <button className="w-full flex items-center justify-center gap-2 py-4 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-pink-600 transition-all group/btn">
                      Track Shipment <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;