import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// COMPONENTS
import Header from "../components/Header";
import Title from "../components/Prescription/ProcessTitle";

// ASSETS
import loading_img from "../assets/loading_thumbnail_x4.png";

// STYLE
import "../styles/Counseling/PrescriptionWriteStep2.css";
import api from "../services/api";

// todo: put 보다는 patch가 더좋을거같음
const PrescriptionWriteStep2 = () => {
  const location = useLocation(); // 이전 useNavigate로 state 정보 받기 위해 사용
  const [bookImage, setBookImage] = useState(); // 처방책 isbn 이미지
  const navigate = useNavigate();

  const title = location.state.title; // 처방 제목
  const description = location.state.description; // 처방 사유
  const isbn = location.state.isbn; // 처방 책 isbn
  const boardId = location.state.boardId; // 처방전 boardId
  const prescriptionId = location.state.prescriptionId || undefined; // 처방전 id

  const getIsbn = async () => {
    await api
      .get(`/api/book/detail?isbn=${isbn}`, { withCredentials: true })
      .then((res) => {
        setBookImage(res.data.imageUrl);
      });
  };

  useEffect(() => {
    getIsbn();
  }, []);

  const postPrescription = async (formData) => {
    console.log(formData);
    try {
      const response = await api.post("/api/prescription", formData, {
        withCredentials: true,
      });
      console.log(response);
    } catch (erorr) {
      console.error("처방전 생성 요청 실패", erorr);
    }
  };

  const putPrescription = async ({
    title,
    description,
    isbn,
    prescriptionId,
  }) => {
    try {
      const response = await api.put(
        `/api/prescription/${prescriptionId}`,
        {
          title,
          description,
          isbn,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
    } catch (erorr) {
      console.error("처방전 업데이트 요청 실패", erorr);
    }
  };

  const onSubmit = async () => {
    if (prescriptionId) {
      // const patchPrescription = async () => {
      //   try {
      //     const response = await api.patch(
      //       `/api/prescription/${prescriptionId}`,
      //       prescriptionData,
      //       {
      //         withCredentials: true,
      //       }
      //     );
      //     console.log(response);
      //   } catch (erorr) {
      //     console.error("처방전 업데이트 요청 실패", erorr);
      //   }
      // };
      await putPrescription({
        title,
        description,
        isbn,
        prescriptionId,
      });
    } else {
      await postPrescription({
        title,
        description,
        isbn,
        boardId,
      });
    }
    // 전달 받은 값 전부 전달

    navigate(`/worry-detail?board=${boardId}`);
  };

  return (
    <>
      <Header />
      <Title type={"process"} value={"100"} />
      <div className="prescription_info_container">
        <div className="prscr_left_wrapper">
          <img
            src={bookImage ?? loading_img} // 이미지 없을 시, 기본이미지 적용
            alt="로딩 썸네일"
            className="prscr_img_wrapper"
          />
        </div>
      </div>
      <div className="prescription_mid_wrapper">
        <div className="prscr_write_wrapper">
          <span className="prscr_write_title">주제</span>
          <p>{title}</p>
          <span className="prscr_write_title">처방사유</span>
          <p>{description}</p>
        </div>
      </div>
      <div className="prescription_btn_container">
        <button
          onClick={() => navigate(`/worry-detail?board=${boardId}`)}
          className="prscr_cancel_btn"
        >
          취소하기
        </button>
        <button onClick={() => onSubmit()} className="prscr_apply_btn">
          처방전 등록하기
        </button>
      </div>
    </>
  );
};

export default PrescriptionWriteStep2;
