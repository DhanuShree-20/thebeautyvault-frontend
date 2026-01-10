import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Newsletter Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif mb-4 italic">The Vault <span className="text-pink-500">.</span></h2>
          <p className="text-gray-400 mb-6 max-w-md">
            Join our elite circle. Get exclusive access to limited drops, beauty masterclasses, and secret sales.
          </p>
          <div className="flex max-w-md bg-white/5 rounded-full border border-white/10 p-1">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-transparent border-none outline-none flex-1 px-6 py-2 text-sm"
            />
            <button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-2 rounded-full text-xs font-bold transition-all uppercase tracking-widest">
              Join
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-t border-white/5 pt-12">
          {/* CATEGORIES - Real Navigation Links */}
          <div>
            <h4 className="text-pink-500 font-bold text-[10px] uppercase tracking-[0.3em] mb-6">Categories</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/category/makeup" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Makeup Artistry
                </Link>
              </li>
              <li>
                <Link to="/category/skin-care" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Skin Therapy
                </Link>
              </li>
              <li>
                <Link to="/category/hair-care" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Hair Couture
                </Link>
              </li>
              <li>
                <Link to="/category/body-care" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Fragrance & Body
                </Link>
              </li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h4 className="text-pink-500 font-bold text-[10px] uppercase tracking-[0.3em] mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm">Our Story</Link></li>
              <li><Link to="/affiliates" className="text-gray-400 hover:text-white transition-colors text-sm">Affiliates</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-white transition-colors text-sm">Careers</Link></li>
              <li><Link to="/sustainability" className="text-gray-400 hover:text-white transition-colors text-sm">Sustainability</Link></li>
            </ul>
          </div>

          {/* FOLLOW US */}
          <div className="lg:col-span-2">
            <h4 className="text-pink-500 font-bold text-[10px] uppercase tracking-[0.3em] mb-6">Follow Us</h4>
            <div className="flex gap-4">
              <a href="https://instagram.com" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-pink-600 transition-all">
                <Instagram size={18} />
              </a>
              <a href="https://facebook.com" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-pink-600 transition-all">
                <Facebook size={18} />
              </a>
              <a href="https://youtube.com" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-pink-600 transition-all">
                <Youtube size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 text-center">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">
            © 2026 The Beauty Vault. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;