import React, { useState, useEffect } from 'react';
import axios from 'axios';

// COMPONENTS
import Header from '../components/Header';
import FeedGrid from '../components/FeedGrid';
import FeedCard from '../components/FeedCard';

// STYLES
import '../styles/Feed.css';

const Feed = () => {
	const [dogArr, setDogArr] = useState([]);
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
		// console.log(page);
	}, [page]);

	// API를 호출하는 부분
	const fetchData = async () => {
		setIsLoading(true);
		try {
			const API_URL = `https://api.thedogapi.com/v1/images/search?size=small&format=json&has_breeds=true&order=ASC&page=${page}&limit=10`;
			const response = await axios.get(API_URL);
			const newData = response.data.map((dogImg) => ({
				id: dogImg.id,
				dogUrl: dogImg.url,
			}));
			// 불러온 데이터를 배열에 추가
			setDogArr((prevData) => [...prevData, ...newData]);
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
					{dogArr.map((item, idx) => {
						return (
							<FeedCard
								key={`${idx}-item.id`}
								title={item.id}
								author={item.id}
								imgUrl={item.dogUrl}
							/>
						);
					})}
					<div id="observer" style={{ height: '10px' }}></div>
				</div>
			</div>
		</>
	);
};

export default Feed;
