import React from "react";

// ASSETS
import loading_thumbnail from "../../assets/loading_thumbnail_x4.png";

// COMPONENTS
import Header from "../../components/Header.js";
import Title from "../../components/Prescription/ProcessTitle.jsx";
import PrescriptionCard from "../../components/Prescription/PrescriptionCard.jsx";

// STYLE
import "../../styles/Prescription/PrescriptionDetail.css";
import api from "../../services/api.js";
import { useNavigate, useSearchParams } from "react-router-dom";

// todo
// - 각 처방전에 대한 데이터 API 완성 시, 더미데이터에서 교체하기
const PrescriptionDetail = () => {
  const [searchParams] = useSearchParams();
  const boardId = searchParams.get("boardId");
  const prescriptionId = searchParams.get("prescriptionId");

  const deletePrescription = async () => {
    try {
      const response = await api.delete(`/api/prescription/${prescriptionId}`, {
        withCredentials: true,
      });
      console.log(response);
    } catch (erorr) {
      console.error("처방전 삭제 요청 실패", erorr);
    }
  };

  const handleDeletePrescription = async () => {
    await deletePrescription();
    navigate(`/worry-detail?board=${boardId}`); // boardID 값이 필요함
  };

  // 임시 더미 데이터
  const prescriptionData = {
    title: "임시데이터",
    description: "임시데이터",
    isbn: "9788932011172",
  };

  const navigate = useNavigate();

  const handlePatchPrescription = () => {
    navigate(`/prescription/write`, {
      state: { ...prescriptionData, boardId, prescriptionId },
    });
  };

  return (
    <>
      <Header />
      <Title type={"detail"} />
      <div className="prscr_detail_top_container">
        <div className="prscr_detail_top_info_wrapper">
          <div className="prscr_detail_top_wrapper">
            <div className="dt_prscr_title_wrapper">
              <span id="dt_prscr_title">"새로운 곳에 적응하기 힘들어요"</span>
              &nbsp;에 대한&nbsp;<span id="dt_from_nickname"> 유저 1</span>님의
              처방전
            </div>

            <div className="prscr_dt_bookInfo_wrapper">
              <div className="prscr_dt_left_wrapper">
                <img src={loading_thumbnail} alt="" id="prscr_dt_loading_img" />
              </div>
              <div className="prscr_dt_right_wrapper">
                <p className="prscr_dt_right_title">책 제목</p>
                <p className="prscr_dt_right_author">저자</p>
                <p className="prscr_dt_right_bookCompany">출판사</p>
                <button
                  onClick={handlePatchPrescription}
                  className="prscr_dt_right_bookCompany"
                >
                  수정
                </button>
                <button
                  onClick={handleDeletePrescription}
                  className="prscr_dt_right_bookCompany"
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="prscr_detail_bottom_wrapper">
        <div className="prscr_detail_res_container">
          <div className="prscr_dt_res_title">처방사유</div>
        </div>
        <div className="prscr_other_container">
          <div className="other_list_title">다른 처방전 확인하기</div>
          <div className="other_list_wrapper">
            <PrescriptionCard />
            <PrescriptionCard />
            <PrescriptionCard />
            <PrescriptionCard />
            <PrescriptionCard />
            <PrescriptionCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default PrescriptionDetail;
