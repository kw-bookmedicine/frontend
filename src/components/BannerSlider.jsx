import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import BannerImage1 from "../assets/images/banner/login-home-banner-1.png";
import BannerImage2 from "../assets/images/banner/login-home-banner-2.png";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

// 2개일때 슬라이드 강제로 넘길시 하얀화면 보임 -> 3개이상일시 버그 없어짐
export const BannerSlider = () => {
  // 배경색상
  const [backgroundColor, setBackgroundColor] = useState("#9BD0D8");
  const handleSlideChange = (swiper) => {
    const colors = ["#9BD0D8", "#FCEE97"];
    setBackgroundColor(colors[swiper.realIndex % colors.length]);
  };
  return (
    <Swiper
      className="banner-slider"
      centeredSlides={true}
      loop={true}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      // pagination={{
      //   clickable: true,
      // }}
      onSlideChange={handleSlideChange}
      modules={[Autoplay, Navigation, Pagination]}
    >
      <SwiperSlide>
        <SlideContent
          image={BannerImage1}
          link="/worry/write"
          backgroundColor={backgroundColor}
        />
      </SwiperSlide>
      <SwiperSlide>
        <SlideContent
          image={BannerImage2}
          link="/counseling"
          backgroundColor={backgroundColor}
        />
      </SwiperSlide>
      <SwiperSlide>
        <SlideContent
          image={BannerImage1}
          link="/worry/write"
          backgroundColor={backgroundColor}
        />
      </SwiperSlide>
      <SwiperSlide>
        <SlideContent
          image={BannerImage2}
          link="/counseling"
          backgroundColor={backgroundColor}
        />
      </SwiperSlide>
    </Swiper>
  );
};

const SlideContent = ({ image, link, backgroundColor }) => (
  <div className="loginHome-banner-container" style={{ backgroundColor }}>
    <div className="loginHome-banner-contents">
      <Link to={link}>
        <img src={image} alt="Banner" />
      </Link>
    </div>
  </div>
);
