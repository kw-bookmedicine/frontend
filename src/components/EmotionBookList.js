import { Link } from 'react-router-dom';
import '../styles/EmotionBookList.css';

const EmotionBookList = ({ text, isSelected }) => {
	return (
		<>
			<div className="bookContainer">
				<Link to={'/feed'}>
					<div className="book">{text}</div>
				</Link>
				<Link to={'/feed'}>
					<div className="book"></div>
				</Link>
				<Link to={'/feed'}>
					<div className="book"></div>
				</Link>
				<Link to={'/feed'}>
					<div className="book"></div>
				</Link>
				<Link to={'/feed'}>
					<div className="book"></div>
				</Link>
				<Link to={'/feed'}>
					<div className="book"></div>
				</Link>
				<Link to={'/feed'}>
					<div className="book"></div>
				</Link>
				<Link to={'/feed'}>
					<div className="book"></div>
				</Link>
				<Link to={'/feed'}>
					<div className="book"></div>
				</Link>
				<Link to={'/feed'}>
					<div className="book"></div>
				</Link>
				<Link to={'/feed'}>
					<div className="book"></div>
				</Link>
				<Link to={'/feed'}>
					<div className="book"></div>
				</Link>
				<Link to={'/feed'}>
					<div className="book"></div>
				</Link>
				<Link to={'/feed'}>
					<div className="book"></div>
				</Link>
				<Link to={'/feed'}>
					<div className="book"></div>
				</Link>
				<Link to={'/feed'}>
					<div className="book"></div>
				</Link>
				<Link to={'/feed'}>
					<div className="book"></div>
				</Link>
				<Link to={'/feed'}>
					<div className="book"></div>
				</Link>
				<Link to={'/feed'}>
					<div className="book"></div>
				</Link>
				<Link to={'/feed'}>
					<div className="book"></div>
				</Link>
				<Link to={'/feed'}>
					<div className="book"></div>
				</Link>
				<Link to={'/feed'}>
					<div className="book"></div>
				</Link>
				<Link to={'/feed'}>
					<div className="book"></div>
				</Link>
				<Link to={'/feed'}>
					<div className="book"></div>
				</Link>
			</div>
		</>
	);
};

export default EmotionBookList;
