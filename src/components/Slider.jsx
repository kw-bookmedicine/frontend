import React, { useEffect, useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "../styles/Slider.css";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// ASSETS
import rightArrowIcon from "../assets/icons/login-home/right_arrow_icon.png";
import leftArrowIcon from "../assets/icons/login-home/left_arrow_icon.png";
import loading_thumbnail from "../assets/loading_thumbnail_x4.png";
import { Link } from "react-router-dom";

const Slider = ({ title, subtitle, isBestSeller, books }) => {
  const numberOfSlides = 10;

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    if (prevRef.current && nextRef.current) {
      prevRef.current.swiperParams = {
        navigation: { prevEl: prevRef.current, nextEl: nextRef.current },
      };
    }
  }, []);

  const slides = (
    books && books.length > 0
      ? books
      : Array.from({ length: numberOfSlides }, (_, index) => ({
          isbn: "undefined",
          title: "",
          author: "",
          imageUrl: loading_thumbnail,
        }))
  ).map((book, index) => (
    <SwiperSlide key={index}>
      <div className="item-wrapper">
        <Link
          to={`/book-detail?isbn=${book.isbn}`}
          onClick={(e) => {
            if (!handleLinkClick(book.isbn)) {
              e.preventDefault();
            }
          }}
        >
          <div className="item-image">
            <img src={book.imageUrl ?? loading_thumbnail} alt="책 이미지" />
          </div>
        </Link>
        <Link
          to={`/book-detail?isbn=${book.isbn}`}
          onClick={(e) => {
            if (!handleLinkClick(book.isbn)) {
              e.preventDefault();
            }
          }}
        >
          <div className="item-detail">
            <div className="item-title">{book.title}</div>
            <div className="item-author">{book.author}</div>
          </div>
        </Link>
        {isBestSeller && <div className="item-rank">{index + 1}</div>}
      </div>
    </SwiperSlide>
  ));

  return (
    <div className="loginHome-best-wrapper">
      <button ref={prevRef} className="loginHome-prev-button">
        <img src={leftArrowIcon} alt="왼쪽 방향 아이콘" />
      </button>
      <button ref={nextRef} className="loginHome-next-button">
        <img src={rightArrowIcon} alt="오른쪽 방향 아이콘" />
      </button>
      <div className="title-wrapper">
        <div className="best-title">{title}</div>
        <div className="best-subtitle">{subtitle}</div>
      </div>
      <Swiper
        id="slider-swiper"
        className="loginHome-slider"
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={0}
        slidesPerView={6}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onSwiper={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
      >
        {slides}
      </Swiper>
    </div>
  );
};

export default Slider;

// isbn이 없으면 페이지 이동하지 않고 alert로 경고
export const handleLinkClick = (isbn) => {
  if (isbn === "undefined") {
    alert("현재 준비중입니다.");
    return false;
  }
  return true;
};
