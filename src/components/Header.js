import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

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

	const activeStyle = {
		color: '#000',
		fontWeight: 700,
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
							<NavLink
								style={({ isActive }) => (isActive ? activeStyle : {})}
								to={'/main'}
							>
								HOME
							</NavLink>
						</li>
						<li>
							<NavLink
								style={({ isActive }) => (isActive ? activeStyle : {})}
								to={'/simplePrscr'}
							>
								한 줄 처방
							</NavLink>
						</li>
						<li>
							<NavLink
								style={({ isActive }) => (isActive ? activeStyle : {})}
								to={'/counseling'}
							>
								고민상담
							</NavLink>
						</li>
						<li>
							<NavLink
								style={({ isActive }) => (isActive ? activeStyle : {})}
								to={'/search'}
							>
								SEARCH
							</NavLink>
						</li>
						<li>
							<NavLink
								style={({ isActive }) => (isActive ? activeStyle : {})}
								to={'/mypage'}
							>
								MYPAGE
							</NavLink>
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
