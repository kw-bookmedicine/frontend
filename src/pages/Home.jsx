import React from 'react';
import { Link } from 'react-router-dom';

// COMPONENTS
import Btn from '../components/Button';

// STYLES
import '../styles/HomeStyles.css';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import {
	Navigation,
	Pagination,
	Scrollbar,
	A11y,
	EffectCoverflow,
	Autoplay,
} from 'swiper/modules';

// Import Swiper styles
// import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/bundle';

// Assets
import happy from '../assets/icon-color-happy.png';
import smile from '../assets/icon-color-smile.png';
import angry from '../assets/icon-color-angry.png';
import lonely from '../assets/icon-color-lonely.png';
import stress from '../assets/icon-color-stress.png';
import sad from '../assets/icon-color-sad.png';

const featSlider = [
	{
		title: '약국처럼 독서도',
		description: '오늘의 감정에 따라 마음을\n치유할 수 있어요!',
		color: '#F3FDFF',
		icon: '/icon/book.png',
	},
	{
		title: '다른 사람은 어떨까?',
		description: '다른 사용자들의 이용후기를\n열람할 수 있어요!',
		color: '#D5E0FF',
		icon: '/icon/other.png',
	},
	{
		title: '다양한 도서들',
		description: '매일매일 다양한 도서들을\n즐겨보아요!',
		color: '#D6FFF7',
		icon: '/icon/manyBook.png',
	},
];

const Home = () => {
	return (
		<>
			<div className="home">
				<div className="home_header">
					<div className="header-logo">
						LOGO
						<div className="header-btn">
							<Btn text={'로그인'} type="login" />
						</div>
					</div>
				</div>
				<div className="content_wrapper">
					<section className="home_main">
						<div className="home-main-img">
							<div className="home-main-title-wrapper">
								<div className="big-title">
									당신의 마음에
									<br />한 발짝 가까이
								</div>
								<div className="small-title">
									<br />
									당신의 오늘은 어떤가요?
								</div>
							</div>
						</div>
					</section>

					<section className="home_feature">
						<div className="feature-wrapper">
							<div className="feature-title">
								책국의 기능에는 어떤 것이 있을까?
							</div>
							<div className="feature-slide">
								<Swiper
									className="feature-swiper"
									modules={[Navigation, EffectCoverflow, Autoplay]}
									navigation={{
										prevEl: '.swiper-button-prev',
										nextEl: '.swiper-button-next',
									}}
									effect={'coverflow'}
									// grabCursor={true}
									centeredSlides={true}
									coverflowEffect={{
										rotate: 0,
										depth: 100,
										stretch: 70,
										modifier: 5,
										slideShadows: false,
									}}
									loop={true}
									slidesPerView={2}
								>
									{featSlider.map((data) => (
										<SwiperSlide className="feature-swiper-slider">
											<div
												style={{ backgroundColor: `${data.color}` }}
												className="feature-card"
											>
												<img
													src={data.icon}
													alt="featIcon"
													className="feature-icon"
												/>
												<h2 className="feature-card-title">{data.title}</h2>
												<p className="feature-card-description">
													{data.description}
												</p>
											</div>
										</SwiperSlide>
									))}
									<div className="swiper-button-next"></div>
									<div className="swiper-button-prev"></div>
								</Swiper>
							</div>
						</div>
					</section>

					<section className="home_emotion">
						<div className="emotion-wrapper">
							<div className="emotion-up">
								<div className="emotion-title">
									감정에 따라
									<br />
									책을 읽어봐요!
								</div>
								<div className="emotion-slide">
									<Swiper
										// install Swiper modules
										modules={[Navigation, Pagination, Scrollbar, A11y]}
										spaceBetween={50}
										slidesPerView={3}
										navigation
										pagination={{ clickable: true }}
										scrollbar={{ draggable: true }}
										onSwiper={(swiper) => console.log(swiper)}
										onSlideChange={() => console.log('slide change')}
									>
										<SwiperSlide>
											<img src={smile} alt="smile" id="clickImg" />
										</SwiperSlide>
										<SwiperSlide>
											<img src={angry} alt="smile" id="clickImg" />
										</SwiperSlide>
										<SwiperSlide>
											<img src={sad} alt="smile" className="noneClickImg" />
										</SwiperSlide>
										<SwiperSlide>
											<img src={stress} alt="smile" className="noneClickImg" />
										</SwiperSlide>
									</Swiper>
								</div>
								<div className="emotion-text">기쁠 때 추천하는 책이예요!</div>
							</div>
							<div className="emotion-down">
								<div className="emotionBook-slide">
									<div className="slide-1">
										<Swiper
											// install Swiper modules
											modules={[Navigation, Pagination, Scrollbar, A11y]}
											spaceBetween={50}
											slidesPerView={3}
											navigation
											pagination={{ clickable: true }}
											scrollbar={{ draggable: true }}
											onSwiper={(swiper) => console.log(swiper)}
											onSlideChange={() => console.log('slide change')}
										>
											<SwiperSlide>Slide 1</SwiperSlide>
											<SwiperSlide>Slide 2</SwiperSlide>
											<SwiperSlide>Slide 3</SwiperSlide>
											<SwiperSlide>Slide 4</SwiperSlide>
										</Swiper>
									</div>
									<div className="slide-2">
										<Swiper
											// install Swiper modules
											modules={[Navigation, Pagination, Scrollbar, A11y]}
											spaceBetween={50}
											slidesPerView={3}
											navigation
											pagination={{ clickable: true }}
											scrollbar={{ draggable: true }}
											onSwiper={(swiper) => console.log(swiper)}
											onSlideChange={() => console.log('slide change')}
										>
											<SwiperSlide>Slide 1</SwiperSlide>
											<SwiperSlide>Slide 2</SwiperSlide>
											<SwiperSlide>Slide 3</SwiperSlide>
											<SwiperSlide>Slide 4</SwiperSlide>
										</Swiper>
									</div>
									<div className="slide-3">
										<Swiper
											// install Swiper modules
											modules={[Navigation, Pagination, Scrollbar, A11y]}
											spaceBetween={50}
											slidesPerView={3}
											navigation
											pagination={{ clickable: true }}
											scrollbar={{ draggable: true }}
											onSwiper={(swiper) => console.log(swiper)}
											onSlideChange={() => console.log('slide change')}
										>
											<SwiperSlide>Slide 1</SwiperSlide>
											<SwiperSlide>Slide 2</SwiperSlide>
											<SwiperSlide>Slide 3</SwiperSlide>
											<SwiperSlide>Slide 4</SwiperSlide>
										</Swiper>
									</div>
								</div>
							</div>
							<h1>
								<Link to={'/login'}>로그인 페이지 이동</Link>
							</h1>
							<Link to={'/join'}>회원가입 2 페이지 이동</Link>
							<Link to={'/test'}>중복확인</Link>
						</div>
					</section>
				</div>
			</div>
		</>
	);
};

export default Home;
