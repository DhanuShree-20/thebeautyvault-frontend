import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Top Section: Newsletter Signup */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pb-16 border-b border-gray-800">
          <div>
            <h3 className="text-2xl font-serif mb-2">Join the Beauty Club</h3>
            <p className="text-gray-400">Subscribe for early access to new launches and beauty tips.</p>
          </div>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full bg-transparent border border-gray-700 px-4 py-3 rounded-lg focus:outline-none focus:border-pink-500 transition-colors"
            />
            <button className="bg-pink-600 hover:bg-pink-700 px-8 py-3 rounded-lg font-bold transition-all">
              Join
            </button>
          </div>
        </div>

        {/* Middle Section: Main Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 py-16">
          <div className="col-span-2 lg:col-span-2">
            <h4 className="text-2xl font-black tracking-tighter mb-6 uppercase">Purplle</h4>
            <p className="text-gray-400 text-sm mb-6 max-w-sm leading-relaxed">
              Your ultimate destination for premium beauty brands and curated skincare essentials. 
              Discover the best of botanical beauty and modern grooming.
            </p>
            <div className="flex gap-4">
              <Instagram className="w-5 h-5 text-gray-400 hover:text-pink-500 cursor-pointer" />
              <Facebook className="w-5 h-5 text-gray-400 hover:text-blue-500 cursor-pointer" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-sky-400 cursor-pointer" />
              <Youtube className="w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer" />
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-gray-200">Shop By Brand</h4>
            <ul className="text-sm text-gray-400 space-y-3">
              <li className="hover:text-white cursor-pointer transition-colors">Vela Skincare</li>
              <li className="hover:text-white cursor-pointer transition-colors">Srntro Mens</li>
              <li className="hover:text-white cursor-pointer transition-colors">Elf Cosmo</li>
              <li className="hover:text-white cursor-pointer transition-colors">Starfire</li>
              <li className="hover:text-white cursor-pointer transition-colors">Ruby Blood</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-gray-200">Customer Care</h4>
            <ul className="text-sm text-gray-400 space-y-3">
              <li className="hover:text-white cursor-pointer transition-colors">Track Order</li>
              <li className="hover:text-white cursor-pointer transition-colors">Return Policy</li>
              <li className="hover:text-white cursor-pointer transition-colors">FAQs</li>
              <li className="hover:text-white cursor-pointer transition-colors">Contact Us</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-gray-200">Reach Us</h4>
            <ul className="text-sm text-gray-400 space-y-4">
              <li className="flex gap-3"><MapPin className="w-4 h-4 text-pink-500" /> Mumbai, India</li>
              <li className="flex gap-3"><Phone className="w-4 h-4 text-pink-500" /> +91 1800 267 4444</li>
              <li className="flex gap-3"><Mail className="w-4 h-4 text-pink-500" /> support@purplle.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Payment & Legal */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6 grayscale opacity-60">
            <img src="https://static.vecteezy.com/system/resources/previews/020/336/285/original/visa-logo-visa-icon-free-png.png" className="h-5" alt="Visa" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" className="h-5" alt="Mastercard" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" className="h-4" alt="PayPal" />
          </div>
          <div className="text-center md:text-right">
            <p className="text-[11px] text-gray-500 uppercase tracking-widest mb-1">
              &copy; 2026 Purplle. Inspired by botanical beauty.
            </p>
            <div className="flex gap-4 text-[10px] text-gray-600 uppercase">
              <span className="hover:text-gray-400 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-gray-400 cursor-pointer">Terms & Conditions</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;