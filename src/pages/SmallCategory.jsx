import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// COMPONENTS
import Header from '../components/Header';
import Footer from '../components/Footer';
import Btn from '../components/Button';
import Card from '../components/BookDetailCard';

// STYLES
import '../styles/SmallCategory.css';

const SmallCategory = () => {
	const [smallList, setSmallList] = useState([]);

	// 초기에 랜더링될 때 한 번만 실행
	// useEffect(() => {
	// 대분류 지정
	// setBigCategory(title);
	// {
	// 	smallCategory.map((e) => {
	// 		console.log(e);
	// 	});
	// }
	// setCategory(category[title]);
	// console.log(smallCategory);

	// 중분류 가져오기

	// 	axios
	// 		.get(
	// 			'https://port-0-backend-book-pharmacy-umnqdut2blqqhv7sd.sel5.cloudtype.app/api/keyword/client?id=1',
	// 		)
	// 		.then((res) => {
	// 			// setMidCategory(res.data);
	// 			console.log(res.data);
	// 		});
	// }, []);

	return (
		<>
			<Header />
			<div className="smCategory_content">
				<div className="smCategory_title_wrapper">
					<div className="title_big">소설</div>
					<div className="title_mdCategory">
						소설 인기순위
						<img src="/drop_arrow.png" alt="더보기" id="drop_arrow" />
					</div>
				</div>
				<div className="smCategory_card_wrapper">
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
