import React from 'react';

// COMPONENTS
import Header from '../components/Header';
import CnsFeed from '../components/Prescription/CounselingView';

// STYLES
import '../styles/Counseling/Counseling.css';

const Counseling = () => {
	return (
		<>
			<Header />
			<div className="counseling_content">
				<div className="counseling_category_wrapper">
					<div className="cns_category_title">분야 선택</div>
					<div className="cns_category_content_wrapper">
						<div className="cns_category">
							<img
								src="/icon/art_icon.png"
								alt=""
								className="cns_category_img"
							/>
							<span className="cns_category_text">예술</span>
						</div>
						<div className="cns_category">
							<img
								src="/icon/history_icon.png"
								alt=""
								className="cns_category_img"
							/>
							<span className="cns_category_text">역사</span>
						</div>
						<div className="cns_category">
							<img
								src="/icon/philosophy_icon.png"
								alt=""
								className="cns_category_img"
							/>
							<span className="cns_category_text">철학</span>
						</div>
						<div className="cns_category">
							<img
								src="/icon/social_icon.png"
								alt=""
								className="cns_category_img"
							/>
							<span className="cns_category_text">사회과학</span>
						</div>
						<div className="cns_category">
							<img
								src="/icon/tech_icon.png"
								alt=""
								className="cns_category_img"
							/>
							<span className="cns_category_text">기술과학</span>
						</div>
						<div className="cns_category">
							<img
								src="/icon/science_icon.png"
								alt=""
								className="cns_category_img"
							/>
							<span className="cns_category_text">자연과학</span>
						</div>
						<div className="cns_category">
							<img
								src="/icon/religion_icon.png"
								alt=""
								className="cns_category_img"
							/>
							<span className="cns_category_text">역사</span>
						</div>
						<div className="cns_category">
							<img
								src="/icon/general_icon.png"
								alt=""
								className="cns_category_img"
							/>
							<span className="cns_category_text">총류</span>
						</div>
						<div className="cns_category">
							<img
								src="/icon/language_icon.png"
								alt=""
								className="cns_category_img"
							/>
							<span className="cns_category_text">언어</span>
						</div>
						<div className="cns_category">
							<img
								src="/icon/literature_icon.png"
								alt=""
								className="cns_category_img"
							/>
							<span className="cns_category_text">문학</span>
						</div>
					</div>
				</div>
				<div className="counseling_feed_wrapper">
					<CnsFeed />
					<CnsFeed />
					<CnsFeed />
					<CnsFeed />
				</div>
			</div>
		</>
	);
};

export default Counseling;
