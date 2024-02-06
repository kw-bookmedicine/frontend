import React from 'react'
import "../styles/SearchResultList.css";

const SearchResultList = ({ book }) => {
  console.log('book: ',book);
    
  return (
    <>
      <div className="search-modal-container">
        {book.map((item) => {
          let thumbnail =
            item.volumeInfo.imageLinks &&
            item.volumeInfo.imageLinks.smallThumbnail;

          let title = item.volumeInfo && item.volumeInfo.title;
          let author = item.volumeInfo && item.volumeInfo.authors;
          console.log(author);

          if (
            thumbnail !== undefined &&
            title !== undefined
          ) {
            return (
              <ul key={item.id} className="search-result-container">
                <li className="search-result-list">
                  <img src={thumbnail} alt="" />
                  <div className="search-result-item">
                    <h1 className="search-result-item-title">{title}</h1>
                    <h1 className="search-result-item-author">{author}</h1>
                  </div>
                </li>
              </ul>
            );
          }
        })}
      </div>
    </>
  );
};

export default SearchResultList;