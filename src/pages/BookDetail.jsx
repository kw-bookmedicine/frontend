import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import 'swiper/css';

// ASSETS
import loading_thumbnail from '../assets/loading_thumbnail_x4.png';

// SERVICE
import api from '../services/api';

// COMPONENTS
import Header from '../components/Header';
import HashTag from '../components/HashTag';
import Review from '../components/Review';
import Title from '../components/ArrowTitle';
import BookCard from '../components/BookCard';
import Footer from '../components/Footer';
import ModalPortal from '../components/Modal/Portal';
import ExpModal from '../components/Modal/Experience';
import LoadingSpinner from '../components/Loading/LoadingSpinner';
import OneLinePrscrCard from '../components/Prescription/OneLinePrscrCard';
import ScrollToTop from './../components/ScrollToTop';

// STYLES
import '../styles/BookDetail.css';

const BookDetail = () => {
	const scrollRef = useRef([]);
	const handleScroll = (ref) => {
		ref.scrollIntoView({ behavior: 'smooth' });
	};

	const [modalOn, setModalOn] = useState(false);

	const handleModal = () => {
		setModalOn(!modalOn);
	};

	const [isLoading, setIsLoading] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();
	const [bookInfo, setBookInfo] = useState([]);
	const [bookKeywordList, setBookKeywordList] = useState([]);
	const [oneLinePrscrArr, setOneLinePrscrArr] = useState([]);

	const getIsbn = () => {
		let isbn = searchParams.get('isbn');
		try {
			api
				.get(`/api/book/detail?id=${isbn}`, { withCredentials: true })
				.then((res) => {
					// console.log(res.data.title);
					// console.log(res.data);
					setBookInfo(res.data);
					setBookKeywordList(res.data.keywordItemList);
				});
		} catch (err) {
			window.location.replace('/login');
		}
	};

	const getOneLinePrscr = () => {
		let isbn = searchParams.get('isbn');
		setIsLoading(true);
		try {
			api
				.get(`/api/oneline-prescriptions/book?bookId=${isbn}`, {
					withCredentials: true,
				})
				.then((res) => {
					if (res.data.content.length !== 0) {
						setOneLinePrscrArr(res.data.content);
					}
				});
		} catch (err) {
			window.location.replace('/login');
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

	const [recommendBookList, setRecommendBookList] = useState([]);

	const getRecommendBookList = () => {
		let isbn = searchParams.get('isbn');

		setIsLoading(true);
		try {
			api.get(`/api/recommend/book/bookbased?bookId=${isbn}`).then((res) => {
				if (res.data.length !== null) {
					setRecommendBookList(res.data.slice(0, 6));
				}
			});
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getIsbn();
		getOneLinePrscr();
		getRecommendBookList();
	}, []);

	return (
		<>
			<Header />
			<div className='bookDetail_content spinner-container'>
				<section className='bookSummary'>
					<div className='bookSummary_wrapper'>
						<div className='bookDt_summary_left_wrapper'>
							<img
								src={
									bookInfo.imageUrl === null
										? '/loading_thumbnail_x4.png'
										: bookInfo.imageUrl
								}
							/>
						</div>
						<div className='summary_right_wrapper'>
							<div className='summary_right_up_wrapper'>
								<div className='right_up_left_wrapper'>
									<div className='right_up_left_book_title'>
										{bookInfo.title}
									</div>
									<p>{bookInfo.author}</p>
									<p>{bookInfo.publicYear}</p>
								</div>
								<div className='right_up_right_wrapper'>
									<div className='right_up_right_exp'>
										{/* <Btn
											text={'경험 추가하기'}
											type="exp"
											onClick={handleModal}
										/> */}
										<div className='prscr_add_btn' onClick={handleModal}>
											한 줄 처방하기
										</div>
									</div>
									<ModalPortal>
										{modalOn && <ExpModal onClose={handleModal} />}
									</ModalPortal>
								</div>
							</div>
							<div className='summary_right_mid_wrapper'>
								{bookKeywordList.map((item) => {
									return <HashTag key={item.name} text={item.name} />;
								})}
							</div>
							<div className='summary_right_bottom_wrapper'>
								<nav className='right_bottom_text_wrapper'>
									<div
										className='bottom_text_bookInfo'
										onClick={() => {
											handleScroll(scrollRef.current[0]);
										}}
									>
										책 정보
									</div>
									<div className='bottom_text_separate' />{' '}
									<div
										className='bottom_text_review'
										onClick={() => {
											handleScroll(scrollRef.current[1]);
										}}
									>
										한 줄 처방 보러가기
									</div>
									<div className='bottom_text_separate' />{' '}
									<div
										className='bottom_text_bookList'
										onClick={() => {
											handleScroll(scrollRef.current[2]);
										}}
									>
										연관 책 보러가기
									</div>
								</nav>
							</div>
						</div>
					</div>
				</section>
				<section className='bookInfo'>
					<div
						className='bookInfo_wrapper'
						ref={(el) => {
							scrollRef.current[0] = el;
						}}
					>
						<div className='bookInfo_title'>책 정보</div>
						<div className='bookInfo_content'>
							<p className='content_normal'>
								{bookInfo.content === null
									? '책 정보가 준비 중입니다.'
									: bookInfo.content}
							</p>
						</div>
					</div>
				</section>
				<section className='book_oneLinePrscr'>
					<div
						className='book_oneLinePrscr_wrapper'
						ref={(el) => {
							scrollRef.current[1] = el;
						}}
					>
						<Title title={'한 줄 처방'} type='oneLine' />
						{/* <div className="book_oneLinePrscr_container"> */}
						{oneLinePrscrArr.length !== 0 ? (
							<div className='book_oneLinePrscr_container'>
								{oneLinePrscrArr.map((item) => {
									return (
										<OneLinePrscrCard
											item={item}
											key={item.id}
											type={'bookDetail'}
										/>
									);
								})}
							</div>
						) : (
							<div className='book_no_oneLinePrscr_wrapper'>
								<p>한 줄 처방을 남겨보세요!</p>
								<img
									src='/images/book-detail/write_prscr_img.png'
									id='book_no_prscr_img'
								/>
							</div>
						)}
						{/* <Review
								nickname={'닉네임'}
								date={'2024.01.01'}
								text={'환상적인 마법학교로의 모험을 떠날 수 있었다!'}
							/> */}
					</div>
				</section>
				<section className='relationBookList'>
					<div
						className='relationBookList_wrapper'
						ref={(el) => {
							scrollRef.current[2] = el;
						}}
					>
						<Title title={'연관 책 리스트'} type={'recommend'} />
						{recommendBookList.length !== 0 ? (
							<div className='BookList_container'>
								{recommendBookList.map((item) => {
									return (
										<BookCard
											key={item.id}
											title={item.title}
											author={item.author}
											img={item.imageUrl ?? loading_thumbnail}
										/>
									);
								})}{' '}
							</div>
						) : (
							<>
								<div className='No_BookList_container'>
									<p>연관 책 리스트를 준비 중이에요!</p>
								</div>
							</>
						)}
					</div>
				</section>
			</div>
			{isLoading && <LoadingSpinner />}
			<ScrollToTop />
			<section className='bookDetail_footer'>
				<Footer />
			</section>
		</>
	);
};

export default BookDetail;
