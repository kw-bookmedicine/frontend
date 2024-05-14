import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// ASSETS
import loading_thumbnail from '../assets/loading_thumbnail_x4.png';

// SERVICE
import api from '../services/api';

// COMPONENTS
import Header from '../components/Header';
import Card from '../components/BookDetailCard';

// STYLES
import '../styles/SmallCategory.css';

const SmallCategory = () => {
	const [page, setPage] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	let { title } = useParams();
	let { category } = useParams();
	const [smCategoryBookList, setSmCategoryBookList] = useState([]);
	const [choiceCategory, setChoiceCategory] = useState('');

	// api 요청 주소 바꾸기 위한 함수
	const replaceAll = (str, target, replace) => {
		return str.split(target).join(replace);
	};

	// 소분류에 해당하는 책 목록 가져오기
	const getData = async (category) => {
		api
			.get(`/api/book/list/middle?name=${category}&page=0&size=30&sort=string`)
			.then((res) => {
				// console.log(res.data);
				setSmCategoryBookList(res.data);
			});
	};

	// &로 구별되어 있는 소분류 제목 바꿔서 요청하는 함수
	useEffect(() => {
		setChoiceCategory(category);
		if (category.includes('&')) {
			let changeCategory = replaceAll(category, '&', '%26');
			getData(changeCategory);
		} else {
			getData(category);
		}
	}, []);

	// page 변경 감지에 따른 API호출
	useEffect(() => {
		// console.log(page);
		fetchData();
	}, [page]);

	// 타겟을 만나면 페이지 사이즈 늘려서 API 호출
	const fetchData = async () => {
		// console.log(page);
		// 로딩 시작
		setIsLoading(true);

		try {
			api
				.get(
					`api/book/list/middle?name=${category}&page=${page}&size=30&sort=string`,
				)
				.then((res) => {
					// console.log(res.data);
					if (res.data.end) {
						console.log('데이터 없습니다.');
					}
					setSmCategoryBookList((prevData) => [...prevData, ...res.data]);
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

		const observer = new IntersectionObserver(handleObserver, {
			threshold: 0.5,
		});

		const target = document.getElementById('sm_target');
		if (target) {
			observer.observe(target);
		}
	}, []);

	return (
		<>
			<Header />
			<div className="smCategory_content">
				<div className="smCategory_title_wrapper">
					<div className="title_big">{title}</div>
					<div className="title_mdCategory">
						{choiceCategory}
						<img src="/drop_arrow.png" alt="더보기" id="drop_arrow" />
					</div>
				</div>
				<div className="smCategory_card_wrapper">
					<div className="smCategory_card_slide">
						{smCategoryBookList.map((data, idx) => {
							// console.log(data);
							return (
								<Card
									isbn={data.isbn}
									title={data.title}
									author={data.author}
									key={idx + '-' + data.isbn}
									imageUrl={
										data.imageUrl === null ? loading_thumbnail : data.imageUrl
									}
									keywordItemList={data.keywordItemList}
								/>
							);
						})}
					</div>
				</div>
				{isLoading && <p>Loading...</p>}
				<div id="sm_target"></div>
			</div>
		</>
	);
};

export default SmallCategory;
