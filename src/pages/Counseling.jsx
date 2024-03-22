import React from 'react';

// COMPONENTS
import Header from '../components/Header';
import Footer from '../components/Footer';
import CnsFeed from '../components/Prescription/CounselingView';

// STYLES
import '../styles/Counseling.css';

const Counseling = () => {
	return (
		<>
			<Header />
			<div className="counseling_content">
				<div className="counseling_category_wrapper">
					<div className="cns_category_title">분야 선택</div>
					<div className="cns_category_content_wrapper">
						<div>1</div>
						<div>2</div>
						<div>3</div>
						<div>4</div>
						<div>5</div>
					</div>
				</div>
				<div className="counseling_feed_wrapper">
					<div className="view_feed">안녕</div>
					<CnsFeed />
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Counseling;
