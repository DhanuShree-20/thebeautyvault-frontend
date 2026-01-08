import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Package, LogOut, Heart, User } from 'lucide-react';

const ProfilePage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center gap-6 mb-10">
          <div className="bg-indigo-100 p-6 rounded-full text-indigo-600">
            <User size={40} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-900">{user?.email?.split('@')[0]}</h1>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/my-orders" className="flex items-center gap-4 p-6 bg-gray-50 rounded-2xl hover:bg-indigo-50 transition">
            <Package className="text-indigo-600" />
            <span className="font-bold text-gray-800">My Orders</span>
          </Link>
          
          <Link to="/wishlist" className="flex items-center gap-4 p-6 bg-gray-50 rounded-2xl hover:bg-pink-50 transition">
            <Heart className="text-pink-600" />
            <span className="font-bold text-gray-800">Wishlist</span>
          </Link>
        </div>

        <button 
          onClick={logout}
          className="mt-8 w-full flex items-center justify-center gap-2 p-4 text-red-500 font-bold border border-red-100 rounded-2xl hover:bg-red-50 transition"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;