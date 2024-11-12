import React from 'react';
import loading_thumbnail from '../../assets/loading_thumbnail_x4.png';
import { Link } from 'react-router-dom';
import { handleLinkClick } from '../Slider';

const TodayPrescriptionCard = ({ book, backgroundColor }) => {
	const isDummyBook = !book || !book.bookId || book.bookId === 'undefined';

	const handleClick = (e, bookId) => {
		if (!handleLinkClick(bookId)) {
			e.preventDefault();
		}
	};

	return (
		<li className='loginHome-card' style={{ backgroundColor }}>
			<h3>오늘의 처방전</h3>
			<div className='loginHome-book-info'>
				<Link
					to={isDummyBook ? '#' : `/book-detail?isbn=${book?.bookId}`}
					onClick={(e) => handleClick(e, book?.bookId)}
				>
					<img
						className='loginHome-book-image'
						src={book?.imageUrl ?? loading_thumbnail}
						alt='book thumbnail'
					/>
				</Link>

				<div className='loginHome-book-container'>
					<div className='loginHome-book-details'>
						<p className='loginHome-book-title'>
							{book?.title ?? '해리포터와 불의 잔'}
						</p>
						<p className='loginHome-book-author'>
							{book?.author ?? 'J.K. 롤링'}
						</p>
					</div>
					<Link
						to={isDummyBook ? '#' : `/book-detail?isbn=${book?.bookId}`}
						onClick={(e) => handleClick(e, book?.bookId)}
					>
						<button className='loginHome-book-button'>책 보러 가기</button>
					</Link>
				</div>
			</div>
		</li>
	);
};

export default TodayPrescriptionCard;
