import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// SERVICE
import api from '../services/api';

// COMPONENTS
import Header from '../components/Header';
import Title from '../components/ArrowTitle';
import Footer from '../components/Footer';
import BookListSlide from '../components/BookListSlide';

// STYLES
import '../styles/BookList.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BookList = () => {
	var settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	// 대분류
	let { title } = useParams();
	const [bigCategory, setBigCategory] = useState('');

	// 중분류
	const [midCategory, setMidCategory] = useState([]);
	const [resMidBookList, setResMidBookList] = useState([]);

	// 초기에 랜더링될 때 한 번만 실행
	useEffect(() => {
		// 대분류 지정
		setBigCategory(title);

		api.get('/api/category/big').then((res) => {
			setMidCategory(res.data[title]);
		});

		api.get(`/api/book/list/big?name=${title}`).then((res) => {
			res.data.map(() => {
				setResMidBookList(res.data);
			});
		});
	}, []);

	return (
		<>
			<section className="bookList_content">
				<div className="bookList_inner">
					<Header />
					<div className="bookList_title">{bigCategory}</div>
					<Title
						key={bigCategory}
						bigCategory={bigCategory}
						title={`${bigCategory} 전체보기`}
						type={'shadow'}
					/>

					{resMidBookList.map((list, idx) => {
						return (
							// 중분류 타이틀 렌더링
							<div className="bookList_wrapper" key={idx}>
								<div className="bookList_title_wrapper">
									<Title
										key={list[idx]}
										bigCategory={bigCategory}
										title={list.categoryName}
									/>
								</div>

								<div className="bookList_slide_wrapper">
									<BookListSlide list={list.bookList} />

									{/* 중분류에 해당하는 책 리스트 데이터 바인딩 */}
									{/* {list.bookList.map((item) => {
										return (
											<BookListSlide
												key={item.isbn}
												title={item.title}
												author={item.author}
												bigCategory={bigCategory}
												imageUrl={item.imageUrl}
											/>
										);
									})} */}
								</div>
							</div>
						);
					})}
				</div>

				<Footer />
			</section>
		</>
	);
};

export default BookList;
