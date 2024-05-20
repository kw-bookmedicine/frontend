import React, { useState, useEffect, useRef } from 'react';
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
	const pageEnd = useRef();

	const [iconUrl, setIconUrl] = useState('/icon/white_search_icon.svg');
	const [iconClick, setIconClick] = useState(false);

	const [keyword, setKeyword] = useState('');

	const [category, setCategory] = useState([]);

	const handleIconUrl = async () => {
		if (!iconClick) {
			setIconUrl('/icon/black_search_icon.svg');
		} else {
			setIconUrl('/icon/white_search_icon.svg');
		}
	};

	const getCategory = () => {
		try {
			api.get(`/api/boardKeyword/keyword`).then((res) => {
				setCategory(res.data);
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getCategory();
	}, []);

	// page 변경 감지에 따른 API호출
	useEffect(() => {
		fetchData();
	}, [page]);

	// 타겟을 만날 때마다 API 호출
	const fetchData = () => {
		// console.log('fetchData: ', page);
		// 로딩 시작
		setIsLoading(true);

		try {
			api.get(`/api/board/all?size=5&page=${page}`).then((res) => {
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
			if (target.isIntersecting && !isLoading) {
				// console.log('visible');
				setPage((prevPage) => prevPage + 1);
			}
		};

		// 로딩되었을 때만 실행
		const observer = new IntersectionObserver(handleObserver, {
			threshold: 0.5,
		});

		// 탐색 시작
		// const target = document.getElementById('cn_target');
		// if (target) {

		// }
		observer.observe(pageEnd.current);
		// if (props.isLoading) {

		// }

		// const target = entries[0];
		// if (target.isIntersecting && !isLoading) {
		// 	setPage(page + 1);
		// }

		// const observer = new IntersectionObserver(handleObserver, {
		// 	threshold: 0.5,
		// });

		// const target = document.getElementById('cn_target');
		// if (target) {
		// 	observer.observe(target);
		// }
	}, []);

	const handleIcon = (e) => {
		// 모든 아이콘 글씨 색 초기화
		const icons = document.querySelectorAll('.cns_category_text');
		icons.forEach((icon) => {
			if (icon.className === 'cns_category_text') {
				icon.style.color = 'black';
				icon.style.fontWeight = '400';
			} else {
				icon.style.color = 'black';
				icon.style.fontWeight = '400';
			}
		});

		// 클릭된 아이콘만 색상 설정
		const clickedIcon = e.currentTarget.querySelector('.cns_category_text');
		ctgType(clickedIcon.innerText);
		// console.log(clickedIcon.innerText);
		clickedIcon.style.color = 'red';
		clickedIcon.style.fontWeight = '600';
		clickedIcon.classList.toggle('icon-active');
	};

	// 선택된 키워드 타입 지정
	const ctgType = async (ctg) => {
		console.log('category:' + ctg);
		switch (ctg) {
			case '관계/소통':
				setKeyword('Relationships_Communication');
				break;
			case '소셜/에세이':
				setKeyword('Fiction_Essays');
				break;
			case '경제/경영':
				setKeyword('Economy_Management');
				break;
			case '자녀/양육':
				setKeyword('Children_Parenting');
				break;
			case '사회':
				setKeyword('Society');
				break;
			case '철학':
				setKeyword('Philosophy');
				break;
			case '건강':
				setKeyword('Health');
				break;
			case '역사':
				setKeyword('History');
				break;
			case '수학/과학/공학':
				setKeyword('Science_Math_Engineering');
				break;
			case '문제집/수험서':
				setKeyword('Workbook_Examination');
				break;
			case '취업':
				setKeyword('Employment_Career');
				break;
			case '취미':
				setKeyword('Hobbies');
				break;
			case '기타':
				setKeyword('ETC');
				break;
		}
	};

	useEffect(() => {
		fetchKeyword();
	}, [keyword]);

	// 키워드별 검색
	const fetchKeyword = async () => {
		try {
			if (keyword !== '') {
				api
					.get(`api/board/keyword?keyword=${keyword}&page=0&size=20`)
					.then((res) => {
						if (res.data.length === 0) {
							alert('조회된 게시글이 없습니다.');
							// 페이지 새로고침
							window.location.reload();
						}
						if (res.data.end) {
							console.log('데이터 없음.');
						}
						setTestArr(res.data);
					});
			}
		} catch (err) {
			console.log(err);
		}
	};

	// 검색 기능
	const onKeyDown = (e) => {
		if (e.key === 'Enter') {
			fetchSearchRes(e.target.value);
		}
	};

	const fetchSearchRes = (searchText) => {
		try {
			if (searchText !== null) {
				api
					.get(`/api/board/search?searchKeyword=${searchText}&page=0&size=20`)
					.then((res) => {
						if (res.data.end) {
							console.log('데이터 없음');
						}
						setTestArr(res.data);
					});
			} else if (searchText === '') {
				// 검색어가 비어있을 때 페이지 새로고침
				window.location.reload();
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<Header />
			<div className="counseling_content">
				<div className="counseling_category_wrapper">
					<div className="cns_category_title">분야 선택</div>
					<div className="cns_category_content_wrapper">
						{category.map((item, idx) => {
							const changeItem = item.replaceAll('/', '_');

							return (
								<div
									className="cns_category"
									onClick={handleIcon}
									id={item}
									key={item + idx}
								>
									<img
										src={`icon/prscr-category/${changeItem}-icon.svg`}
										alt={item}
										className="cns_category_img"
									/>
									<span className="cns_category_text">{item}</span>
								</div>
							);
						})}
					</div>
				</div>
				<div className="counseling_feed_wrapper">
					{/* <div className="cnsFeed_card_wrapper">
						<CnsFeed />
					</div> */}

					<div className="cnsWrite_search_wrapper">
						<div className="cnsWrite_search_left_wrapper">
							<form
								action=""
								className="cnsSearchBar_wrapper"
								onSubmit={(e) => {
									e.preventDefault();
								}}
							>
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
									onKeyDown={onKeyDown}
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
					<div className="cnsFeed_card_wrapper">
						{testArr.map((item, idx) => {
							return <CnsFeed key={`${idx}-${item.boardId}`} item={item} />;
						})}
					</div>
				</div>
				{isLoading && <p>Loading...</p>}
				<div id="cn_target" ref={pageEnd}></div>
			</div>
		</>
	);
};

export default Counseling;
