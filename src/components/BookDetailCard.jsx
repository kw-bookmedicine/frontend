import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

//COMPONENTS
import HashTag from '../components/HashTag';

//STYLES
import '../styles/BookDetailCard.css';

const BookDetailCard = ({ title, author, imageUrl, isbn, bookKeywordList }) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const bookTitle = searchParams.get('title');
	// console.log('title:', bookTitle);

	// useEffect(() => {
	// 	setSearchParams({ who: 'bb' });
	// });

	return (
		<>
			<Link to={`/book-detail?isbn=${isbn}`}>
				<div className="bookCard_container">
					<div className="bookCard_wrapper">
						<div className="bookCard_left_wrapper">
							<div className="left_img_wrapper">
								<img
									className="img_wrapper_thumbnail"
									src={imageUrl}
									alt="썸네일"
								/>
							</div>
						</div>
						<div className="bookCard_right_wrapper">
							<div className="bookCard_right_up_wrapper">
								<div className="right_up_title" title={title}>
									{title}
								</div>
								<div className="right_up_author">{author}</div>
							</div>
							<div className="bookCard_right_bottom_wrapper">
								{bookKeywordList.map((keyword) => {
									// console.log(keyword.name);
									return <HashTag text={keyword.name} type="sm-category" />;
								})}
							</div>
						</div>
					</div>
				</div>
			</Link>
		</>
	);
};

export default BookDetailCard;
