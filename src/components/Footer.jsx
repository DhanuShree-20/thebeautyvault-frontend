import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, ChevronRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-white pt-10 md:pt-16 pb-20 md:pb-8"> {/* pb-20 added for mobile bottom nav clearance */}
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Section: Newsletter - Compact on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 pb-10 md:pb-16 border-b border-gray-800">
          <div>
            <h3 className="text-xl md:text-2xl font-serif mb-1 md:mb-2 text-[#E8D7D0]">Join the Vault</h3>
            <p className="text-gray-400 text-xs md:text-sm">Early access to new launches and beauty tips.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Email address" 
              className="w-full bg-white/5 border border-gray-800 px-4 py-2.5 rounded-full text-xs focus:outline-none focus:border-[#E8D7D0] transition-colors"
            />
            <button className="bg-[#5C4033] text-[#E8D7D0] hover:bg-[#4a3329] px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shrink-0">
              Subscribe
            </button>
          </div>
        </div>

        {/* Middle Section: Main Links - Switched to 1 column on smallest screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-10 py-10 md:py-16">
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
               <div className="bg-[#E8D7D0] text-[#5C4033] px-1.5 py-0.5 rounded font-serif italic font-bold">Bv</div>
               <h4 className="text-lg font-black tracking-tighter uppercase leading-none">The Beauty Vault</h4>
            </div>
            <p className="text-gray-500 text-xs mb-6 max-w-sm leading-relaxed">
              Premium beauty brands and curated skincare essentials. 
              Discover the best of botanical beauty and modern grooming.
            </p>
            <div className="flex gap-5">
              <Instagram className="w-4 h-4 text-gray-500 hover:text-[#E8D7D0] cursor-pointer" />
              <Facebook className="w-4 h-4 text-gray-500 hover:text-[#E8D7D0] cursor-pointer" />
              <Twitter className="w-4 h-4 text-gray-500 hover:text-[#E8D7D0] cursor-pointer" />
              <Youtube className="w-4 h-4 text-gray-500 hover:text-[#E8D7D0] cursor-pointer" />
            </div>
          </div>

          <div className="hidden sm:block">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-[#E8D7D0]">Shop By Brand</h4>
            <ul className="text-[11px] text-gray-500 space-y-2.5">
              <li className="hover:text-white cursor-pointer transition-colors">Vela Skincare</li>
              <li className="hover:text-white cursor-pointer transition-colors">Lamel</li>
              <li className="hover:text-white cursor-pointer transition-colors">Ruby Blood</li>
              <li className="hover:text-white cursor-pointer transition-colors">Minimalist</li>
            </ul>
          </div>

          <div className="hidden sm:block">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-[#E8D7D0]">Customer Care</h4>
            <ul className="text-[11px] text-gray-500 space-y-2.5">
              <li className="hover:text-white cursor-pointer transition-colors">Track Order</li>
              <li className="hover:text-white cursor-pointer transition-colors">Return Policy</li>
              <li className="hover:text-white cursor-pointer transition-colors">FAQs</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-[#E8D7D0]">Reach Us</h4>
            <ul className="text-[11px] text-gray-500 space-y-3">
              <li className="flex gap-3 items-center"><MapPin className="w-3.5 h-3.5 text-[#E8D7D0]" /> Mumbai, India</li>
              <li className="flex gap-3 items-center"><Phone className="w-3.5 h-3.5 text-[#E8D7D0]" /> +91 1800 267 4444</li>
              <li className="flex gap-3 items-center"><Mail className="w-3.5 h-3.5 text-[#E8D7D0]" /> help@thebeautyvault.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Payment & Legal */}
        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 grayscale opacity-40">
            <img src="https://static.vecteezy.com/system/resources/previews/020/336/285/original/visa-logo-visa-icon-free-png.png" className="h-3" alt="Visa" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" className="h-3" alt="Mastercard" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" className="h-2.5" alt="PayPal" />
          </div>
          <div className="text-center md:text-right">
            <p className="text-[9px] text-gray-600 uppercase tracking-widest mb-2">
              &copy; 2026 The Beauty Vault. Botanical Beauty.
            </p>
            <div className="flex justify-center md:justify-end gap-4 text-[8px] text-gray-700 uppercase font-bold">
              <span className="hover:text-gray-500 cursor-pointer">Privacy</span>
              <span className="hover:text-gray-500 cursor-pointer">Terms</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;