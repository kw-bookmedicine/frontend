import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// COMPONENTS
import Header from '../../components/Header';
import CnsFeed from '../../components/Prescription/CounselingView';

// SERVICE
import api from '../../services/api';

// STYLES
import '../../styles/Counseling/Counseling.css';

const Counseling = () => {
	const [page, setPage] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [testArr, setTestArr] = useState([]);

	const [iconUrl, setIconUrl] = useState('/icon/white_search_icon.svg');
	const [iconClick, setIconClick] = useState(false);

	const handleIconUrl = async () => {
		if (!iconClick) {
			setIconUrl('/icon/black_search_icon.svg');
		} else {
			setIconUrl('/icon/white_search_icon.svg');
		}
	};

	useEffect(() => {
		// console.log('로드');

		api.get(`/api/board?size=20&page=0`).then((res) => {
			// console.log(res.data);
			setTestArr(res.data);
		});
	}, []);

	// page 변경 감지에 따른 API호출
	useEffect(() => {
		fetchData();
	}, [page]);

	// 타겟을 만날 때마다 API 호출
	const fetchData = async () => {
		// 로딩 시작
		setIsLoading(true);

		try {
			api.get(`/api/board?size=20&page=${page + 1}`).then((res) => {
				if (res.data.end) {
					console.log('데이터 없음');
				}
				setTestArr((prevData) => [...prevData, ...res.data]);
			});
		} catch (error) {
			console.log(error);
		} finally {
			// 로딩 종료
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const handleObserver = (entries) => {
			const target = entries[0];
			// if (target.isIntersecting) {
			// 	console.log(entries);
			// }
			if (target.isIntersecting && !isLoading) {
				// console.log(entries);
				// console.log(target);
				// console.log('visible');
				setPage((prevPage) => prevPage + 1);
			}
		};

		const observer = new IntersectionObserver(handleObserver, {
			threshold: 0.5,
		});

		const target = document.getElementById('cn_target');
		if (target) {
			observer.observe(target);
		}
	}, []);

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

	return (
		<>
			<Header />
			<div className="counseling_content">
				<div className="counseling_category_wrapper">
					<div className="cns_category_title">분야 선택</div>
					<div className="cns_category_content_wrapper">
						<div className="cns_category" onClick={handleIcon} id="관계/소통">
							<img
								src="/icon/art_icon.svg"
								alt="관계/소통"
								className="cns_category_img"
							/>
							<span className="cns_category_text">관계/소통</span>
						</div>
						<div className="cns_category" onClick={handleIcon} id="소설/에세이">
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
				<div className="counseling_feed_wrapper">
					{/* <div className="cnsFeed_card_wrapper">
						<CnsFeed />
					</div> */}

					<div className="cnsWrite_search_wrapper">
						<div className="cnsWrite_search_left_wrapper">
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
						<div className="cnsWrite_search_right_wrapper">
							<Link
								to={'/worry/write'}
								className="cnsWrite_search_right_wrapper_link"
							>
								<img
									src="/icon/mint_write_icon.svg"
									alt="고민 작성하기"
									id="cnsWrite_icon"
								/>
								고민작성하기
							</Link>
						</div>
					</div>

					{testArr.map((item, idx) => {
						return (
							<div className="cnsFeed_card_wrapper" key={item.boardId}>
								<CnsFeed key={item.boardId + idx} item={item} />
							</div>
						);
					})}
				</div>
				{isLoading && <p>Loading...</p>}
				<div id="cn_target"></div>
			</div>
		</>
	);
};

export default Counseling;
