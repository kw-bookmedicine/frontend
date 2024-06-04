import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// SERVICES
import api from '../../services/api';

// COMPONENTS
import Header from '../../components/Header';
import OneLinePrscrCard from '../../components/Prescription/OneLinePrscrCard';
import LoadingSpinner from '../../components/Loading/LoadingSpinner';
import TopBtn from '../../components/ScrollToTop';

// STYLE
import '../../styles/Prescription/OneLinePrescription.css';

const OneLinePrescription = () => {
	const pageEnd = useRef();
	const observerRef = useRef();

	const [category, setCategory] = useState([]);
	const [page, setPage] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [dataArr, setDataArr] = useState([]);

	const [keyword, setKeyword] = useState('All'); // 지금 선택된 카테고리 여부
	const [prevClick, setPrevClick] = useState('All'); // 이전에 클릭한 아이콘
	const [keywordArr, setKeywordArr] = useState([]); // 카테고리별 피드 데이터 읽어서 넣기
	const [keywordPage, setKeywordPage] = useState(0); // 카테고리 불러올 페이지

	const [searchResArr, setSearchResArr] = useState([]);
	const [searchPage, setSearchPage] = useState(0);

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
		// getData();
		getCategory();
	}, []);

	useEffect(() => {
		if (observerRef.current) observerRef.current.disconnect();

		const handleObserver = (entries) => {
			// console.log(entries);
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

		observerRef.current = new IntersectionObserver(handleObserver, {
			threshold: 1,
		});

		const lastElement = document.querySelector(
			'.OneLinePrscr_content_container > *:last-child',
		);

		if (lastElement) {
			observerRef.current.observe(lastElement);
		}

		return () => {
			if (observerRef.current) observerRef.current.disconnect();
		};
	}, [dataArr, keywordArr]);

	const handleIcon = (e) => {
		const targetCtg = e.target.id;
		const target = document.getElementById(`${targetCtg}`);
		const prevTarget = document.getElementById(`${prevClick}`);
		const targetText = target.querySelector('.oneLinePrscr_category_text');

		if (keyword === 'All') {
			if (prevClick !== '') {
				setPrevClick(e.target.id);
			}
		}

		// console.log('e.target.id: ', e.target.id);
		// console.log('prevTarget: ', prevTarget);
		// console.log('prevClick: ', prevClick);

		if (prevClick !== e.target.id) {
			if (prevTarget !== null) {
				setPrevClick(e.target.id);
				// 먼저 클릭된 아이콘이 있을 때
				const prevTargetText = prevTarget.querySelector(
					'.oneLinePrscr_category_text',
				);
				ctgType('전체');
				prevTargetText.classList.remove('icon-active');
			} else {
				// 먼저 클릭된 아이콘이 없는 경우
				setPrevClick(e.target.id);
				ctgType(e.target.id);
			}
		} else {
			setPrevClick(prevClick);
			prevTarget.classList.remove('icon-active');
		}

		if (targetText.className === 'oneLinePrscr_category_text') {
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

	useEffect(async () => {
		if (keyword !== 'All') {
			setSearchPage(0);
			setSearchResArr([]);

			setKeywordPage(0);
			setKeywordArr([]);
			fetchData();
		} else {
			// 키워드가 바뀌면서 All이 됨.
			setSearchPage(0);
			setSearchResArr([]);

			setPage(0);
			setDataArr([]);
			fetchData();
		}
		// fetchData();
	}, [keyword]);

	useEffect(() => {
		if (page > 0 || keywordPage > 0) fetchData();
		if (searchPage > 0) {
			setPage(0);
			setKeywordPage(0);
			fetchSearchRes();
		}
	}, [page, keywordPage, searchPage]);

	const fetchData = async () => {
		// 키워드가 ALL인 경우, 전체 호출
		setIsLoading(true);

		if (keyword === 'All') {
			try {
				await api
					.get(`/api/oneline-prescriptions/all?page=${page}&size=5`, {
						withCredentials: true,
					})
					.then((res) => {
						// console.log('키워드 all일 때, 페이지: ', page);
						if (res.data.totalPages > page) {
							if (res.data.content.length === 0) {
								alert('마지막 페이지입니다.');
							} else {
								setDataArr((prevData) => [...prevData, ...res.data.content]);
							}
						} else {
							// alert('마지막 페이지입니다.');
						}
					});
			} catch (err) {
				console.log(err);
			} finally {
				setIsLoading(false);
			}
		} else {
			// 키워드가 ALL 아닌 경우, 키워드별 호출
			try {
				await api
					.get(
						`/api/oneline-prescriptions/keyword?keyword=${keyword}&page=${keywordPage}&size=5`,
						{ withCredentials: true },
					)
					.then((res) => {
						// console.log(`======(키워드:${keyword})=======`);
						// console.log(res.data);
						if (res.data.totalPages > keywordPage) {
							if (res.data.content.length === 0) {
								alert('마지막 페이지입니다.');
							} else {
								setKeywordArr((prevData) => [...prevData, ...res.data.content]);
							}
						} else {
							alert('마지막 페이지입니다.');
							// ctgType('전체');
						}
					});
			} catch (err) {
				console.log(err);
			} finally {
				setIsLoading(false);
			}
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

	// 검색 기능

	const onKeyDown = (e) => {
		// console.log(e.target.value);
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
						`/api/oneline-prescriptions/search?name=${searchText}&page=${searchPage}&size=20`,
						{ withCredentials: true },
					)
					.then((res) => {
						if (res.data.totalPages > searchPage) {
							if (res.data.content.length === 0) {
								// console.log('검색 데이터가 없습니다.');
								ctgType('전체');
								alert('마지막 페이지입니다.');
							} else {
								// console.log(res.data.content);
								setSearchResArr((prevData) => [
									...prevData,
									...res.data.content,
								]);
							}
						} else {
							console.log('마지막 페이지입니다.');
						}
					});
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
			<section>
				<div className="OneLinePrscr_content">
					<div className="oneLinePrscr_category_wrapper">
						<div className="oneLinePrscr_category_title">한 줄 처방</div>
						<div className="oneLinePrscr_category_content_wrapper">
							{category.map((item, idx) => {
								const changeItem = item.replaceAll('/', '_');

								return (
									<div
										className="oneLinePrscr_category"
										onClick={handleIcon}
										id={item}
										key={item + idx}
									>
										<img
											src={`icon/prscr-category/${changeItem}-icon.svg`}
											alt={item}
											className="oneLinePrscr_category_img"
											id={item}
										/>
										<span className="oneLinePrscr_category_text" id={item}>
											{item}
										</span>
									</div>
								);
							})}
						</div>
					</div>
					<div className="oneLinePrscr_search_wrapper">
						<form
							className="oneLinePrscr_searchBar_wrapper"
							onSubmit={(e) => {
								e.preventDefault();
							}}
						>
							<img
								src="/icon/black_search_icon.svg"
								id="oneLinePrscr_searchBar_icon"
							/>
							<input
								type="text"
								className="oneLinePrscr_searchBar"
								placeholder="Search"
								onKeyDown={onKeyDown}
							/>
						</form>
						<div className="OneLinePrscr_write_wrapper">
							<Link to={'/oneline/prescription/write'}>
								<button id="oneLinePrscr_write_btn">
									<img src="/icon/mint_write_icon.svg" />한 줄 처방 작성하기
								</button>
							</Link>
						</div>
					</div>
					<div className="OneLinePrscr_container spinner-container">
						<div className="OneLinePrscr_content_container">
							{keyword === 'All'
								? searchResArr.length === 0
									? dataArr.map((item, idx) => {
											return (
												<OneLinePrscrCard
													key={`${keyword}-${idx}:${item.id}`}
													item={item}
												/>
											);
									  })
									: searchResArr.map((item, idx) => {
											return (
												<OneLinePrscrCard
													key={`searchRes-${idx}:${item.id}`}
													item={item}
												/>
											);
									  })
								: searchResArr.length === 0
								? keywordArr.map((item, idx) => {
										return (
											<OneLinePrscrCard
												key={`${keyword}-${idx}:${item.id}`}
												item={item}
											/>
										);
								  })
								: searchResArr.map((item, idx) => {
										return (
											<OneLinePrscrCard
												key={`searchRes-${idx}:${item.id}`}
												item={item}
											/>
										);
								  })}
						</div>
						{isLoading && <LoadingSpinner />}
						<TopBtn />
					</div>

					<div id="cn_target" ref={pageEnd}></div>
				</div>
			</section>
		</>
	);
};

export default OneLinePrescription;
