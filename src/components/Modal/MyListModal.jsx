// 로그인하고 나서 바로 보여줄 모달창

import React, { useState, useEffect } from "react";
import axios from "axios";

// SERVICE
import api from "../../services/api.js";

// COMPONENTS
import PickBookItem from "../PickBookItem.jsx";

// STYLES
import "../../styles/MyListModal.css";
import Pagination from "./../Pagination";

const MyListModal = ({ onClose }) => {
  const [input, setInput] = useState("");
  const [searchBookResult, setSearchBookResult] = useState([]); // 검색 결과가 추가된 리스트
  const [pickBookList, setPickBookList] = useState([]); // 처음 읽은 목록이 추가된 리스트
  const [pickAuthorList, setPickAuthorList] = useState([]);
  const [filterBookList, setFilterBookList] = useState([]); // 삭제 후 필터링 된 책 리스트

  // 오른쪽에 읽은 목록에 대한 책 제목 배열
  const [addBookList, setAddBookList] = useState([]);
  const [addAuthorList, setAddAuthorList] = useState([]);
  const [isEnter, setIsEnter] = useState(false);
  const [bookCount, setBookCount] = useState(0);

  // '읽은 목록 추가' 버튼 활성 여부
  // false => 처음 추가
  // true => 삭제 후 다시 추가
  const [isClick, setIsClick] = useState(false);

  // 페이지네이션 현재 페이지와 전체 페이지
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // '목록 삭제' 버튼 눌렀을 때 실행되는 함수
  const updateClick = () => {
    // '목록 삭제' 버튼 클릭 후에는 '읽은 목록 추가' 버튼 재활성
    setIsClick(true);
  };

  // 책 리스트 업데이트
  const updateBookList = (list) => {
    // console.log('isClick:', isClick);
    !isClick ? setPickBookList(list) : setFilterBookList(list);
  };

  // 요청 보낼 때 사용할 선택 책 isbn 리스트
  const [resBookList, setResBookList] = useState([]);
  const [pickBookIsbnList, setPickBookIsbnList] = useState([]);

  // 읽은 목록 추가 버튼을 눌렀을 때, 읽은 목록 배열(addBookList)에 요소 추가 함수
  const AddBookList = (pickBookTitle, pickBookIsbn) => {
    setAddBookList(
      pickBookList.some(
        (book) => book.title === pickBookTitle || book.isbn === pickBookIsbn
      )
        ? pickBookList
        : pickBookList.push({ title: pickBookTitle, isbn: pickBookIsbn })
    );
  };

  // 선택완료 요청
  // pickBookList에서 isbn만 따로 리스트로 추출하는 함수입니다.
  // 이 함수의 리턴 값으로 복용내역 요청 보내면 됩니다.
  const getIsbnList = () => {
    return pickBookList.map((book) => book.isbn);
  };

  // '목록 삭제' 버튼 클릭 시 실행되는 함수
  const FilterBookList = (list) => {
    // console.log('filter list:', list);
    setPickBookList(list);
  };

  // 엔터 눌렀을 때 검색 결과 보이기
  const renderSearchList = (page = 1) => {
    if (input.trim() !== "") {
      api
        .get(
          `/api/search/book?title=${input}&target=page&page=${page - 1}&size=9`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          // console.log(res.data);
          setSearchBookResult(res.data.content); // 검색 결과 저장
          setIsEnter(true); // 엔터 눌렀을 때 렌더링
          setBookCount(res.data.totalElements); // 검색 결과로 나온 책 권수
          setTotalPages(res.data.totalPages); // 전체 페이지 수

          // 페이지네이션으로 페이지 번호 클릭하면 요청 주소의 page 파라미터 수 변경
        })
        .catch((err) => console.log(err));
    }
  };

  // 모달 창 활성되면 바깥 영역 스크롤 막음
  document.body.style.overflow = "hidden";

  // 모달 창 닫는 함수
  const handleClose = () => {
    document.body.style.overflow = "auto";
    onClose?.();
  };

  const handleOverlayClick = (event) => {
    // 모달 창 외부를 클릭하면 모달 창을 닫음
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  // 페이지 변경
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    renderSearchList(pageNumber);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    renderSearchList(1);
  };

  return (
    <>
      <div className="myListModal_overlay" onClick={handleOverlayClick}>
        <div className="myListModal_wrapper">
          <div onClick={handleClose} className="CloseButton" />
          <div className="myListModal_left_wrapper">
            {/* 검색 창 */}
            <div
              className="myList_search_wrapper"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <label>
                <div className="myList_search_wrap_inner">
                  <button
                    className="myList_search_button"
                    name="search-button"
                    onClick={handleSearch}
                  />
                  <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    className="myList_search_input"
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                  />
                  {input.length > 0 ? (
                    <button
                      className="search-close-button"
                      onClick={() => {
                        // x 버튼 눌렀을 때 발생하는 이벤트
                        setInput("");
                        // 왼쪽에 검색 결과를 전부 안보이게 함.
                        setIsEnter(false);
                        setBookCount(0);
                      }}
                    >
                      X
                    </button>
                  ) : null}
                </div>
              </label>
            </div>

            <div className="left_inputList_wrapper">
              <h4>{bookCount}권의 책을 찾았어요!</h4>
              {/*  */}
              <div className="inputList_container">
                <div className="left_inputList_box">
                  {searchBookResult.length > 0 && isEnter
                    ? searchBookResult.map((ele) => {
                        return (
                          <PickBookItem
                            key={ele.isbn}
                            isbn={ele.isbn}
                            type="long"
                            title={ele.title}
                            BookList={pickBookList}
                            updateList={AddBookList}
                            author={ele.authors}
                            // updateAuthor={AddAuthorList}
                          />
                        );
                      })
                    : ""}
                  {totalPages > 1 && (
                    <Pagination
                      paginate={handlePageChange}
                      currentPage={currentPage}
                      totalPages={totalPages}
                    />
                  )}
                </div>
                <div className="right_selectList">
                  {pickBookList.length > 0
                    ? pickBookList.map((item) => {
                        return (
                          <PickBookItem
                            key={item.title + "-" + item.isbn}
                            isbn={item.isbn}
                            type="short"
                            title={item.title}
                            // author={author}
                            BookList={pickBookList}
                            updateList={FilterBookList}
                            updateAuthor={pickAuthorList}
                          />
                        );
                      })
                    : ""}
                </div>
                {/*  */}
              </div>
            </div>
            <div className="select_complete_wrapper">
              <button className="select_complete">선택완료</button>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
};
export default MyListModal;
