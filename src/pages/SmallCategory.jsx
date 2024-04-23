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
	let { title } = useParams();
	let { category } = useParams();
	const [smCategoryBookList, setSmCategoryBookList] = useState([]);
	const [choiceCategory, setChoiceCategory] = useState('');

	// api 요청 주소 바꾸기 위한 함수
	const replaceAll = (str, target, replace) => {
		return str.split(target).join(replace);
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

	// 소분류에 해당하는 책 목록 가져오기
	const getData = (category) => {
		api
			.get(`/api/book/list/middle?name=${category}&page=0&size=30&sort=string`)
			.then((res) => {
				// console.log(res.data);
				setSmCategoryBookList(res.data);
			});
	};

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
							return (
								<Card
									isbn={data.isbn}
									title={data.title}
									author={data.author}
									key={data.isbn}
									imageUrl={
										data.imageUrl === null ? loading_thumbnail : data.imageUrl
									}
									bookKeywordList={data.bookKeywordList}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
};

export default SmallCategory;
