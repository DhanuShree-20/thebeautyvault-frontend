import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Sparkles } from 'lucide-react';

// Standardized keys to lowercase and hyphenated to match URL slugs
const subTopicImages = {
  // Hair
  "shampoo": "https://i.pinimg.com/1200x/2f/5a/7b/2f5a7b5c29f9d40a46556016f8b053da.jpg",
  "conditioner": "https://i.pinimg.com/736x/4b/b5/ee/4bb5ee0d45430a70f7d2eb954dc21815.jpg",
  "hair-oil": "https://i.pinimg.com/1200x/84/fd/9d/84fd9d2654a25a7e9907520101ee0de7.jpg",
  "serums": "https://i.pinimg.com/736x/0a/01/f6/0a01f6225ce3c4f8425a6f2c26dee756.jpg",
  "hair-mask": "https://i.pinimg.com/736x/a0/20/3b/a0203b551f358e892ce8287409eebb17.jpg",
  
  // Skin
  "face-wash": "https://i.pinimg.com/736x/30/93/34/309334da3d4937515b4824096ba80c99.jpg",
  "moisturizer": "https://i.pinimg.com/736x/64/d7/dd/64d7ddb8a60c2a7549289849c621fcab.jpg",
  "sunscreen": "https://i.pinimg.com/1200x/7e/ae/97/7eae970d0b100a6cc000e6692a968678.jpg",
  "face-serums": "https://i.pinimg.com/1200x/15/bc/96/15bc96f169f4885855923c7596cd904f.jpg",
  "toners": "https://i.pinimg.com/736x/35/88/77/358877903c49dc52e433564294679861.jpg",

  // Body
  "body-wash": "https://i.pinimg.com/736x/bc/88/60/bc8860cd5868ab77209a3ba4ecd45a5f.jpg",
  "body-lotion": "https://i.pinimg.com/736x/f1/08/aa/f108aa3e226902eb9fc51bdf26719dcd.jpg",
  "body-scrub": "https://i.pinimg.com/736x/09/cd/e6/09cde619a4d83890eec754cb0324e7f0.jpg",
  "soap": "https://i.pinimg.com/736x/02/c9/f6/02c9f6da80e1e9e6ec0297f03b6fedf0.jpg",

  // Makeup (Converted to lowercase)
  "lipstick": "https://i.pinimg.com/736x/bc/88/60/bc8860cd5868ab77209a3ba4ecd45a5f.jpg",
  "lipbalm": "https://i.pinimg.com/1200x/63/b5/d1/63b5d108e103cf10cc4c1520e72e8cba.jpg",
  "lipliner": "https://i.pinimg.com/1200x/59/ea/f3/59eaf30b82180e0f9ddecc59aac1bb19.jpg",
  "foundation": "https://i.pinimg.com/736x/73/e1/25/73e1256d94b82fa195ec2fc26b0bb3a6.jpg",
    "compact": "https://i.pinimg.com/1200x/f7/a6/74/f7a6740d9976573601aa529db3d6b25d.jpg",
  "colorpalette": "https://i.pinimg.com/1200x/f8/73/04/f8730443de58ababf5bab7ce4ebf0ff9.jpg",
  "mascara": "https://i.pinimg.com/1200x/3a/f3/32/3af3326e9b3880afb6bd2c69c069ddb2.jpg",
  "eyeliner": "https://i.pinimg.com/736x/64/a2/5a/64a25a336adb404ae96e7ce257bfb19d.jpg",
    "kajal": "https://i.pinimg.com/1200x/59/ea/f3/59eaf30b82180e0f9ddecc59aac1bb19.jpg",
  "primer": "https://i.pinimg.com/736x/73/e1/25/73e1256d94b82fa195ec2fc26b0bb3a6.jpg",
};

const CategoryHub = () => {
  const { categoryId } = useParams();
  
  // Keys must match the slugs sent by your CategoryEssentials (e.g., 'makeup', 'skin-care')
  const topics = {
    "hair-care": ["Shampoo", "Conditioner", "Hair Oil", "Hair Mask", "Serums"],
    "skin-care": ["Face Wash", "Face Serums", "Moisturizer", "Sunscreen", "Toners"],
    "body-care": ["Body Lotion", "Body Wash", "Body Scrub", "Soap"],
    "pedicure": ["Foot Cream", "Foot Scrub", "Tools & Kits"],
    "makeup": ["Lipstick", "Lipliner", "Lipbalm", "Foundation", "Compact", "ColorPalette", "Mascara", "Eyeliner", "Kajal", "Primer"]
  };

  // Convert to lowercase to ensure match
  const normalizedId = categoryId?.toLowerCase();
  const currentTopics = topics[normalizedId] || [];

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-black uppercase tracking-tighter text-gray-900 mb-2">
            {categoryId?.replace('-', ' ')}
          </h1>
          <p className="text-gray-500 font-bold uppercase text-xs tracking-widest flex items-center justify-center gap-2">
            <Sparkles size={16} className="text-[#91278f]" /> 
            Select a routine to explore 
            <Sparkles size={16} className="text-[#91278f]" />
          </p>
        </header>

        {currentTopics.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentTopics.map((topic) => {
              // Create a lowercase hyphenated slug for URLs and image lookup
              const slug = topic.toLowerCase().replace(/\s+/g, '-');
              
              return (
                <Link 
                  key={topic} 
                  to={`/category/${categoryId}/${slug}`}
                  className="group"
                >
                  <div className="relative h-64 w-full transition-all duration-500 bg-white rounded-3xl shadow-xl shadow-purple-100/50 border border-gray-100 p-8 flex flex-col items-center justify-center overflow-hidden hover:rotate-y-12">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                       <ChevronRight size={40} className="text-[#91278f]" />
                    </div>
                    
                    <div className="w-32 h-32 mb-6 transform group-hover:scale-110 transition-transform duration-500">
                      <img 
                        src={subTopicImages[slug] || "https://via.placeholder.com/150"} 
                        alt={topic}
                        className="w-full h-full object-contain mix-blend-multiply"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }}
                      />
                    </div>
                    
                    <h3 className="text-xl font-black text-gray-800 uppercase tracking-tight group-hover:text-[#91278f] transition-colors">
                      {topic}
                    </h3>
                    <div className="mt-2 h-1 w-12 bg-[#91278f] rounded-full transform origin-left group-hover:scale-x-150 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-xl font-bold text-gray-400">Category not found in the Vault.</h2>
            <Link to="/" className="text-[#91278f] underline mt-4 inline-block font-bold">Return Home</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryHub;