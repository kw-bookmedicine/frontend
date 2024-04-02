import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// COMPONENTS
import Header from '../components/Header';
import Title from '../components/Prescription/ProcessTitle';

// ASSETS
import loading_img from '../assets/loading_thumbnail_x4.png';

// STYLE
import '../styles/Counseling/PrescriptionWriteStep2.css';

const PrescriptionWriteStep2 = () => {
	return (
		<>
			<Header />
			<Title type={'process'} value={'60'} />
			<div className="prescription_info_container">
				<div className="prscr_left_wrapper">
					<img
						src={loading_img}
						alt="로딩 썸네일"
						className="prscr_img_wrapper"
					/>
				</div>
			</div>
			<div className="prescription_mid_wrapper">
				<div className="prscr_write_wrapper">
					<span className="prscr_write_title">처방사유</span>
				</div>
			</div>
			<div className="prescription_btn_container">
				<button className="prscr_cancel_btn">취소하기</button>
				<button className="prscr_apply_btn">처방전 등록하기</button>
			</div>
		</>
	);
};

export default PrescriptionWriteStep2;
