import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// COMPONENTS
import Header from "./../../components/Header";
import Title from "../../components/Prescription/ProcessTitle";
import WidePrscrCard from "../../components/Prescription/WidePrescriptionCard";

// SERVICE
import api from "../../services/api";

// STYLE
import "../../styles/Counseling/WorryDetail.css";

const WorryDetail = () => {
  const [boardData, setBoardData] = useState({});
  const [prescriptionData, setPrescriptionData] = useState([]);

  const currentUrl = window.location.href;

  // URL에서 boardId 쿼리 파라미터 값을 추출
  const urlParams = new URLSearchParams(new URL(currentUrl).search);
  const boardId = urlParams.get("board");

  // 해당하는 고민 글 정보 가져오기
  const fetchData = () => {
    try {
      if (!boardId) {
        console.error("주소에 boardId가 없습니다.");
        return;
      }
      api.get(`/api/board/${boardId}`).then((res) => {
        setBoardData(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  // 해당 고민 글의 처방전 조회
  const fetchPrescription = async () => {
    try {
      const response = await api.get(
        `/api/prescription?page=0&size=99&boardId=${boardId}`
      );
      setPrescriptionData(response.data);
    } catch (error) {
      console.log("해당 글 처방전 조회 실패", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchPrescription();
  }, []);

  const move = () => {
    window.location.replace("/pre/write");
  };

  return (
    <>
      <Header />
      <div className="worry_detail_content">
        <Title type={"normal"} value={boardData.nickname} />
        <div className="worry_detail_title_wrapper">
          <div className="wd_user_wrapper">
            <div className="wd_user_left_wrapper">
              <div className="wd_user_img">
                <img
                  src="/icon/profile/basic_profile_img.svg"
                  alt="유저 프로필"
                  className="wd_user_img"
                />
              </div>
              <div className="wd_user_info_wrapper">
                <div className="wd_user_name">{boardData.nickname}</div>
                <div className="wd_user_date">
                  {boardData.createdDate
                    ? boardData.createdDate.slice(0, 10)
                    : null}
                </div>
              </div>
            </div>
          </div>
          <div className="wd_title_text_wrapper">{boardData.title}</div>
        </div>
        <div className="worry_detail_content_wrapper">
          <div className="wd_content_detail_wrapper">
            <span className="wd_content_detail_title">처방사유</span>
            <div className="wd_content_detail_text">
              {boardData.description}
            </div>
          </div>
          <div className="worry_detail_prscr_wrapper">
            <div className="wd_prscr_list_title">처방전 확인하기</div>
            <div className="wd_prscr_list_wrapper">
              {prescriptionData.map((prescription) => (
                <WidePrscrCard key={prescription.id} props={prescription} />
              ))}
            </div>
          </div>
          <Link to={`/prescription/write?prscrId=123`}>
            <button className="prscr_btn">처방하러 가기</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default WorryDetail;
