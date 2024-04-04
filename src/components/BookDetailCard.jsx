import React from 'react';
import { Link } from 'react-router-dom';

// ASSETS
import loading_thumbnail from '../assets/loading_thumbnail_x4.png';

//COMPONENTS
import HashTag from '../components/HashTag';

//STYLES
import '../styles/BookDetailCard.css';

const BookDetailCard = ({
	title,
	author,
	imageUrl,
	isbn,
	bookKeywordList,
	type,
}) => {
	let cardType = ['expModal'].includes(type) ? type : '';
	// let image = imageUrl === ' ' ? console.log(imageUrl) : console.log(imageUrl);

	const renderCard = (type) => {
		if (type === 'expModal') {
			return (
				<>
					<div className="expModal_bookCard_container">
						<div className="expModal_bookCard_wrapper">
							<div className="expModal_bookCard_left_wrapper">
								<div className="expModal_left_img_wrapper">
									<img
										className="expModal_img_wrapper_thumbnail"
										src={imageUrl === '' ? loading_thumbnail : imageUrl}
										// alt="썸네일"
									/>
								</div>
							</div>

							<div className="expModal_bookCard_right_wrapper">
								<div className="expModal_bookCard_right_up_wrapper">
									<div className="expModal_right_up_title" title={title}>
										{title}
									</div>
									<div className="expModal_right_up_author">{author}</div>
								</div>

								<div className="expModal_bookCard_right_bottom_wrapper"></div>
							</div>
						</div>
					</div>
				</>
			);
		} else {
			return (
				<>
					<Link to={`/book-detail?isbn=${isbn}`}>
						<div className="bookCard_container">
							<div className="bookCard_wrapper">
								<div className="bookCard_left_wrapper">
									<div className="left_img_wrapper">
										<img
											className="img_wrapper_thumbnail"
											src={imageUrl === '' ? loading_thumbnail : imageUrl}
											// alt="썸네일"
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
		}
	};

	return (
		<>
			<div>{renderCard(cardType)}</div>
		</>
	);
};

export default BookDetailCard;
