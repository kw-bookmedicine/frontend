import React from 'react';
import { Link } from 'react-router-dom';

// STYLE
import '../../styles/Counseling/PrescriptionCard.css';

const PrescriptionCard = () => {
	return (
		<>
			<Link to={'/prescription/detail'}>
				<div className="prscrCard_container">
					<div className="prscrCard_top_wrapper">
						<img
							src="/icon/pharmacy_icon.png"
							alt=""
							className="prscr_vector_icon"
						/>
						<div className="prscrCard_title_wrapper">
							<div className="prscrCard_title">
								"새로운 곳에
								<br />
								적응하기 힘들어요"
							</div>
							<div className="prscrCard_user_name_wrapper">
								<div className="prscrCard_user_name">이름 없는 새</div>
								<span> 귀하</span>
							</div>
						</div>
					</div>
					<div className="prscrCard_mid_wrapper">
						<div className="prscrCard_bookInfo_wrapper">
							<div id="prscrCard_mid_title">처방전</div>
							<div className="bookInfo_left_wrapper">
								<img
									src="/loading_thumbnail_x4.png"
									alt=""
									className="bookInfo_img"
								/>
							</div>
							<div className="bookInfo_right_wrapper">
								<p className="prscrCard_bookInfo_title">책 제목</p>
								<p className="prscrCard_bookInfo_author">저자</p>
								<p className="prscrCard_bookInfo_date">출판사/출판연도</p>
								<img
									src="/icon/pharmacy_icon_2.png"
									className="pharmacy_icon_group"
								/>
							</div>
						</div>
					</div>
					<div className="prscrCard_bottom_wrapper">
						<div className="prscrCard_update_date">2000 년 00 월 00일</div>
					</div>
				</div>
			</Link>
		</>
	);
};

export default PrescriptionCard;
