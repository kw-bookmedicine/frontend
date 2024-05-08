import React from 'react';
import { Link } from 'react-router-dom';

// STYLES
import '../../styles/Counseling/ProcessTitle.css';

const ProcessTitle = ({ type, value }) => {
	const renderTitle = (type) => {
		if (type === 'normal') {
			return (
				<>
					<div className={`process_${type}_title_wrapper`}>
						<div className={`process_${type}_title`}>진단서</div>
						<div className={`process_${type}_subTitle`}>
							<span id={`${type}_nickname`}>{value}</span> 님의 진단서
						</div>
					</div>
				</>
			);
		} else if (type === 'detail') {
			return (
				<>
					<div className={`process_${type}_title_wrapper`}>
						<div className={`process_${type}_title`}>처방전</div>
						<div className={`process_${type}_subTitle`}>
							<span id={`${type}_from_nickname`}>유저1</span> 님이 처방한{' '}
							<span id={`${type}_target_nickname`}>이름 없는 새</span> 님의
							진단서
						</div>
					</div>
				</>
			);
		} else {
			return (
				<>
					<div className="process_title_wrapper">
						{type === 'Counseling' ? (
							<div className="process_title">고민 상담하기</div>
						) : (
							<div className="process_title">
								<span id="process_nickname">이름 없는 새</span> 님을 위한 처방전
								작성 중...
							</div>
						)}
						<div className="progress_bar_wrapper">
							<progress
								id="progress"
								value={value}
								min="0"
								max="100"
							></progress>
							<p id="progress_text">{value}%</p>
						</div>
					</div>
				</>
			);
		}
	};

	return <>{renderTitle(type)}</>;
};

export default ProcessTitle;
