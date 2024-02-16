import React from 'react';
import '../styles/SearchResultList.css';

const SearchResultList = ({ book, type }) => {
	let listType = ['myBook'].includes(type) ? type : 'search';
	// console.log('book: ',book);

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
									onClick={(e) => {
										// console.log(e);
										// console.log(e.target);
										console.log(e.target.innerText);
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
};

SearchResultList.defaultProps = {
	type: 'search',
};

export default SearchResultList;
