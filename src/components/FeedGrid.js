import React from 'react';
import { Link } from 'react-router-dom';

// COMPONENTS
import FeedCard from '../components/FeedCard';

// STYLES
import '../styles/FeedGrid.css';

const FeedGrid = () => {
	return (
		<>
			<div className="FeedContainer">
				<Link to={'/book-detail'}>
					<div className="FeedCard">
						<FeedCard />
					</div>
				</Link>
				<Link to={'/feed'}>
					<div className="FeedCard"></div>
				</Link>
				<Link to={'/feed'}>
					<div className="FeedCard"></div>
				</Link>
				<Link to={'/feed'}>
					<div className="FeedCard"></div>
				</Link>
				<Link to={'/feed'}>
					<div className="FeedCard"></div>
				</Link>
				<Link to={'/feed'}>
					<div className="FeedCard"></div>
				</Link>
				<Link to={'/feed'}>
					<div className="FeedCard"></div>
				</Link>
				<Link to={'/feed'}>
					<div className="FeedCard"></div>
				</Link>
				<Link to={'/feed'}>
					<div className="FeedCard"></div>
				</Link>
				<Link to={'/feed'}>
					<div className="FeedCard"></div>
				</Link>
				<Link to={'/feed'}>
					<div className="FeedCard"></div>
				</Link>
				<Link to={'/feed'}>
					<div className="FeedCard"></div>
				</Link>
				<Link to={'/feed'}>
					<div className="FeedCard"></div>
				</Link>
				<Link to={'/feed'}>
					<div className="FeedCard"></div>
				</Link>
				<Link to={'/feed'}>
					<div className="FeedCard"></div>
				</Link>
				<Link to={'/feed'}>
					<div className="FeedCard"></div>
				</Link>
			</div>
		</>
	);
};

export default FeedGrid;
