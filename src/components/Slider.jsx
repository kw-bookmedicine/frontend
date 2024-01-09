import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../styles/Slider.css";
// import "../styles/LoginHome.css";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function Slider({ title, subtitle, isBestSeller, bookTitle, bookAuthor }) {
  const numberOfSlides = 10;

  const slides = Array.from({ length: numberOfSlides }, (_, index) => (
    <SwiperSlide key={index} className="test">
      <div className="item-wrapper">
        <div className="item-image"></div>
        <div className="item-detail">
          <div className="item-title">{bookTitle}</div>
          <div className="item-author">{bookAuthor}</div>
        </div>
      </div>
      {isBestSeller && <div className="item-rank">{index + 1}</div>}
    </SwiperSlide>
  ));

  return (
    <div className="best">
      <div className="best-wrapper">
        <div className="title-wrapper">
          <div className="best-title title">{title}</div>
          <div className="best-subtitle subtitle">{subtitle}</div>
        </div>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={0}
          slidesPerView={7}
          navigation
        >
          {slides}
        </Swiper>
      </div>
    </div>
  );
}

export default Slider;
