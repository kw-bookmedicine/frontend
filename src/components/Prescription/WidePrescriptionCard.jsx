import React from "react";
import { Link } from "react-router-dom";

import "../../styles/Prescription/WidePrescriptionCard.css";
import { toYYYYMMDD } from "../../util/toYYYYMMDD";

const WidePrescriptionCard = ({ props }) => {
  const {
    title,
    description,
    createdDate,
    nickname,
    bookTitle,
    author,
    publishingHouse,
    publishYear,
    imageUrl,
  } = props;
  return (
    <>
      <Link to={"/prescription/detail"}>
        <div className="WidePrscrCard_container">
          <div className="wide_prscr_left_wrapper">
            <div className="wide_prscr_left_img">
              <img src="/icon/pharmacy_icon.png" alt="" />
            </div>
            <div className="wide_prscr_left_title">{title}</div>
            <div className="wide_prscr_left_profile">
              <div className="wide_prscr_profile_img"></div>
              <div className="wide_prscr_profileInfo_wrapper">
                <p className="profileInfo_nickname">{nickname}</p>
                <p className="profileInfo_date">{toYYYYMMDD(createdDate)}</p>
              </div>
            </div>
          </div>
          <div className="wide_prscr_mid_line"></div>
          <div className="wide_prscr_right_wrapper">
            <div className="wide_prscr_rl_wrapper">
              <img src={imageUrl || "/loading_thumbnail_x4.png"} alt="" />
            </div>
            <div className="wide_prscr_rr_wrapper">
              <div className="wide_prscr_rr_top_wrapper">
                <p className="wide_prscr_bookInfo_title">{bookTitle}</p>
                <p className="wide_prscr_bookInfo_author">{author}</p>
                <p className="wide_prscr_bookInfo_date">
                  {publishingHouse || "null값"}/{publishYear || "출판연도"}
                </p>
              </div>
              <div className="wide_prscr_rr_bottom_wrapper">
                <div className="wide_prscr_rr_reason_title">처방사유</div>
                <div className="wide_prscr_rr_reason_box">
                  <div className="wide_prscr_rr_reason_box_content">
                    <p>{description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img
            src="/icon/pharmacy_icon_2.png"
            className="wide_prscr_pharmacy_icon_group"
          />
        </div>
      </Link>
    </>
  );
};

export default WidePrescriptionCard;
