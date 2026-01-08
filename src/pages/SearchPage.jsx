import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Loader2, PackageSearch } from 'lucide-react';
import ProductFilters from '../components/ProductFilters';
import ProductCard from '../components/ProductCard';

const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]); // This will hold the dynamic brands for the current category
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  
  // 1. EXTRACT PARAMS: Added 'category' to fix the Mascara issue
  const keyword = queryParams.get('q') || '';
  const category = queryParams.get('category') || ''; 
  const brandFromUrl = queryParams.get('brand') || '';

  // 2. Initialize filters
  const [filters, setFilters] = useState({
    price: 5000,
    brand: brandFromUrl ? [brandFromUrl] : [],
    skinType: [],
    rating: 0
  });

  // Reset filters if category changes (optional, but clean)
  useEffect(() => {
    setFilters(prev => ({ ...prev, brand: brandFromUrl ? [brandFromUrl] : [] }));
  }, [category, brandFromUrl]);

  // 3. MAIN FETCH LOGIC
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`https://thebeautyvault-backend.onrender.com/api/products`, {
          params: {
            keyword: keyword,
            category: category, // Sending category to backend
            price: filters.price,
            brand: filters.brand.join(','),
            skinType: filters.skinType.join(','),
            rating: filters.rating,
            sort: sortBy
          }
        });

        // --- CRITICAL FIX: Handling the new object structure { products, availableBrands } ---
        setProducts(data.products || []); 
        setBrands(data.availableBrands || []); // Dynamically sets the sidebar brands
      } catch (err) {
        console.error("Product Fetch Error:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFilteredProducts();
  }, [keyword, category, filters, sortBy]); 

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="mb-10 border-b border-gray-100 pb-8">
          <h1 className="text-4xl font-black text-[#5C4033] uppercase italic tracking-tighter">
            {category ? category : keyword ? `Results for "${keyword}"` : "The Collection"}
          </h1>
          <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-[0.2em]">
            {products.length} Vault Items Found
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            {/* The sidebar now uses 'brands' fetched from the product search result */}
            <ProductFilters 
              filters={filters} 
              setFilters={setFilters} 
              brands={brands.map(b => ({ name: b }))} 
            />
          </aside>

          {/* Results Grid */}
          <main className="flex-1">
            {loading ? (
              <div className="flex flex-col justify-center items-center h-96 gap-4">
                <Loader2 className="animate-spin text-[#E8D7D0]" size={40} />
                <span className="text-[10px] font-black uppercase text-gray-400">Opening the Vault...</span>
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12 animate-in fade-in duration-500">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-32 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                <PackageSearch size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-sm font-black uppercase text-[#5C4033]">No items match your selection</h3>
                <button 
                  onClick={() => setFilters({ price: 5000, brand: [], skinType: [], rating: 0 })}
                  className="mt-4 bg-[#5C4033] text-white text-[10px] font-black uppercase px-8 py-3 rounded-full hover:bg-[#2D2D2D] transition-colors"
                >
                  Clear Selection
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;