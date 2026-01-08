import React from 'react';
import { Tag, ArrowRight, Sparkles, Percent } from 'lucide-react';
import { Link } from 'react-router-dom';

const OfferPage = () => {
  const deals = [
    {
      id: 1,
      title: "THE SERUM VAULT",
      subtitle: "Flat 20% Off on all Face Serums",
      code: "VAULT20",
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800",
      bgColor: "bg-[#5C4033]",
      textColor: "text-[#E8D7D0]",
      link: "/category/skin-care/face-serums"
    },
    {
      id: 2,
      title: "GLOW ESSENTIALS",
      subtitle: "Buy 2 Get 1 Free on Sunscreens",
      code: "GLOWUP",
      image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=800",
      bgColor: "bg-[#E8D7D0]",
      textColor: "text-[#5C4033]",
      link: "/category/skin-care/sunscreen"
    }
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-[#E8D7D0] p-3 rounded-full text-[#5C4033]">
            <Percent size={24} />
          </div>
        </div>
        <h1 className="text-5xl font-black italic uppercase text-[#5C4033] tracking-tighter">
          Exclusive Offers
        </h1>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em] mt-4">
          Limited time access to the beauty vault
        </p>
      </div>

      {/* Offers Grid */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        {deals.map((deal) => (
          <div 
            key={deal.id}
            className={`relative overflow-hidden rounded-[2rem] p-10 flex flex-col justify-between h-[400px] group transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200 ${deal.bgColor}`}
          >
            {/* Background Image Effect */}
            <div className="absolute right-0 top-0 w-1/2 h-full opacity-30 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
              <img src={deal.image} alt="" className="w-full h-full object-cover" />
            </div>

            <div className={`relative z-10 ${deal.textColor}`}>
              <div className="flex items-center gap-2 mb-6">
                <Sparkles size={16} className="text-amber-400" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Vault Verified Deal</span>
              </div>
              
              <h2 className="text-4xl font-black italic uppercase leading-none mb-4 tracking-tighter">
                {deal.title}
              </h2>
              <p className="text-lg font-bold opacity-90 uppercase tracking-tight mb-8">
                {deal.subtitle}
              </p>

              <div className="flex flex-col gap-4">
                 <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black opacity-60 uppercase">Use Code:</span>
                    <span className="bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-xs font-black tracking-widest border border-white/30">
                      {deal.code}
                    </span>
                 </div>
              </div>
            </div>

            <Link 
              to={deal.link}
              className={`relative z-10 self-start flex items-center gap-3 px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${
                deal.bgColor === 'bg-[#5C4033]' 
                ? 'bg-[#E8D7D0] text-[#5C4033] border-[#E8D7D0] hover:bg-white' 
                : 'bg-[#5C4033] text-[#E8D7D0] border-[#5C4033] hover:bg-black'
              }`}
            >
              Shop the Deal <ArrowRight size={14} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferPage;