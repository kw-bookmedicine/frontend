import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
	const [nameList, setNameList] = useState([]);

	let name = [];

	// 초기에 랜더링될 때 한 번만 실행
	useEffect(() => {
		// 대분류 지정
		setBigCategory(title);
		// {
		// 	smallCategory.map((e) => {
		// 		console.log(e);
		// 	});
		// }
		// setCategory(category[title]);
		// console.log(smallCategory);

		// 중분류 가져오기

		axios.get('https://koreanjson.com/users').then((res) => {
			setMidCategory(res.data);
			// console.log(res.data);
		});
	}, []);

	return (
		<>
			<section className="bookList_content">
				<div className="bookList_inner">
					<Header />
					<div className="bookList_title">{bigCategory}</div>
					<Title
						bigCategory={bigCategory}
						title={`${bigCategory} 전체보기`}
						type={'shadow'}
					/>
					<div className="bookList_wrapper">
						{midCategory.map((e) => {
							// console.log(name);
							// setNameList(e.name);
							// key 값 중분류에 맞게 변경해야됨.
							return (
								<BookListSlide
									key={e.id}
									bigCategory={bigCategory}
									title={e.id}
									author={e.name}
								/>
							);
						})}
					</div>
				</div>

				<Footer />
			</section>
		</>
	);
};

export default BookList;
