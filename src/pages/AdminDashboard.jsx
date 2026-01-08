import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2, Loader2, PackageSearch } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch products for the dashboard
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/products');
      setProducts(data);
    } catch (error) {
      toast.error("Failed to load inventory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 2. Delete Handler
  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        toast.success("Product removed from vault");
        fetchProducts(); // Refresh list
      } catch (error) {
        toast.error("Error deleting product");
      }
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto p-8 bg-gray-50 min-h-screen">
      {/* Header Section aligned with Luvia style */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 pb-6 border-b border-gray-200 gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900 uppercase italic tracking-tighter">
            Inventory <span className="text-[#9c27b0]">Vault</span>
          </h1>
          <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-[0.2em]">
            Managing {products.length} Products
          </p>
        </div>
        
        <button className="flex items-center gap-2 bg-black hover:bg-[#9c27b0] text-white px-8 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all shadow-lg">
          <Plus size={18}/> Add New Product
        </button>
      </div>

      {/* Main Table Area */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex flex-col justify-center items-center py-32 gap-4">
            <Loader2 className="animate-spin text-[#9c27b0]" size={40} />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Loading Inventory...</span>
          </div>
        ) : products.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Product Info</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Stock</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Price</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-14 h-14 rounded-xl object-cover bg-gray-100 border border-gray-100"
                      />
                      <div>
                        <p className="text-[11px] font-black text-gray-400 uppercase tracking-tighter mb-1">{product.brand}</p>
                        <p className="text-sm font-bold text-gray-900 leading-tight max-w-[200px] line-clamp-1">{product.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="bg-white border border-gray-200 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full text-gray-600">
                      {product.subCategory || product.category}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className={`text-xs font-bold ${product.countInStock < 10 ? 'text-red-500' : 'text-gray-900'}`}>
                        {product.countInStock} Units
                      </span>
                      {product.countInStock < 10 && <span className="text-[8px] font-black text-red-400 uppercase tracking-tighter">Low Stock</span>}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-black text-gray-900">₹{product.price}</p>
                    <p className="text-[10px] text-gray-400 line-through">₹{product.mrp}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex gap-3 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        className="p-2.5 bg-gray-100 hover:bg-blue-50 text-blue-600 rounded-xl transition-colors"
                        title="Edit Product"
                      >
                        <Edit size={16}/>
                      </button>
                      <button 
                        onClick={() => deleteHandler(product._id)}
                        className="p-2.5 bg-gray-100 hover:bg-red-50 text-red-600 rounded-xl transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 size={16}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-32">
            <PackageSearch size={48} className="mx-auto text-gray-200 mb-4" />
            <p className="text-sm font-black text-gray-400 uppercase tracking-widest">Vault is currently empty</p>
          </div>
        )}
      </div>
    </div>
  );
}