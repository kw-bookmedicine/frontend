import React from "react";
import { Link, useLocation } from "react-router-dom";

import "../../styles/Prescription/WidePrescriptionCard.css";
import { toYYYYMMDD } from "../../util/toYYYYMMDD";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const WidePrescriptionCard = ({ props }) => {
  const {
    id,
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
  // url을 통해 board값 얻기
  const query = useQuery();
  const boardId = query.get("board");
  const prescriptionId = id;
  return (
    <>
      <Link
        to={`/prescription/detail?boardId=${boardId}&prescriptionId=${prescriptionId}`}
      >
        <div className="WidePrscrCard_container">
          <div className="wide_prscr_left_wrapper">
            <div className="wide_prscr_left_img">
              <img src="/icon/pharmacy_icon.png" alt="처방책 이미지" />
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
              <img src={imageUrl ?? "/loading_thumbnail_x4.png"} alt="" />
            </div>
            <div className="wide_prscr_rr_wrapper">
              <div className="wide_prscr_rr_top_wrapper">
                <p className="wide_prscr_bookInfo_title">{bookTitle}</p>
                <p className="wide_prscr_bookInfo_author">{author}</p>
                <p className="wide_prscr_bookInfo_date">
                  {publishingHouse ?? "출판사"}/{publishYear ?? "출판연도"}
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
            alt="처방 아이콘"
          />
        </div>
      </Link>
    </>
  );
};

export default WidePrescriptionCard;
