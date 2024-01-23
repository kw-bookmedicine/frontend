import '../styles/Review.css';

const Review = ({ nickname, date, text }) => {
	return (
		<>
			<div className="review_wrapper">
				<div className="left_wrapper">
					<div className="review_img"></div>
				</div>
				<div className="right_wrapper">
					<div className="review_nickname">{nickname}</div>
					<div className="review_date">{date}</div>
					<div className="review_text">{text}</div>
				</div>
			</div>
		</>
	);
};

export default Review;
