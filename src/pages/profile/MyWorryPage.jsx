import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// COMPONENTS
import Header from '../../components/Header';
import LoadingSpinner from '../../components/Loading/LoadingSpinner';
import CnsFeed from '../../components/Prescription/CounselingView';

// SERVICES
import api from '../../services/api';

// STYLE
import '../../styles/Counseling/MyWorryPage.css';

const MyWorryPage = () => {
	const pageEnd = useRef();
	const [page, setPage] = useState(0);
	const [totalElem, setTotalElem] = useState(0);
	const [dataArr, setDataArr] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchMyData = () => {
		setIsLoading(true);
		try {
			api
				.get(`/api/board/my?page=${page}&size=5`, { withCredentials: true })
				.then((res) => {
					if (res.data.totalPages > page) {
						if (res.data.content.length === 0) {
							alert('더이상 고민 글이 없습니다.');
						} else {
							setTotalElem(res.data.numberOfElements);
							setDataArr((prevData) => [...prevData, ...res.data.content]);
						}
					} else {
						// alert('마지막 페이지입니다.');
					}
				});
		} catch (err) {
			window.location.replace('/login');
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchMyData();
	}, [page]);

	useEffect(() => {
		if (pageEnd.current) pageEnd.current.disconnect();

		const handleObserver = (entries) => {
			const target = entries[0];
			if (target.isIntersecting) {
				if (dataArr.length !== 0) {
					setPage((prevPage) => prevPage + 1);
				}
			}
		};

		pageEnd.current = new IntersectionObserver(handleObserver, {
			threshold: 1,
		});

		const lastElement = document.querySelector(
			'.myWorry_content_wrapper > *:last-child',
		);

		if (lastElement) {
			pageEnd.current.observe(lastElement);
		}

		return () => {
			if (pageEnd.current) pageEnd.current.disconnect();
		};
	}, [dataArr]);

	return (
		<>
			<Header />
			<div className='myWorry_container'>
				<div className='myWorry_title_wrapper'>
					<h2>내가 남긴 고민</h2>
				</div>
				<div className='myWorry_content_container spinner-container'>
					<p>내 고민 개수 : {totalElem} 개</p>
					{dataArr.length !== 0 && (
						<>
							<div className='myWorry_content_wrapper'>
								{dataArr.map((item, idx) => {
									return <CnsFeed key={`myWorry-${item}-${idx}`} item={item} />;
								})}
							</div>
						</>
					)}

					{isLoading && <LoadingSpinner />}
				</div>
			</div>
		</>
	);
};

export default MyWorryPage;
