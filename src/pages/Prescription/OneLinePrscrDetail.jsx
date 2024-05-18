import React, { useState, useEffect } from 'react';

// COMPONENTS
import Header from '../../components/Header';

// STYLE
import '../../styles/Prescription/OneLinePrscrDetail.css';

const OneLinePrscrDetail = () => {
	return (
		<>
			<Header />
			<div className="oneLine_prscr_detail_container">
				<div className="oneLinePrscr_detail_up_wrapper">
					<div className="oneLinePrscr_detail_content_container">
						<div className="prscr_detail_left_wrapper">
							<div className="prscr_detail_img_wrapper">
								<img
									src="/loading_thumbnail_x4.png"
									id="oneLine-prscr-book-img"
								/>
							</div>
							<div className="prscr_detail_bookAbout_wrapper">
								<p>책 정보</p>
								<div className="bookAbout_content"></div>
								<div className="bookKeyword_wrapper"></div>
							</div>
						</div>
						<div className="prscr_detail_right_wrapper">
							<div className="prscr_detail_bookInfo_wrapper">
								<div className="bookInfo_title_wrapper">
									<p>책 제목</p>
									<button id="delete-btn">삭제하기</button>
								</div>
								<p>저자</p>
								<p>출판사/출판연도</p>
							</div>
							<div className="prscr_detail_user_wrapper">
								<div className="userInfo_wrapper">
									<img
										src="/icon/profile/basic_profile_img.svg"
										id="user_img"
									/>
									<p>사용자 닉네임</p>
								</div>
								<div className="prscr_detail_evaluation_wrapper">
									<button className="prscr_detail_evaluation_btn">
										<img src="/icon/oneLine-prscr/like.png" id="like-icon" />
										<span>좋은 추천이에요</span>
									</button>
									<button className="prscr_detail_evaluation_btn">
										<img
											src="/icon/oneLine-prscr/laughing.png"
											id="laugh-icon"
										/>
										<span>도움이 되었어요</span>
									</button>
								</div>
							</div>
							<div className="prscr_detail_content_wrapper">
								<div className="prscr_detail_content_title_wrapper">
									<p>처방제목</p>
								</div>
								<div className="prscr_detail_content_about_wrapper">
									<p>처방사유</p>
									<p>이 책을 읽은 이유는...</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="oneLinePrscr_detail_down_wrapper"></div>
			</div>
		</>
	);
};

export default OneLinePrscrDetail;
