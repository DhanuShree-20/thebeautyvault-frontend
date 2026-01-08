import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { 
  ChevronLeft, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Star, 
  Heart 
} from 'lucide-react';
import toast from 'react-hot-toast';

// 1. Import the Slider we created earlier
import RelatedProducts from '../components/RelatedProducts'; 

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]); // Needed for the slider
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        setLoading(true);
        // Fetch specific product
        const productRes = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(productRes.data);

        // Fetch all products for the 'Related Products' slider
        const allRes = await axios.get(`http://localhost:5000/api/products`);
        setAllProducts(allRes.data);
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product data:", err);
        setLoading(false);
      }
    };

    fetchPageData();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to bag!`, {
      style: { border: '1px solid #91278f', color: '#91278f', fontWeight: 'bold' }
    });
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#91278f]"></div>
      <p className="text-[#91278f] font-bold animate-pulse">Loading Beauty Details...</p>
    </div>
  );

  if (!product) return <div className="text-center p-20">Product not found.</div>;

  // Calculate discount percentage
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        
        {/* Navigation / Back Button */}
        <button 
          onClick={() => window.history.back()} 
          className="flex items-center text-gray-500 mb-6 hover:text-[#91278f] transition-colors font-bold text-sm uppercase tracking-tight"
        >
          <ChevronLeft size={18} /> Back to Catalog
        </button>
        
        {/* Main Product Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100">
          
          {/* Product Image Container */}
          <div className="bg-gray-50 rounded-2xl flex items-center justify-center p-8 sticky top-28 h-fit">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full rounded-xl object-contain mix-blend-multiply max-h-[450px] hover:scale-105 transition-transform duration-500" 
            />
          </div>
          
          {/* Product Details Content */}
          <div className="flex flex-col">
            <span className="text-[#91278f] font-black uppercase tracking-[0.2em] text-[10px] mb-2">
              {product.category}
            </span>
            
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Ratings Mockup */}
            <div className="flex items-center gap-3 mt-4 mb-6">
              <div className="flex items-center gap-1 bg-emerald-600 text-white px-2 py-0.5 rounded text-sm font-bold">
                {product.rating || '4.5'} <Star size={14} fill="white" />
              </div>
              <span className="text-gray-400 text-xs font-bold underline cursor-pointer">
                {product.numReviews || '1.2k'} Ratings
              </span>
            </div>

            {/* Price Row */}
            <div className="flex items-baseline gap-4 mb-2">
              <span className="text-3xl font-black text-gray-900">₹{product.price}</span>
              <span className="text-xl text-gray-400 line-through font-medium">₹{product.mrp || product.price + 200}</span>
              <span className="text-xl font-black text-emerald-600">{discount || '25'}% OFF</span>
            </div>
            <p className="text-[10px] text-gray-400 font-bold uppercase mb-8 italic">Inclusive of all taxes</p>

            <div className="border-t pt-6 text-gray-600 text-sm leading-relaxed mb-10">
              <h3 className="font-black text-gray-900 uppercase text-[11px] tracking-widest mb-3">Description</h3>
              {product.description}
            </div>
            
            {/* CTA Buttons */}
            <div className="flex gap-4 mt-auto">
              <button 
                onClick={handleAddToCart}
                className="flex-[3] bg-[#91278f] text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-[#7a1e78] transition-all shadow-lg shadow-purple-100 flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} /> Add to Beauty Bag
              </button>
              <button className="flex-1 border-2 border-gray-100 rounded-2xl flex items-center justify-center hover:bg-gray-50 transition-colors group">
                <Heart size={24} className="text-gray-300 group-hover:text-red-500 transition-colors" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 grid grid-cols-3 gap-2 border-t pt-8">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="bg-purple-50 p-2 rounded-full"><Truck size={20} className="text-[#91278f]"/></div>
                <span className="text-[9px] font-black text-gray-500 uppercase tracking-tighter">Free Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="bg-purple-50 p-2 rounded-full"><RotateCcw size={20} className="text-[#91278f]"/></div>
                <span className="text-[9px] font-black text-gray-500 uppercase tracking-tighter">Easy Returns</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="bg-purple-50 p-2 rounded-full"><ShieldCheck size={20} className="text-[#91278f]"/></div>
                <span className="text-[9px] font-black text-gray-500 uppercase tracking-tighter">100% Genuine</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. THE RELATED PRODUCTS SLIDER (You May Also Like) */}
<RelatedProducts 
      currentCategory={product.category} 
      allProducts={allProducts} 
      currentId={product._id} 
    />
        
      </div>
    </div>
  );
}