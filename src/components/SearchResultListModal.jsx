import React from "react";
import "../styles/SearchResultList.css";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SearchResultListModal = ({
  book,
  type,
  updateBook,
  addInput,
  selectedKeywordSet,
}) => {
  let listType = ["myBook"].includes(type) ? type : "search";

  return (
    <>
      <div className={`${listType}-modal-container`}>
        {book.map((item) => {
          // console.log(item);
          // 작가에서 누구 지음 이걸 빼주도록 하기 -> 작가 이름을 어떻게 필터링 처리를 할까?

          let title = item && item.title;
          let author = item && item.author;
          let thumbnail = item && item.imageUrl;
          let keyword = item && item.name;
          let isbn = item && item.isbn;

          // 책 제목 && 작가 UI
          if (title !== undefined) {
            return (
              <ul key={item.isbn} className={`${listType}-result-container`}>
                <Link to={`/book-detial/${isbn}`}>
                  <li className={`${listType}-result-list`}>
                    <img src={thumbnail} alt="" />
                    <div className={`${listType}-result-item`}>
                      <h1 className={`${listType}-result-item-title`}>
                        {title}
                      </h1>
                      <h1 className={`${listType}-result-item-author`}>
                        {author}
                      </h1>
                    </div>
                  </li>
                </Link>
              </ul>
            );
          }

          // 키워드 UI
          if (keyword !== undefined) {
            
            return !selectedKeywordSet.has(keyword) ? (
              <KeywordItem
                style={{ fontSize: "20px", marginBottom: "10px" }}
                onClick={() => addInput(keyword)}
              >
                {keyword}
              </KeywordItem>
            ) : (
              // <p
              //   style={{ fontSize: "20px", marginBottom: "10px"}}
              //   onClick={() => addInput(keyword)}
              // >
              //   {keyword}
              // </p>
              <></>
            );
          }
          return null;
        })}
      </div>
    </>
  );
};

SearchResultListModal.defaultProps = {
  type: "search",
};

export default SearchResultListModal;

const KeywordItem = styled.p`
  font-size: 20px;
  margin-bottom: 10px;
  &:hover {
    background-color: #d6d6d6;
    border-radius: 4px;
  }
`;
