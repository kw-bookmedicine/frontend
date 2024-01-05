import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<header>
			<div className="head_logo">
				<Link to={'/'} style={{ textDecoration: 'none' }}>
					LOGO
				</Link>
			</div>
			<div className="head_btn__home">
				<Link to={'/main'} style={{ textDecoration: 'none' }}>
					HOME
				</Link>
			</div>
			<div className="head_btn__feed">
				<Link to={'/feed'} style={{ textDecoration: 'none' }}>
					FEED
				</Link>
			</div>
			<div className="head_btn__search">
				<Link to={'/search'} style={{ textDecoration: 'none' }}>
					SEARCH
				</Link>
			</div>
			<div className="head_btn__mypage">
				<Link to={'/mypage'} style={{ textDecoration: 'none' }}>
					MYPAGE
				</Link>
			</div>
		</header>
	);
};

export default Header;
