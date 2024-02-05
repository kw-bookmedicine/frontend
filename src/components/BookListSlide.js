import { useState, useEffect } from 'react';

// COMPONENTS
import Title from './ArrowTitle';
import BookCard from './BookCard';

// STYLES
import styles from '../styles/BookListSlide.module.css';

const BookListSlide = ({ bigCategory, title, author }) => {
	return (
		<>
			<div className={styles['container']}>
				<Title bigCategory={bigCategory} title={title} />
				<div className={styles['slide']}>
					<BookCard title={'책 제목'} author={author} />
					<BookCard title={'책 제목'} author={'저자'} />
					<BookCard title={'책 제목'} author={'저자'} />
					<BookCard title={'책 제목'} author={'저자'} />
					<BookCard title={'책 제목'} author={'저자'} />
					<BookCard title={'책 제목'} author={'저자'} />
					<BookCard title={'책 제목'} author={'저자'} />
					<BookCard title={'책 제목'} author={'저자'} />
				</div>
			</div>
		</>
	);
};

export default BookListSlide;
