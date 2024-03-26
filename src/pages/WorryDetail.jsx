import React from 'react';
import { Link } from 'react-router-dom';

// COMPONENTS
import Header from '../components/Header';
import Title from '../components/Prescription/ProcessTitle';

// STYLE
import '../styles/Counseling/WorryDetail.css';

const WorryDetail = () => {
	const move = () => {
		window.location.replace('/pre/write');
	};

	return (
		<>
			<Header />
			<div className="worry_detail_content">
				<Title type={'normal'} />
				<div className="worry_detail_title_wrapper">
					<div className="wd_user_wrapper">
						<div className="wd_user_left_wrapper">
							<div className="wd_user_img"></div>
							<div className="wd_user_info_wrapper">
								<div className="wd_user_name">이름없는 새</div>
								<div className="wd_user_date">2024.00.00</div>
							</div>
						</div>
					</div>
					<div className="wd_title_text_wrapper">
						새로운 곳에 적응하기 힘들어요!
					</div>
				</div>
				<div className="worry_detail_content_wrapper">
					<div className="wd_content_detail_wrapper">
						<span className="wd_content_detail_title">상세 고민 내용</span>
						<div className="wd_content_detail_text">아바바</div>
					</div>
					<div className="worry_detail_prscr_wrapper">
						<div className="wd_prscr_list_title">처방전 확인하기</div>
						<div className="wd_prscr_list_wrapper">d</div>
					</div>
					<Link to={`/prescription/write?prscrId=123`}>
						<button className="prscr_btn">처방하러 가기</button>
					</Link>
				</div>
			</div>
		</>
	);
};

export default WorryDetail;
