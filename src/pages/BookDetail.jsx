import React, { useState, useRef, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

// SERVICE
import api from '../services/api';

// COMPONENTS
import Header from '../components/Header';
import Btn from '../components/Button';
import HashTag from '../components/HashTag';
import Review from '../components/Review';
import Title from '../components/ArrowTitle';
import BookCard from '../components/BookCard';
import Footer from '../components/Footer';

// STYLES
import '../styles/BookDetail.css';

const BookDetail = () => {
	const scrollRef = useRef([]);
	const handleScroll = (ref) => {
		ref.scrollIntoView({ behavior: 'smooth' });
	};

	const [searchParams, setSearchParams] = useSearchParams();
	const [bookInfo, setBookInfo] = useState([]);
	const [bookKeywordList, setBookKeywordList] = useState([]);

	const getIsbn = () => {
		let isbn = searchParams.get('isbn');
		console.log(isbn);

		api.get(`/api/book/detail?isbn=${isbn}`).then((res) => {
			console.log(res.data.title);
			console.log(res.data);
			setBookInfo(res.data);
			setBookKeywordList(res.data.bookKeywordList);
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
						<div className="summary_left_wrapper">
							<div>
								<img
									className="summary_left_img"
									src={bookInfo.imageUrl}
									alt={`${bookInfo.title}썸네일`}
								/>
							</div>
						</div>
						<div className="summary_right_wrapper">
							<div className="summary_right_up_wrapper">
								<div className="right_up_left_wrapper">
									<div className="up_left_book_title">{bookInfo.title}</div>
									<div className="up_left_book_author">{bookInfo.author}</div>
								</div>
								<div className="right_up_right_wrapper">
									<div className="up_right_exp">
										<Btn text={'경험 추가하기'} type="exp" />
									</div>
								</div>
							</div>
							<div className="summary_left_mid_wrapper">
								{bookKeywordList.map((item) => {
									return <HashTag key={item.name} text={item.name} />;
								})}
							</div>
							<div className="summary_left_bottom_wrapper">
								<nav className="left_bottom_text_wrapper">
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
							<p className="content_normal">{bookInfo.content}</p>
							{/* <p className="content_bold">
								해리 포터 세대의, 해리 포터 세대를 위한, 해리 포터 세대에 의한
								새 번역!‘ 21세기 대표 아이콘’에 걸맞은 완성도 높은 작품으로
								재탄생하다!
							</p>
							<p className="content_normal">
								1997년 영국에서 출간된 이래 『해리 포터』 시리즈는 지금까지
								200개국 이상 80개의 언어로 번역되고 출간되어 5억 부 이상을
								판매했다. 국내에서도 1999년 『해리 포터와 마법사의 돌』의 출간을
								필두로 지금까지 약 1,500만 부가 판매되었으며, 현재에도
								독자들에게 변함없는 사랑을 받고 있다. 이 시리즈는 여덟 편의
								영화로도 제작되어 전 세계 곳곳에서 흥행을 거두었고, 영화와
								관련된 새로운 도서가 출간되고 테마 파크가 조성되는 등 놀라운
								기현상을 빚어냈다.
							</p>
							<p className="content_normal">
								뿐만 아니라 『해리 포터』 시리즈에서 또 다른 작품들이
								문화상품으로 파생되어 지금도 꾸준히 독자들을 만나고 있다. ‘해리
								포터’의 다음 세대인 자녀들의 이야기를 다룬 『해리 포터와 저주
								받은 아이』는 시나리오로 출간된 이후 연극으로 만들어져 영국을
								시작으로 미국, 호주, 독일, 캐나다 등 세계 곳곳에서 열띤 호응을
								얻으며 공연 중이고, 『해리 포터』의 세계관이 확장된 『신비한
								동물 사전』 시리즈는 계속해서 영화로 제작되고 있다. 이제 『해리
								포터』는 소설이라는 단순한 문학 장르에 머무르지 않고 ‘21세기를
								대표하는 시대의 아이콘’으로 불리며 일종의 사회문화 현상으로
								받아들여지고 있다.
							</p>
							<p className="content_normal">
								20주년을 맞아 새롭게 출간한 『해리 포터』 시리즈는 ‘21세기
								고전’이라 불릴 만한 품격에 맞춰 작품의 완성도를 높였다. 7권
								『해리 포터와 죽음의 성물』로 완간된 기존의 『해리 포터』
								시리즈는 빈틈없는 소설적 구성과 생생한 캐릭터 그리고 마법 세계를
								정교하게 묘사하며 풍부한 상상력이 돋보이면서도 정밀한 세계관을
								구축해 나갔다. 하지만 지금까지 출간된 책들은 J.K. 롤링이 펼쳐
								나가는 판타지 세계의 규모가 어느 정도이며 그 속에 어떠한 소설적
								장치를 심어 놓았는지 알 수 없는 상태에서 번역 작업이 이루어졌다.
								또한 1~7편 모두 완결성을 갖추었지만, 시리즈의 특성상 편과 편을
								이어 주며 작품 전체를 관통하는 서사의 개연성과 완결성은 마지막
								편이 출간된 이후에나 파악할 수밖에 없었다. 그러다 보니 작가가
								어느 장면에 복선을 깔아 두었고, 어느 장면이 작가가 창조한
								세계관을 이해하는 중요한 역할을 하는지 의미를 파악하며
								번역하기에는 한계가 있었다.
							</p>
							<p className="content_normal">
								이번에 선보이는 『해리 포터』 시리즈에는 J.K. 롤링이 작품 속에
								이룩해놓은 문학적 성취가 완벽하게 구현되어 있다. 복선과 반전을
								선사하는 문학적 장치들을 보다 정교하고 세련되게 다듬었으며,
								인물들 사이의 관계나 그들의 숨겨진 비밀 그리고 성격이 도드라지는
								말투의 미세한 뉘앙스까지 점검했다. 『해리 포터』의 세계에 처음
								발을 들여놓는 독자는 물론, 그동안 『해리 포터』의 세계를 즐겨
								찾아왔던 독자 모두에게 완성도 높은 만족과 감동을 선사할 것이다.
							</p> */}
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
						<Title title={'한 줄 리뷰'} />
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
							<BookCard title={'책 제목 1'} author={'저자'} />
							<BookCard title={'책 제목 2'} author={'저자'} />
							<BookCard title={'책 제목 3'} author={'저자'} />
							<BookCard title={'책 제목 4'} author={'저자'} />
							<BookCard title={'책 제목 5'} author={'저자'} />
							<BookCard title={'책 제목 6'} author={'저자'} />
							<BookCard title={'책 제목 7'} author={'저자'} />
							<BookCard title={'책 제목 8'} author={'저자'} />
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
