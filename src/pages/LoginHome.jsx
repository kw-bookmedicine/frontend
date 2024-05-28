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
  const [isModalOpen, setModalOpen] = useState(false);

  const [recentPosts, setRecentPosts] = useState([]);
  const [boardLoaing, setBoardLoading] = useState(false);

  const fetchBoardData = async () => {
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
    fetchBoardData();
  }, []);

  // const [selectedEmotion, setSelectedEmotion] = useState("");

  // 세션 스토리지에서 'selectedEmotion' 값을 읽어오고, 없다면 기본값으로 빈 문자열을 사용
  const [selectedEmotion, setSelectedEmotion] = useState(() => {
    return sessionStorage.getItem("selectedEmotion") || "";
  });

  // 배경색상
  const [backgroundColor, setBackgroundColor] = useState("#9BD0D8");
  // 로그아웃된 상태라면 로그인 화면으로 이동
  useEffect(() => {
    // if (localStorage.getItem('token') === null) {
    // 	window.location.replace('http://localhost:3000/login');
    // }
  }, []);

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

  // 최근 고민글 데이터

  return (
    <>
      <Header />
      <div className="loginHome-banner-container" style={{ backgroundColor }}>
        {/* max-width 값 정하고 */}
        <div className="loginHome-banner-contents">
          <BannerSlider setBackgroundColor={setBackgroundColor} />
        </div>
      </div>
      <div className="loginHome-container">
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          selectedEmotion={selectedEmotion}
          setSelectedEmotion={setSelectedEmotion}
        />
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
