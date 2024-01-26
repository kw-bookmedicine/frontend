import React from 'react';
import { useParams } from 'react-router-dom';

// COMPONENTS
import Header from '../components/Header';
import Title from '../components/ArrowTitle';
import BookCard from '../components/BookCard';
import Footer from '../components/Footer';
import BookListSlide from '../components/BookListSlide';

// STYLES
import '../styles/BookList.css';

const BookList = () => {
	let { title } = useParams();
	console.log(title);

	return (
		<>
			<section className="bookList_content">
				<div className="bookList_inner">
					<Header />
					<div className="bookList_title">{title}</div>
					<Title title={`${title} 전체보기`} type={'shadow'} />
					<div className="bookList_wrapper">
						<BookListSlide title={'소설'} />
						<BookListSlide title={'SF'} />
						<BookListSlide title={'로맨스'} />
					</div>
				</div>

				<Footer />
			</section>
		</>
	);
};

export default BookList;
