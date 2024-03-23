import React from 'react';

// COMPONENTS
import Header from '../components/Header';
import Footer from '../components/Footer';
import Title from '../components/Prescription/ProcessTitle';

// STYLE
import '../styles/Counseling/WorryDetail.css';

const WorryDetail = () => {
	return (
		<>
			<Header />
			<div className="worry_detail_content">
				<Title />
				<div className="worry_detail_title_wrapper">
					<div className="wd_user_wrapper">
						<div className="wd_user_img"></div>
						<div className="wd_user_info_wrapper">
							<div className="wd_user_name">이름없는 새</div>
							<div className="wd_user_date">2024.00.00</div>
						</div>
					</div>
					<div className="wd_title_text_wrapper"></div>
				</div>
				<div className="worry_detail_content_wrapper">
					<div className="wd_content_detail_wrapper"></div>
				</div>
			</div>

			<Footer />
		</>
	);
};

export default WorryDetail;
