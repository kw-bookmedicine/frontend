import React from 'react';
import { Link } from 'react-router-dom';

// STYLES
import '../../styles/Counseling/ProcessTitle.css';

const ProcessTitle = ({ type }) => {
	let processTitleType = ['process'].includes(type) ? type : 'default';

	const renderTitle = (type) => {
		if (type === 'normal') {
			return (
				<>
					<div className={`process_${type}_title`}>진단서</div>
					<div className={`process_${type}_subTitle`}>
						<span id={`${type}_nickname`}>이름 없는 새</span> 님의 진단서
					</div>
				</>
			);
		}
	};

	return (
		<>
			<div className="process_title_wrapper">{renderTitle(type)}</div>
		</>
	);
};

export default ProcessTitle;
