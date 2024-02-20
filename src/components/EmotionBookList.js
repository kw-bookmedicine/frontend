import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// STYLE
import '../styles/EmotionBookList.css';

const EmotionBookList = ({ text }) => {
	const [isAccess, setIsAccess] = useState(false);
	const [url, setUrl] = useState('');

	useEffect(() => {
		if (localStorage.getItem('token') === null) {
			setIsAccess(false);
			setUrl('/login');
			// window.location.replace('http://localhost:3000/login');
		} else {
			setIsAccess(true);
			setUrl('/main');
		}
	});

	// 기분에 따른 책 클릭 시 로그인 여부에 따라 접근 제한
	const blockAccess = () => {
		if (localStorage.getItem('token') === null) {
			setIsAccess(false);
			setUrl('/login');
			// window.location.replace('http://localhost:3000/login');
		} else {
			setIsAccess(!isAccess);
			setUrl('/main');
		}
	};

	return (
		<>
			<div className="bookContainer">
				<Link to={url}>
					<div className="book">{text}</div>
				</Link>
				<Link to={url}>
					<div className="book"></div>
				</Link>
				<Link to={url}>
					<div className="book"></div>
				</Link>
				<Link to={url}>
					<div className="book"></div>
				</Link>
				<Link to={url}>
					<div className="book"></div>
				</Link>
				<Link to={url}>
					<div className="book"></div>
				</Link>
				<Link to={url}>
					<div className="book"></div>
				</Link>
				<Link to={url}>
					<div className="book"></div>
				</Link>
				<Link to={url}>
					<div className="book"></div>
				</Link>
				<Link to={url}>
					<div className="book"></div>
				</Link>
				<Link to={url}>
					<div className="book"></div>
				</Link>
				<Link to={url}>
					<div className="book"></div>
				</Link>
				<Link to={url}>
					<div className="book"></div>
				</Link>
				<Link to={url}>
					<div className="book"></div>
				</Link>
				<Link to={url}>
					<div className="book"></div>
				</Link>
				<Link to={url}>
					<div className="book"></div>
				</Link>
				<Link to={url}>
					<div className="book"></div>
				</Link>
				<Link to={url}>
					<div className="book"></div>
				</Link>
				<Link to={url}>
					<div className="book"></div>
				</Link>
				<Link to={url}>
					<div className="book"></div>
				</Link>
				<Link to={url}>
					<div className="book"></div>
				</Link>
				<Link to={url}>
					<div className="book"></div>
				</Link>
				<Link to={url}>
					<div className="book"></div>
				</Link>
				<Link to={url}>
					<div className="book"></div>
				</Link>
				{/* <Link to={'/feed'}>
					<div className="book"></div>
				</Link>
				 */}
			</div>
		</>
	);
};

export default EmotionBookList;
