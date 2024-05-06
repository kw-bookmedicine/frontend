import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// ASSETS
import Banner from '../assets/banner.png';

// COMPONENTS
import Btn from '../components/Button';
import EmotionItem from '../components/EmotionItem';
import EmotionBookList from '../components/EmotionBookList';

// STYLES
import '../styles/HomeStyles.css';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow, Autoplay } from 'swiper/modules';

// Import Swiper styles
// import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
// import 'swiper/css/bundle';
import 'swiper/css/effect-coverflow';

const featSlider = [
	{
		id: 'feature-1',
		title: '약국처럼 독서도',
		description: '오늘의 감정에 따라 마음을\n치유할 수 있어요!',
		color: '#F3FDFF',
		icon: '/icon/book.png',
	},
	{
		id: 'feature-2',
		title: '다른 사람은 어떨까?',
		description: '다른 사용자들의 이용후기를\n열람할 수 있어요!',
		color: '#D5E0FF',
		icon: '/icon/other.png',
	},
	{
		id: 'feature-3',
		title: '다양한 도서들',
		description: '매일매일 다양한 도서들을\n즐겨보아요!',
		color: '#D6FFF7',
		icon: '/icon/manyBook.png',
	},
	{
		id: 'feature-4',
		title: '다양한 도서들',
		description: '매일매일 다양한 도서들을\n즐겨보아요!',
		color: '#fbffd6',
		icon: '/icon/manyBook.png',
	},
	{
		id: 'feature-5',
		title: '다양한 도서들',
		description: '매일매일 다양한 도서들을\n즐겨보아요!',
		color: '#f7d6ff',
		icon: '/icon/manyBook.png',
	},
];

const emotionList = [
	{
		emotion_id: 1,
		emotion_img: '/icon/angry.png',
		emotion_text: '화날 ',
	},
	{
		emotion_id: 2,
		emotion_img: '/icon/sad.png',
		emotion_text: '슬플 ',
	},
	{
		emotion_id: 3,
		emotion_img: '/icon/smile.png',
		emotion_text: '기쁠 ',
	},
	{
		emotion_id: 4,
		emotion_img: '/icon/happy.png',
		emotion_text: '즐거울 ',
	},
	{
		emotion_id: 5,
		emotion_img: '/icon/stress.png',
		emotion_text: '불안할 ',
	},
	{
		emotion_id: 6,
		emotion_img: '/icon/lonely.png',
		emotion_text: '외로울 ',
	},
];

const Home = () => {
	const [emotion, setEmotion] = useState(3);
	const [text, setText] = useState('기쁠 때 추천하는 책이예요!');
	// state를 두어서 불러오는 api url 변경하면 될 듯

	const handleClickEmotion = (emotion) => {
		setEmotion(emotion);
		setText(
			emotionList.map((data) => {
				if (emotion === data.emotion_id)
					return `${data.emotion_text} 때 추천하는 책이예요!`;
				else return ' ';
			}),
		);
	};

	// 초기에 렌더링될 때 토큰 여부 (자동로그인) 검사
	useEffect(() => {
		if (localStorage.getItem('token') !== null) {
			console.log('자동로그인');
			window.location.replace('http://localhost:3000/main');
		}
	}, []);

	return (
		<>
			<section className="home">
				<section className="home_header_section">
					<div className="home_header">
						<div className="home_header_wrapper">
							<div className="header_logo">
								<Link to={'/'}>
									<img src="/header_logo.png" alt="책국로고" />
								</Link>
								<div className="header_btn"></div>
							</div>
							<Btn text={'로그인'} type="login" id="home-header-btn" />
						</div>
					</div>
				</section>
				<section className="intro">
					<section className="home_main">
						<div className="home_main_wrapper">
							<img src={Banner} alt="" id="home-banner" />
							<div className="home_main_title_wrapper">
								<div className="big_title">
									당신의 마음에
									<br />한 발짝 가까이
								</div>
								<div className="small_title">
									<br />
									당신의 오늘은 어떤가요?
								</div>
							</div>
						</div>
					</section>

					<section className="home_feature">
						<div className="feature_wrapper">
							<div className="feature_title">
								책국의 기능에는 어떤 것이 있을까?
							</div>
							<div className="feature_slide">
								<Swiper
									className="feature_swiper swiper-wrapper"
									modules={[Navigation, EffectCoverflow, Autoplay]}
									navigation={{ clickable: true }}
									effect={'coverflow'}
									grabCursor={true}
									centeredSlides={true}
									coverflowEffect={{
										rotate: 0,
										depth: 100,
										stretch: 70,
										modifier: 5,
										slideShadows: false,
									}}
									loop={true}
									loopAdditionalSlides={1}
									slidesPerView={2}
									initialSlide={3}
									// slideToClickedSlide={true}
								>
									{featSlider.map((data) => (
										<SwiperSlide
											className="swiper-slide feature_swiper_slider"
											key={data.id}
										>
											<div
												style={{ backgroundColor: `${data.color}` }}
												className="feature_card"
											>
												<img
													src={data.icon}
													alt="featIcon"
													className="feature_icon"
												/>
												<h2 className="feature_card_title">{data.title}</h2>
												<p className="feature_card_description">
													{data.description}
												</p>
											</div>
										</SwiperSlide>
									))}
								</Swiper>
							</div>
						</div>
					</section>

					{/* <section className="home_emotion">
						<div className="emotion_wrapper">
							<div className="emotion_up_wrapper">
								<div className="emotion_title">
									감정에 따라
									<br />
									책을 읽어봐요!
								</div>
								<div className="emotion_slide_wrapper">
									<div className="emotion_slide">
										{emotionList.map((it) => (
											<EmotionItem
												key={it.emotion_id}
												{...it}
												onClick={handleClickEmotion}
												isSelected={it.emotion_id === emotion}
											/>
										))}
									</div>
								</div>
								<div className="emotion_text">{text}</div>
							</div>
							<div className="emotion_bottom_wrapper">
								<div className="emotionBook_slide">
									<EmotionBookList text={text} />
								</div>
							</div>
						</div>
					</section> */}
					<section className="home_counseling">
						<div className="home_counseling_title_wrapper">
							<p id="home_cns_title">당신의 고민을 적어주세요</p>
							<p>다양한 사람들이 처방해줄거에요</p>
						</div>
						<div className="home_counseling_content_wrapper">
							<div className="user-bubble">새로운 곳에 적응하기 힘들어요</div>
							<div className="home_cns_ai_wrapper">
								<img
									src="/temp-robot-icon.png"
									alt="로봇 아이콘"
									id="robot-icon"
								/>
								<div className="ai-bubble">
									<p className="ai_prscr_title">
										새로운 곳에 적응하기 힘들어요 에 대한 AI 처방전입니다.
									</p>
									<div className="ai_prscr_content_wrapper">
										<div className="ai_prscr_left_wrapper">
											<img
												src="/loading_thumbnail_x4.png"
												alt=""
												id="ai_prscr_thumbnail"
											/>
											<div className="ai_prscr_bookInfo_wrapper">
												<p id="ai_prscr_bookTitle">책 제목</p>
												<p>저자</p>
												<p>출판사/출판연도</p>
											</div>
										</div>
										<div className="ai_prscr_right_wrapper">
											<span id="ai_prscr_res_title">처방사유</span>
											<div className="ai_prscr_res_box">
												이 책을 처방한 이유는 ...
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="home_cns_ai_wrapper">
								<img
									src="/icon/profile/basic_profile_img.svg"
									alt="유저 아이콘"
									id="user-icon"
								/>
								<div className="ai-bubble">
									<p className="ai_prscr_title">
										새로운 곳에 적응하기 힘들어요 에 대한 AI 처방전입니다.
									</p>
									<div className="ai_prscr_content_wrapper">
										<div className="ai_prscr_left_wrapper">
											<img
												src="/loading_thumbnail_x4.png"
												alt=""
												id="ai_prscr_thumbnail"
											/>
											<div className="ai_prscr_bookInfo_wrapper">
												<p id="ai_prscr_bookTitle">책 제목</p>
												<p>저자</p>
												<p>출판사/출판연도</p>
											</div>
										</div>
										<div className="ai_prscr_right_wrapper">
											<span id="ai_prscr_res_title">처방사유</span>
											<div className="ai_prscr_res_box">
												이 책을 처방한 이유는 ...
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</section>
				<section className="home_footer">
					<div className="home_footer_wrapper">
						<div className="home_footer_inner">
							Copyright © 2024 책국 All Rights Reserved.
						</div>
					</div>
				</section>
			</section>
		</>
	);
};

export default Home;
