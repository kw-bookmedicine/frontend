import React, { useState, useEffect } from "react";

// COMPONENTS
import PickBookItem from "../components/PickBookItem";

// STYLE
import "../styles/PickBookList.css";

const PickBookList = ({ type, data }) => {
  useEffect(() => {
    setData(data);
  });
  const [bookData, setData] = useState([]);

  // 오른쪽에 읽은 목록에 대한 책 제목 배열
  const [addBookList, setAddBookList] = useState([]);
  const [isEnter, setIsEnter] = useState(false);
  const [bookCount, setBookCount] = useState(0);

  // 새롭게 필터링 된 배열
  const [filterBookList, setFilterBookList] = useState([]);

  // 모달 내에서 검색한 책 이름 받아오는 함수
  const [pickTitle, setPickTitle] = useState("");
  const [prevItem, setPrevItem] = useState("");

  const choiceTitle = (bookTitle) => {
    setPickTitle(bookTitle);
  };

  let pickBookListTitle = pickTitle;

  // 읽은 목록 추가 버튼을 눌렀을 때, 읽은 목록 배열(addBookList)에 요소 추가 함수
  const AddBookList = (pickBookTitle) => {
    // addBookList.push(pickBookTitle);
    // addBookList.includes(pickBookTitle)? addBookList : addBookList.concat(pickBookTitle)
    setAddBookList(
      addBookList.includes(pickBookTitle)
        ? addBookList
        : addBookList.concat(pickBookTitle)
    );
  };

  // 목록 삭제 버튼 클릭 시 활성 여부
  const [isClick, setIsClick] = useState(false);
  // 목록 삭제 버튼 눌렀을 때 실행되는 함수
  const updateClick = (click) => {
    setIsClick(click);
  };

  // 오른쪽에서 목록 삭제 버튼 클릭 시 실행되는 함수
  const updateReadList = (list) => {
    setFilterBookList(list);
  };

  const renderLeft = () => {
    if (bookData.length > 0 && isEnter) {
      bookData.map((ele) => {
        return (
          <PickBookItem
            key={ele.id}
            type="long"
            title={ele.volumeInfo.title}
            updateTitle={AddBookList}
            // author={ele.volumeInfo.authors}
          />
        );
      });
    }
  };

  const renderRight = () => {
    {
      addBookList.length > 0
        ? isClick
          ? filterBookList.map((item) => {
              return (
                <PickBookItem
                  key={item}
                  type="short"
                  title={item}
                  readList={filterBookList}
                  updateList={updateReadList}
                  clicked={updateClick}
                />
              );
            })
          : addBookList.map((item) => {
              return (
                <PickBookItem
                  key={item}
                  type="short"
                  title={item}
                  readList={addBookList}
                  updateList={updateReadList}
                  clicked={updateClick}
                />
              );
            })
        : console.log("no");
    }
  };

  return (
    <>
      <div>{type === "add" ? renderLeft() : renderRight()}</div>
    </>
  );
};

export default PickBookList;
