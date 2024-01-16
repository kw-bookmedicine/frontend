import React from 'react';

//STYLES
import '../styles/FeedCard.css';

const FeedCard = ({ book_name, book_author, user_nickname }) => {
	return (
		<>
			<div className="FeedCardContainer">
				<div className="feed_up_wrapper">
					<div className="feed_left_wrapper">
						<div className="left_img_wrapper">
							<div className="left_bookImg"></div>
						</div>
						<div className="left_book_wrapper">
							<div className="book_title">서시</div>
							<div className="book_author">윤동주</div>
						</div>
					</div>
					<div className="feed_right_wrapper">
						<div className="right_date_wrapper">2024.01.13</div>
						<div className="right_comment_wrapper">
							죽는 날까지 하늘을 <br />
							우러러 한 점 부끄럼이 없기를
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
