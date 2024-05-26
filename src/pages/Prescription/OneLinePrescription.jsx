import React, { useState, useEffect, useRef } from 'react';
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
	const pageEnd = useRef();
	const observerRef = useRef();

	const [category, setCategory] = useState([]);
	const [page, setPage] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [dataArr, setDataArr] = useState([]);

	const [iconClick, setIconClick] = useState(false);

	const [keyword, setKeyword] = useState('All'); // 지금 선택된 카테고리 여부
	const [isClick, setIsClick] = useState(false); // 카테고리 선택 여부
	const [prevClick, setPrevClick] = useState('All'); // 이전에 클릭한 아이콘
	const [keywordArr, setKeywordArr] = useState([]); // 카테고리별 피드 데이터 읽어서 넣기
	const [keywordPage, setKeywordPage] = useState(0); // 카테고리 불러올 페이지

	const getData = () => {
		try {
			api.get(`/api/oneline-prescriptions/all?page=0&size=10`).then((res) => {
				if (res.data.end) {
					console.log('데이터 없음');
				}
				console.log(res.data);
				setDataArr(res.data.content);
			});
		} catch (err) {
			console.log(err);
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
		// getData();
		getCategory();
	}, []);

	// useEffect(() => {
	// 	if (!isLoading) {
	// 		const handleObserver = (entries) => {
	// 			const target = entries[0];
	// 			if (target.isIntersecting && !isLoading) {
	// 				console.log('visible');
	// 				setPage((prevPage) => prevPage + 1);
	// 			}
	// 		};

	// 		// 로딩되었을 때만 실행
	// 		const observer = new IntersectionObserver(handleObserver, {
	// 			threshold: 0.5,
	// 		});

	// 		observer.observe(pageEnd.current);
	// 	}
	// }, []);

	useEffect(() => {
		if (observerRef.current) observerRef.current.disconnect(); // 👈 기존 observer 해제

		const handleObserver = (entries) => {
			// console.log(entries);
			const target = entries[0];
			if (target.isIntersecting) {
				if (keyword === 'All') {
					setPage((prevPage) => prevPage + 1);
				} else {
					setKeywordPage((prevPage) => prevPage + 1);
				}
			}
		};

		observerRef.current = new IntersectionObserver(handleObserver, {
			threshold: 1,
		});

		const lastElement = document.querySelector(
			'.OneLinePrscr_content_container > *:last-child',
		); // 👈 마지막 요소 선택

		if (lastElement) {
			observerRef.current.observe(lastElement); // 👈 마지막 요소에 observer 설정
		}

		return () => {
			if (observerRef.current) observerRef.current.disconnect();
		};
	}, [dataArr, keywordArr]); // 👈 dataArr과 keywordArr가 변경될 때마다 observer 설정

	const handleIcon = (e) => {
		// console.log('지금 클릭: ', e.target.id);
		const targetCtg = e.target.id;
		const target = document.getElementById(`${targetCtg}`);
		const prevTarget = document.getElementById(`${prevClick}`);
		const targetText = target.querySelector('.oneLinePrscr_category_text');
		// setPrevClick(e.target.id);

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
			setKeywordPage(0);

			setKeywordArr([]);
			fetchData();
		} else {
			// 키워드가 바뀌면서 All이 됨.
			setPage(0);
			setDataArr([]);
			fetchData();
		}
		// fetchData();
	}, [keyword]);

	useEffect(() => {
		if (page > 0 || keywordPage > 0) fetchData();
	}, [page, keywordPage]);

	const fetchData = async () => {
		// 키워드가 ALL인 경우, 전체 호출
		setIsLoading(true);

		if (keyword === 'All') {
			try {
				await api
					.get(`/api/oneline-prescriptions/all?page=${page}&size=5`)
					.then((res) => {
						console.log('키워드 all일 때, 페이지: ', page);
						if (res.data.totalPages > page) {
							if (res.data.content.length === 0) {
								alert('마지막 페이지입니다.');
							} else {
								setDataArr((prevData) => [...prevData, ...res.data.content]);
							}
						} else {
							alert('마지막 페이지입니다.');
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
					)
					.then((res) => {
						console.log(`======(키워드:${keyword})=======`);
						console.log(res.data);
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
							{/* <div className="cns_category" onClick={handleIcon} id="관계/소통">
								<img
									src="/icon/prscr-category/관계_소통-icon.svg"
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
									src="/icon/prscr-category/소설_에세이-icon.svg"
									alt="소설/에세이"
									className="cns_category_img"
								/>
								<span className="cns_category_text">소설/에세이</span>
							</div>
							<div className="cns_category" onClick={handleIcon} id="경제/경영">
								<img
									src="/icon/prscr-category/경제_경영-icon.svg"
									alt="경제/경영"
									className="cns_category_img"
								/>
								<span className="cns_category_text">경제/경영</span>
							</div>
							<div className="cns_category" onClick={handleIcon} id="자녀/양육">
								<img
									src="/icon/prscr-category/자녀_양육-icon.svg"
									alt="자녀/양육"
									className="cns_category_img"
								/>
								<span className="cns_category_text">자녀/양육</span>
							</div>
							<div className="cns_category" onClick={handleIcon} id="사회">
								<img
									src="/icon/prscr-category/사회-icon.svg"
									alt="사회"
									className="cns_category_img"
								/>
								<span className="cns_category_text">사회</span>
							</div>
							<div className="cns_category" onClick={handleIcon} id="철학">
								<img
									src="/icon/prscr-category/철학-icon.svg"
									alt="철학"
									className="cns_category_img"
								/>
								<span className="cns_category_text">철학</span>
							</div>
							<div className="cns_category" onClick={handleIcon} id="건강">
								<img
									src="/icon/prscr-category/건강-icon.svg"
									alt="건강"
									className="cns_category_img"
								/>
								<span className="cns_category_text">건강</span>
							</div>
							<div className="cns_category" onClick={handleIcon} id="역사">
								<img
									src="/icon/prscr-category/역사-icon.svg"
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
									src="/icon/prscr-category/수학_과학_공학-icon.svg"
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
									src="/icon/prscr-category/문제집_수험서-icon.svg"
									alt="문제집/수험서"
									className="cns_category_img"
								/>
								<span className="cns_category_text">문제집/수험서</span>
							</div>
							<div className="cns_category" onClick={handleIcon} id="취업">
								<img
									src="/icon/prscr-category/취업-icon.svg"
									alt="취업"
									className="cns_category_img"
								/>
								<span className="cns_category_text">취업</span>
							</div>
							<div className="cns_category" onClick={handleIcon} id="취미">
								<img
									src="/icon/prscr-category/취미-icon.svg"
									alt="취미"
									className="cns_category_img"
								/>
								<span className="cns_category_text">취미</span>
							</div>
							<div className="cns_category" onClick={handleIcon} id="기타">
								<img
									src="/icon/prscr-category/기타-icon.svg"
									alt="기타"
									className="cns_category_img"
								/>
								<span className="cns_category_text">기타</span>
							</div> */}
						</div>
					</div>
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
					<div className="OneLinePrscr_container">
						<div className="OneLinePrscr_write_wrapper">
							<Link to={'/oneline/prescription/write'}>
								<button id="oneLinePrscr_write_btn">
									<img src="/icon/mint_write_icon.svg" />한 줄 처방 작성하기
								</button>
							</Link>
						</div>
						<div className="OneLinePrscr_content_container">
							{keyword === 'All'
								? dataArr.map((item, idx) => {
										return (
											<OneLinePrscrCard
												key={`${keyword}-${idx}:${item.id}`}
												item={item}
											/>
										);
								  })
								: keywordArr.map((item, idx) => {
										return (
											<OneLinePrscrCard
												key={`${keyword}-${idx}:${item.id}`}
												item={item}
											/>
										);
								  })}

							{/* {dataArr !== null &&
							dataArr.map((item, idx) => {
								// console.log(item);
								return <OneLinePrscrCard key={item.id} item={item} />;
							})} */}
						</div>
					</div>
					{isLoading && <p>Loading...</p>}
					<div id="cn_target" ref={pageEnd}></div>
				</div>
			</section>
		</>
	);
};

export default OneLinePrescription;
