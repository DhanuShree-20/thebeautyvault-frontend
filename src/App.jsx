import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // REMOVED
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
import API from './api/axios'; // Your custom instance

function App() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        // No need for full URL or BACKEND_URL variable
        // The API instance prepends the correct URL automatically
        const { data } = await API.get('/products/brands');
        
        const formattedBrands = data.reduce((acc, brand) => {
          const name = typeof brand === 'object' ? brand.name : brand;
          
          if (name && typeof name === 'string') {
            const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
            acc.push(capitalized);
          }
          return acc;
        }, []);

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