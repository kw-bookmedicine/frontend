import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import styled from "styled-components";
import closeIcon from "../assets/closeIconRound.svg";
import starIcon from "../assets/icons8-별-30 (1).png";
import api from "./../services/api";
import Pagination from "../components/Pagination";
import SearchBox from "../components/SearchBox";

const SearchResult = () => {
  const navigate = useNavigate();
  const { title } = useParams(); // path로 책 제목 가져오기
  const [viewMode, setViewMode] = useState(true); // 책 뷰 선택(리스트/카드)
  const [books, setBooks] = useState([]); // 책 정보
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [booksPerPage, setBooksPerPage] = useState(10); // 페이지당 책 수
  const [loading, setLoading] = useState(false); // 로딩 상태

  const [input, setInput] = useState(""); // 검색 데이터
  const [searchType, setSearchType] = useState("title"); // 검색 유형 상태
  const [searchData, setSearchData] = useState([]); // 검색 결과 데이터
  const [isShow, setIsShow] = useState(false); // 검색창 모달창
  const inputRef = useRef(null);

  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [selectedKeywordSet, setSelectedKeywordSet] = useState(new Set());

  const [totalBooksOfKeywords, setTotalBooksOfKeywords] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBooks(input);
    }, 100);

    // cleanup 함수를 반환하여 컴포넌트가 언마운트될 때 타이머를 해제합니다.
    return () => clearTimeout(timer);
  }, [input]);

  const fetchBooks = async (searchInput) => {
    if (input.trim() === "") return; // 빈 문자열일 때 API 호출 방지

    let endpoint = "";
    if (searchType === "title") {
      endpoint = `/api/search/book?title=${searchInput}&target=modal`;
    }
    if (searchType === "author") {
      endpoint = `/api/search/book?author=${searchInput}&target=modal`;
    }
    if (searchType === "keyword") {
      endpoint = `/api/search/keyword?name=${searchInput}&target=modal`;
    }

    try {
      const response = await api.get(endpoint);
      console.log("test", searchType, response.data);
      setSearchData(response.data);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };

  const searchBook = (evt) => {
    if (evt.key === "Enter") {
      fetchBooks(input);
      if (input.length > 0 && selectedKeywords.length === 0) navigate(`/search/result/${input}`);
      if (selectedKeywords.length > 0) navigate(`/search/result/${selectedKeywords.join(' ')} ${input}`);
      if(input.length === 0 && searchType !== "keyword") alert("검색 키워드가 없습니다!")
      if (searchType === "keyword" && selectedKeywords.length === 0) alert("키워드를 선택하여 검색해주세요!")
        setIsShow(false);
    }
  };

  // 키워드로 어떻게 담지?

 

  // 현재 책들 정보
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  // console.log(indexOfFirstBook, indexOfLastBook);
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  // 페이지 변경
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const getSearchResults = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          // `/api/search/book?title=${title}&target=page&page=${currentPage-1}&size=${booksPerPage}`
          `/api/search/book?title=${title}&target=page&page=0&size=999`
        );
        // console.log(response.data);
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("책 데이터 GET 요청 실패", error);
      }
    };
    getSearchResults();
  }, [title]);
  
  let searchResultsCount = books.length;
  searchResultsCount = searchResultsCount.toLocaleString();
  let searchResultsKeywordCount = 123;
  let reviewCount = 123;

  // 10개, 50개, 100개에 따른 한페이지에 보여주는 책의 수
  const handleSizeChange = (event) => {
    setBooksPerPage(event.target.value);
  };

  // 키워드 선택
  const handleSelectKeyword = (keyword) => {
    setSelectedKeywords([...selectedKeywords, keyword]);
    setSelectedKeywordSet(new Set([...selectedKeywordSet, keyword]));
    setInput("");
    setSearchData([]);
    inputRef.current.focus();
  };

  // 키워드 삭제
  const handleRemoveKeyword = (keyword) => {
    const updatedKeywords = selectedKeywords.filter(
      (selectedKeyword) => selectedKeyword !== keyword
    );
    setSelectedKeywords(updatedKeywords);

    const updatedKeywordSet = new Set(selectedKeywordSet);
    updatedKeywordSet.delete(keyword);
    setSelectedKeywordSet(updatedKeywordSet);
  };

  // 아래 키 기능

  // 요청했던 책에 대한 키워드

  return (
    <>
      <Header />
      <Main onClick={() => setIsShow(false)}>
        {/* 검색창 컴포넌트 만들어야함 */}
        <SearchBox
          input={input}
          setInput={setInput}
          searchType={searchType}
          setSearchType={setSearchType}
          isShow={isShow}
          setIsShow={setIsShow}
          searchBook={searchBook}
          searchData={searchData}
          handleSelectKeyword={handleSelectKeyword}
          selectedKeyword={selectedKeywords}
          selectedKeywordSet={selectedKeywordSet}
          handleRemoveKeyword={handleRemoveKeyword}
          inputRef={inputRef}
        />

        <SearchTitle id="search-title">
          <Title>
            <span style={{ color: "#67B6C1" }}>"{title}"</span> 에 대한
            <span style={{ color: "#67B6C1" }}>
              {" "}
              {searchResultsCount} 개의 검색 결과
            </span>
          </Title>
        </SearchTitle>

        <ContentsWrap>
          <aside>
            <ContentTitle>키워드 검색</ContentTitle>
            {/* <select name="" id="">
              {books.map((book) => {
                book.bookKeywordList.map((keyword, index) => {
                  return (
                    <option key={index} value={keyword.name}>
                      {keyword.name}
                    </option>
                  );
                });
              })}
            </select> */}
            <select name="select-keyword" id="">
              {books.flatMap((book) =>
                book.bookKeywordList.map((keyword) => (
                  <option value={keyword.name}>{keyword.name}</option>
                ))
              )}
            </select>

            <Input
              type="text"
              placeholder="키워드 추가"
              style={{
                borderRadius: "10px",
                border: "1px solid #6B6565",
                padding: "8px 8px 8px 12px",
                fontSize: "1rem",
              }}
            />
          </aside>

          <section style={{ paddingLeft: "2.5rem", width: "100%" }}>
            {/* 헤더 영역 */}
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: "20px",
                borderBottom: "1px solid #c4bebe",
              }}
            >
              <ContentTitle>
                전체{" "}
                <span style={{ color: "#67B6C1" }}>{searchResultsCount}건</span>
              </ContentTitle>
              <div>
                <div style={{ display: "flex" }}>
                  <select
                    name=""
                    id=""
                    style={{
                      width: "130px",
                      border: "1px solid #C0C0C0 ",
                      padding: "0px 10px",
                      borderRadius: "5px",
                      // marginRight: "10px",
                    }}
                  >
                    {/* <option value="" selected> */}
                    <option value="popular">인기순</option>
                    <option value="ranked">평점순</option>
                  </select>
                  <select
                    name=""
                    id=""
                    style={{
                      width: "130px",
                      border: "1px solid #C0C0C0 ",
                      padding: "0px 10px",
                      borderRadius: "5px",
                      marginLeft: "10px",
                      marginRight: "10px",
                    }}
                    onChange={handleSizeChange}
                    value={booksPerPage}
                  >
                    {/* <option value="10" selected> */}
                    <option value="10">10개씩 보기</option>
                    <option value="50">50개씩 보기</option>
                    <option value="100">100개씩 보기</option>
                  </select>
                  <div
                    style={{
                      display: "flex",
                      width: "75px",
                      border: "1.5px solid #C0C0C0",
                      borderRadius: "5px",
                      // marginLeft: "10px",
                    }}
                  >
                    <button
                      onClick={() => setViewMode(true)}
                      style={{
                        padding: "10px",
                        backgroundColor: viewMode ? "#d0d0d0" : "white",
                        borderRight: "1px solid #C0C0C0",
                      }}
                    >
                      <img
                        src="https://contents.kyobobook.co.kr/resources/fo/images/common/ink/ico_view_list_active.png"
                        alt=""
                      />
                    </button>
                    <button
                      onClick={() => setViewMode(false)}
                      style={{
                        padding: "10px",
                        width: "100%",
                        backgroundColor: viewMode ? "white" : "#d0d0d0",
                      }}
                    >
                      <img
                        src="https://contents.kyobobook.co.kr/resources/fo/images/common/ink/ico_view_img_active.png"
                        alt=""
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 키워드 영역 */}
            <div
              style={{
                padding: "15px 0px 15px 0px",
                borderBottom: "1px solid #c4bebe",
              }}
            >
              <ul style={{ display: "flex" }}>
                <SearchKeyword>
                  {/* <div>저주</div> */}
                  저주
                  <button
                    style={{
                      backgroundColor: "#c8edf2",
                      borderRadius: "999px",
                      lineHeight: "5px",
                    }}
                  >
                    <img src={closeIcon} alt="" />
                  </button>
                </SearchKeyword>
              </ul>
            </div>

            {/* 콘텐츠 영역 */}
            <div>
              {viewMode ? (
                <ListUIWrap>
                  {/* {books.map((book, index) => ( */}
                  {currentBooks.map((book, index) => (
                    <Link key={index} to={`/book-detail/${book.isbn}`}>
                      <li
                        style={{
                          height: "310px",
                          display: "flex",
                          padding: "36px 20px",
                          borderBottom: "1px solid #A1A1A1",
                        }}
                      >
                        <img
                          src={book.imageUrl}
                          alt="책 표지 이미지"
                          style={{
                            height: "240px",
                            width: "170px",
                            backgroundColor: "gray",
                            borderRadius: "5px",
                            // objectFit: "cover",
                            border: "1px solid #c0c0c0",
                          }}
                        />
                        <div style={{ padding: "1rem 0px 0px 1rem" }}>
                          <div>
                            <h3
                              style={{
                                fontSize: "20px",
                                fontWeight: "bold",
                                marginBottom: "8px",
                              }}
                            >
                              {book.title}
                            </h3>
                            <h4
                              style={{
                                fontSize: "1rem",
                                color: "gray",
                                marginBottom: "40px",
                              }}
                            >
                              {book.author}
                            </h4>
                          </div>
                          <div style={{ marginBottom: "40px" }}>
                            <ul style={{ display: "flex", flexWrap: "wrap" }}>
                              <BookKeyword
                                onClick={(e) => {
                                  e.preventDefault();
                                  navigate(
                                    `/search/result/${book.middleCategoryName}`
                                  );
                                }}
                              >
                                {book.middleCategoryName}
                              </BookKeyword>
                              {book.bookKeywordList.map((keyword, index) => {
                                return (
                                  <BookKeyword
                                    key={index}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      navigate(
                                        `/search/result/${keyword.name}`
                                      );
                                    }}
                                  >
                                    {keyword.name}
                                  </BookKeyword>
                                );
                              })}
                            </ul>
                          </div>
                          <h1
                            style={{
                              fontWeight: "bold",
                              marginBottom: "10px",
                            }}
                          >
                            평균 ★{book.rating}{" "}
                            <span style={{ color: "gray" }}>
                              ({reviewCount})
                            </span>
                          </h1>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <img
                              src={starIcon}
                              alt=""
                              style={{ marginRight: "5px" }}
                            />
                            <img
                              src={starIcon}
                              alt=""
                              style={{ marginRight: "5px" }}
                            />
                            <img
                              src={starIcon}
                              alt=""
                              style={{ marginRight: "5px" }}
                            />
                            <img
                              src={starIcon}
                              alt=""
                              style={{ marginRight: "5px" }}
                            />
                            <img
                              src={starIcon}
                              alt=""
                              style={{ marginRight: "5px" }}
                            />
                          </div>
                        </div>
                      </li>
                    </Link>
                  ))}
                </ListUIWrap>
              ) : (
                <CardUIWrap>
                  {/* {books.map((book, index) => ( */}
                  {currentBooks.map((book, index) => (
                    <Link to={`/book-detail/${book.title}`}>
                      <li key={index} style={{ width: "170px" }}>
                        <div
                          style={{
                            height: "240px",
                            width: "170px",
                            borderRadius: "5px",
                            backgroundColor: "gray",
                            marginBottom: "10px",
                            display: "inline-block",
                          }}
                        >
                          <img
                            src={book.imageUrl}
                            alt="책 표지 이미지"
                            style={{
                              width: "100%",
                              height: "100%",
                              // objectFit: "cover",
                              border: "1px solid #c0c0c0",
                            }}
                          />
                        </div>
                        <BookTitle>{book.title}</BookTitle>
                        <h3 style={{ color: "#6B6B6B", marginBottom: "10px" }}>
                          {book.author}
                        </h3>
                        <h1 style={{ marginBottom: "10px" }}>
                          평균 ★{book.rating}{" "}
                          <span style={{ color: "gray" }}>({reviewCount})</span>
                        </h1>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "40px",
                          }}
                        >
                          <img
                            src={starIcon}
                            alt=""
                            style={{
                              width: "20px",
                              marginRight: "5px",
                            }}
                          />
                          <img
                            src={starIcon}
                            alt=""
                            style={{ width: "20px", marginRight: "5px" }}
                          />
                          <img
                            src={starIcon}
                            alt=""
                            style={{ width: "20px", marginRight: "5px" }}
                          />
                          <img
                            src={starIcon}
                            alt=""
                            style={{ width: "20px", marginRight: "5px" }}
                          />
                          <img
                            src={starIcon}
                            alt=""
                            style={{ width: "20px", marginRight: "5px" }}
                          />
                        </div>

                        {/* 별 컴포넌트 */}
                      </li>
                    </Link>
                  ))}
                </CardUIWrap>
              )}
            </div>
            <Pagination
              booksPerPage={booksPerPage}
              totalBooks={books.length}
              paginate={paginate}
              bookTitle={title}
              currentPage={currentPage}
            />
          </section>
        </ContentsWrap>
      </Main>
    </>
  );
};

export default SearchResult;

const Main = styled.main`
  padding-top: 48px;
  max-width: 1440px;
  margin: 0 auto;
`;

const SearchTitle = styled.section`
  margin-bottom: 80px;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: bold;

  span {
    color: #67b6c1;
  }
`;



const SearchInputWrap = styled.div`
  width: 100%;
  height: 60px;
  box-shadow: 0px 2px 4px #00000033;
  padding: 10px 0px 10px 1rem;
  border-radius: 5px;
  border: 1px solid #b0b0b0;
  display: flex;
  align-items: center;
  font-size: 20px;
  margin-bottom: 40px;
`;

const SelectMenu = styled.select`
  width: 140px;
  font-size: 20px;
  border: none;
  /* padding-left: 10px; */
  text-align: center;
  &:focus {
    outline: none;
  }
`;

const SearchInput = styled.input`
  border: none;
  border-left: 1px solid #c0c0c0;
  margin-left: 1rem;
  padding-left: 1rem;
  font-size: 20px;
  width: 100%;
  &:focus {
    outline: none;
  }
`;

const ContentsWrap = styled.div`
  display: flex;
`;

const ContentTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Input = styled.input`
  border-radius: 10px;
  border: 1px solid #6b6565;
  padding: 8px 8px 8px 12px;
  font-size: 1rem;
`;


const SearchKeyword = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 29px;
  line-height: 27px;
  padding: 0px 0px 0px 12px;
  background-color: #c8edf2;
  border-radius: 15px;
  margin-right: 10px;
`;

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
