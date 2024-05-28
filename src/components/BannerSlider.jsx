import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import BannerImage1 from "../assets/images/banner/login-home-banner-1.png";
import BannerImage2 from "../assets/images/banner/login-home-banner-2.png";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

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
        <Link to={"/worry/write"}>
          <img src={BannerImage1} alt="Banner 1" />
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Link to={"/counseling"}>
          <img src={BannerImage2} alt="Banner 2" />
        </Link>
      </SwiperSlide>
    </Swiper>
  );
};
