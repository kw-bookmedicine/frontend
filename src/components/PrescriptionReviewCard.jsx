import React from 'react'

function PrescriptionReviewCard({
  reviewDate,
  bookImg,
  bookCategory,
  author,
  review,
  userImg,
  userNickname,
}) {
  return (
    <div className="LoginHome-today-reviews-items-card">
      <p className="LoginHome-today-reviews-items-card-date">{reviewDate}</p>
      <div className="LoginHome-today-reviews-items-card-body">
        <div className="LoginHome-today-reviews-items-card-book">
          <img src={bookImg} alt="" />
          <h2>{bookCategory}</h2>
          <h3>{author}</h3>
        </div>

        <p>{review}</p>
      </div>

      <div className="LoginHome-today-reviews-items-card-footer">
        <img src={userImg} alt="유저 이미지" />
        <p>{userNickname}</p>
      </div>
    </div>
  );
}

export default PrescriptionReviewCard