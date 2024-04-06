import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// COMPONENTS
import Header from '../components/Header';
import CnsFeed from '../components/Prescription/CounselingView';

// STYLES
import '../styles/Counseling/Counseling.css';

const Counseling = () => {
	const [page, setPage] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [testArr, setTestArr] = useState([]);

	const [iconUrl, setIconUrl] = useState('/icon/white_search_icon.svg');
	const [iconClick, setIconClick] = useState(false);

	const handleIconUrl = async () => {
		if (!iconClick) {
			setIconUrl('/icon/active_search_icon.svg');
		} else {
			setIconUrl('/icon/white_search_icon.svg');
		}
	};

	useEffect(() => {
		console.log('로드');

		const API_URL =
			'https://api.thedogapi.com/v1/images/search?size=small&format=json&has_breeds=true&order=ASC&page=0&limit=10';
		axios.get(API_URL).then((res) => {
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
			const API_URL = `https://api.thedogapi.com/v1/images/search?size=small&format=json&has_breeds=true&order=ASC&page=${page}&limit=10`;
			const response = await axios.get(API_URL).then((res) => {
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
				console.log('visible');
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

	return (
		<>
			<Header />
			<div className="counseling_content">
				<div className="counseling_category_wrapper">
					<div className="cns_category_title">분야 선택</div>
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
							<Link to={'/worry/write'}>
								<img
									src="/icon/write_icon.svg"
									alt="고민 작성하기"
									id="cnsWrite_icon"
								/>
							</Link>
						</div>
					</div>

					{testArr.map((item, idx) => {
						// console.log(item.id);
						return (
							<div className="cnsFeed_card_wrapper" key={item.id + idx}>
								<CnsFeed key={item.id + idx} text={item.id} />
							</div>
						);
					})}

					{/* <div className="cnsFeed_card_wrapper">
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
					</div> */}
				</div>
				{isLoading && <p>Loading...</p>}
				<div id="cn_target"></div>
			</div>
		</>
	);
};

export default Counseling;
