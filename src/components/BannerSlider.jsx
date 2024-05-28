import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import BannerImage1 from "../assets/images/banner/login-home-banner-1.png";
import BannerImage2 from "../assets/images/banner/login-home-banner-2.png";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

export const BannerSlider = ({ setBackgroundColor }) => {
  const handleSlideChange = (swiper) => {
    const colors = ["#9BD0D8", "#FCEE97"];
    setBackgroundColor(colors[swiper.activeIndex % colors.length]);
  };
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      onSlideChange={handleSlideChange}
      modules={[Autoplay, Navigation, Pagination]}
    >
      <SwiperSlide>
        <img src={BannerImage1} alt="Banner 1" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={BannerImage2} alt="Banner 2" />
      </SwiperSlide>
    </Swiper>
  );
};
