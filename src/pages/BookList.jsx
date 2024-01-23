import React from 'react';

// COMPONENTS
import Header from '../components/Header';
import Title from '../components/ArrowTitle';
import BookCard from '../components/BookCard';
import Footer from '../components/Footer';
import BookListSlide from '../components/BookListSlide';

// STYLES
import '../styles/BookList.css';

const BookList = () => {
	return (
		<>
			<section className="content">
				<div className="bookList_inner">
					<Header />
					<div className="bookList_title">소설</div>
					<Title title={'소설 전체보기'} type={'shadow'} />
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
