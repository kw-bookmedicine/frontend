import React, { useState, useEffect } from 'react';
import axios from 'axios';

// SERVICES
import api from '../services/api';

// COMPONENTS
import Header from '../components/Header';
import FeedCard from '../components/FeedCard';
import PrescriptionCard from '../components/Prescription/PrescriptionCard';

// STYLES
import '../styles/Feed.css';

const Feed = () => {
	const [dogArr, setDogArr] = useState([]);
	const [feedArr, setFeedArr] = useState([]);
	const [page, setPage] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	// Intersection Observer 설정
	const handleObserver = (entries) => {
		// console.log(entries);
		const target = entries[0];
		if (target.isIntersecting && !isLoading) {
			setPage((prevPage) => prevPage + 1);
		}
	};

	useEffect(() => {
		const observer = new IntersectionObserver(handleObserver, {
			threshold: 0,
		});
		// 최하단 요소를 관찰 대상으로 지정함
		const observerTarget = document.getElementById('observer');
		// 관찰 시작
		if (observerTarget) {
			observer.observe(observerTarget);
		}
	}, []);

	// page 변경 감지에 따른 API호출
	useEffect(() => {
		fetchData();
		console.log(page);
	}, [page]);

	let feedFetchData = { page: { page }, size: 9 };

	// API를 호출하는 부분
	const fetchData = async () => {
		setIsLoading(true);
		try {
			// api.get('/api/feeds/all', feedFetchData).then((res) => {
			// 	// console.log(res.data.content);
			// 	setFeedArr(res.data.content);
			// 	setFeedArr((prevData) => [...prevData, ...res.data.content]);
			// });

			const response = await api.get(
				'/api/feeds/all?page=0&size=9',
				feedFetchData,
			);
			// .then((res) => {
			// 	// console.log(res.data.content);
			// 	setFeedArr(res.data.content);
			// });

			// const newData = response.data.map((dogImg) => ({
			// 	id: dogImg.id,
			// 	dogUrl: dogImg.url,
			// }));

			const newData = response.data.content.map((item) => ({
				title: item.bookTitle,
				author: item.bookAuthor,
				comment: item.comment,
				image: item.imgUrl,
				nickName: item.clientNickname,
			}));

			// //불러온 데이터를 배열에 추가
			setFeedArr((prevData) => [...prevData, ...newData]);
		} catch (error) {
			console.log(error);
		}
		setIsLoading(false);
	};

	return (
		<>
			<Header />
			<div className="feed_content">
				<div className="feed_title_wrapper">
					<div className="feed_title">추천 피드</div>
				</div>
				<div className="feed_content_wrapper">
					<PrescriptionCard />
					{feedArr.map((item, idx) => {
						return (
							// <FeedCard
							// 	key={`${idx}-item.id`}
							// 	title={item.title}
							// 	author={item.author}
							// 	comment={item.comment}
							// 	imgUrl={item.image}
							// 	nickname={item.nickName}
							// />
							<PrescriptionCard />
						);
					})}
				</div>
				<div id="observer" style={{ height: '10px' }}></div>
			</div>
		</>
	);
};

export default Feed;
