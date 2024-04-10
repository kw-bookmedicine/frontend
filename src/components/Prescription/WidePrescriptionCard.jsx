import React from 'react';
import { Link } from 'react-router-dom';

import '../../styles/Prescription/WidePrescriptionCard.css';

const WidePrescriptionCard = () => {
	return (
		<>
			<Link to={'/prescription/detail'}>
				<div className="WidePrscrCard_container">
					<div className="wide_prscr_left_wrapper">
						<div className="wide_prscr_left_img">
							<img src="/icon/pharmacy_icon.png" alt="" />
						</div>
						<div className="wide_prscr_left_title">
							"새로운 곳에 적응하기 힘들어요"
						</div>
						<div className="wide_prscr_left_profile">
							<div className="wide_prscr_profile_img"></div>
							<div className="wide_prscr_profileInfo_wrapper">
								<p className="profileInfo_nickname">나는 행복합니다</p>
								<p className="profileInfo_date">2024.04.10.</p>
							</div>
						</div>
					</div>
					<div className="wide_prscr_mid_line"></div>
					<div className="wide_prscr_right_wrapper">
						<div className="wide_prscr_rl_wrapper">
							<img src="/loading_thumbnail_x4.png" alt="" />
						</div>
						<div className="wide_prscr_rr_wrapper">
							<div className="wide_prscr_rr_top_wrapper">
								<p className="wide_prscr_bookInfo_title">책 제목</p>
								<p className="wide_prscr_bookInfo_author">저자</p>
								<p className="wide_prscr_bookInfo_date">출판사/출판연도</p>
							</div>
							<div className="wide_prscr_rr_bottom_wrapper">
								<div className="wide_prscr_rr_reason_title">처방사유</div>
								<div className="wide_prscr_rr_reason_box"></div>
							</div>
						</div>
					</div>
					<img
						src="/icon/pharmacy_icon_2.png"
						className="wide_prscr_pharmacy_icon_group"
					/>
				</div>
			</Link>
		</>
	);
};

export default WidePrescriptionCard;
