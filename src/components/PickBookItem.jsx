import React, { useState, useRef, useEffect } from "react";

// COMPONENT
import Btn from "./Button";

// STYLE
import "../styles/PickBookItem.css";

const PickBookItem = ({
  isbn,
  type,
  title,
  author,
  updateTitle,
  BookList,
  updateList,
}) => {
  let listType = ["long", "short"].includes(type) ? type : "default";

  const clickRef = useRef(null);
  const isbnRef = useRef(null);
  const clickAuthorRef = useRef(null);

  // 오른쪽에 보여줄 선택된 책 제목
  const [pickBookTitle, setPickBookTitle] = useState("");
  const [pickBookIsbn, setPickBookIsbn] = useState("");
  const [pickBookAuthor, setPickBookAuthor] = useState("");
  const [bookList, setBookList] = useState([]);

  const [resBookList, setResBookList] = useState([]);
  const [pickBookIsbnList, setPickBookIsbnList] = useState([]);

  useEffect(() => {
    setBookList(BookList);
  }, [BookList]);

  const addPick = async () => {
    const isbnValue = isbnRef.current.textContent;
    // console.log('add:', clickRef.current);
    // console.log('add isbn: ', isbnValue);
    clickRef.current.focus();
    setPickBookTitle(clickRef.current.textContent);
    setPickBookIsbn(isbnValue);
  };

  // 읽은 목록에서 삭제될 때 선택되는 함수
  const deletePick = () => {
    const isbnValue = isbnRef.current.textContent;

    // console.log('del:', clickRef.current);
    // console.log('del isbn: ', isbnValue);
    clickRef.current.focus();
    setPickBookTitle(clickRef.current.textContent);
    setPickBookIsbn(isbnValue);
  };

  // 제일 처음 읽은 목록 추가 함수
  const bookUpdateList = () => {
    // console.log(isbnRef.current.textContent);
    updateList(clickRef.current.textContent, isbnRef.current.textContent);
  };

  // 읽은 목록에서 삭제 버튼 누른 후 필터링 되는 함수
  const filterPickList = () => {
    updateList((prevList) =>
      prevList.filter((item) => item.title !== clickRef.current.textContent)
    );
  };

  const isBookAdded = BookList.some(
    (book) => book.title === title || book.isbn === isbn
  );

  return (
    <>
      <div className={`${listType}-pickBookList_wrapper`}>
        <div
          className={`${listType}-pickBook_title`}
          ref={clickRef}
          title={title}
        >
          <p id="title">{title}</p>
        </div>
        <div className={`${listType}-pickBook_isbn`}>
          <span id="isbn" ref={isbnRef} style={{ visibility: "hidden" }}>
            {isbn}
          </span>
        </div>
        {listType === "long" ? (
          <button
            className="Btn-add"
            onClick={() => {
              if (!isBookAdded) {
                addPick();
                bookUpdateList();
              }
            }}
            disabled={isBookAdded}
          >
            읽은 목록 추가
          </button>
        ) : (
          <button
            className="Btn-delete"
            onClick={() => {
              deletePick();
              filterPickList(clickRef.current.textContent);
            }}
          >
            목록 삭제
          </button>
        )}
      </div>
    </>
  );
};

export default PickBookItem;
