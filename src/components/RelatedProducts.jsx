import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import ProductCard from './ProductCard';

// 1. MUST INCLUDE THESE OR SWIPER STAYS INVISIBLE
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const RelatedProducts = ({ currentCategory, allProducts = [], currentId }) => {
  
  // 2. Filter logic (Case-insensitive to avoid errors)
  let related = allProducts.filter(
    (p) => p.category?.toLowerCase() === currentCategory?.toLowerCase() && p._id !== currentId
  );

  // 3. SAFE MODE: If no specific category match, show random items instead of hiding
  if (related.length === 0 && allProducts.length > 0) {
    related = allProducts.filter(p => p._id !== currentId).slice(0, 6);
  }

  // 4. If absolutely no data is found, show nothing
  if (related.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 border-t mt-12 bg-white">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-black text-gray-900 uppercase tracking-[0.2em]">
          YOU MAY ALSO LIKE
        </h2>
        <div className="h-1 w-20 bg-[#91278f] mx-auto mt-4 rounded-full"></div>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={25}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 }, // Matches your homepage grid
        }}
        className="pb-12 px-4 related-swiper"
      >
        {related.map((product) => (
          <SwiperSlide key={product._id}>
            {/* Ensure your ProductCard is imported correctly */}
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RelatedProducts;