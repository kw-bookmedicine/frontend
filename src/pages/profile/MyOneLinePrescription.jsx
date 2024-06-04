import React, { useState, useEffect, useRef } from 'react';

// COMPONENTS
import Header from '../../components/Header';
import LoadingSpinner from '../../components/Loading/LoadingSpinner';
import OneLinePrscrCard from './../../components/Prescription/OneLinePrscrCard';

// SERVICE
import api from '../../services/api';

// STYLE
import '../../styles/Profile/MyOneLinePrescription.css';

const MyOneLinePrescription = () => {
	const pageEnd = useRef();
	const [page, setPage] = useState(0);
	const [totalElem, setTotalElem] = useState('');
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchMyOneLinePrescriptions = async () => {
		setIsLoading(true);
		try {
			await api
				.get(`/api/oneline-prescriptions/my?page=${page}&size=5`, {
					withCredentials: true,
				})
				.then((res) => {
					if (res.data.totalPages > page) {
						if (res.data.content.length === 0) {
							alert('한 줄 처방 글이 없습니다.');
						} else {
							console.log(res.data);
							setTotalElem(res.data.totalElements);
							setData((prevData) => [...prevData, ...res.data.content]);
						}
					} else {
						// alert('마지막 글입니다.');
					}
				});
		} catch (error) {
			console.log('나의 한 줄 처방 요청 실패', error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchMyOneLinePrescriptions();
	}, [page]);

	useEffect(() => {
		if (pageEnd.current) pageEnd.current.disconnect();

		const handleObserver = (entries) => {
			const target = entries[0];
			if (target.isIntersecting) {
				if (data.length !== 0) {
					setPage((prevPage) => prevPage + 1);
				}
			}
		};

		pageEnd.current = new IntersectionObserver(handleObserver, {
			threshold: 1,
		});

		const lastElement = document.querySelector(
			'.myOneLinePrscr_content_wrapper > *:last-child',
		);

		if (lastElement) {
			pageEnd.current.observe(lastElement);
		}

		return () => {
			if (pageEnd.current) pageEnd.current.disconnect();
		};
	}, [data]);

	return (
		<>
			<Header />
			<div>
				<div className="myOneLinePrescription-container">
					<h1 className="myOneLinePrescription-title">나의 처방전 목록</h1>
					<div className="myOneLinePrscr_content_container">
						<p>내 한 줄 처방 개수 : {totalElem}</p>
						<div className="myOneLinePrscr_content_wrapper spinner-container">
							{data.length !== 0
								? data.map((item, idx) => {
										return (
											<OneLinePrscrCard
												item={item}
												key={`myOneLinePrscr-${item}-${idx}`}
											/>
										);
								  })
								: null}
						</div>
						{isLoading && <LoadingSpinner />}
					</div>
				</div>
			</div>
		</>
	);
};

export default MyOneLinePrescription;
