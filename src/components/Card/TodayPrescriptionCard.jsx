import React from "react";
import loading_thumbnail from "../../assets/loading_thumbnail_x4.png";
import { Link } from "react-router-dom";

const TodayPrescriptionCard = ({
  backgroundColor,
  bookImage,
  bookTitle,
  author,
  isbn,
}) => {
  return (
    <li className="loginHome-card" style={{ backgroundColor }}>
      <h3>오늘의 처방전</h3>
      <div className="loginHome-book-info">
        <Link to={`/book-detail?isbn=${isbn}`}>
          <img
            className="loginHome-book-image"
            src={bookImage ?? loading_thumbnail}
            alt="book thumbnail"
          />
        </Link>

        <div className="loginHome-book-container">
          <div className="loginHome-book-details">
            <p className="loginHome-book-title">{bookTitle}</p>
            <p className="loginHome-book-author">{author}</p>
          </div>
          <Link to={`/book-detail?isbn=${isbn}`}>
            <button className="loginHome-book-button">책 보러 가기</button>
          </Link>
        </div>
      </div>
    </li>
  );
};

export default TodayPrescriptionCard;
