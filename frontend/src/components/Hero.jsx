// import react from 'react';
// import Cookies from '../assets/cookies.png';
// import 'animate.css';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import { useEffect } from 'react';

// export default function Hero(){


//     return(

//     <div className="hero-container">
       
//         </div>

//     );
// }


import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import offers from "../assets/offers.png"

const HERO_IMAGES = [
  {
    src: "https://d1c124wpoew66.cloudfront.net//spree/content/web_banners/2321/desktop/big/desktop-en.jpg?1754308080",
    alt: "Imported Grocery",
  },
//   {
//     src: "https://d1c124wpoew66.cloudfront.net//spree/content/web_banners/2606/desktop/big/gift-card-desktop-en.jpg?1750601060",
//     alt: "Exclusive Offers",
//   },
//   {
//     src: "",
//     alt: "Best Deals",
//   },
];

export default function Hero() {
  return (
    <section className="hero-section">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        className="hero-swiper"
      >
        {HERO_IMAGES.map((item, index) => (
          <SwiperSlide key={index}>
            <img className="hero-image" src={item.src} alt={item.alt} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}



 
        



