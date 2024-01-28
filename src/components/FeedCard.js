import React from 'react';

//STYLES
import '../styles/FeedCard.css';

const FeedCard = ({ book_name, book_author, user_nickname }) => {
	return (
		<>
			<div className="FeedCardContainer">
				<div className="feed_up_wrapper">
					<div className="feed_review_wrapper">
						<div className="feed_review_text_wrapper">
							<p className="feed_review_text">
								죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를
							</p>
						</div>

						<div className="review_book_wrapper">
							<div className="feed_book_img"></div>
							<div className="feed_book_text_wrapper">
								<div className="feed_book_title">서시</div>
								<div className="feed_book_author">윤동주</div>
							</div>
						</div>
					</div>
				</div>
				<div className="feed_bottom_wrapper">
					<div className="user_wrapper">
						<div className="user_profile"></div>
						<div className="user_nicknameText">별헤는밤</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default FeedCard;
