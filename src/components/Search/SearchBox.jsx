import React, { useCallback, useEffect, useRef, useState } from "react";
import SearchResultListModal from "../SearchResultListModal";

// style
import "../../styles/SearchStyles.css";
import styled from "styled-components";
import Pill from "../Pill";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

// 모달창 바깥에 누르면 닫기
function useOutsideClick(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    // 바인드 이벤트 리스너
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // 언마운트시 이벤트 리스너 제거
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}

const SearchBox = () => {
  const navigate = useNavigate();
  const wrapperRef = useRef(null); // 검색 모달 ref
  const [isModalOpen, setIsModalOpen] = useState(false); // 검색창 모달창 열고 닫기
  const [input, setInput] = useState(""); // 검색 데이터
  const [searchType, setSearchType] = useState("title"); // 검색 유형 상태
  const [searchData, setSearchData] = useState([]); // 검색 결과 데이터
  const inputRef = useRef(null);

  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [selectedKeywordSet, setSelectedKeywordSet] = useState(new Set());

  useOutsideClick(wrapperRef, () => setIsModalOpen(false));

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false; // 컴포넌트 언마운트시 false로 설정
    };
  }, []);

  const fetchBooks = useCallback(
    async (searchInput) => {
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
        if (isMounted.current) {
          // 마운트 상태 확인
          setSearchData(response.data);
        }
        console.log(response);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    },
    [searchType, isMounted, input]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBooks(input);
    }, 100);

    // cleanup 함수를 반환하여 컴포넌트가 언마운트될 때 타이머를 해제합니다.
    return () => {
      clearTimeout(timer);
    };
  }, [input, fetchBooks]);

  const searchBook = (evt) => {
    if (evt.key === "Enter") {
      fetchBooks(input);
      if (input.length > 0 && selectedKeywords.length === 0)
        navigate(`/search/result?type=${searchType}&query=${input}`);
      if (selectedKeywords.length > 0)
        navigate(
          `/search/result?type=${searchType}&query=${selectedKeywords.join(
            " "
          )} ${input}`
        );
      if (input.length === 0 && searchType !== "keyword")
        alert("검색 키워드가 없습니다!");
      if (searchType === "keyword" && selectedKeywords.length === 0)
        alert("키워드를 선택하여 검색해주세요!");
      setIsModalOpen(false);
    }
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

  return (
    <section
      ref={wrapperRef}
      className="search-wrapper"
      onClick={(e) => {
        e.stopPropagation();
        // handleSearchResultShow();
        setIsModalOpen(true);
      }}
    >
      <label>
        <SearchInputWrap>
          {/* 검색창에 라벨 적용해보기 */}
          {/* 책 렌더링했던 유튜브 영상을 활용해서 검색창 누르면 밑에 책보여주는 방법으로 활용하기 */}
          <SelectMenu
            // defaultValue="title"
            value={searchType}
            onChange={(e) => {
              setSearchType(e.target.value);
              setInput("");
            }}
            name="search-type"
            id="search-type"
            // className="search-select"
          >
            <option value="title">책제목</option>
            <option value="author">작가</option>
            <option value="keyword">키워드</option>
          </SelectMenu>
          {searchType === "keyword" ? (
            <>
              {selectedKeywords.map((keyword, index) => {
                return (
                  <Pill
                    key={index}
                    text={keyword}
                    onClick={() => {
                      handleRemoveKeyword(keyword);
                    }}
                  />
                );
              })}
              <SearchInput
                ref={inputRef}
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
      {input.length > 0 && isModalOpen && searchData.length > 0 ? (
        <SearchResultListModal
          book={searchData}
          addInput={handleSelectKeyword}
          selectedKeywordSet={selectedKeywordSet}
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
  /* box-shadow: 0px 2px 4px #00000033; */
  padding: 10px 0px 10px 16px;
  border-radius: 5px;
  border: 1px solid #b0b0b0;
  display: flex;
  align-items: center;
  font-size: 20px;
`;

const SelectMenu = styled.select`
  min-width: 140px;
  font-size: 20px;
  border: none;
  text-align: center;
  &:focus {
    outline: none;
  }
`;

const SearchInput = styled.input`
  border: none;
  padding-left: 1rem;
  font-size: 20px;
  flex: 1;
  &:focus {
    outline: none;
  }
`;
