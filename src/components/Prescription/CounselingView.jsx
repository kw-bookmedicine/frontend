import React from 'react';
import { Link } from 'react-router-dom';

// STYLE
import '../../styles/Counseling/CounselingView.css';

const CounselingView = () => {
	return (
		<>
			<div className="cnsView_container">
				<div className="cns_user_wrapper">
					<div className="cns_user_left_wrapper"></div>
					<div className="cns_user_right_wrapper">
						<div className="cns_user_name">날개없는 새</div>
						<div className="cns_feed_date">2024.03.22</div>
					</div>
				</div>
				<div className="user_cns_text_wrapper">
					<div className="user_cns_text">새로운 곳에 적응하기 힘들어요</div>
				</div>
				<div className="cns_to_prscr_btn">
					<Link to={'/worry'}>
						<button className="convert_prscr">진단서 보기</button>
					</Link>
				</div>
			</div>
		</>
	);
};

export default CounselingView;
