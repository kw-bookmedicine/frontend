import React, { useEffect } from 'react';

// COMPONENTS
import Header from '../components/Header';
import CnsFeed from '../components/Prescription/CounselingView';

// STYLES
import '../styles/Counseling/Counseling.css';

const Counseling = () => {
	// useEffect(() => {
	// 	const observer = new IntersectionObserver(
	// 		(items) => {
	// 			items.forEach((item) => {
	// 				if (item.isIntersecting) {
	// 					console.log('visible!');
	// 					item.target.classList.add('visible');
	// 				} else {
	// 					console.log('no');
	// 					item.target.classList.remove('visible');
	// 				}
	// 			});
	// 		},
	// 		{ threshold: 0.5 },
	// 	);

	// 	// const target = document.getElementById('cn_target');
	// 	const items = document.querySelectorAll('.cnsFeed_card_wrapper');
	// 	items.forEach((item) => {
	// 		console.log(item);
	// 		observer.observe(item);
	// 	});
	// }, []);

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
								alt="예술"
								className="cns_category_img"
							/>
							<span className="cns_category_text">예술</span>
						</div>
						<div className="cns_category">
							<img
								src="/icon/history_icon.png"
								alt="역사"
								className="cns_category_img"
							/>
							<span className="cns_category_text">역사</span>
						</div>
						<div className="cns_category">
							<img
								src="/icon/philosophy_icon.png"
								alt="철학"
								className="cns_category_img"
							/>
							<span className="cns_category_text">철학</span>
						</div>
						<div className="cns_category">
							<img
								src="/icon/social_icon.png"
								alt="사회과학"
								className="cns_category_img"
							/>
							<span className="cns_category_text">사회과학</span>
						</div>
						<div className="cns_category">
							<img
								src="/icon/tech_icon.png"
								alt="기술과학"
								className="cns_category_img"
							/>
							<span className="cns_category_text">기술과학</span>
						</div>
						<div className="cns_category">
							<img
								src="/icon/science_icon.png"
								alt="자연과학"
								className="cns_category_img"
							/>
							<span className="cns_category_text">자연과학</span>
						</div>
						<div className="cns_category">
							<img
								src="/icon/religion_icon.png"
								alt="역사"
								className="cns_category_img"
							/>
							<span className="cns_category_text">역사</span>
						</div>
						<div className="cns_category">
							<img
								src="/icon/general_icon.png"
								alt="총류"
								className="cns_category_img"
							/>
							<span className="cns_category_text">총류</span>
						</div>
						<div className="cns_category">
							<img
								src="/icon/language_icon.png"
								alt="언어"
								className="cns_category_img"
							/>
							<span className="cns_category_text">언어</span>
						</div>
						<div className="cns_category">
							<img
								src="/icon/literature_icon.png"
								alt="문학"
								className="cns_category_img"
							/>
							<span className="cns_category_text">문학</span>
						</div>
					</div>
				</div>
				<div className="counseling_feed_wrapper">
					<div id="cnsFeed_card_wrapper">
						<CnsFeed />
					</div>
					<div className="cnsFeed_card_wrapper">
						<CnsFeed />
					</div>
					<div className="cnsFeed_card_wrapper">
						<CnsFeed />
					</div>
					<div className="cnsFeed_card_wrapper">
						<CnsFeed />
					</div>
					<div className="cnsFeed_card_wrapper">
						<CnsFeed />
					</div>
					<div className="cnsFeed_card_wrapper">
						<CnsFeed />
					</div>
					<div className="cnsFeed_card_wrapper">
						<CnsFeed />
					</div>
					<div className="cnsFeed_card_wrapper">
						<CnsFeed />
					</div>
					<div className="cnsFeed_card_wrapper">
						<CnsFeed />
					</div>

					<div className="cnsFeed_card_wrapper">
						<CnsFeed />
					</div>
					<div className="cnsFeed_card_wrapper">
						<CnsFeed />
					</div>
				</div>
				<div id="cn_target"></div>
			</div>
		</>
	);
};

export default Counseling;
