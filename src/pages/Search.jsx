import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// COMPONENTS
import Header from "../components/Header";
import SearchResultList from "../components/SearchResultList";

// STYLES
import "../styles/SearchStyles.css";
import bookImg1 from "../assets/category-book-img1.png";
import bookImg2 from "../assets/category-book-img2.png";
import bookImg3 from "../assets/category-book-img3.png";
import bookImg4 from "../assets/category-book-img4.png";
import bookImg5 from "../assets/category-book-img5.png";
import bookImg6 from "../assets/category-book-img6.png";
import bookImg7 from "../assets/category-book-img7.png";
import bookImg8 from "../assets/category-book-img8.png";
import bookImg9 from "../assets/category-book-img8.png";
import bookImg10 from "../assets/category-book-img8.png";

const Search = () => {
  const [input, setInput] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://port-0-backend-book-pharmacy-umnqdut2blqqhv7sd.sel5.cloudtype.app/api/category/big"
        );
        const fetchedCategories = response.data;
        const transformedCategories = Object.keys(fetchedCategories).map(
          (key, index) => ({
            title: key,
            subtitle: fetchedCategories[key].join(", "),
            image: defaultImages[index % defaultImages.length], // 이미지 배열의 길이를 넘지 않도록 처리
          })
        );
        setCategories(transformedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // 카테고리별 대표 책 이미지
  const defaultImages = [
    bookImg1,
    bookImg2,
    bookImg3,
    bookImg4,
    bookImg5,
    bookImg6,
    bookImg7,
    bookImg8,
    bookImg9,
    bookImg10,
  ];

  // 카테고리 배경 색상(10개)
  const categoryColors = [
    "#D4F4FF",
    "#FFF2EC",
    "#FFE3B5",
    "#FFF4B6",
    "#D6D6D6",
    "#C2E2FF",
    "#FFCACD",
    "#DFFFF8",
    "#CBD4F0",
    "#D6CABC",
  ];

  // 카테고리 아이템을 렌더링하는 함수
  const renderCategoryItem = ({ title, subtitle, image }, index) => (
    <Link to={`/book/list/${title}`} key={index}>
      <div className="category-item-wrapper">
        {/* 1~10색상으로 반복 적용*/}
        <div
          className="category-grid-item"
          style={{
            backgroundColor: categoryColors[index % categoryColors.length],
          }}
        >
          <div className="category-grid-description">
            <h2 className="category-grid-item-title">{title}</h2>
            <h3 className="category-grid-item-subtitle">{subtitle}</h3>
          </div>

          <img src={image} alt="" className="category-grid-item-image" />
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
            <Link to={`/result/${keyword}-책목록-페이지`}>{keyword}</Link>
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

  const handleChange = (value) => {
    setInput(value);
  };


  // 검색할 때, 0.1초 딜레이 걸기 -> 끊기는 느낌을 방지
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBooks(input);
    }, 100);

    // cleanup 함수를 반환하여 컴포넌트가 언마운트될 때 타이머를 해제합니다.
    return () => clearTimeout(timer);
  }, [input]);

  const fetchBooks = async (searchInput) => {
    if (input.trim() === "") return; // 빈 문자열일 때 API 호출 방지

    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchInput}&key=AIzaSyDUtFpAVpNPHCEW-pxSxpTHSACNjko_MCc&maxResults=10`
      );
      const booksData = response.data.items
        ? response.data.items.slice(0, 6)
        : []; // 검색창에서 6개의 데이터만 보여줌

      setSearchData(booksData);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };

  // 검색창 엔터 및 버튼 이벤트 처리

  const searchBook = (evt) => {
    if (evt.key === "Enter" || evt.target.name === "search-button") {
      fetchBooks(input);
    }
  };

  const [isShow, setIsShow] = useState(false);

  const handleSearchResultClose = () => {
    setIsShow(false);
  };

  const handleSearchResultShow = () => {
    setIsShow(true);
  };

  return (
    <div onClick={handleSearchResultClose}>
      <Header />

      {/* 검색 페이지 전체 */}
      <section className="search-container">
        {/* 검색 창 */}
        <section
          className="search-wrapper"
          onClick={(e) => {
            e.stopPropagation();
            handleSearchResultShow();
          }}
        >
          <label>
            <div className="search-wrap-inner">
              {/* 검색창에 라벨 적용해보기 */}
              {/* 책 렌더링했던 유튜브 영상을 활용해서 검색창 누르면 밑에 책보여주는 방법으로 활용하기 */}
              <button
                className="search-button"
                onClick={searchBook}
                name="search-button"
              />
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                className="search-input"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                onKeyPress={searchBook}
              />
              {input.length > 0 ? (
                <button
                  className="search-close-button"
                  onClick={(e) => {
                    setInput("");
                  }}
                >
                  X
                </button>
              ) : null}
            </div>
          </label>
          {input.length > 0 && isShow ? (
            <SearchResultList
              book={searchData}
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          ) : null}
        </section>

        {/* 추천 검색어 */}
        {renderKeywordList("추천검색어", recommendedSearchKeywords)}

        {/* 사용자 추천 키워드 */}
        {renderKeywordList("사용자 추천 키워드", userRecommendedKeywords)}

        {/* 카테고리 */}
        <section className="category-wrapper">
          <h2 className="recommend-title">카테고리</h2>
          <div className="category-items">
            {categories.map((category, index) =>
              renderCategoryItem(category, index)
            )}
          </div>
        </section>
      </section>
    </div>
  );
};

export default Search;
