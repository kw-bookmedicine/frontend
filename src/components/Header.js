import React, { useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

// COMPONENTS
import Btn from '../components/Button';

// STYLES
import '../styles/Header.css';

const Header = () => {
	// 현재 url 주소 불러옴
	const location = useLocation();

	// 해당하는 주소 url일 때, 적용될 스타일
	const activeStyle = {
		color: '#000',
		fontWeight: 700,
	};

	// 고민상담페이지 -> 처방전 작성까지 주소
	let prscrLocation = [
		'/worry/detail',
		'/prescription/write',
		'/prescription/write/2',
		'/prescription/detail',
	];

	// 검색페이지 -> 책 정보 상세보기 페이지까지 주소
	let bookLocation = ['/book-detail', '/book/list', '/book'];

	// 마이페이지 -> 내 정보 수정
	let myLocation = [
		'/edit',
		'/edit/nickname',
		'/edit/password',
		'/edit/job',
		'/my/worry',
		'/myOneLinePrescriptions',
		'/myPrescriptions',
	];

	return (
		<div className="head">
			<div className="head_logo">
				<Link to={'/main'}>
					<img
						src="/header_logo.png"
						alt="책국 로고"
						className="header_logo_img"
					/>
				</Link>
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
							// to={'/simplePrscr'}
							to={'/oneline/prescription'}
						>
							한 줄 처방
						</NavLink>
					</li>
					<li>
						<NavLink
							style={({ isActive }) =>
								isActive
									? activeStyle
									: prscrLocation.includes(location.pathname)
									? activeStyle
									: {}
							}
							to={'/counseling'}
						>
							고민상담
						</NavLink>
					</li>
					<li>
						<NavLink
							style={({ isActive }) =>
								isActive
									? activeStyle
									: bookLocation.includes(location.pathname)
									? activeStyle
									: {}
							}
							to={'/search'}
						>
							SEARCH
						</NavLink>
					</li>
					<li>
						<NavLink
							style={({ isActive }) =>
								isActive
									? activeStyle
									: myLocation.includes(location.pathname)
									? activeStyle
									: {}
							}
							to={'/mypage'}
						>
							MYPAGE
						</NavLink>
					</li>
				</ul>
			</nav>
			<div className="head_btn__logout">
				<Btn text={'로그아웃'} type="logout" id="home-header-btn" />
			</div>
		</div>
	);
};

export default Header;
