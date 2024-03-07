import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// SERVICE
import api from '../services/api';

// COMPONENTS
import Header from '../components/Header';
import Title from '../components/ArrowTitle';
import BookCard from '../components/BookCard';
import Footer from '../components/Footer';
import BookListSlide from '../components/BookListSlide';

// STYLES
import '../styles/BookList.css';

const BookList = () => {
	// 대분류
	let { title } = useParams();
	const [bigCategory, setBigCategory] = useState('');

	// 중분류
	const [midCategory, setMidCategory] = useState([]);
	const [resMidBookList, setResMidBookList] = useState([]);

	// 중분류에 따른 책 리스트
	const [midCategoryList0, setMidCategoryList0] = useState([]);
	const [midCategoryList1, setMidCategoryList1] = useState([]);
	const [midCategoryList2, setMidCategoryList2] = useState([]);
	const [midCategoryList3, setMidCategoryList3] = useState([]);
	const [midCategoryList4, setMidCategoryList4] = useState([]);
	const [midCategoryList5, setMidCategoryList5] = useState([]);
	const [midCategoryList6, setMidCategoryList6] = useState([]);
	const [midCategoryList7, setMidCategoryList7] = useState([]);
	const [midCategoryList8, setMidCategoryList8] = useState([]);

	const bookList = [];

	// 초기에 랜더링될 때 한 번만 실행
	useEffect(() => {
		// 대분류 지정
		setBigCategory(title);

		api.get('/api/category/big').then((res) => {
			// console.log(res.data[title]);
			setMidCategory(res.data[title]);
		});

		api.get(`/api/book/list/big?name=${title}`).then((res) => {
			res.data.map((list, idx) => {
				// console.log(list);
				// console.log(idx);
				// bookList.concat(list);
				// resMidBookList.length === 0
				// 	? setResMidBookList(list)
				// 	: setResMidBookList[idx](list);
				setResMidBookList(res.data);
			});
			setMidCategoryList0(res.data[0].bookList);
			setMidCategoryList1(res.data[1].bookList);
			setMidCategoryList2(res.data[2].bookList);
			setMidCategoryList3(res.data[3].bookList);
			setMidCategoryList4(res.data[4].bookList);
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
						// console.log(list.categoryName);
						return (
							<div className="bookList_wrapper" key={idx}>
								<div className="bookList_title_wrapper">
									<Title
										key={list[idx]}
										bigCategory={bigCategory}
										title={list.categoryName}
									/>
								</div>
								<div className="bookList_slide_wrapper">
									{list.bookList.map((item) => {
										// console.log(item);
										return (
											<BookListSlide
												key={item.isbn}
												title={item.title}
												author={item.author}
												bigCategory={bigCategory}
												imageUrl={item.imageUrl}
											/>
										);
									})}
								</div>
							</div>
						);
					})}

					{/* <div className="bookList_wrapper">
						<div className="bookList_title_wrapper">
							<Title
								key={midCategory[0]}
								bigCategory={bigCategory}
								title={midCategory[0]}
							/>
						</div>
						<div className="bookList_slide_wrapper">
							{midCategoryList0.map((item) => {
								// console.log(resMidBookList);
								return (
									<BookListSlide
										key={item.isbn}
										title={item.title}
										author={item.author}
										bigCategory={bigCategory}
										imageUrl={item.imageUrl}
									/>
								);
							})}
						</div>
					</div>
					<div className="bookList_wrapper">
						<div className="bookList_title_wrapper">
							<Title
								key={midCategory[1]}
								bigCategory={bigCategory}
								title={midCategory[1]}
							/>
						</div>
						<div className="bookList_slide_wrapper">
							{midCategoryList1.map((item) => {
								return (
									<BookListSlide
										key={item.isbn}
										title={item.title}
										author={item.author}
										bigCategory={bigCategory}
										imageUrl={item.imageUrl}
									/>
								);
							})}
						</div>
					</div>
					<div className="bookList_wrapper">
						<div className="bookList_title_wrapper">
							<Title
								key={midCategory[2]}
								bigCategory={bigCategory}
								title={midCategory[2]}
							/>
						</div>
						<div className="bookList_slide_wrapper">
							{midCategoryList2.map((item) => {
								return (
									<BookListSlide
										key={item.isbn}
										title={item.title}
										author={item.author}
										bigCategory={bigCategory}
										imageUrl={item.imageUrl}
									/>
								);
							})}
						</div>
					</div>
					<div className="bookList_wrapper">
						<div className="bookList_title_wrapper">
							<Title
								key={midCategory[3]}
								bigCategory={bigCategory}
								title={midCategory[3]}
							/>
						</div>
						<div className="bookList_slide_wrapper">
							{midCategoryList3.map((item) => {
								return (
									<BookListSlide
										key={item.isbn}
										title={item.title}
										author={item.author}
										bigCategory={bigCategory}
										imageUrl={item.imageUrl}
									/>
								);
							})}
						</div>
					</div> */}
				</div>

				<Footer />
			</section>
		</>
	);
};

export default BookList;
