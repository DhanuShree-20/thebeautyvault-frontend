import React from 'react';

const PromoGrid = () => {
  const promos = [
    { brand: "DERMDOC", offer: "GET A FREE GIFT ON ₹499", color: "bg-blue-50" },
    { brand: "MARS", offer: "UPTO 20% OFF", color: "bg-cyan-50" },
    { brand: "FACES CANADA", offer: "EXTRA 5% OFF ON ₹299+", color: "bg-blue-100" },
    { brand: "ALPS GOODNESS", offer: "GET A FREE GIFT ON ₹499", color: "bg-cyan-50" }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 w-full border-t border-b border-gray-100">
      {promos.map((p, i) => (
        <div key={i} className={`${p.color} p-8 flex flex-col items-center text-center border-r last:border-r-0 border-white`}>
          <span className="text-[10px] font-black text-gray-500 tracking-widest">{p.brand}</span>
          <h3 className="text-sm font-black text-blue-900 mt-2">{p.offer}</h3>
          <p className="text-[9px] font-bold text-blue-600 mt-1">Extra 5% off on ₹299</p>
        </div>
      ))}
    </div>
  );
};

export default PromoGrid; // <--- ADD THIS LINE