import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import ProfilePage from './pages/ProfilePage';
import MyOrdersPage from './pages/MyOrdersPage'; 
import CheckoutPage from './pages/CheckoutPage';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';
import CategoryPage from './pages/CategoryPage';
import CategoryHub from './components/CategoryHub';
import OrderSuccessPage from './pages/OrderSuccessPage';
import SearchPage from './pages/SearchPage';
import AdminDashboard from './pages/AdminDashboard';
import OfferPage from './components/OfferBanner';

function App() {
  // 1. Unified state for brands
  const [brands, setBrands] = useState([]);

  // 2. Fetch the brands from backend API
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products/brands');
        
        // FIX: Extract string name to prevent "brandName.charAt is not a function"
        const formattedBrands = data.reduce((acc, brand) => {
          // If brand is an object like {name: "LAKME"}, get the name
          const name = typeof brand === 'object' ? brand.name : brand;
          
          if (name && typeof name === 'string') {
            // Safe to use charAt now
            const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
            acc.push(capitalized);
          }
          return acc;
        }, []);

        // Use the correct setter function defined in useState
        setBrands(formattedBrands);
      } catch (error) {
        console.error("Error fetching brands in App.js:", error);
      }
    };

    fetchBrands();
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <Toaster position="bottom-right" reverseOrder={false} />
            
            {/* 3. Pass formatted brands to the Navbar */}
            <Navbar brands={brands} />
            
            <main className="min-h-screen">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/my-orders" element={<MyOrdersPage />} />
                <Route path="/category/:categoryId" element={<CategoryHub />} />
                <Route path="/category/:categoryId/:subCategory" element={<CategoryPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/order-success" element={<OrderSuccessPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/offers" element={<OfferPage />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </Routes>
            </main>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;