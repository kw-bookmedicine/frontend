import React from 'react';
import { Link } from 'react-router-dom';

// COMPONENTS
import Btn from '../components/Button';

// STYLES
import '../styles/Header.css';

const Header = () => {
	const logout = () => {
		let token = localStorage.getItem('token');
		console.log('logout!');
		localStorage.clear();
		// window.location.replace('http://localhost:3000/');
	};

	return (
		<div className="head">
			<header>
				<div className="head_logo">
					<Link to={'/'}>LOGO</Link>
				</div>
				<nav className="header_list_wrapper">
					<ul className="header_list">
						<li>
							<Link to={'/main'}>HOME</Link>
						</li>
						<li>
							<Link to={'/counseling'}>고민상담</Link>
						</li>
						<li>
							<Link to={'/search'}>SEARCH</Link>
						</li>
						<li>
							<Link to={'/mypage'}>MYPAGE</Link>
						</li>
					</ul>
				</nav>
				<div className="head_btn__logout">
					<Btn
						onClick={() => {
							logout();
						}}
						text={'로그아웃'}
						type="logout"
						id="home-header-btn"
					/>
				</div>
			</header>
		</div>
	);
};

export default Header;
