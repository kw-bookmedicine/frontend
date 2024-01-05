import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<header>
			<div className="head_logo">
				<Link to={'/'}>LOGO</Link>
			</div>
			<div className="head_btn__home">
				<Link to={'/main'}>HOME</Link>
			</div>
			<div className="head_btn__feed">
				<Link to={'/feed'}>FEED</Link>
			</div>
			<div className="head_btn__search">
				<Link to={'/search'}>SEARCH</Link>
			</div>
			<div className="head_btn__mypage">
				<Link to={'/mypage'}>MYPAGE</Link>
			</div>
		</header>
	);
};

export default Header;
