import React from 'react';
import { Link } from 'react-router-dom';

// COMPONENTS
import Btn from '../components/Button';

// STYLES
import HomeStyle from '../styles/HomeStyles.module.css';
import styled from 'styled-components';

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

const StyledSwiper = styled(Swiper)`
	.swiper-button-next {
		background: url(/public/icon/home-right-arrow.png) no-repeat;
		background-size: 100% auto;
		background-position: center;
	}

	.swiper-button-prev {
		background: url(/public/icon/home-left-arrow.png) no-repeat;
		background-size: 100% auto;
		background-position: center;
	}
`;

const Home = () => {
	return (
		<>
			<section className={HomeStyle.home}>
				<section className={HomeStyle.home_header_section}>
					<div className={HomeStyle.home_header}>
						<div className={HomeStyle.header_logo}>
							책국
							<div className={HomeStyle.header_btn}></div>
						</div>
						<Btn text={'로그인'} type="login" id="home-header-btn" />
					</div>
				</section>
				<section className="intro">
					<section className={HomeStyle.home_main}>
						<div className={HomeStyle.home_main_wrapper}>
							<div className={HomeStyle.home_main_img}>
								<div className={HomeStyle.home_main_title_wrapper}>
									<div className={HomeStyle.big_title}>
										당신의 마음에
										<br />한 발짝 가까이
									</div>
									<div className={HomeStyle.small_title}>
										<br />
										당신의 오늘은 어떤가요?
									</div>
								</div>
							</div>
						</div>
					</section>

					<section className={HomeStyle.home_feature}>
						<div className={HomeStyle.feature_wrapper}>
							<div className={HomeStyle.feature_title}>
								책국의 기능에는 어떤 것이 있을까?
							</div>
							<div className={HomeStyle.feature_slide}>
								<Swiper
									className={HomeStyle.feature_swiper}
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
										<SwiperSlide className={HomeStyle.feature_swiper_slider}>
											<div
												style={{ backgroundColor: `${data.color}` }}
												className={HomeStyle.feature_card}
											>
												<img
													src={data.icon}
													alt="featIcon"
													className={HomeStyle.feature_icon}
												/>
												<h2 className={HomeStyle.feature_card_title}>
													{data.title}
												</h2>
												<p className={HomeStyle.feature_card_description}>
													{data.description}
												</p>
											</div>
										</SwiperSlide>
									))}
								</Swiper>
							</div>
						</div>
					</section>

					<section className={HomeStyle.home_emotion}>
						<div className="emotion_wrapper">
							<div className="emotion_up">
								<div className="emotion_title">
									감정에 따라
									<br />
									책을 읽어봐요!
								</div>
								<div className="emotion_slide"></div>
								<div className="emotion_text">기쁠 때 추천하는 책이예요!</div>
							</div>
							<div className="emotion_down">
								<div className="emotionBook_slide"></div>
							</div>
						</div>
					</section>
				</section>
			</section>
		</>
	);
};

export default Home;
