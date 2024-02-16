import { useEffect, useState } from "react";
import Header from "../components/Header";
import PrescriptionReviewCard from "../components/PrescriptionReviewCard";
import Slider from "../components/Slider";
import "../styles/LoginHome.css";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";

const LoginHome = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  // const [selectedEmotion, setSelectedEmotion] = useState("");

  // 세션 스토리지에서 'selectedEmotion' 값을 읽어오고, 없다면 기본값으로 빈 문자열을 사용
  const [selectedEmotion, setSelectedEmotion] = useState(() => {
    return sessionStorage.getItem("selectedEmotion") || "";
  });

  useEffect(() => {
    // 'selectedEmotion' 상태가 변경될 때마다 세션 스토리지에 저장
    sessionStorage.setItem("selectedEmotion", selectedEmotion);
  }, [selectedEmotion]); // 의존성 배열에 'selectedEmotion'을 추가하여 해당 값이 변경될 때만 실행

  const openModal = () => {
    setModalOpen(true);
    setSelectedEmotion(""); // 모달을 열 때 selectedEmotion 초기화
    document.body.style.overflow = "hidden"; // 스크롤 비활성화
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = "auto"; // 스크롤 활성화
  };

  // 감정 매칭 객체
  const emotionMappings = {
    화남: "화가나는",
    슬픔: "슬픈",
    기쁨: "기쁜",
    즐거움: "즐거운",
    불안: "불안한",
    외로움: "외로운",
  };

  // 현재 날짜를 가져오기 위해 Date 객체를 사용
  const currentDate = new Date();

  // 날짜를 포맷에 맞게 문자열로 만들기
  const formattedDate = `${currentDate.getFullYear()}.${(
    currentDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}.${currentDate.getDate().toString().padStart(2, "0")}`;

  return (
    <>
      <Header />
      <div className="LoginHome-container">
        <div className="LoginHome-banner" onClick={openModal}></div>
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          selectedEmotion={selectedEmotion}
          setSelectedEmotion={setSelectedEmotion}
        />
        <div className="LoginHome-main-container">
          <div className="LoginHome-today">
            <div className="LoginHome-today-item">
              <h2 className="LoginHome-today-item-title">오늘의 처방전</h2>
              <div className="LoginHome-today-item-contents">
                <div className="LoginHome-today-item-contents-text">
                  오늘
                  <p className="LoginHome-today-item-contents-text-hightlight">
                    {selectedEmotion === ""
                      ? "\u00A0\u00A0\u00A0\u00A0"
                      : emotionMappings[selectedEmotion]}
                  </p>
                  당신을 위한 책 처방
                </div>
                <img src="" alt="" />
                <h3 className="LoginHome-today-item-contents-title">책 제목</h3>
                <h4>저자</h4>
                <h3 className="LoginHome-today-item-contents-date">
                  {formattedDate}
                </h3>
              </div>
            </div>
            <div className="LoginHome-today-reviews">
              <div className="LoginHome-today-reviews-top">
                <div className="LoginHome-today-reviews-top-title">
                  다른 사람들은 어떨까?
                </div>
                <div className="LoginHome-today-reviews-top-subtitle">
                  다른 사람들의 처방전 후기
                </div>
                <Link
                  to={"/feed"}
                  className="LoginHome-today-reviews-top-button"
                ></Link>
              </div>
              <div className="LoginHome-today-reviews-items">
                <PrescriptionReviewCard
                  reviewDate={"2024.01.13"}
                  bookImg={""}
                  bookCategory={"서시"}
                  author={"윤동주"}
                  review={"죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를"}
                  userImg={""}
                  userNickname={"유저 닉네임"}
                />
                <PrescriptionReviewCard
                  reviewDate={"2024.01.13"}
                  bookImg={""}
                  bookCategory={"서시"}
                  author={"윤동주"}
                  review={"죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를"}
                  userImg={""}
                  userNickname={"유저 닉네임"}
                />
                <PrescriptionReviewCard
                  reviewDate={"2024.01.13"}
                  bookImg={""}
                  bookCategory={"서시"}
                  author={"윤동주"}
                  review={"죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를"}
                  userImg={""}
                  userNickname={"유저 닉네임"}
                />
                <PrescriptionReviewCard
                  reviewDate={"2024.01.13"}
                  bookImg={""}
                  bookCategory={"서시"}
                  author={"윤동주"}
                  review={"죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를"}
                  userImg={""}
                  userNickname={"유저 닉네임"}
                />
                <PrescriptionReviewCard
                  reviewDate={"2024.01.13"}
                  bookImg={""}
                  bookCategory={"서시"}
                  author={"윤동주"}
                  review={
                    "죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를"
                  }
                  userImg={""}
                  userNickname={"유저 닉네임"}
                />
                <PrescriptionReviewCard
                  reviewDate={"2024.01.13"}
                  bookImg={""}
                  bookCategory={"서시"}
                  author={"윤동주"}
                  review={"죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를"}
                  userImg={""}
                  userNickname={"유저 닉네임"}
                />
              </div>
            </div>
          </div>
        </div>
        <Slider
          title="베스트 셀러"
          subtitle="가장 많이 읽은 책 순위는?"
          bookTitle="책제목"
          bookAuthor="저자"
          isBestSeller={true}
        />
        <Slider
          title="띵동, 책배달 왔습니다!"
          subtitle="신간도서 보러가기"
          bookTitle="책제목"
          bookAuthor="저자"
        />
        <Slider
          title="나와 비슷한 사람들은 어떤 책을 읽을까?"
          subtitle="추천도서 모음"
          bookTitle="책제목"
          bookAuthor="저자"
        />
      </div>
    </>
  );
};

export default LoginHome;
