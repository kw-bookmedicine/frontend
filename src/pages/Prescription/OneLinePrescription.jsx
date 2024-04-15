import React, { useState } from 'react';

// SERVICES
import api from '../../services/api';

// COMPONENTS
import Header from '../../components/Header';
import PrescriptionCard from '../../components/Prescription/PrescriptionCard';

// STYLE
import '../../styles/Prescription/OneLinePrescription.css';

const OneLinePrescription = () => {
	const [iconUrl, setIconUrl] = useState('/icon/white_search_icon.svg');

	const [iconClick, setIconClick] = useState(false);

	const handleIconUrl = async () => {
		if (!iconClick) {
			setIconUrl('/icon/active_search_icon.svg');
		} else {
			setIconUrl('/icon/white_search_icon.svg');
		}
	};

	const handleIcon = (e) => {
		let target = '';
		if (e.target.alt) {
			target = e.target.alt;
		} else {
			target = e.target.innerText;
		}
		let targetIcon = document.getElementById(`${target}`);
		// console.log(targetIcon);
		targetIcon.classList.toggle('icon-active');
	};

	const [cardClick, setCardClick] = useState(false);

	const handleCardClick = (res) => {
		// setCardClick(!cardClick);
		console.log(res);
	};

	return (
		<>
			<Header />
			<section>
				<div className="OneLinePrscr_content">
					<div className="counseling_category_wrapper">
						<div className="cns_category_title">한 줄 처방</div>
						<div className="cns_category_content_wrapper">
							<div className="cns_category" onClick={handleIcon} id="예술">
								<img
									src="/icon/art_icon.svg"
									alt="예술"
									className="cns_category_img"
								/>
								<span className="cns_category_text">예술</span>
							</div>
							<div className="cns_category" onClick={handleIcon} id="역사">
								<img
									src="/icon/history_icon.png"
									alt="역사"
									className="cns_category_img"
								/>
								<span className="cns_category_text">역사</span>
							</div>
							<div className="cns_category" onClick={handleIcon} id="철학">
								<img
									src="/icon/philosophy_icon.png"
									alt="철학"
									className="cns_category_img"
								/>
								<span className="cns_category_text">철학</span>
							</div>
							<div className="cns_category" onClick={handleIcon} id="사회과학">
								<img
									src="/icon/social_icon.png"
									alt="사회과학"
									className="cns_category_img"
								/>
								<span className="cns_category_text">사회과학</span>
							</div>
							<div className="cns_category" onClick={handleIcon} id="기술과학">
								<img
									src="/icon/tech_icon.png"
									alt="기술과학"
									className="cns_category_img"
								/>
								<span className="cns_category_text">기술과학</span>
							</div>
							<div className="cns_category" onClick={handleIcon} id="자연과학">
								<img
									src="/icon/science_icon.png"
									alt="자연과학"
									className="cns_category_img"
								/>
								<span className="cns_category_text">자연과학</span>
							</div>
							<div className="cns_category" onClick={handleIcon} id="종교">
								<img
									src="/icon/religion_icon.png"
									alt="종교"
									className="cns_category_img"
								/>
								<span className="cns_category_text">종교</span>
							</div>
							<div className="cns_category" onClick={handleIcon} id="총류">
								<img
									src="/icon/general_icon.png"
									alt="총류"
									className="cns_category_img"
								/>
								<span className="cns_category_text">총류</span>
							</div>
							<div className="cns_category" onClick={handleIcon} id="언어">
								<img
									src="/icon/language_icon.png"
									alt="언어"
									className="cns_category_img"
								/>
								<span className="cns_category_text">언어</span>
							</div>
							<div className="cns_category" onClick={handleIcon} id="문학">
								<img
									src="/icon/literature_icon.png"
									alt="문학"
									className="cns_category_img"
								/>
								<span className="cns_category_text">문학</span>
							</div>
						</div>
					</div>
					{/* <div className="OneLinePrscr_title_wrapper">
						<p>한 줄 처방</p>
					</div> */}
					<div className="OneLinePrscr_container">
						<div className="OneLinePrscr_search_wrapper">
							<form action="" className="cnsSearchBar_wrapper">
								<img
									src={iconUrl}
									alt="검색"
									id="cnsSearch_icon"
									onClick={() => {
										handleIconUrl();
										setIconClick(!iconClick);
										let searchBar = document.querySelector(
											'.cnsSearchBar_wrapper',
										);
										let searchBarText =
											document.getElementById('cnsSearch_text');
										searchBar.classList.toggle('searchBar-visible');
										searchBarText.classList.toggle('searchBar-visible');
									}}
								/>
								<input
									type="text"
									id="cnsSearch_text"
									placeholder="검색어를 입력해주세요"
								/>
							</form>
						</div>
						<div className="OneLinePrscr_card_container">
							<PrescriptionCard
								onClick={() => {
									console.log('click');
								}}
								isClick={cardClick}
							/>
							<PrescriptionCard />
							<PrescriptionCard />
							<PrescriptionCard />
							<PrescriptionCard />
							<PrescriptionCard />
							<PrescriptionCard />
							<PrescriptionCard />
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default OneLinePrescription;
