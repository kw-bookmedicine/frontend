import React, { useState, useEffect, useRef } from 'react';

// COMPONENTS
import Header from '../../components/Header';
import LoadingSpinner from '../../components/Loading/LoadingSpinner';
import WidePrescriptionCard from '../../components/Prescription/WidePrescriptionCard';

// SERVICE
import api from '../../services/api';

// SERVICE
import '../../styles/Profile/MyPrescription.css';

const MyPrescription = () => {
	const pageEnd = useRef();
	const [page, setPage] = useState(0);
	const [totalElem, setTotalElem] = useState('');
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchMyPrescriptions = async () => {
		setIsLoading(true);
		try {
			await api
				.get(`/api/prescription/my?page=${page}&size=10`, {
					withCredentials: true,
				})
				.then((res) => {
					if (res.data.totalPages > page) {
						if (res.data.content.length === 0) {
							alert('처방전이 없습니다.');
						} else {
							setTotalElem(res.data.totalElements);
							setData((prevData) => [...prevData, ...res.data.content]);
						}
					} else {
						// alert('마지막 페이지입니다.');
					}
				});
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchMyPrescriptions();
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
			'.myPrescription_content_wrapper > *:last-child',
		);

		if (lastElement) {
			pageEnd.current.observe(lastElement);
		}

		return () => {
			if (pageEnd.current) pageEnd.current.disconnect();
		};
	}, [data]);

	// if (isLoading) return <div>Loading...</div>;

	return (
		<>
			<Header />
			<div className="myPrescription-container">
				<h1 className="myPrescription-title">나의 처방전 목록</h1>
				<div className="myPrescription_content_container">
					<p>내 처방전 개수 : {totalElem}</p>
					<div className="myPrescription_content_wrapper  spinner-container">
						{data.length !== 0
							? data.map((item) => {
									return (
										<WidePrescriptionCard
											props={item}
											key={`myPrscr-${item}-${item.id}`}
											styleId={'myPrscr'}
										/>
									);
							  })
							: null}
					</div>
					{isLoading && <LoadingSpinner />}
				</div>

				{/* <ul>
					{data.map((prescription) => (
						<li className="myPrescription-card" key={prescription.id}>
							<WidePrescriptionCard props={prescription} />
						</li>
					))}
				</ul> */}
			</div>
		</>
	);
};

export default MyPrescription;
