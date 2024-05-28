import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// ASSETS
import LoginHomeBanner from "../assets/login-home-banner.png";

// COMPONENTS
import Modal from "../components/Modal";
import Slider from "../components/Slider";
import Header from "../components/Header";
import PrescriptionReviewCard from "../components/PrescriptionReviewCard";

// CSS
import "../styles/LoginHome.css";
import { BannerSlider } from "../components/BannerSlider";
import TodayPrescriptionCard from "../components/Card/TodayPrescriptionCard";
import api from "../services/api";

const LoginHome = () => {
  const [recentPosts, setRecentPosts] = useState([]); // 최신 고민글 데이터
  const [boardLoaing, setBoardLoading] = useState(false);

  // 최근 고민글 6개 조회
  const fetchRecentBoardData = async () => {
    try {
      const res = await api("/api/board/all?page=0&size=6", {
        withCredentials: true,
      });
      setRecentPosts(res.data.content);
      console.log(res);
      setBoardLoading(true);
    } catch (error) {
      console.error("고민글 요청 실패", error);
    }
  };

  useEffect(() => {
    fetchRecentBoardData();
  }, []);

  return (
    <>
      <Header />
      <BannerSlider />
      <div className="loginHome-container">
        <section className="loginHome-prescription-section">
          <h2 className="loginHome-prescription-title">
            AI 약사에게 처방 받아보세요!
          </h2>
          <p className="loginHome-prescription-subtitle">
            AI 약사가 당신에게 처방하는 책
          </p>
          <ul className="loginHome-prescription-cards">
            <TodayPrescriptionCard
              backgroundColor="#CCE8EC"
              bookTitle="해리포터와 불의 잔"
              author="J.K. 롤링"
            />
            <TodayPrescriptionCard
              backgroundColor="#d2e7a5"
              bookTitle="해리포터와 불의 잔"
              author="J.K. 롤링"
            />
            <TodayPrescriptionCard
              backgroundColor="#F5DAD2"
              bookTitle="해리포터와 불의 잔"
              author="J.K. 롤링"
            />
          </ul>
          <div className="LoginHome-today-reviews">
            <div className="LoginHome-today-reviews-top">
              <div className="LoginHome-today-reviews-top-title">
                따끈따끈한 고민 보러가기
              </div>
              <div className="LoginHome-today-reviews-top-subtitle">
                다른 사람들의 다양한 고민 상담
              </div>
              <Link
                to={"/counseling"}
                className="LoginHome-today-reviews-top-button"
              ></Link>
            </div>
            <ul className="LoginHome-today-reviews-items">
              {boardLoaing ? (
                recentPosts?.map((post) => (
                  <PrescriptionReviewCard
                    key={post.boardId}
                    createdDate={post.createdDate}
                    nickname={post.nickname}
                    title={post.title}
                    content={` Lorem ipsum dolor sit amet consectetur adipisicing elit. Id dicta
            maxime totam eos tempora ipsum laudantium. Laudantium veniam dolor a
            culpa, magnam aspernatur dicta totam adipisci necessitatibus minima,
            mollitia, odit aliquam. Atque ea, quod vitae velit ullam nostrum
            tenetur? Rerum, quia! Sapiente accusamus obcaecati, praesentium
            veritatis odio voluptatem cum blanditiis aspernatur nulla. Rerum
            architecto nostrum iste, ullam iusto qui itaque repellendus placeat
            similique, recusandae, consequatur inventore harum unde soluta omnis
            corporis libero culpa ex neque quia in iure dicta! Impedit quo
            distinctio optio ducimus, eaque, consectetur expedita esse earum
            consequatur repellat fugiat reiciendis deserunt id. Voluptatem esse
            sapiente maiores veritatis!`}
                    userImg={""}
                    boardId={post.boardId}
                  />
                ))
              ) : (
                <div>Loading...</div>
              )}
            </ul>
          </div>
        </section>

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
