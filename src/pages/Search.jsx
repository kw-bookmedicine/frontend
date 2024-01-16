import { Link } from "react-router-dom";
import Header from "../components/Header";
import "../styles/SearchStyles.css";
import harry_potter from "../assets/search-book-Harry_Potter.jpg";
import { useState } from "react";

const Search = () => {
  const [input, setInput] = useState("");

  // 카테고리 아이템을 렌더링하는 함수
  const renderCategoryItem = ({ title, subtitle }) => (
    <Link to={`/${title}-중분류-페이지`}>
      <div className="category-grid-item-wrapper">
        <div className="category-grid-item">
          <h2 className="category-grid-item-title">{title}</h2>
          <h3 className="category-grid-item-subtitle">{subtitle}</h3>
        </div>
      </div>
    </Link>
  );

  // 함수로 추천 키워드 리스트를 생성하는 함수
  const renderKeywordList = (title, keywords) => (
    <section className="recommend-word-wrapper">
      <h2 className="recommend-title">{title}</h2>
      <ul className="recommend-keyword-wrapper">
        {keywords.map((keyword, index) => (
          <li key={index}>
            <Link to={`/reslut/${keyword}-책목록-페이지`}>{keyword}</Link>
          </li>
        ))}
      </ul>
    </section>
  );

  // 추천 검색어 리스트
  const recommendedSearchKeywords = [
    "감정",
    "해리포터",
    "화장품",
    "하늘 높이 비상",
    "감정",
    "해리포터",
    "화장품",
    "하늘 높이 비상",
    "감정",
    "해리포터",
    "화장품",
    "하늘 높이 비상",
    "감정",
    "해리포터",
    "화장품",
    "하늘 높이 비상",
    "감정",
    "해리포터",
    "화장품",
    "하늘 높이 비상",
    "감정",
    "해리포터",
    "화장품",
    "하늘 높이 비상",
    // Add more keywords as needed
  ];

  // 사용자 추천 키워드 리스트
  const userRecommendedKeywords = [
    "#감정",
    "#해리포터",
    "#화장품",
    "#하늘 높이 비상",
    "#감정",
    "#해리포터",
    "#화장품",
    "#하늘 높이 비상",
    "#감정",
    "#해리포터",
    "#화장품",
    "#하늘 높이 비상",
    "#감정",
    "#해리포터",
    "#화장품",
    "#하늘 높이 비상",
    // Add more keywords as needed
  ];

  const handleKeywordClick = (keyword) => {
    // 키워드를 클릭하면 검색어를 업데이트
    setInput(keyword);
  };

  return (
    <div>
      <Header />

      {/* 검색 페이지 전체 */}
      <section className="search-container">
        {/* 검색 창 */}
        <section className="search-wrapper">
          <label>
            <div className="search-wrap-inner">
              {/* 검색창에 라벨 적용해보기 */}
              {/* 책 렌더링했던 유튜브 영상을 활용해서 검색창 누르면 밑에 책보여주는 방법으로 활용하기 */}
              <button className="search-button"></button>
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                className="search-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              ></input>
            </div>
          </label>
        </section>

        {/* 추천 검색어 */}
        {renderKeywordList("추천검색어", recommendedSearchKeywords)}

        {/* 사용자 추천 키워드 */}
        {renderKeywordList("사용자 추천 키워드", userRecommendedKeywords)}

        {/* 카테고리 */}
        <section className="category-wrapper">
          <h2 className="recommend-title">카테고리</h2>
          <div className="category-items">
            {renderCategoryItem({
              title: "소설",
              subtitle: "추리·스릴러, SF, 판타지, 로맨스",
            })}
            {renderCategoryItem({
              title: "외국어",
              subtitle: "영어, 일본어, 중국어, 프랑스어, 스페인어, 독일어",
            })}
            {renderCategoryItem({
              title: "에세이",
              subtitle: "시, 일상, 위로, 힐링, 여행, 행복, 감성",
            })}
            {renderCategoryItem({
              title: "IT",
              subtitle: "개발·프로그래밍, 그래픽, IT교양, e비즈니스",
            })}
            {renderCategoryItem({
              title: "경제경영",
              subtitle:
                "4차 산업혁명, 마케팅, 세계 경제, 한국경제, 부자, 재태크",
            })}
            {renderCategoryItem({
              title: "인문",
              subtitle: "인문학, 문명, 문화, 심리학, 독서, 강의, 글쓰기",
            })}
            {renderCategoryItem({
              title: "자기계발",
              subtitle: "성공, 말하기, 협상, 시간 관리, 태도, 습관",
            })}
            {renderCategoryItem({
              title: "철학",
              subtitle: "동양, 서양, 예술, 경제",
            })}
          </div>
        </section>
      </section>
    </div>
  );
};

export default Search;