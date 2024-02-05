import React from 'react';

// COMPONENTS
import Header from '../components/Header';
import FeedGrid from '../components/FeedGrid';

// STYLES
import '../styles/Feed.css';

const Feed = () => {
	return (
		<>
			<Header />
			<div className="feed_content">
				<div className="feed_title_wrapper">
					<div className="feed_title">추천 피드</div>
				</div>
				<div className="feed_content_wrapper">
					<FeedGrid />
				</div>
			</div>
		</>
	);
};

export default Feed;
