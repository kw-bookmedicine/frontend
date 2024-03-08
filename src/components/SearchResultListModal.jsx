import React from 'react'
import "../styles/SearchResultList.css";

const SearchResultListModal = ({ book, type, updateBook }) => {
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

          if (title !== undefined) {
            return (
              <ul key={item.id} className={`${listType}-result-container`}>
                <li
                  className={`${listType}-result-list`}
                  onClick={() => {
                    updateBookTitle(title);
                  }}
                >
                  <img src={thumbnail} alt="" />
                  <div className={`${listType}-result-item`}>
                    <h1 className={`${listType}-result-item-title`}>{title}</h1>
                    <h1 className={`${listType}-result-item-author`}>
                      {author}
                    </h1>
                  </div>
                </li>
              </ul>
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