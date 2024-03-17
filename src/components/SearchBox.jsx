import React, { useState } from "react";
import SearchResultListModal from "./SearchResultListModal";

// style
import "../styles/SearchStyles.css";
import styled from "styled-components";

const SearchBox = ({
  input,
  setInput,
  searchType,
  setSearchType,
  searchBook,
  isShow,
  setIsShow,
  searchData,
}) => {
  return (
    <section
      className="search-wrapper"
      onClick={(e) => {
        e.stopPropagation();
        // handleSearchResultShow();
        setIsShow(true);
      }}
    >
      <label>
        <SearchInputWrap>
          {/* 검색창에 라벨 적용해보기 */}
          {/* 책 렌더링했던 유튜브 영상을 활용해서 검색창 누르면 밑에 책보여주는 방법으로 활용하기 */}
          {/* <button
                className="search-button"
                onClick={searchBook}
                name="search-button"
              /> */}
          <SelectMenu
            value={searchType}
            onChange={(e) => {
              setSearchType(e.target.value);
              setInput("");
            }}
            name=""
            id=""
            // className="search-select"
          >
            <option value="title" selected>
              책제목
            </option>
            <option value="author">작가</option>
            <option value="keyword">키워드</option>
          </SelectMenu>
          {searchType === "keyword" ? (
            <>
              <SearchInput
                type="text"
                placeholder="검색어를 입력하세요"
                // className="search-input"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                onKeyPress={searchBook}
              />
            </>
          ) : (
            <>
              <SearchInput
                type="text"
                placeholder="검색어를 입력하세요"
                // className="search-input"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                onKeyPress={searchBook}
              />
            </>
          )}
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
        </SearchInputWrap>
      </label>
      {input.length > 0 && isShow && searchData.length > 0 ? (
        // <SearchResultList
        //   book={searchData}
        //   onClick={(e) => {
        //     e.stopPropagation();
        //   }}
        // />
        <SearchResultListModal
          book={searchData}
          addInput={setInput}
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      ) : null}
    </section>
  );
};

export default SearchBox;

const SearchInputWrap = styled.div`
  width: 100%;
  height: 60px;
  box-shadow: 0px 2px 4px #00000033;
  padding: 10px 0px 10px 16px;
  border-radius: 5px;
  border: 1px solid #b0b0b0;
  display: flex;
  /* align-items: center; */
  font-size: 20px;
  /* margin-bottom: 40px; */
`;

const SelectMenu = styled.select`
  min-width: 140px;
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
