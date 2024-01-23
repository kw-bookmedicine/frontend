import { useState } from "react";
import Header from "../components/Header";
import PrescriptionReviewCard from "../components/PrescriptionReviewCard";
import Slider from "../components/Slider";
import "../styles/LoginHome.css";
import { Link } from "react-router-dom";

const LoginHome = () => {
  // 현재 날짜를 가져오기 위해 Date 객체를 사용
  const currentDate = new Date();

  // 날짜를 포맷에 맞게 문자열로 만들기
  const formattedDate = `${currentDate.getFullYear()}.${(
    currentDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}.${currentDate.getDate().toString().padStart(2, "0")}`;

  // 모달창에서 오늘의 감정 선택 후, 감정에 따른 todayEmotion 수정
  const [todayEmotion, setTodayEmotion] = useState("즐거운");
  
  

  return (
    <>
      <Header />
      <div className="LoginHome-container">
        <div className="LoginHome-banner">
          {/* <div className="LoginHome-banner-contents">
            <h2>
              오늘의 감정은
              <br />
              알려주세요.
            </h2>
            <p>기쁨/ 불안/ 즐거움/ 슬픔/ 화남/ 외로움</p>
          </div> */}
        </div>

        {/*  */}
        <div className="LoginHome-main-container">
          <div className="LoginHome-today">
            <div className="LoginHome-today-item">
              <h2 className="LoginHome-today-item-title">오늘의 처방전</h2>
              <div className="LoginHome-today-item-contents">
                <div className="LoginHome-today-item-contents-text">
                  오늘
                  <p className="LoginHome-today-item-contents-text-hightlight">
                    {todayEmotion}
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
