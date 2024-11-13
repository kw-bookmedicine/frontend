import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

// ASSETS
import loading_thumbnail from '../assets/loading_thumbnail_x4.png';

// SERVICE
import api from '../services/api';

// COMPONENTS
import Header from '../components/Header';
import Card from '../components/BookDetailCard';
import LoadingSpinner from '../components/Loading/LoadingSpinner';

// STYLES
import '../styles/SmallCategory.css';

const SmallCategory = () => {
	const pageEnd = useRef();

	let { title } = useParams();
	let { category } = useParams();
	let { midCtgNum } = useParams();

	const [page, setPage] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	const [smCtgBookList, setSmCtgBookList] = useState([]);
	const [choiceCategory, setChoiceCategory] = useState('');

	// api 요청 주소 바꾸기 위한 함수
	const replaceAll = (str, target, replace) => {
		return str.split(target).join(replace);
	};

	// &로 구별되어 있는 소분류 제목 바꿔서 요청하는 함수
	useEffect(() => {
		console.log(midCtgNum);
		setChoiceCategory(category);
		if (category.includes('&')) {
			let changeCategory = replaceAll(category, '&', '%26');
			fetchData(changeCategory);
		} else {
			fetchData(category);
		}
	}, []);

	// page 변경 감지에 따른 API호출
	useEffect(() => {
		fetchData(page);
	}, [page]);

	// 타겟을 만나면 페이지 사이즈 늘려서 API 호출
	const fetchData = async (page) => {
		// 로딩 시작
		setIsLoading(true);

		try {
			await api
				.get(
					`api/book/list/middle?middleCategoryId=${midCtgNum}&page=${page}&size=8&sort=string`,
					{ withCredentials: true },
				)
				.then((res) => {
					// console.log(res.data);
					if (res.data.totalPages > page) {
						if (res.data.content.length === 0) {
							console.log('데이터 없습니다.');
						} else {
							setSmCtgBookList((prevData) => [
								...prevData,
								...res.data.content,
							]);
							// setSmCtgBookList(res.data.content);
						}
					} else {
						// alert('마지막 페이지입니다.');
					}
				});
		} catch (error) {
			// window.location.replace('/login');
			console.log(error);
		} finally {
			// 로딩 종료
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (pageEnd.current) {
			pageEnd.current.disconnect();
		}

		const handleObserver = (entries) => {
			const target = entries[0];
			if (target.isIntersecting) {
				setPage((prevPage) => prevPage + 1);
			}
		};

		pageEnd.current = new IntersectionObserver(handleObserver, {
			threshold: 0.5,
		});

		const lastElement = document.querySelector(
			'.smCategory_card_slide > *:last-child',
		);

		if (lastElement) {
			pageEnd.current.observe(lastElement);
		}

		return () => {
			if (pageEnd.current) {
				pageEnd.current.disconnect();
			}
		};
	}, [smCtgBookList]);

	return (
		<>
			<Header />
			<div className='smCategory_content  spinner-container'>
				<div className='smCategory_title_wrapper'>
					<div className='title_big'>{title}</div>
					<div className='title_mdCategory'>
						{choiceCategory}
						{/* <img src='/drop_arrow.png' alt='더보기' id='drop_arrow' /> */}
					</div>
				</div>
				<div className='smCategory_card_wrapper'>
					<div className='smCategory_card_slide'>
						{smCtgBookList.map((data, idx) => {
							// console.log(data);
							return (
								<Card
									isbn={data.bookId}
									title={data.title}
									author={data.author}
									key={idx + '-' + data.bookId}
									imageUrl={
										data.imageUrl === null ? loading_thumbnail : data.imageUrl
									}
									keywordItemList={
										data.keywordItemList ? data.keywordItemList : null
									}
								/>
							);
						})}
					</div>
				</div>
			</div>
			{isLoading && <LoadingSpinner />}
		</>
	);
};

export default SmallCategory;
