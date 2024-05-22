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

	const [keyword, setKeyword] = useState('All'); // 지금 선택된 카테고리 여부
	const [isClick, setIsClick] = useState(false); // 카테고리 선택 여부
	const [prevClick, setPrevClick] = useState(''); // 이전에 클릭한 아이콘
	const [keywordArr, setKeywordArr] = useState([]); // 카테고리별 피드 데이터 읽어서 넣기
	const [keywordPage, setKeywordPage] = useState(0); // 카테고리 불러올 페이지

	const [category, setCategory] = useState([]); // 처음으로 가져오는 카테고리

	// 검색창에 이용
	const handleIconUrl = async () => {
		if (!iconClick) {
			setIconUrl('/icon/black_search_icon.svg');
		} else {
			setIconUrl('/icon/white_search_icon.svg');
		}
	};

	// 카테고리 가져오기
	const getCategory = () => {
		try {
			api.get(`/api/boardKeyword/keyword`).then((res) => {
				setCategory(res.data);
			});
		} catch (err) {
			console.log(err);
		}
	};

	// 첫 렌더링될 때 카테고리 가져옴
	useEffect(() => {
		getCategory();
	}, []);

	// 타겟을 만날 때마다 API 호출
	const fetchData = () => {
		setIsLoading(true); // 로딩 시작

		try {
			api.get(`/api/board/all?size=5&page=${page}`).then((res) => {
				if (res.data.end) {
					console.log('데이터 없음');
				}
				// console.log(res.data);
				setTestArr((prevData) => [...prevData, ...res.data]);
			});
		} catch (error) {
			console.log(error);
		} finally {
			// 로딩 종료
			setIsLoading(false);
		}
	};

	// 하단 타겟 인식해서 page 늘려줌
	// 카테고리 설정된 상태에서 인식되면 카테고리 페이지를 늘려줘야 함.
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

		observer.observe(pageEnd.current);
	}, []);

	// 아이콘 클릭 여부 핸들링 함수
	const handleIcon = (e) => {
		const targetCtg = e.target.id;
		const target = document.getElementById(`${targetCtg}`);
		const prevTarget = document.getElementById(`${prevClick}`);
		const targetText = target.querySelector('.cns_category_text');

		if (keyword === 'All') {
			if (prevClick !== '') {
				// console.log('중복');
				// 동일한 아이콘 2번 눌렀다가 다시 눌렀을 때, 중복처리 되는 거 방지하기 위함.
				setPrevClick(e.target.id);
				fetchData();
			}
		} else {
			setPrevClick(e.target.id);
		}

		// 제일 처음 클릭된 거를 이전 클릭으로 지정
		if (prevClick === '') {
			setPrevClick(e.target.id);
		}

		if (prevClick !== '' && prevClick !== e.target.id && keyword !== 'All') {
			if (prevTarget !== null) {
				// 먼저 클릭된 아이콘이 있을 때
				const prevTargetText = prevTarget.querySelector('.cns_category_text');
				prevTargetText.classList.remove('icon-active');
			}
		}

		if (targetText.className === 'cns_category_text') {
			// 아이콘이 클릭되었을 때
			targetText.classList.toggle('icon-active');
			ctgType(targetText.innerText);
		} else {
			// 클릭된 아이콘을 다시 클릭했을 때
			targetText.classList.toggle('icon-active');
			setPrevClick(e.target.id);
			ctgType('전체');
		}
	};

	// 선택된 키워드 타입 지정
	const ctgType = async (ctg) => {
		switch (ctg) {
			case '관계/소통':
				setKeyword('Relationships_Communication');
				break;
			case '소설/에세이':
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
			case '전체':
				setKeyword('All');
				break;
		}
	};

	// 키워드가 바뀔 때마다 API 호출
	useEffect(() => {
		setPage(0);
		setKeywordPage(0);
		setTestArr([]);
		setKeywordArr([]);
		if (keyword !== 'All') {
			// window.location.reload();
			fetchKeyword();
		}
	}, [keyword]);

	// page 변경 감지에 따른 API호출
	useEffect(() => {
		if (keyword === 'All') {
			fetchData();
		}
	}, [page]);

	// useEffect(() => {
	// 	if (keyword !== 'All') {
	// 		fetchKeyword();
	// 	}
	// },[keywordPage])

	// 키워드별 검색
	const fetchKeyword = async () => {
		try {
			if (keyword !== '') {
				api
					.get(
						`api/board/keyword?keyword=${keyword}&page=${keywordPage}&size=5`,
					)
					.then((res) => {
						if (res.data.length === 0) {
							alert('조회된 게시글이 없습니다.');
							setKeyword('All');
							// 페이지 새로고침
							window.location.reload();
						}
						if (res.data.end) {
							console.log('데이터 없음.');
						}
						console.log(res.data);
						setKeywordArr((prevData) => [...prevData, ...res.data]);
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
										id={item}
									/>
									<span className="cns_category_text" id={item}>
										{item}
									</span>
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
						{}
						{keywordArr.length > 0
							? keywordArr.map((item, idx) => {
									return (
										<CnsFeed key={`keywordFeed-${idx}-${item}`} item={item} />
									);
							  })
							: testArr.map((item, idx) => {
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
