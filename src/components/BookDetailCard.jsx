import React from 'react';
import { Link } from 'react-router-dom';

//COMPONENTS
import HashTag from '../components/HashTag';

//STYLES
import '../styles/BookDetailCard.css';

const BookDetailCard = ({ title, author, imageUrl, isbn, bookKeywordList }) => {
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
								{bookKeywordList.map((keyword, idx) => {
									return (
										<HashTag
											key={`${isbn}keyword-${idx}`}
											text={keyword.name}
											type="sm-category"
										/>
									);
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
