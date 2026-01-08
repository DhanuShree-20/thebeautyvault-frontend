import React from 'react';
import { useNavigate } from 'react-router-dom';

const BrandDealsGrid = () => {
  const navigate = useNavigate();
  
  // Updated list using your new brand images
  const deals = [
    { id: 1, name: "Vela", img: "https://i.pinimg.com/1200x/0a/de/92/0ade92d4314fa22f320ad73c215c9e47.jpg", link: "/brand/vela" },
    { id: 2, name: "Srntro", img: "https://i.pinimg.com/736x/b8/36/72/b8367220076690cfcadafcf8f6e2d7a1.jpg", link: "/brand/srntro" },
    { id: 3, name: "Starfire", img: "https://i.pinimg.com/736x/7d/b9/56/7db95637c1d1448c6c823c405cd88d08.jpg", link: "/brand/starfire" },
 
  ];


  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-center text-xl font-black uppercase tracking-[0.2em] mb-10 text-gray-900">
        Amazing Deals On Best Brands
      </h2>
      
      {/* Changed to grid-cols-1 (mobile), grid-cols-2 (tablet), and grid-cols-3 (desktop) 
         to better handle the vertical orientation of these images.
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {deals.map((deal) => (
          <div 
            key={deal.id} 
            className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-all duration-300"
            onClick={() => navigate(deal.link)}
          >
            <img 
              src={deal.img} 
              alt={deal.name} 
              className="w-full h-full object-cover cursor-pointer transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Subtle Hover Overlay with Brand Name */}
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6 cursor-pointer">
              <span className="text-white font-bold bg-black/20 backdrop-blur-md px-4 py-2 rounded-full text-sm">
                Shop {deal.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandDealsGrid;