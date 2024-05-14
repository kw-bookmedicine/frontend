import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// SERVICES
import api from '../../services/api';

// COMPONENTS
import Header from '../../components/Header';
import PrescriptionCard from '../../components/Prescription/PrescriptionCard';
import OneLinePrscrCard from '../../components/Prescription/OneLinePrscrCard';

// STYLE
import '../../styles/Prescription/OneLinePrescription.css';

const OneLinePrescription = () => {
	const [iconUrl, setIconUrl] = useState('/icon/white_search_icon.svg');

	const [iconClick, setIconClick] = useState(false);

	const handleIconUrl = async () => {
		if (!iconClick) {
			setIconUrl('/icon/black_search_icon.svg');
		} else {
			setIconUrl('/icon/white_search_icon.svg');
		}
	};

	const handleIcon = (e) => {
		// 모든 아이콘 글씨 색 초기화
		const icons = document.querySelectorAll('.cns_category_text');
		icons.forEach((icon) => {
			if (icon.className === 'cns_category_text') {
				// console.log(icon.className);
				icon.style.color = 'black';
				icon.style.fontWeight = '400';
			} else {
				icon.style.color = 'black';
				icon.style.fontWeight = '400';
			}
		});

		// 클릭된 아이콘만 색상 설정
		const clickedIcon = e.currentTarget.querySelector('.cns_category_text');
		// console.log(clickedIcon);
		clickedIcon.style.color = 'red';
		clickedIcon.style.fontWeight = '600';
		clickedIcon.classList.toggle('icon-active');
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
					<div className="oneLinePrscr_category_wrapper">
						<div className="oneLinePrscr_category_title">한 줄 처방</div>
						<form className="oneLinePrscr_searchBar_wrapper">
							<img
								src="/icon/black_search_icon.svg"
								id="oneLinePrscr_searchBar_icon"
							/>
							<input
								type="text"
								className="oneLinePrscr_searchBar"
								placeholder="Search"
							/>
						</form>

						{/* <form action="" className="oneLinePrscrSearchBar_wrapper">
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
							</form> */}
						<div className="oneLinePrscr_category_content_wrapper">
							<div className="cns_category" onClick={handleIcon} id="관계/소통">
								<img
									src="/icon/art_icon.svg"
									alt="관계/소통"
									className="cns_category_img"
								/>
								<span className="cns_category_text">관계/소통</span>
							</div>
							<div
								className="cns_category"
								onClick={handleIcon}
								id="소설/에세이"
							>
								<img
									src="/icon/history_icon.png"
									alt="소설/에세이"
									className="cns_category_img"
								/>
								<span className="cns_category_text">소설/에세이</span>
							</div>
							<div className="cns_category" onClick={handleIcon} id="경제/경영">
								<img
									src="/icon/philosophy_icon.png"
									alt="경제/경영"
									className="cns_category_img"
								/>
								<span className="cns_category_text">경제/경영</span>
							</div>
							<div className="cns_category" onClick={handleIcon} id="자녀/양육">
								<img
									src="/icon/social_icon.png"
									alt="자녀/양육"
									className="cns_category_img"
								/>
								<span className="cns_category_text">자녀/양육</span>
							</div>
							<div className="cns_category" onClick={handleIcon} id="사회">
								<img
									src="/icon/tech_icon.png"
									alt="사회"
									className="cns_category_img"
								/>
								<span className="cns_category_text">사회</span>
							</div>
							<div className="cns_category" onClick={handleIcon} id="철학">
								<img
									src="/icon/science_icon.png"
									alt="철학"
									className="cns_category_img"
								/>
								<span className="cns_category_text">철학</span>
							</div>
							<div className="cns_category" onClick={handleIcon} id="건강">
								<img
									src="/icon/religion_icon.png"
									alt="건강"
									className="cns_category_img"
								/>
								<span className="cns_category_text">건강</span>
							</div>
							<div className="cns_category" onClick={handleIcon} id="역사">
								<img
									src="/icon/general_icon.png"
									alt="역사"
									className="cns_category_img"
								/>
								<span className="cns_category_text">역사</span>
							</div>
							<div
								className="cns_category"
								onClick={handleIcon}
								id="수학/과학/공학"
							>
								<img
									src="/icon/language_icon.png"
									alt="수학/과학/공학"
									className="cns_category_img"
								/>
								<span className="cns_category_text">수학/과학/공학</span>
							</div>
							<div
								className="cns_category"
								onClick={handleIcon}
								id="문제집/수험서"
							>
								<img
									src="/icon/literature_icon.png"
									alt="문제집/수험서"
									className="cns_category_img"
								/>
								<span className="cns_category_text">문제집/수험서</span>
							</div>
							<div className="cns_category" onClick={handleIcon} id="취업">
								<img
									src="/icon/literature_icon.png"
									alt="취업"
									className="cns_category_img"
								/>
								<span className="cns_category_text">취업</span>
							</div>
							<div className="cns_category" onClick={handleIcon} id="취미">
								<img
									src="/icon/literature_icon.png"
									alt="취미"
									className="cns_category_img"
								/>
								<span className="cns_category_text">취미</span>
							</div>
							<div className="cns_category" onClick={handleIcon} id="기타">
								<img
									src="/icon/literature_icon.png"
									alt="기타"
									className="cns_category_img"
								/>
								<span className="cns_category_text">기타</span>
							</div>
						</div>
					</div>
					{/* <div className="OneLinePrscr_title_wrapper">
						<p>한 줄 처방</p>
					</div> */}
					<div className="OneLinePrscr_container">
						<div className="OneLinePrscr_search_wrapper">
							<Link to={'/oneline/prescription/write'}>
								<button id="oneLinePrscr_write_btn">
									<img src="/icon/mint_write_icon.svg" />한 줄 처방 작성하기
								</button>
							</Link>
						</div>
						<OneLinePrscrCard />
						<OneLinePrscrCard />
						<OneLinePrscrCard />
						<OneLinePrscrCard />
						<OneLinePrscrCard />
						{/* <div className="OneLinePrscr_card_container">
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
						</div> */}
					</div>
				</div>
			</section>
		</>
	);
};

export default OneLinePrescription;
