import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const MegaMenu = ({ activeCategory, setActiveCategory }) => {
  if (!activeCategory) return null;

  // The specific data for your Mini Store topics
  const storeData = {
    "Hair Care": ["Shampoo", "Conditioner", "Hair Oil", "Hair Mask", "Serums"],
    "Skin Care": ["Face Wash", "Face Serums", "Moisturizer", "Sunscreen", "Toners"],
    "Body Care": ["Body Lotion", "Body Wash", "Body Scrub", "Soaps"],
    "Pedicure": ["Foot Cream", "Foot Scrub", "Tools & Kits"],
    "Makeup": ["Lipstick", "Lipliner","lipbalm","Foundation","compact","colorPalette", "Mascara", "Eyeliner", "Kajal", "Primer"]
  };

  return (
    <div className="absolute left-0 w-full bg-white shadow-2xl border-t border-gray-100 z-50 animate-in fade-in slide-in-from-top-2">
      <div className="max-w-7xl mx-auto flex min-h-[300px]">
        
        {/* Left Sidebar: Main Categories */}
        <div className="w-64 bg-gray-50 border-r border-gray-100 py-4">
          {Object.keys(storeData).map((cat) => (
            <div 
              key={cat}
              onMouseEnter={() => setActiveCategory(cat)}
              className={`px-6 py-3 text-[30px] font-black uppercase tracking-widest cursor-pointer flex justify-between items-center transition-colors ${activeCategory === cat ? 'bg-white text-[#91278f] border-l-4 border-[#91278f]' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              {cat} <ChevronRight size={12} />
            </div>
          ))}
        </div>

        {/* Right Content: Specific Care Topics */}
        <div className="flex-1 p-8">
          <h4 className="text-[30px] font-black text-gray-900 uppercase border-b border-gray-100 pb-2 mb-6 tracking-widest">
            {activeCategory} Topics
          </h4>
          <div className="grid grid-cols-3 gap-y-4 gap-x-8">
            {storeData[activeCategory]?.map((topic) => (
              <Link 
                key={topic}
                to={`/category/${activeCategory.toLowerCase().replace(' ', '-')}/${topic.toLowerCase().replace(' ', '-')}`}
                className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter hover:text-[#91278f] transition-colors"
              >
                {topic}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default MegaMenu;