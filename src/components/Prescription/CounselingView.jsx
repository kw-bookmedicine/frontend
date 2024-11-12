import React from 'react';
import { Link } from 'react-router-dom';

// STYLE
import '../../styles/Counseling/CounselingView.css';

const CounselingView = ({ item }) => {
	return (
		<>
			<Link to={`/worry-detail?board=${item.boardId}`}>
				<div className='cnsView_container'>
					<div className='cns_user_wrapper'>
						<div className='cns_user_left_wrapper'>
							<img src='/icon/profile/basic_profile_img.svg' alt='프로필' />
						</div>
						<div className='cns_user_right_wrapper'>
							<div className='cns_user_name'>{item.nickname}</div>
							<div className='cns_feed_date'>
								{item.createdDate.slice(0, 10)}
							</div>
						</div>
					</div>
					<div className='user_cns_text_wrapper'>
						<div className='user_cns_text'>{item.title}</div>
					</div>
				</div>
			</Link>
		</>
	);
};

export default CounselingView;
