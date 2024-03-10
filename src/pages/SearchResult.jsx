import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import styled from "styled-components";
import closeIcon from "../assets/closeIconRound.svg";
import starIcon from "../assets/icons8-별-30 (1).png";
import bookImg1 from "../assets/category-book-총류.jpg";

const SearchResult = () => {
  const { title } = useParams();
  const [viewMode, setViewMode] = useState(true);
  let searchResultsCount = 1234;
  searchResultsCount = searchResultsCount.toLocaleString();
  let searchResultsKeywordCount = 123;
  let bookTitle = "해리포터와 저주받은 아이";
  let bookAuthor = "J.K. 롤링· 문학수첩";

  return (
    <>
      <Header />
      <Main>
        {/* 검색창 컴포넌트 만들어야함 */}
        <SearchInputWrap>
          <SelectMenu>
            <option value="title" selected>
              제목
            </option>
            <option value="author">저자</option>
            <option value="keyword">키워드</option>
          </SelectMenu>
          <SearchInput type="text" placeholder="검색어를 입력하세요" />
        </SearchInputWrap>

        <section id="search-title" style={{ marginBottom: "80px" }}>
          <h1 style={{ fontSize: "30px", fontWeight: "bold" }}>
            <span style={{ color: "#67B6C1" }}>"{title}"</span> 에 대한
            <span style={{ color: "#67B6C1" }}>
              {" "}
              {searchResultsCount} 개의 검색 결과
            </span>
          </h1>
        </section>

        <ContentsWrap>
          <aside>
            <ContentTitle style={{ marginBottom: "20px" }}>
              키워드 검색
            </ContentTitle>
            <input
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
                <span style={{ color: "#67B6C1" }}>
                  {searchResultsKeywordCount}건
                </span>
              </ContentTitle>
              <div>
                <div style={{ display: "flex" }}>
                  <select
                    name=""
                    id=""
                    style={{
                      width: "120px",
                      border: "1px solid #C0C0C0 ",
                      padding: "10px",
                      borderRadius: "5px",
                      // marginRight: "10px",
                    }}
                  >
                    <option value="" selected>
                      인기순
                    </option>
                    <option value="">평점순</option>
                  </select>
                  <select
                    name=""
                    id=""
                    style={{
                      width: "120px",
                      border: "1px solid #C0C0C0 ",
                      padding: "10px",
                      borderRadius: "5px",
                      marginLeft: "10px",
                    }}
                  >
                    <option value="" selected>
                      10개씩 보기
                    </option>
                    <option value="" selected>
                      50개씩 보기
                    </option>
                    <option value="" selected>
                      100개씩 보기
                    </option>
                  </select>
                  <div
                    style={{
                      display: "flex",
                      width: "75px",
                      border: "1px solid #C0C0C0",
                      borderRadius: "5px",
                      marginLeft: "10px",
                    }}
                  >
                    <button
                      onClick={() => setViewMode(true)}
                      style={{
                        padding: "10px",
                        backgroundColor: "white",
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
                        backgroundColor: "white",
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
                  <li
                    style={{
                      height: "310px",
                      display: "flex",
                      padding: "36px 20px",
                      borderBottom: "1px solid #A1A1A1",
                    }}
                  >
                    <img
                      src={bookImg1}
                      alt="책 표지 이미지"
                      style={{
                        height: "240px",
                        width: "170px",
                        backgroundColor: "gray",
                        borderRadius: "5px",
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
                          {bookTitle}
                        </h3>
                        <h4
                          style={{
                            fontSize: "1rem",
                            color: "gray",
                            marginBottom: "40px",
                          }}
                        >
                          {bookAuthor}
                        </h4>
                      </div>
                      <div style={{ marginBottom: "40px" }}>
                        <ul style={{ display: "flex" }}>
                          <BookKeyword>영미소설</BookKeyword>
                          <BookKeyword>판타지소설</BookKeyword>
                          <BookKeyword>해리포터</BookKeyword>
                          <BookKeyword>마법주문</BookKeyword>
                          <BookKeyword>저주</BookKeyword>
                        </ul>
                      </div>
                      <h1 style={{ fontWeight: "bold", marginBottom: "10px" }}>
                        평균 ★5.0 <span style={{ color: "gray" }}>(12)</span>
                      </h1>
                      <div style={{ display: "flex", alignItems: "center" }}>
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
                </ListUIWrap>
              ) : (
                <CardUIWrap>
                  <li style={{ width: "170px" }}>
                    <img
                      src={bookImg1}
                      alt="책이미지"
                      style={{
                        height: "240px",
                        width: "170px",
                        borderRadius: "5px",
                        backgroundColor: "gray",
                        marginBottom: "10px",
                      }}
                    />
                    <h2
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        marginBottom: "5px",
                      }}
                    >
                      {bookTitle}
                    </h2>
                    <h3 style={{ color: "#6B6B6B", marginBottom: "10px" }}>
                      {bookAuthor}
                    </h3>
                    <h1 style={{ marginBottom: "10px" }}>
                      평균 ★5.0 <span style={{ color: "gray" }}>(12)</span>
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
                      <img
                        src={starIcon}
                        alt=""
                        style={{ width: "20px", marginRight: "5px" }}
                      />
                    </div>

                    {/* 별 컴포넌트 */}
                  </li>
                </CardUIWrap>
              )}
            </div>
          </section>
        </ContentsWrap>
      </Main>
    </>
  );
};

export default SearchResult;

const Main = styled.main`
  padding: 48px 52px 0px 52px;
  max-width: 1440px;
  margin: 0 auto;
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

const ListUIWrap = styled.ul`
`;

const CardUIWrap = styled.ul`
  padding: 36px 20px;
  display: grid;
  grid-template-columns: repeat(5,1fr);
  grid-gap: 10px;

`;

