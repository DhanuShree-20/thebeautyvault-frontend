import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const HeroSlider = () => {
  // Use professional beauty banners
  const banners = [
    { id: 1, image: "https://i.pinimg.com/1200x/62/53/4c/62534c38208e1d1784d5b9efa7928752.jpg", alt: "Weekend Sale" },
    { id: 2, image: "https://i.pinimg.com/1200x/55/22/cc/5522cc007ff8023d437cee990e92b6a9.jpg", alt: "Brand Deals" },
    { id: 3, image: "https://i.pinimg.com/1200x/2f/98/6f/2f986ffbd10d2f13ac0cfa2e666e5b9f.jpg", alt: "Brand Deals" },
    { id: 4, image: "https://i.pinimg.com/1200x/76/65/ae/7665ae6b872594c240d9962a8ae6030c.jpg", alt: "Brand Deals" },
    { id: 5, image: "https://i.pinimg.com/1200x/dd/23/6f/dd236f069584da47adf24434648d0bac.jpg", alt: "Brand Deals" },
  ];

  return (
    <div className="w-full bg-white relative">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="hero-swiper"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="w-full aspect-[21/9] md:aspect-[25/8]">
              <img src={banner.image} alt={banner.alt} className="w-full h-full object-cover" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .hero-swiper .swiper-button-next, .hero-swiper .swiper-button-prev {
          color: white !important;
          background: rgba(0,0,0,0.2);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          transform: scale(0.6);
        }
        .hero-swiper .swiper-pagination-bullet-active {
          background: #91278f !important;
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;