import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";

// COMPONENT
import Header from "../../components/Header";
import api from "../../services/api";
import Pagination from "../../components/Pagination";
import SearchBox from "../../components/SearchBox";
import Pill from "../../components/Pill";

// ASSET
import defaultBookCover from "../../assets/loading_thumbnail_not_rounded.png";

const SearchResult = () => {
  const [searchParams] = useSearchParams(); // URL의 쿼리 파라미터들에 접근
  const type = searchParams.get("type"); // 'type' 쿼리 파라미터의 값을 가져옴
  const query = searchParams.get("query"); // 'query' 쿼리 파라미터의 값을 가져옴
  const [viewMode, setViewMode] = useState(true); // 책 뷰 선택(리스트/카드)
  const [books, setBooks] = useState([]); // 책 정보
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [booksPerPage, setBooksPerPage] = useState(10); // 페이지당 책 수

  const [loading, setLoading] = useState(false); // 로딩 상태

  // 키워드로 책 필터링
  // const filteredBooks = books.filter((book) =>
  //   searchedSelectedKeywords.every(
  //     (keyword) =>
  //       book.bookKeywordList.some(
  //         (bookKeyword) => bookKeyword.name === keyword
  //       ) || keyword === book.middleCategoryName
  //   )
  // );

  // const indexOfLastBook = currentPage * booksPerPage;
  // const indexOfFirstBook = indexOfLastBook - booksPerPage;
  // const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  // const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  // 페이지 변경
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // 콘텐츠 내용 API 호출
  useEffect(() => {
    const getSearchResults = async () => {
      setLoading(true);
      try {
        let endpoint;
        if (type === "title") {
          endpoint = `/api/search/book?title=${query}&target=page&page=${currentPage}&size=20`;
        } else if (type === "author") {
          endpoint = `/api/search/book?author=${query}&target=page&page=${currentPage}&size=20`;
        } else if (type === "keyword") {
          endpoint = `/api/search/keyword?name=${query}&target=page&page=${currentPage}&size=20`;
        }
        const response = await api.get(endpoint, { withCredentials: true });
        setBooks(response.data);
        console.log(response);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("책 데이터 GET 요청 실패", error);
      }
    };
    getSearchResults();
  }, [type, query, currentPage]);

  let searchResultsCount = books.totalElements;
  // searchResultsCount = searchResultsCount.toLocaleString();

  // 10개, 50개, 100개에 따른 한페이지에 보여주는 책의 수
  const handleSizeChange = (event) => {
    setBooksPerPage(event.target.value);
  };

  // 아래 키 기능

  // 요청했던 책에 대한 키워드

  return (
    <>
      <Header />
      {/* <Main onClick={() => setIsShow(false)}> */}
      <Main>
        {/* 검색창 컴포넌트 만들어야함 */}
        <SearchBox />

        {/* 검색 결과의 헤더 */}
        <SearchTitle id="search-title">
          <Title>
            <Highlight>"{query}"</Highlight> 에 대한
            <Highlight> {searchResultsCount} 개의 검색 결과</Highlight>
          </Title>
        </SearchTitle>
      </Main>
    </>
  );
};

export default SearchResult;

const KeywordSearchBox = ({
  bookData,
  selectedKeywords,
  setSelectedKeywords,
}) => {
  const [totalBooksOfKeywords, setTotalBooksOfKeywords] = useState([]); // 전체 키워드
  const [isShowModal, setIsShowModal] = useState(false); // 모달 상태
  const [searchTerm, setSearchTerm] = useState("");
  // 모달과 모달을 열기 위한 버튼에 대한 참조 생성
  const modalRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    setTotalBooksOfKeywords([]); // 키워드 초기화
    const newKeywords = bookData.flatMap((data) => {
      const keywords = data.bookKeywordList.map((keyword) => keyword.name);
      return [data.middleCategoryName, ...keywords];
    });
    setTotalBooksOfKeywords((prev) => [...prev, ...new Set(newKeywords)]); // 중복 제거
  }, [bookData]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // 모달이 열려 있고, 클릭한 요소가 모달 또는 버튼이 아닐 때만 모달을 닫음
      if (
        isShowModal &&
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsShowModal(false);
      }
    };

    // 문서에 클릭 이벤트 리스너 추가
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isShowModal]);

  const handleShowModal = () => {
    setIsShowModal(true);
  };

  const handleSelectKeyword = (keyword) => {
    if (!selectedKeywords.includes(keyword)) {
      setSelectedKeywords((prevKeywords) => [...prevKeywords, keyword]);
    }
  };

  const availableKeywords = totalBooksOfKeywords.filter(
    (keyword) =>
      // 선택된 키워드 포함 x, 입력된 문자 포함된 키워드만 저장
      !selectedKeywords.includes(keyword) &&
      keyword.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Input
        type="text"
        placeholder="키워드 추가"
        onClick={handleShowModal}
        ref={buttonRef}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {isShowModal ? (
        <div ref={modalRef}>
          <KeywordSearchBoxModal
            // keywordData={totalBooksOfKeywords}
            keywordData={availableKeywords}
            onSelectKeyword={handleSelectKeyword}
          />
        </div>
      ) : null}
    </>
  );
};

const KeywordSearchBoxModal = ({ keywordData, onSelectKeyword }) => {
  return (
    <>
      <ModalStyled>
        <ul>
          {keywordData.length === 0 ? (
            <li style={{ cursor: "text" }}>키워드가 더 이상 없습니다.</li>
          ) : (
            keywordData.map((keyword, index) => (
              <li key={index} onClick={() => onSelectKeyword(keyword)}>
                {keyword}
              </li>
            ))
          )}
        </ul>
      </ModalStyled>
    </>
  );
};

const ModalStyled = styled.div`
  width: 100%;
  background-color: aliceblue;
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  margin-top: 4px;

  li {
    cursor: pointer;
    padding: 5px;
  }
`;

const Main = styled.main`
  padding-top: 48px;
  max-width: 1440px;
  margin: 0 auto;
`;

// 검색창 관련

// 타이틀 관련

// 키워드 검색 관련

// 책 결과 관련
const ContentTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Highlight = styled.span`
  color: #67b6c1;
`;

const SelectStyled = styled.select`
  width: 130px;
  border: 1px solid #c0c0c0;
  padding: 0px 10px;
  border-radius: 5px;
  margin-right: 10px;
`;

const HeaderArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #c4bebe;
`;

const ViewModeContainer = styled.div`
  display: flex;
  width: 75px;
  border: 1.5px solid #c0c0c0;
  border-radius: 5px;
`;

const ViewButton = styled.button`
  padding: 10px;
  width: 100%;
  background-color: ${(props) => (props.active ? "#d0d0d0" : "white")};
  border-right: ${(props) =>
    props.rightBorder ? "1px solid #C0C0C0" : "none"};
`;

const SearchTitle = styled.section`
  margin-bottom: 80px;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: bold;
`;

// const SearchInputWrap = styled.div`
//   width: 100%;
//   height: 60px;
//   box-shadow: 0px 2px 4px #00000033;
//   padding: 10px 0px 10px 1rem;
//   border-radius: 5px;
//   border: 1px solid #b0b0b0;
//   display: flex;
//   align-items: center;
//   font-size: 20px;
//   margin-bottom: 40px;
// `;

// const SelectMenu = styled.select`
//   width: 140px;
//   font-size: 20px;
//   border: none;
//   /* padding-left: 10px; */
//   text-align: center;
//   &:focus {
//     outline: none;
//   }
// `;

// const SearchInput = styled.input`
//   border: none;
//   border-left: 1px solid #c0c0c0;
//   margin-left: 1rem;
//   padding-left: 1rem;
//   font-size: 20px;
//   width: 100%;
//   &:focus {
//     outline: none;
//   }
// `;

const ContentsWrap = styled.div`
  display: flex;
`;

const Input = styled.input`
  border-radius: 10px;
  border: 1px solid #6b6565;
  padding: 8px 8px 8px 12px;
  font-size: 1rem;
`;

// const SearchKeyword = styled.li`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   height: 29px;
//   line-height: 27px;
//   padding: 0px 0px 0px 12px;
//   background-color: #c8edf2;
//   border-radius: 15px;
//   margin-right: 10px;
// `;

const BookKeyword = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 29px;
  padding: 0px 12px;
  background-color: #c8edf2;
  border-radius: 15px;
  margin-right: 10px;
`;

const ListUIWrap = styled.ul``;

const CardUIWrap = styled.ul`
  padding: 36px 20px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;
`;

const BookTitle = styled.h2`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* 원하는 라인 수 */
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
`;
