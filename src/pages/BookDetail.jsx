import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
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

// STYLES
import '../styles/BookDetail.css';
import { Swiper, SwiperSlide } from 'swiper/react';

const BookDetail = () => {
	const scrollRef = useRef([]);
	const handleScroll = (ref) => {
		ref.scrollIntoView({ behavior: 'smooth' });
	};

	const [modalOn, setModalOn] = useState(false);

	const handleModal = () => {
		setModalOn(!modalOn);
	};

	const [searchParams, setSearchParams] = useSearchParams();
	const [bookInfo, setBookInfo] = useState([]);
	const [bookKeywordList, setBookKeywordList] = useState([]);

	const getIsbn = () => {
		let isbn = searchParams.get('isbn');
		// console.log(isbn);

		api
			.get(`/api/book/detail?isbn=${isbn}`, { withCredentials: true })
			.then((res) => {
				// console.log(res.data.title);
				// console.log(res.data);
				setBookInfo(res.data);
				setBookKeywordList(res.data.keywordItemList);
			});
	};

	useEffect(() => {
		getIsbn();
	}, []);

	return (
		<>
			<Header />
			<div className="bookDetail_content">
				<section className="bookSummary">
					<div className="bookSummary_wrapper">
						<div className="bookDt_summary_left_wrapper">
							<img
								src={
									bookInfo.imageUrl === null
										? '/loading_thumbnail_x4.png'
										: bookInfo.imageUrl
								}
							/>
						</div>
						<div className="summary_right_wrapper">
							<div className="summary_right_up_wrapper">
								<div className="right_up_left_wrapper">
									<div className="right_up_left_book_title">
										{bookInfo.title}
									</div>
									<p>{bookInfo.author}</p>
									<p>{bookInfo.publicYear}</p>
								</div>
								<div className="right_up_right_wrapper">
									<div className="right_up_right_exp">
										{/* <Btn
											text={'경험 추가하기'}
											type="exp"
											onClick={handleModal}
										/> */}
										<div className="prscr_add_btn" onClick={handleModal}>
											한 줄 처방하기
										</div>
									</div>
									<ModalPortal>
										{modalOn && <ExpModal onClose={handleModal} />}
									</ModalPortal>
								</div>
							</div>
							<div className="summary_right_mid_wrapper">
								{bookKeywordList.map((item) => {
									return <HashTag key={item.name} text={item.name} />;
								})}
							</div>
							<div className="summary_right_bottom_wrapper">
								<nav className="right_bottom_text_wrapper">
									<div
										className="bottom_text_bookInfo"
										onClick={() => {
											handleScroll(scrollRef.current[0]);
										}}
									>
										책 정보
									</div>
									<div className="bottom_text_separate" />{' '}
									<div
										className="bottom_text_review"
										onClick={() => {
											handleScroll(scrollRef.current[1]);
										}}
									>
										리뷰 보러가기
									</div>
									<div className="bottom_text_separate" />{' '}
									<div
										className="bottom_text_bookList"
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
				<section className="bookInfo">
					<div
						className="bookInfo_wrapper"
						ref={(el) => {
							scrollRef.current[0] = el;
						}}
					>
						<div className="bookInfo_title">책 정보</div>
						<div className="bookInfo_content">
							<p className="content_normal">
								{bookInfo.content === null
									? '책 정보가 준비 중입니다.'
									: bookInfo.content}
							</p>
						</div>
					</div>
				</section>
				<section className="bookComment">
					<div
						className="bookComment_wrapper"
						ref={(el) => {
							scrollRef.current[1] = el;
						}}
					>
						<Title title={'한 줄 처방'} type="oneLine" />
						<div className="bookComment_container">
							<Review
								nickname={'닉네임'}
								date={'2024.01.01'}
								text={'환상적인 마법학교로의 모험을 떠날 수 있었다!'}
							/>
							<Review
								nickname={'1번'}
								date={'2024.01.10'}
								text={'환상적인 마법학교로의 모험을 떠날 수 있었다!'}
							/>
							<Review
								nickname={'닉네임 2번'}
								date={'2024.01.22'}
								text={'환상적인 마법학교로의 모험을 떠날 수 있었다!'}
							/>
							<Review
								nickname={'닉네임 3번'}
								date={'2024.01.22'}
								text={'환상적인 마법학교로의 모험을 떠날 수 있었다!'}
							/>
							<Review
								nickname={'닉네임 4번'}
								date={'2024.01.22'}
								text={'환상적인 마법학교로의 모험을 떠날 수 있었다!'}
							/>
						</div>
					</div>
				</section>
				<section className="relationBookList">
					<div
						className="relationBookList_wrapper"
						ref={(el) => {
							scrollRef.current[2] = el;
						}}
					>
						<Title title={'연관 책 리스트'} />
						<div className="BookList_container">
							<BookCard
								title={'책 제목 1'}
								author={'저자'}
								img={loading_thumbnail}
							/>
							<BookCard
								title={'책 제목 2'}
								author={'저자'}
								img={loading_thumbnail}
							/>
							<BookCard
								title={'책 제목 3'}
								author={'저자'}
								img={loading_thumbnail}
							/>
							<BookCard
								title={'책 제목 4'}
								author={'저자'}
								img={loading_thumbnail}
							/>
							<BookCard
								title={'책 제목 5'}
								author={'저자'}
								img={loading_thumbnail}
							/>
							<BookCard
								title={'책 제목 6'}
								author={'저자'}
								img={loading_thumbnail}
							/>
						</div>
					</div>
				</section>
				<section className="bookDetail_footer">
					<Footer />
				</section>
			</div>
		</>
	);
};

export default BookDetail;
