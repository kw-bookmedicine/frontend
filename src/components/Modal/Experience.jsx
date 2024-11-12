import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

// SERVICE
import api from '../../services/api';

// COMPONENTS
import BookInfoCard from '../BookDetailCard';

// STYLE
import '../../styles/Experience.css';

const Experience = ({ onClose }) => {
	// 모달 창 닫는 함수
	const handleClose = () => {
		onClose?.();
	};

	const [bookInfo, setBookInfo] = useState([]);
	const [searchParams, setSearchParams] = useSearchParams();

	const getIsbn = () => {
		let isbn = searchParams.get('isbn');

		api.get(`/api/book/detail?id=${isbn}`).then((res) => {
			setBookInfo(res.data);
		});
	};

	useEffect(() => {
		getIsbn();
	}, []);

	return (
		<>
			<div className='expModal_overlay'>
				<div className='expModal_wrapper'>
					<div className='expModal_title_wrapper'>
						리뷰작성
						<div className='close_btn' onClick={handleClose}>
							X
						</div>
					</div>
					<div className='expModal_content_wrapper'>
						<div className='bookInfo_content_wrapper'>
							<BookInfoCard
								type='expModal'
								title={bookInfo.title}
								author={bookInfo.author}
								imageUrl={bookInfo.imageUrl}
								isbn={bookInfo.isbn}
							/>
						</div>
						<div className='inputReview_wrapper'>
							<div className='inputReview_title'>리뷰작성</div>
							<textarea
								name='contents'
								rows='10'
								cols='50'
								type='text'
								className='inputReview_box'
							/>
						</div>
						<div className='expModal_button_wrapper'>
							<button className='review_btn'>리뷰 남기기</button>
							<button className='later_btn'>피드만 나중에</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Experience;
