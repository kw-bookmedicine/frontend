import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";

// COMPONENT
import Header from "../../components/Header";
import api from "../../services/api";
import Pagination from "../../components/Pagination";
import SearchBox from "../../components/Search/SearchBox";
import Pill from "../../components/Pill";

// ASSET
import defaultBookCover from "../../assets/loading_thumbnail_not_rounded.png";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";

const SearchResult = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // URL의 쿼리 파라미터들에 접근
  const type = searchParams.get("type"); // 'type' 쿼리 파라미터의 값을 가져옴
  const query = searchParams.get("query"); // 'query' 쿼리 파라미터의 값을 가져옴
  const [viewMode, setViewMode] = useState(true); // 책 뷰 선택(리스트/카드)
  const [books, setBooks] = useState([]); // 책 정보
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [booksPerPage, setBooksPerPage] = useState(10); // 페이지당 책 수

  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [isError, setIsError] = useState(false); // 로딩 후 응답상태

  const [searchedSelectedKeywords, setSearchedSelectedKeywords] = useState([]); // 선택된 키워드 배열
  const [totalPages, setTotalPages] = useState(0);
  const [totalBooksCount, setTotalBooksCount] = useState(0);

  const [sortOption, setSortOption] = useState("view-count"); // 정렬 옵션

  const [data, setData] = useState([]); // (임시) 키워드 검색에서 책 전체를 가져와 키워드만 뽑기 위함

  // 키워드로 책 필터링
  const filteredBooks = books?.filter((book) =>
    searchedSelectedKeywords.every((keyword) =>
      book.keywordItemList?.some((bookKeyword) => bookKeyword.name === keyword)
    )
  );

  // 키워드 검색 에서 검색된 키워드 삭제
  const handleRemoveSearchedKeyword = (keyword) => {
    setSearchedSelectedKeywords(
      searchedSelectedKeywords.filter((k) => k !== keyword)
    );
  };

  // 페이지 변경
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // 책 페이지수
  const searchResultsCount = useRef(null);

  // 콘텐츠 내용 API 호출
  const getSearchResults = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      let endpoint;
      if (type === "title") {
        endpoint = `/api/search/book?title=${query}&target=page&sort=${sortOption}&page=${
          currentPage - 1
        }&size=${booksPerPage}`;
      } else if (type === "author") {
        endpoint = `/api/search/book?author=${query}&target=page&sort=${sortOption}&page=${
          currentPage - 1
        }&size=${booksPerPage}`;
      } else if (type === "keyword") {
        endpoint = `/api/search/book/keyword?name=${query}&target=page&sort=${sortOption}&page=${
          currentPage - 1
        }&size=${booksPerPage}`;
      }
      const response = await api.get(endpoint, { withCredentials: true });
      setBooks(response.data.content);
      searchResultsCount.current = response.data.totalElements; // 결과에 대한 모든 책의 수
      setTotalPages(response.data.totalPages);
      setTotalBooksCount(response.data.totalElements);
      setIsLoading(false);
    } catch (error) {
      searchResultsCount.current = 0;
      console.error("책 데이터 GET 요청 실패", error);
      setIsError(true);

      // window.location.replace("/login");
    }
  };

  // 책 새롭게 검색하면 페이지 1로 설정
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, query);

  useEffect(() => {
    if (searchedSelectedKeywords.length === 0) {
      getSearchResults();
      getSearchResultsForKeywordSearch();
    }
  }, [
    type,
    query,
    currentPage,
    booksPerPage,
    searchedSelectedKeywords,
    sortOption,
  ]);

  // 임시 키워드 전체 검색을 위한 조치
  const getSearchResultsForKeywordSearch = async () => {
    try {
      let endpoint;
      if (type === "title") {
        endpoint = `/api/search/book?title=${query}&target=page&sort=${sortOption}&page=${0}&size=${9999}`;
      } else if (type === "author") {
        endpoint = `/api/search/book?author=${query}&target=page&sort=${sortOption}&page=${0}&size=${9999}`;
      } else if (type === "keyword") {
        endpoint = `/api/search/book/keyword?name=${query}&target=page&sort=${sortOption}&page=${0}&size=${9999}`;
      }
      const response = await api.get(endpoint, { withCredentials: true });
      setData(response.data.content);
    } catch (error) {
      searchResultsCount.current = 0;
      console.error("책 데이터 GET 요청 실패", error);
    }
  };

  // 10개, 50개, 100개에 따른 한페이지에 보여주는 책의 수
  const handlebooksPerPageChange = (event) => {
    setBooksPerPage(event.target.value);
  };

  useEffect(() => {
    const postkeyword = async () => {
      const requestData = {
        searchWord: query,
        keywordList: searchedSelectedKeywords,
      };

      try {
        const response = await api.post(
          `/api/search/book?sort=${sortOption}&page=${
            currentPage - 1
          }&size=${booksPerPage}`,
          requestData,
          {
            withCredentials: true,
          }
        );
        setTotalPages(
          Math.max(
            1,
            Math.ceil((response.data.content?.length || 0) / booksPerPage)
          )
        );
        setBooks(response.data.content);
        console.log(response.data.content);
        setData(response.data.content);
      } catch (error) {
        console.error("검색 결과 후 키워드 검색 요청 실패:", error);
      }
    };

    if (searchedSelectedKeywords.length > 0) {
      postkeyword();
    }
  }, [query, searchedSelectedKeywords, currentPage, booksPerPage, sortOption]);

  let searchType;
  if (type === "title") {
    searchType = "책 제목";
  } else if (type === "author") {
    searchType = "작가";
  } else if (type === "keyword") {
    searchType = "키워드";
  }

  // 정렬 옵션 설정
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  // 키워드 필터
  const filteredBooksKeyword = data?.filter((book) =>
    searchedSelectedKeywords.every((keyword) =>
      book.keywordItemList?.some((bookKeyword) => bookKeyword.name === keyword)
    )
  );

  return (
    <>
      <Header />
      <Main>
        {/* 검색창 */}
        <SearchBox />

        {/* 검색 결과의 헤더 */}
        <SearchTitle id="search-title">
          <Title>
            {searchType} <Highlight>"{query}"</Highlight> 에 대한
            <Highlight> {searchResultsCount.current} 개의 검색 결과</Highlight>
          </Title>
        </SearchTitle>
        <ContentsWrap>
          <aside>
            <ContentTitle>키워드 검색</ContentTitle>
            <KeywordSearchBox
              bookData={filteredBooksKeyword}
              selectedKeywords={searchedSelectedKeywords}
              setSelectedKeywords={setSearchedSelectedKeywords}
            />
          </aside>

          <Section className="spinner-container">
            {/* 헤더 영역 */}
            <HeaderArea>
              <ContentTitle>
                전체{" "}
                <Highlight>
                  {searchedSelectedKeywords.length === 0 &&
                    searchResultsCount.current}
                  {searchedSelectedKeywords.length > 0 && filteredBooks.length}
                </Highlight>
                건
              </ContentTitle>
              <div>
                <div style={{ display: "flex" }}>
                  <SelectStyled
                    name="sortOption"
                    id="sort-option-select"
                    value={sortOption}
                    onChange={handleSortChange}
                  >
                    <option value="view-count">인기순</option>
                    <option value="oneline-count">처방많은 순</option>
                  </SelectStyled>
                  <SelectStyled
                    name="itemsPerPage"
                    id="items-per-page-select"
                    onChange={handlebooksPerPageChange}
                    value={booksPerPage}
                  >
                    <option value="10">10개씩 보기</option>
                    <option value="50">50개씩 보기</option>
                    <option value="100">100개씩 보기</option>
                  </SelectStyled>
                  <ViewModeContainer>
                    <ViewButton
                      onClick={() => setViewMode(true)}
                      $active={viewMode}
                      $rightborder={true}
                    >
                      <img
                        src="https://contents.kyobobook.co.kr/resources/fo/images/common/ink/ico_view_list_active.png"
                        alt="리스트 뷰"
                      />
                    </ViewButton>
                    <ViewButton
                      onClick={() => setViewMode(false)}
                      $active={!viewMode}
                    >
                      <img
                        src="https://contents.kyobobook.co.kr/resources/fo/images/common/ink/ico_view_img_active.png"
                        alt="카드 뷰"
                      />
                    </ViewButton>
                  </ViewModeContainer>
                </div>
              </div>
            </HeaderArea>
            {/* 키워드 영역 */}
            {searchedSelectedKeywords.length !== 0 && (
              <div
                style={{
                  padding: "15px 0px 15px 0px",
                  borderBottom: "1px solid #c4bebe",
                }}
              >
                <ul style={{ display: "flex" }}>
                  {searchedSelectedKeywords.map((keyword, index) => (
                    <Pill
                      key={index}
                      text={keyword}
                      onClick={() => handleRemoveSearchedKeyword(keyword)}
                    />
                  ))}
                </ul>
              </div>
            )}
            {/* 콘텐츠 영역 */}
            {isLoading && (
              <LoadingText>
                {isError && "책 데이터 요청에 실패되었습니다."}
                {!isError && <LoadingSpinner />}
              </LoadingText>
            )}

            {!isLoading && (
              <>
                {filteredBooks.length === 0 && (
                  <NoResultsMessage>검색 결과가 없습니다.</NoResultsMessage>
                )}
                {filteredBooks.length > 0 && (
                  <>
                    <div>
                      {viewMode ? (
                        <ListUIWrap>
                          {filteredBooks?.map((book, index) => (
                            <BookListItem key={index}>
                              <Link to={`/book-detail?isbn=${book.isbn}`}>
                                <BookImage
                                  src={book.imageUrl || defaultBookCover}
                                  alt="책 표지 이미지"
                                />
                              </Link>
                              <BookDetails>
                                <div>
                                  <Link to={`/book-detail?isbn=${book.isbn}`}>
                                    <BookTitleOfListUI>
                                      {book.title}
                                    </BookTitleOfListUI>
                                  </Link>
                                  <BookAuthor>{book.author}</BookAuthor>
                                  <BookPublicYear>
                                    {book.publicYear}
                                  </BookPublicYear>
                                </div>
                                <div style={{ marginBottom: "40px" }}>
                                  <ul
                                    style={{
                                      display: "flex",
                                      flexWrap: "wrap",
                                    }}
                                  >
                                    <BookKeyword
                                      onClick={(e) => {
                                        e.preventDefault();
                                        navigate(
                                          `/search/result?type=keyword&query=${book.middleCategoryName}`
                                        );
                                      }}
                                    >
                                      #{book.middleCategoryName}
                                    </BookKeyword>
                                    {book.keywordItemList.map(
                                      (keyword, index) => {
                                        return (
                                          <BookKeyword
                                            key={index}
                                            onClick={(e) => {
                                              e.preventDefault();
                                              navigate(
                                                `/search/result?type=keyword&query=${keyword.name}`
                                              );
                                            }}
                                          >
                                            #{keyword.name}
                                          </BookKeyword>
                                        );
                                      }
                                    )}
                                  </ul>
                                </div>
                              </BookDetails>
                            </BookListItem>
                          ))}
                        </ListUIWrap>
                      ) : (
                        <CardUIWrap>
                          {filteredBooks?.map((book, index) => (
                            <li key={index} style={{ width: "170px" }}>
                              <Link to={`/book-detail?isbn=${book.isbn}`}>
                                <CardImageContainer>
                                  <BookCardImage
                                    src={book.imageUrl || defaultBookCover}
                                    alt="책 표지 이미지"
                                  />
                                </CardImageContainer>
                                <BookTitleOfCardUI>
                                  {book.title}
                                </BookTitleOfCardUI>
                              </Link>
                              <h3
                                style={{
                                  color: "#6B6B6B",
                                  marginBottom: "10px",
                                }}
                              >
                                {book.author}
                              </h3>
                            </li>
                          ))}
                        </CardUIWrap>
                      )}
                    </div>
                    <Pagination
                      paginate={paginate}
                      currentPage={currentPage}
                      totalPages={totalPages === 1 ? 1 : totalPages - 1}
                    />
                  </>
                )}
              </>
            )}
          </Section>
        </ContentsWrap>
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
    if (!bookData) {
      return;
    }
    setTotalBooksOfKeywords([]); // 키워드 초기화
    const newKeywords = bookData.flatMap((data) => {
      return data.keywordItemList?.map((keyword) => keyword.name) ?? [];
    });
    setTotalBooksOfKeywords((prev) => [...prev, ...new Set(newKeywords)]); // 중복 제거
  }, [bookData]);

  console.log("#", totalBooksOfKeywords);

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
    if (selectedKeywords.length >= 10) {
      alert("키워드는 최대 10개까지 선택할 수 있습니다.");
      return;
    }
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
  max-width: 220px;
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
  max-width: 1200px;
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
const Section = styled.section`
  padding-left: 2.5rem;
  width: 100%;
  min-height: 50vh;
`;

const HeaderArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #c4bebe;
`;

const NoResultsMessage = styled.div`
  text-align: center;
  font-size: 18px;
  color: #666;
  margin-top: 100px;
`;

const LoadingText = styled.div`
  text-align: center;
  margin-top: 100px;
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
  background-color: ${(props) => (props.$active ? "#d0d0d0" : "white")};
  border-right: ${(props) =>
    props.$rightborder ? "1px solid #C0C0C0" : "none"};
`;

const SearchTitle = styled.section`
  margin-bottom: 80px;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: bold;
`;

const ContentsWrap = styled.div`
  display: flex;
`;

const Input = styled.input`
  border-radius: 10px;
  border: 1px solid #6b6565;
  padding: 8px 8px 8px 12px;
  font-size: 1rem;
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

const BookListItem = styled.li`
  height: 310px;
  display: flex;
  padding: 36px 20px;
  border-bottom: 1px solid #a1a1a1;
`;

const BookImage = styled.img`
  height: 240px;
  width: 170px;
  background-color: gray;
  border-radius: 5px;
  border: 1px solid #c0c0c0;
`;

const BookTitleOfListUI = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const BookDetails = styled.div`
  padding: 1rem 0px 0px 1rem;
`;

const BookAuthor = styled.h3`
  font-size: 1rem;
  color: gray;
  margin-bottom: 10px;
`;

const BookPublicYear = styled.h4`
  font-size: 1rem;
  color: gray;
  margin-bottom: 40px;
`;

const CardUIWrap = styled.ul`
  padding: 36px 20px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;
`;

const CardImageContainer = styled.div`
  height: 240px;
  width: 170px;
  border-radius: 5px;
  background-color: gray;
  margin-bottom: 10px;
  display: inline-block;
`;

const BookCardImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  border: 1px solid #c0c0c0;
`;

const BookTitleOfCardUI = styled.h2`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* 원하는 라인 수 */
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
`;
