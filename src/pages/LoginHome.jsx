import Slider from "../components/Slider";
import Slider2 from "../components/Slider2";
import "../styles/LoginHome.css";
import { Link } from "react-router-dom";



const LoginHome = () => {
  return (
    <div className="container">
      <div className="banner">
        <div className="banner-contents">
          오늘의 감정은
          <br />
          무엇인가요?
        </div>
      </div>

      <div className="main-container">
        <div className="today">
          <div className="today-item">
            <div className="today-item-title title">
              오늘의
              <br />
              처방전
            </div>
          </div>
          <div className="today-reviews">
            <div className="today-reviews-top">
              <div className="today-reviews-top-title title">
                다른 사람들은 어떨까?
              </div>
              <div className="today-reviews-top-subtitle subtitle">
                다른 사람들의 처방전 후기
              </div>
              <Link to={"/feed"} className="today-reviews-top-button"></Link>
            </div>
            <div className="today-reviews-items">
              <div className="grid-item"></div>
              <div className="grid-item"></div>
              <div className="grid-item"></div>
              <div className="grid-item"></div>
              <div className="grid-item"></div>
              <div className="grid-item"></div>
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
  );
};

export default LoginHome;
