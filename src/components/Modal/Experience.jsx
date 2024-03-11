import React, { useState } from 'react';

// COMPONENTS
import BookInfoCard from '../BookDetailCard';

// STYLE
import '../../styles/Experience.css';

const Experience = ({ onClose }) => {
	// 모달 창 닫는 함수
	const handleClose = () => {
		onClose?.();
	};

	return (
		<>
			<div className="expModal_overlay">
				<div className="expModal_wrapper">
					<div className="expModal_title_wrapper">
						리뷰작성
						<div className="close_btn" onClick={handleClose}>
							X
						</div>
					</div>
					<div className="expModal_content_wrapper">
						<div className="bookInfo_content_wrapper">
							<BookInfoCard type="expModal" title={'해리포터'} />
						</div>
						<div className="inputReview_wrapper">
							<div className="inputReview_title">리뷰작성</div>
							<input type="text" className="inputReview_box" />
						</div>
						<div className="expModal_button_wrapper">
							<button className="review_btn">리뷰 남기기</button>
							<button className="later_btn">피드만 나중에</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Experience;
