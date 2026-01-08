import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { auth } from '../config/firebase';
import { Loader2, Package, CheckCircle2, Clock, CreditCard, Truck } from 'lucide-react';

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!auth.currentUser) return;
        const token = await auth.currentUser.getIdToken(true);
        
        const { data } = await axios.get('http://localhost:5000/api/orders/myorders', {
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
        <Loader2 className="animate-spin text-indigo-600 mb-2" size={40} />
        <p className="font-bold text-gray-500">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-8">
        <Package size={32} className="text-indigo-600" />
        <h1 className="text-3xl font-black">My Orders</h1>
      </div>

      {orders.length === 0 ? (
        <div className="bg-gray-50 rounded-3xl p-20 text-center border-2 border-dashed border-gray-200">
          <p className="text-xl text-gray-500 font-bold">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white border border-gray-100 shadow-sm rounded-3xl overflow-hidden hover:shadow-md transition-shadow">
              
              {/* Order Header */}
              <div className="bg-gray-50 p-4 px-6 flex flex-wrap justify-between items-center gap-4 border-b border-gray-100">
                <div className="flex gap-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Order ID</p>
                    <p className="text-xs font-mono font-bold text-gray-600">{order._id}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Date</p>
                    <p className="text-xs font-bold text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Payment Method Badge */}
                <div className="flex gap-2">
                  {order.paymentMethod === 'Razorpay' ? (
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black border border-indigo-100">
                      <CreditCard size={12} /> RAZORPAY
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-black border border-orange-100">
                      <Truck size={12} /> CASH ON DELIVERY
                    </span>
                  )}

                  {/* Payment Status Badge */}
                  {order.isPaid ? (
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-black border border-green-100">
                      <CheckCircle2 size={12} /> PAID
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-black border border-red-100">
                      <Clock size={12} /> PENDING
                    </span>
                  )}
                </div>
              </div>

              {/* Order Content */}
              <div className="p-6 grid md:grid-cols-2 gap-8">
                {/* Items List */}
                <div className="space-y-4">
                  {order.orderItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image || 'https://placehold.co/100x100?text=Product'} 
                          alt={item.name} 
                          className="w-full h-full object-contain p-2"
                          onError={(e) => { e.target.src = 'https://placehold.co/100x100?text=Item'; }}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-800 line-clamp-1">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.qty} x ₹{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping & Total Summary */}
                <div className="bg-gray-50/50 p-4 rounded-2xl flex flex-col justify-between border border-gray-100">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Shipping to</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {order.shippingAddress.address},<br />
                      {order.shippingAddress.city} - {order.shippingAddress.postalCode}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-gray-200 flex justify-between items-center">
                    <span className="font-bold text-gray-500">Total Amount</span>
                    <span className="text-2xl font-black text-indigo-600">₹{order.totalPrice.toFixed(2)}</span>
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