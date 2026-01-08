import React from 'react';

const BestSellers = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-lg font-black uppercase tracking-widest mb-10 text-gray-800">The Best Sellers</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
           {/* You can map similar product data here as used in EditorsPick */}
           {/* Card style should include the 100ml black badge seen in image_0fc9e5.jpg */}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;