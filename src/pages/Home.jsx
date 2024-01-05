import React from 'react';
import { Link } from 'react-router-dom';

// COMPONENTS
import Btn from '../components/Button';

// STYLES
import '../styles/HomeStyles.css';

const Home = () => {
	return (
		<>
			<header className="home_header">
				<p className="header_logo">LOGO</p>
				<Btn text={'로그인'} type="login" />
				<Btn text={'회원가입'} type="join" />
			</header>

			<section className="home_main">
				<h1>Home</h1>
				<p>이곳은 로그인 전 홈 페이지입니다.</p>
			</section>

			<section className="home_feature">
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
		</>
	);
};

export default Home;
