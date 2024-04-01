import React from 'react';

// ASSETS
import loading_thumbnail from '../../assets/loading_thumbnail_x4.png';

// COMPONENTS
import Header from '../../components/Header.js';
import Title from '../../components/Prescription/ProcessTitle.jsx';
import PrescriptionCard from '../../components/Prescription/PrescriptionCard.jsx';

// STYLE
import '../../styles/Prescription/PrescriptionDetail.css';

const PrescriptionDetail = () => {
	return (
		<>
			<Header />
			<Title type={'detail'} />
			<div className="prscr_detail_top_container">
				<div className="prscr_detail_top_info_wrapper">
					<div className="prscr_detail_top_wrapper">
						<div className="dt_prscr_title_wrapper">
							<span id="dt_prscr_title">"새로운 곳에 적응하기 힘들어요"</span>
							&nbsp;에 대한&nbsp;<span id="dt_from_nickname"> 유저 1</span>님의
							처방전
						</div>
						<div className="prscr_dt_bookInfo_wrapper">
							<div className="prscr_dt_left_wrapper">
								<img src={loading_thumbnail} alt="" id="prscr_dt_loading_img" />
							</div>
							<div className="prscr_dt_right_wrapper">
								<p className="prscr_dt_right_title">책 제목</p>
								<p className="prscr_dt_right_author">저자</p>
								<p className="prscr_dt_right_bookCompany">출판사</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="prscr_detail_bottom_wrapper">
				<div className="prscr_detail_res_container">
					<div className="prscr_dt_res_title">처방사유</div>
				</div>
				<div className="prscr_other_container">
					<div className="other_list_title">다른 처방전 확인하기</div>
					<div className="other_list_wrapper">
						<PrescriptionCard />
						<PrescriptionCard />
						<PrescriptionCard />
						<PrescriptionCard />
						<PrescriptionCard />
						<PrescriptionCard />
					</div>
				</div>
			</div>
		</>
	);
};

export default PrescriptionDetail;
