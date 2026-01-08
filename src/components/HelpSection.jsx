import React from 'react';
import { ShieldCheck, Sparkles, Headphones } from 'lucide-react';

const HelpSection = () => {
  const items = [
    {
      title: "100% Secure Payments",
      desc: "All major credit & debit cards accepted.",
      icon: <ShieldCheck size={40} className="text-blue-400" />
    },
    {
      title: "Beauty Assistant",
      desc: "Tell me what you are looking for and I will work my magic.",
      icon: <Sparkles size={40} className="text-pink-400" />
    },
    {
      title: "Help Center",
      desc: "Got a question? Look no further. Browse FAQs or submit your query.",
      icon: <Headphones size={40} className="text-orange-400" />
    }
  ];

  return (
    <div className="bg-white py-16 border-t border-gray-50">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
        {items.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-4 shadow-inner">
              {item.icon}
            </div>
            <h3 className="text-md font-bold text-gray-800 mb-2">{item.title}</h3>
            <p className="text-xs text-gray-500 max-w-[200px] leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpSection;