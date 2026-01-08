import React from 'react';

const BrandSlider = () => {
  const brands = [
    { id: 1, name: 'Vela', src: 'https://i.pinimg.com/1200x/a7/c0/6e/a7c06e6f6b063cfdb66c9f707e4e5f50.jpg', color: '#f7e8e6' },
    { id: 2, name: 'Srntro', src: 'https://i.pinimg.com/736x/ac/9f/2e/ac9f2ea8f4f80cd1b48d3f52d2befe1d.jpg', color: '#e5e7eb' },
    { id: 3, name: 'Ruby Blood', src: 'https://i.pinimg.com/1200x/1a/d0/1b/1ad01b48a4fbc2a3a46f599ab78050c3.jpg', color: '#fdf2f2' },
    { id: 4, name: 'Starfire', src: 'https://i.pinimg.com/1200x/93/b0/d3/93b0d3917bec7089fd59b481c2f35ddd.jpg', color: '#fefce8' },

  ];

  return (
    <div className="w-full py-16 px-4 bg-white flex flex-col items-center">
      {/* Centered Title Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">Featured Collections</h2>
        <div className="w-24 h-1 bg-pink-500 mx-auto rounded-full" />
      </div>
      
      {/* Centered Grid Container */}
      <div className="max-w-7xl w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {brands.map((brand) => (
            <div 
              key={brand.id}
              className="w-full max-w-[320px] group cursor-pointer"
            >
              <div 
                className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-3"
                style={{ backgroundColor: brand.color }}
              >
                {/* Brand Imagery */}
                <img 
                  src={brand.src} 
                  alt={`${brand.name} collection`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Elegant Minimal Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 text-center">
                  <p className="text-white font-black uppercase tracking-widest text-xl mb-2">{brand.name}</p>
                  <div className="h-[1px] w-12 bg-white mx-auto mb-4" />
                  <span className="text-white text-xs font-bold uppercase tracking-tighter">Explore Selection</span>
                </div>
              </div>
              
              {/* Secondary Bottom Label for accessibility */}
              <div className="mt-6 text-center">
                <p className="text-sm font-black text-gray-400 uppercase tracking-[0.3em] group-hover:text-pink-600 transition-colors">
                  {brand.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default BrandSlider;