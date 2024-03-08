import React from 'react'
import "../styles/SearchResultList.css";
import { Link } from 'react-router-dom';

const SearchResultListModal = ({ book, type, updateBook, addInput }) => {
  let listType = ["myBook"].includes(type) ? type : "search";

  const updateBookTitle = (pickTitle) => {
    updateBook(pickTitle);
  };

  return (
    <>
      <div className={`${listType}-modal-container`}>
        {book.map((item) => {
          console.log(item);
          // 작가에서 누구 지음 이걸 빼주도록 하기 -> 작가 이름을 어떻게 필터링 처리를 할까?

          let title = item && item.title;
          let author = item && item.author;
          let thumbnail = item && item.imageUrl;
          let keyword = item && item.name;
          console.log(`/book-detial/${title}`);

          // 책 제목 && 작가 UI
          if (title !== undefined) {
            return (
              <ul key={item.id} className={`${listType}-result-container`}>
                <Link to={`/book-detial/${title}`}>
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
            return (
              <p
                style={{ fontSize: "20px", marginBottom: "10px" }}
                onClick={()=>addInput(`#${keyword}`)}
              >
                {keyword}
              </p>
            );
          }
        })}
      </div>
    </>
  );
}

SearchResultListModal.defaultProps = {
  type: "search",
};

export default SearchResultListModal