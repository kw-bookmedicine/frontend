import React, { useState } from 'react';
import '../styles/SearchResultList.css';

// 구글 책 검색
const SearchResultList = ({ book, type, updateBook }) => {
	let listType = ['myBook'].includes(type) ? type : 'search';
	// console.log('book: ',book);

	// const [pickTitle, setPickTitle] = useState('');

	const updateBookTitle = (pickTitle) => {
		updateBook(pickTitle);
	};

	return (
		<>
			<div className={`${listType}-modal-container`}>
				{book.map((item) => {
					// console.log(item);
					let thumbnail =
						item.volumeInfo.imageLinks &&
						item.volumeInfo.imageLinks.smallThumbnail;

					let title = item.volumeInfo && item.volumeInfo.title;
					let author = item.volumeInfo && item.volumeInfo.authors;
					// console.log(title);
					// console.log(author);

					if (thumbnail !== undefined && title !== undefined) {
						return (
							<ul key={item.id} className={`${listType}-result-container`}>
								<li
									className={`${listType}-result-list`}
									onClick={() => {
										// console.log(e);
										// console.log(e.target);
										// console.log(e.target.innerText);
										// console.log(title);
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
					return null;
				})}
			</div>
		</>
	);
};

SearchResultList.defaultProps = {
	type: 'search',
};

export default SearchResultList;
