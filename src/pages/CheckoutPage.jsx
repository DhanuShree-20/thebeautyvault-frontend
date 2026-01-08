import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { auth } from '../config/firebase';
import { useCart } from '../context/CartContext';
import { Loader2, Truck, CreditCard, ShieldCheck, ChevronLeft, AlertCircle } from 'lucide-react';

const CheckoutPage = () => {
  const { cartItems, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: 'India'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!auth.currentUser) return navigate('/login');
    
    setLoading(true);

    try {
      const token = await auth.currentUser.getIdToken(true);

      // 1. Initialize Razorpay Order
      const { data: razorpayOrder } = await axios.post(
        'http://localhost:5000/api/orders/razorpay', 
        { amount: subtotal }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 2. Razorpay Options
      const options = {
        key: "rzp_test_Rzj8IQ1OMfKFtO", 
        amount: razorpayOrder.amount,
        currency: "INR",
        name: "MODERNSHOP",
        description: "Secure Purchase",
        order_id: razorpayOrder.id,
        handler: async (response) => {
          setLoading(true);

          // 3. EXPLICIT DATA MAPPING (Solves the "product is required" error)
          const successData = {
            orderItems: cartItems.map(item => {
              // We check for _id (MongoDB) or id (Frontend) to find the product reference
              const prodId = item._id || item.id;
              
              if (!prodId) {
                console.error("Critical: Product ID missing for item:", item.name);
              }

              return {
                name: item.name,
                qty: Number(item.qty),
                image: item.image,
                price: Number(item.price),
                product: prodId, // This MUST match your OrderModel 'product' field
              };
            }),
            shippingAddress: {
              address: formData.address,
              city: formData.city,
              postalCode: formData.postalCode,
              country: formData.country,
            },
            paymentMethod: 'Razorpay',
            totalPrice: Number(subtotal),
            paymentResult: {
              id: response.razorpay_payment_id,
              status: 'success',
              update_time: new Date().toISOString(),
              email_address: auth.currentUser.email
            }
          };

          // Log exactly what is being sent to verify "product" exists
          console.log("Final payload to DB:", successData);

          try {
            // 4. Save to MongoDB
            await axios.post('http://localhost:5000/api/orders', successData, {
              headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` 
              },
            });

            clearCart();
            navigate('/order-success');
          } catch (err) {
            const serverMsg = err.response?.data?.error || err.response?.data?.message || err.message;
            console.error("Database Save Failed:", serverMsg);
            setError(`Payment was successful, but the order wasn't saved: ${serverMsg}`);
          } finally {
            setLoading(false);
          }
        },
        prefill: { email: auth.currentUser.email },
        theme: { color: "#4f46e5" },
        modal: { ondismiss: () => setLoading(false) }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error("Payment Failed to Start:", err);
      setError("Failed to initialize payment. Please try again.");
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-black text-gray-800">Your cart is empty</h2>
        <button onClick={() => navigate('/')} className="mt-4 flex items-center gap-2 text-indigo-600 font-bold hover:underline">
          <ChevronLeft size={20} /> Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-12 relative">
      {loading && (
        <div className="fixed inset-0 bg-white/90 z-50 flex flex-col items-center justify-center">
          <Loader2 className="animate-spin text-indigo-600 mb-4" size={60} />
          <h2 className="text-xl font-black text-indigo-900">VERIFYING TRANSACTION...</h2>
        </div>
      )}

      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Checkout</h1>
          {error && (
            <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-center gap-3 rounded-r-xl">
              <AlertCircle size={20} />
              <p className="text-sm font-bold">{error}</p>
            </div>
          )}
        </div>

        <form onSubmit={handlePayment} className="space-y-6">
          <section className="space-y-4">
            <h2 className="text-lg font-black flex items-center gap-2 text-gray-800">
              <Truck className="text-indigo-600" size={24} /> Shipping Details
            </h2>
            
            <div className="grid grid-cols-1 gap-4">
              <input name="address" placeholder="House No / Street / Area" className="w-full p-4 border-2 border-gray-100 rounded-2xl focus:border-indigo-600 outline-none transition" onChange={handleChange} required />
              
              <div className="grid grid-cols-2 gap-4">
                <input name="city" placeholder="City" className="w-full p-4 border-2 border-gray-100 rounded-2xl focus:border-indigo-600 outline-none transition" onChange={handleChange} required />
                <input name="postalCode" placeholder="Pincode (6 digits)" className="w-full p-4 border-2 border-gray-100 rounded-2xl focus:border-indigo-600 outline-none transition" onChange={handleChange} required />
              </div>
              
              <input name="country" value={formData.country} className="w-full p-4 border-2 border-gray-100 rounded-2xl bg-gray-50 text-gray-400 outline-none" readOnly />
            </div>
          </section>

          <div className="p-6 bg-indigo-50 rounded-3xl border-2 border-indigo-100">
            <div className="flex items-center gap-2 text-indigo-900 font-black mb-2">
              <CreditCard size={20} /> Secure Razorpay Checkout
            </div>
            <p className="text-xs text-indigo-600 font-medium">All major cards, UPI, and Netbanking are supported.</p>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition disabled:bg-gray-300"
          >
            {loading ? "PROCESSING..." : `PAY ₹${subtotal.toLocaleString('en-IN')}`}
          </button>
        </form>
      </div>

      <div className="lg:sticky lg:top-10 h-fit">
        <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100">
          <h2 className="text-xl font-black mb-6">Order Summary</h2>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {cartItems.map(item => (
              <div key={item._id || item.id} className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center p-2 border border-gray-200">
                    <img src={item.image} alt="" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800 line-clamp-1">{item.name}</p>
                    <p className="text-xs text-gray-400 font-black">Qty: {item.qty}</p>
                  </div>
                </div>
                <span className="font-black text-gray-700">₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t-2 border-dashed border-gray-200 flex justify-between items-center">
            <span className="text-lg font-black text-gray-900">Total Payable</span>
            <span className="text-3xl font-black text-indigo-600">₹{subtotal.toLocaleString('en-IN')}</span>
          </div>

          <div className="mt-6 flex items-center gap-2 text-green-700 bg-green-50 p-3 rounded-xl text-[10px] font-black uppercase">
            <ShieldCheck size={18} /> 256-Bit SSL Secure Payment
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;