import React from 'react';
import { Link } from 'react-router-dom';

// COMPONENTS
import Btn from '../components/Button';

// STYLES
import '../styles/HomeStyles.css';

import banner from '../assets/banner.png';

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
							<div className="feature-slide"></div>
						</div>
						<h1>기능 설명</h1>
						<p>이곳은 기능 설명 섹션입니다.</p>
					</section>

					<section className="home_emotion">
						<h1>감정에 따라 책을 읽어봐요!</h1>
						<p>이곳은 감정에 따른 책 추천 섹션입니다.</p>
					</section>

					<section className="home_list">
						<h1>책 리스트</h1>
						<p>이곳은 다양한 책 리스트를 보여줄 섹션입니다.</p>
					</section>

					<h1>
						<Link to={'/login'}>로그인 페이지 이동</Link>
					</h1>
					<Link to={'/join'}>회원가입 2 페이지 이동</Link>
					<Link to={'/test'}>중복확인</Link>
				</div>
			</div>
		</>
	);
};

export default Home;
