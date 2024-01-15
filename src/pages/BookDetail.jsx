import React from 'react';

// COMPONENTS
import Header from '../components/Header';

// STYLES
import '../styles/BookDetail.css';

const BookDetail = () => {
	return (
		<>
			<Header />
			<div className="bookDetail_content">
				<section className="bookSummary">
					<div className="bookSummary_wrapper">
						<div className="summary_left_wrapper">
							<div className="summary_left_img"></div>
						</div>
						<div className="summary_right_wrapper">
							<div className="summary_right_up_wrapper">
								<div className="right_up_left_wrapper">
									<div className="up_left_book_title">해리포터와 불의 잔</div>
									<div className="up_left_book_author">J. K. 롤링 </div>
								</div>
								<div className="right_up_right_wrapper">
									<div className="up_right_exp"></div>
								</div>
							</div>
							<div className="summary_left_mid_wrapper"></div>
							<div className="summary_left_bottom_wrapper"></div>
						</div>
					</div>
				</section>
				<section className="bookInfo">
					<div className="bookInfo_wrapper"></div>
				</section>
				<section className="bookComment">
					<div className="bookComment_wrapper"></div>
				</section>
				<section className="relationBookList">
					<div className="relationBookList_wrapper"></div>
				</section>
			</div>
		</>
	);
};

export default BookDetail;
