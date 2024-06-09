import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// COMPONENTS
import Slider from "../components/Slider";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BannerSlider } from "../components/BannerSlider";
import TodayPrescriptionCard from "../components/Card/TodayPrescriptionCard";
import PrescriptionReviewCard from "../components/PrescriptionReviewCard";

// SERVICE
import api from "../services/api";

// STORE
import { useNickname } from "../hooks/useNickname";

// STYLE
import "../styles/LoginHome.css";
import LoadingSpinner from "../components/Loading/LoadingSpinner";

const backgroundColors = ["#CCE8EC", "#d2e7a5", "#F5DAD2"];

const LoginHome = () => {
  const { revalidate } = useNickname(); // React Query의 쿼리 캐시를 무효화하고 닉네임 데이터를 다시 가져옴.

  const [recentPosts, setRecentPosts] = useState([]); // 최신 고민글 데이터

  const [todayPrescription, setTodayPrescription] = useState([]); // 오늘의 처방전 데이터
  const [bestSellers, setBestSellers] = useState([]); // 베스트셀러 데이터
  const [newBooks, setNewBooks] = useState([]); // 신간도서 데이터
  const [similarBooks, setSimilarBooks] = useState([]); // 나와 비슷한 사람들의 책 데이터

  const [boardLoading, setBoardLoading] = useState(false); // 최신 고민글 로딩

  const fetchTodayPrescription = async () => {
    try {
      const res = await api("/api/recommend/book/clientbased/aiprescription", {
        withCredentials: true,
      });
      setTodayPrescription(res.data);
    } catch (error) {
      console.error("오늘의 처방전 요청 실패", error);
    }
  };

  // 최근 고민글 6개 조회
  const fetchRecentBoardData = async () => {
    try {
      const res = await api("/api/board/all?page=0&size=6", {
        withCredentials: true,
      });
      setRecentPosts(res.data.content);
      setBoardLoading(true);
    } catch (error) {
      window.location.replace("/login");
      console.error("고민글 요청 실패", error);
    }
  };

  // 베스트셀러 조회
  const fetchBestSellers = async () => {
    try {
      const res = await api("/api/best-seller", {
        withCredentials: true,
      });
      setBestSellers(res.data);
    } catch (error) {
      console.error("베스트셀러 요청 실패", error);
    }
  };

  // 신간도서 조회
  const fetchNewBooks = async () => {
    try {
      const res = await api("/api/new-book", {
        withCredentials: true,
      });
      setNewBooks(res.data);
    } catch (error) {
      console.error("신간도서 요청 실패", error);
    }
  };

  // 나와 비슷한 사람들의 책 조회
  const fetchSimilarBooks = async () => {
    try {
      const res = await api("/api/recommend/book/clientbased", {
        withCredentials: true,
      });
      setSimilarBooks(res.data);
    } catch (error) {
      console.error("나와 비슷한 사람들의 책 요청 실패", error);
    }
  };

  useEffect(() => {
    revalidate();
    fetchRecentBoardData();
    fetchTodayPrescription();
    fetchBestSellers();
    fetchNewBooks();
    fetchSimilarBooks();
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
            {/* 오늘의 처방전이 없으면 예시를 보여줌 */}
            {todayPrescription.length > 0 &&
              todayPrescription.map((book, index) => (
                <TodayPrescriptionCard
                  key={index}
                  book={book}
                  backgroundColor={backgroundColors[index]}
                />
              ))}
            {todayPrescription.length === 0 && (
              <>
                <TodayPrescriptionCard book={""} backgroundColor="#CCE8EC" />
                <TodayPrescriptionCard book={""} backgroundColor="#d2e7a5" />
                <TodayPrescriptionCard book={""} backgroundColor="#F5DAD2" />
              </>
            )}
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
            <ul className="LoginHome-today-reviews-items spinner-container">
              {boardLoading &&
                recentPosts?.map((post) => (
                  <PrescriptionReviewCard key={post.boardId} post={post} />
                ))}
              {!boardLoading && <LoadingSpinner />}
            </ul>
          </div>
        </section>
        <section className="loginHome-slider-container" id="other_book_wrapper">
          <Slider
            title="베스트 셀러"
            subtitle="가장 많이 읽은 책 순위는?"
            books={bestSellers}
            isBestSeller={true} // 1~10 순위 나타냄
          />
          <Slider
            title="띵동, 책배달 왔습니다!"
            subtitle="신간도서 보러가기"
            books={newBooks}
          />
          <Slider
            title="나와 비슷한 사람들은 어떤 책을 읽을까?"
            subtitle="추천도서 모음"
            books={similarBooks}
          />
        </section>
      </div>
      <Footer />
    </>
  );
};

export default LoginHome;
