import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// COMPONENTS
import Header from '../../components/Header';
import CnsFeed from '../../components/Prescription/CounselingView';
import LoadingSpinner from '../../components/Loading/LoadingSpinner';
import TopBtn from '../../components/ScrollToTop';

// SERVICE
import api from '../../services/api';

// STYLES
import '../../styles/Counseling/Counseling.css';

const Counseling = () => {
	const pageEnd = useRef();

	const [page, setPage] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [testArr, setTestArr] = useState([]);

	const [iconUrl, setIconUrl] = useState('/icon/white_search_icon.svg');
	const [iconClick, setIconClick] = useState(false);

	const [keyword, setKeyword] = useState('All'); // 지금 선택된 카테고리 여부
	const [isClick, setIsClick] = useState(false); // 카테고리 선택 여부
	const [prevClick, setPrevClick] = useState(''); // 이전에 클릭한 아이콘
	const [keywordArr, setKeywordArr] = useState([]); // 카테고리별 피드 데이터 읽어서 넣기
	const [keywordPage, setKeywordPage] = useState(0); // 카테고리 불러올 페이지

	const [category, setCategory] = useState([]); // 처음으로 가져오는 카테고리

	const [searchResArr, setSearchResArr] = useState([]);
	const [searchPage, setSearchPage] = useState(0);

	// 카테고리 가져오기
	const getCategory = () => {
		try {
			api
				.get(`/api/boardKeyword/keyword`, { withCredentials: true })
				.then((res) => {
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
	const fetchData = async () => {
		setIsLoading(true); // 로딩 시작

		// 이 부분 반영해야 됨.

		if (keyword === 'All') {
			try {
				await api
					.get(`/api/board/all?page=${page}&size=20`, { withCredentials: true })
					.then((res) => {
						// console.log('키워드가 all일 때, 페이지: ', page);
						if (res.data.totalPages > page) {
							if (res.data.content.length === 0) {
								// alert('마지막 고민입니다!');
							} else {
								setTestArr((prevData) => [...prevData, ...res.data.content]);
							}
						}
					});
			} catch (err) {
				console.log(err);
			} finally {
				setIsLoading(false);
			}
		} else {
			// 전체 조회가 아닌, 키워드별 필터링하는 경우
			try {
				await api
					.get(
						`/api/board/keyword?keyword=${keyword}&page=${keywordPage}&size=5`,
						{ withCredentials: true },
					)
					.then((res) => {
						if (res.data.totalPages >= keywordPage) {
							if (res.data.totalElements !== 0) {
								if (res.data.content.length !== 0) {
									setKeywordArr((prevData) => [
										...prevData,
										...res.data.content,
									]);
								}
							} else {
								alert('검색 결과가 없습니다.');
								window.location.reload();
							}
							// if (res.data.content.length === 0) {
							// 	alert('마지막 고민입니다.');
							// } else {
							// 	setKeywordArr((prevData) => [...prevData, ...res.data.content]);
							// }
						}
						//  else {
						// 	alert('검색 결과가 없습니다.11');
						// 	window.location.reload();
						// }
					});
			} catch (err) {
				console.log(err);
			} finally {
				setIsLoading(false);
			}
		}
	};

	// 마지막 타겟 인식될 때마다 페이지 늘리기
	useEffect(() => {
		if (pageEnd.current) {
			pageEnd.current.disconnect();
		}

		const handleObserver = (entries) => {
			const target = entries[0];
			if (target.isIntersecting) {
				if (keyword === 'All') {
					if (searchResArr.length !== 0) {
						setSearchPage((prevPage) => prevPage + 1);
					} else {
						setPage((prevPage) => prevPage + 1);
					}
				} else {
					if (searchResArr.length !== 0) {
						setSearchPage((prevPage) => prevPage + 1);
					} else {
						setKeywordPage((prevPage) => prevPage + 1);
					}
				}
			}
		};

		// 마지막 카드가 보였을 때만 실행
		pageEnd.current = new IntersectionObserver(handleObserver, {
			threshold: 1,
		});

		const lastElement = document.querySelector(
			'.cnsFeed_card_wrapper > *:last-child',
		);

		if (lastElement) {
			pageEnd.current.observe(lastElement);
		}

		return () => {
			if (pageEnd.current) {
				pageEnd.current.disconnect();
			}
		};
	}, [testArr, keywordArr]);

	// 아이콘 클릭 여부 핸들링 함수
	const handleIcon = (e) => {
		const targetCtg = e.target.id;
		const target = document.getElementById(`${targetCtg}`);
		const prevTarget = document.getElementById(`${prevClick}`);
		const targetText = target.querySelector('.cns_category_text');

		if (keyword === 'All') {
			if (prevClick !== '') {
				// 동일한 아이콘 2번 눌렀다가 다시 눌렀을 때, 중복처리 되는 거 방지하기 위함.
				setPrevClick(e.target.id);
			}
		}

		if (prevClick !== e.target.id) {
			if (prevTarget !== null) {
				setPrevClick(e.target.id);
				// 먼저 클릭된 아이콘이 있을 때
				const prevTargetText = prevTarget.querySelector('.cns_category_text');
				ctgType('전체');
				prevTargetText.classList.remove('icon-active');
			} else {
				setPrevClick(e.target.id);
				ctgType(e.target.id);
			}
		} else {
			setPrevClick(prevClick);
			prevTarget.classList.remove('icon-active');
		}

		if (targetText.className === 'cns_category_text') {
			// 아이콘이 클릭되었을 때
			targetText.classList.toggle('icon-active');
			ctgType(targetText.innerText);
			setKeywordPage(0);
		} else {
			// 클릭된 아이콘을 다시 클릭했을 때
			targetText.classList.toggle('icon-active');
			setPrevClick(e.target.id);
			ctgType('전체');
		}
	};

	// 키워드가 바뀔 때마다 API 호출
	useEffect(async () => {
		if (keyword !== 'All') {
			setSearchPage(0);
			setSearchResArr([]);

			setKeywordPage(0);
			setKeywordArr([]);
			fetchData();
		} else {
			setSearchPage(0);
			setSearchResArr([]);

			setPage(0);
			setTestArr([]);
			fetchData();
		}
	}, [keyword]);

	// 각 page 변경 감지에 따른 API호출
	useEffect(() => {
		if (page > 0 || keywordPage > 0) {
			fetchData();
		}
		if (searchPage > 0) {
			setPage(0);
			setKeywordPage(0);
			fetchSearchRes();
		}
	}, [page, keywordPage, searchPage]);

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

	// 검색 기능
	const onKeyDown = (e) => {
		if (e.key === 'Enter') {
			setSearchPage(0);
			setSearchResArr([]);
			fetchSearchRes(e.target.value);
		}
	};

	const fetchSearchRes = (searchText) => {
		setIsLoading(true);
		try {
			if (searchText !== null) {
				api
					.get(
						`/api/board/search?searchKeyword=${searchText}&page=${searchPage}&size=20`,
						{ withCredentials: true },
					)
					.then((res) => {
						if (res.data.totalPages > searchPage) {
							if (res.data.totalElements === 0) {
								ctgType('전체');
							} else {
								setSearchResArr((prevData) => [
									...prevData,
									...res.data.content,
								]);
							}
						} else {
							if (res.data.totalElements === 0) {
								// ctgType('전체');
								window.location.reload();
							}
							// console.log('마지막 페이지입니다.');
						}
					});
			} else if (searchText === '') {
				// 검색어가 비어있을 때 페이지 새로고침
				window.location.reload();
			}
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
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
				<div className="cns_search_wrapper">
					<form
						action=""
						className="cns_searchBar_wrapper"
						onSubmit={(e) => {
							e.preventDefault();
						}}
					>
						<img src="/icon/black_search_icon.svg" id="cns_search_icon" />
						<input
							type="text"
							id="cns_search_text"
							placeholder="Search"
							onKeyDown={onKeyDown}
						/>
					</form>
					<div className="cns_writeBtn_wrapper">
						<Link to={'/worry/write'} className="cns_writeBtn_wrapper_link">
							<img
								src="/icon/mint_write_icon.svg"
								alt="고민 작성하기"
								id="cnsWrite_icon"
							/>
							고민작성하기
						</Link>
					</div>
				</div>
				<div className="counseling_feed_wrapper spinner-container">
					{/* <div className="cnsFeed_card_wrapper">
						<CnsFeed />
					</div> */}

					<div className="cnsFeed_card_wrapper">
						{keyword === 'All'
							? searchResArr.length === 0
								? testArr.map((item, idx) => {
										return (
											<CnsFeed key={`keywordFeed-${idx}-${item}`} item={item} />
										);
								  })
								: searchResArr.map((item, idx) => {
										return (
											<CnsFeed
												key={`searchRes-${idx}:${item.id}`}
												item={item}
											/>
										);
								  })
							: searchResArr.length === 0
							? keywordArr.map((item, idx) => {
									return (
										<CnsFeed key={`${keyword}-${idx}:${item.id}`} item={item} />
									);
							  })
							: searchResArr.map((item, idx) => {
									return (
										<CnsFeed key={`searchRes-${idx}:${item.id}`} item={item} />
									);
							  })}
						{/* {keywordArr.length > 0
							? keywordArr.map((item, idx) => {
									return (
										<CnsFeed key={`keywordFeed-${idx}-${item}`} item={item} />
									);
							  })
							: testArr.map((item, idx) => {
									return <CnsFeed key={`${idx}-${item.boardId}`} item={item} />;
							  })} */}
					</div>
					{isLoading && <LoadingSpinner />}
				</div>
				<TopBtn />
			</div>
		</>
	);
};

export default Counseling;
