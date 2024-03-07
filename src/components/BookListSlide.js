import { useState, useEffect } from 'react';
import axios from 'axios';

// COMPONENTS
import Title from './ArrowTitle';
import BookCard from './BookCard';

// STYLES
import styles from '../styles/BookListSlide.module.css';

const BookListSlide = ({
	bigCategory,
	midCategoryTitle,
	title,
	author,
	imageUrl,
}) => {
	return (
		<>
			<div className={styles['container']}>
				<div className={styles['slide']}>
					<BookCard title={title} author={author} img={imageUrl} />
				</div>
			</div>
		</>
	);
};

export default BookListSlide;
