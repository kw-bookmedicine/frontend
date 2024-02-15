import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';

// COMPONENTS
import Header from '../components/Header';
import Footer from '../components/Footer';
import Btn from '../components/Button';
import Card from '../components/BookDetailCard';

// STYLES
import '../styles/SmallCategory.css';

const SmallCategory = () => {
	let { title } = useParams();
	let { category } = useParams();
	const [smCategoryBookList, setSmCategoryBookList] = useState([]);
	const [choiceCategory, setChoiceCategory] = useState('');

	// 초기에 랜더링될 때 한 번만 실행
	useEffect(() => {
		setChoiceCategory(category);

		// 중분류에 해당하는 책 목록 가져오기
		axios
			.get(
				`https://port-0-backend-book-pharmacy-umnqdut2blqqhv7sd.sel5.cloudtype.app/api/book/list/middle?name=${category}&page=0&size=1&sort=string`,
			)
			.then((res) => {
				setSmCategoryBookList(res.data);
				console.log(res.data);
			});
	}, []);

	const [searchParams, setSearchParams] = useSearchParams();

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
						{smCategoryBookList.map((data) => {
							// console.log(data);
							return (
								<Card
									title={data.title}
									author={data.author}
									key={data.isbn}
									// onClick={() => {
									// 	setSearchParams({
									// 		title: data[title],
									// 		author: data[author],
									// 	});
									// }}
								/>
							);
						})}
						<Card />
						<Card />
						<Card />
					</div>
					<div className="smCategory_card_slide">
						<Card />
						<Card />
						<Card />
					</div>
					<div className="smCategory_card_slide">
						<Card />
						<Card />
						<Card />
					</div>
				</div>
			</div>
		</>
	);
};

export default SmallCategory;
