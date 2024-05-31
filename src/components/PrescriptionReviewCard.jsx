import React from "react";
import { Link } from "react-router-dom";
import { toYYYYMMDD } from "./../util/toYYYYMMDD";

const PrescriptionReviewCard = ({
  createdDate,
  title,
  content,
  nickname,
  userImg,
  boardId,
}) => {
  return (
    <li className="LoginHome-today-reviews-items-card">
      {/* <p className="LoginHome-today-reviews-items-card-date">{createdDate}</p> */}
      <Link to={`/worry-detail?board=${boardId}`}>
        <div className="LoginHome-today-reviews-items-card-body">
          <div className="LoginHome-today-reviews-items-card-book">
            <h2>{title}</h2>
            <h3>{content}</h3>
          </div>
        </div>
      </Link>
      <div className="LoginHome-today-reviews-items-card-footer">
        <div className="LoginHome-user-img-container">
          {userImg ? <img src={userImg} alt="유저 이미지" /> : null}
        </div>
        <div>
          <p>{nickname}</p>
          <p className="LoginHome-card-date">{toYYYYMMDD(createdDate)}</p>
        </div>
      </div>
    </li>
  );
};

export default PrescriptionReviewCard;
