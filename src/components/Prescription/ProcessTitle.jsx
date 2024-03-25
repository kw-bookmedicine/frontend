import React from 'react';
import { Link } from 'react-router-dom';

// STYLES
import '../../styles/Counseling/ProcessTitle.css';

const ProcessTitle = ({ type }) => {
	const renderTitle = (type) => {
		if (type === 'normal') {
			return (
				<>
					<div className={`process_${type}_title_wrapper`}>
						<div className={`process_${type}_title`}>진단서</div>
						<div className={`process_${type}_subTitle`}>
							<span id={`${type}_nickname`}>이름 없는 새</span> 님의 진단서
						</div>
					</div>
				</>
			);
		} else {
			return (
				<>
					<div className="process_title_wrapper">
						<div className="process_title">
							<span id="process_nickname">이름 없는 새</span> 님을 위한 처방전
							작성 중...
						</div>
						<div className="progress_bar_wrapper">
							<progress id="progress" value="50" min="0" max="100"></progress>
							<p id="progress_text">50%</p>
						</div>
					</div>
				</>
			);
		}
	};

	return <>{renderTitle(type)}</>;
};

export default ProcessTitle;
