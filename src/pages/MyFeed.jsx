import React from 'react';

// COMPONENTS
import Header from '../components/Header';
import Footer from '../components/Footer';
import FeedCard from '../components/FeedCard';

// STYLES
import '../styles/MyFeed.css';

const MyFeed = () => {
	return (
		<>
			<Header />
			<div className="myFeed_container">
				<div className="myFeed_title_wrapper">
					<div className="myFeed_title">내 피드</div>
				</div>
				<div className="myFeed_content_wrapper">
					<FeedCard />
				</div>
			</div>
		</>
	);
};

export default MyFeed;
