import React from "react";
import { Link } from "react-router-dom";
import { toYYYYMMDD } from "./../util/toYYYYMMDD";

const PrescriptionReviewCard = ({ post }) => {
  return (
    <li className="LoginHome-today-reviews-items-card">
      {/* <p className="LoginHome-today-reviews-items-card-date">{createdDate}</p> */}
      <Link to={`/worry-detail?board=${post.boardId}`}>
        <div className="LoginHome-today-reviews-items-card-body">
          <div className="LoginHome-today-reviews-items-card-book">
            <h2>{post.title}</h2>
            <h3>{post.content}</h3>
          </div>
        </div>
      </Link>
      <div className="LoginHome-today-reviews-items-card-footer">
        <div className="LoginHome-user-img-container">
          {post.userImg ? <img src={post.userImg} alt="유저 이미지" /> : null}
        </div>
        <div>
          <p>{post.nickname}</p>
          <p className="LoginHome-card-date">{toYYYYMMDD(post.createdDate)}</p>
        </div>
      </div>
    </li>
  );
};

export default PrescriptionReviewCard;
