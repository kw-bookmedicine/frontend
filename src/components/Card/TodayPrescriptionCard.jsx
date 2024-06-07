import React from "react";
import loading_thumbnail from "../../assets/loading_thumbnail_x4.png";
import { Link } from "react-router-dom";
import { handleLinkClick } from "../Slider";

const TodayPrescriptionCard = ({ book, backgroundColor }) => {
  return (
    <li className="loginHome-card" style={{ backgroundColor }}>
      <h3>오늘의 처방전</h3>
      <div className="loginHome-book-info">
        <Link
          to={`/book-detail?isbn=${book.isbn}`}
          onclick={(e) => {
            if (!handleLinkClick(book.isbn)) {
              e.preventDefalut();
            }
          }}
        >
          <img
            className="loginHome-book-image"
            src={book.imageUrl ?? loading_thumbnail}
            alt="book thumbnail"
          />
        </Link>

        <div className="loginHome-book-container">
          <div className="loginHome-book-details">
            <p className="loginHome-book-title">
              {book.title ?? "해리포터와 불의 잔"}
            </p>
            <p className="loginHome-book-author">
              {book.author ?? "J.K. 롤링"}
            </p>
          </div>
          <Link
            to={`/book-detail?isbn=${book.isbn ?? "123"}`}
            onclick={(e) => {
              if (!handleLinkClick(book.isbn)) {
                e.preventDefalut();
              }
            }}
          >
            <button className="loginHome-book-button">책 보러 가기</button>
          </Link>
        </div>
      </div>
    </li>
  );
};

export default TodayPrescriptionCard;
