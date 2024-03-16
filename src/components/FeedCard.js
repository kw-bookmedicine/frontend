import React from 'react';

//STYLES
import '../styles/FeedCard.css';

const FeedCard = ({ title, author, nickname, imgUrl, comment }) => {
	return (
		<>
			<div className="FeedCardContainer">
				<div className="feed_up_wrapper">
					<div className="feed_review_wrapper">
						<div className="feed_review_text_wrapper">
							<p className="feed_review_text">{comment}</p>
						</div>

						<div className="review_book_wrapper">
							<div className="feed_book_img_wrapper">
								<img className="feed_book_img" src={imgUrl} alt="" />
							</div>
							<div className="feed_book_text_wrapper">
								<div className="feed_book_title">{title}</div>
								<div className="feed_book_author">{author}</div>
							</div>
						</div>
					</div>
				</div>
				<div className="feed_bottom_wrapper">
					<div className="user_wrapper">
						<div className="user_profile"></div>
						<div className="user_nicknameText">{nickname}</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default FeedCard;
