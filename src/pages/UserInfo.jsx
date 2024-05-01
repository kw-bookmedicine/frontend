import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// SERVICE
import api from '../services/api';

// COMPONENTS
import Header from '../components/Header';
import Footer from '../components/Footer';
import Btn from '../components/Button';

// STYLES
import '../styles/UserInfo.css';

const UserInfo = () => {
	const [nickname, setNickname] = useState('');
	const [userId, setUserId] = useState('');
	const getUserData = () => {
		api.get('/client', { withCredentials: true }).then((res) => {
			// console.log(res.data);
			// console.log(res.data.nickname);

			res.data.nickname === null
				? setNickname('닉네임을 설정해주세요')
				: setNickname(res.data.nickname);

			setUserId(res.data.loginId);
		});
	};

	useEffect(() => {
		getUserData();
	}, []);

	const { page } = useParams();
	let option = '';

	if (page === 'nickname') {
		option = '닉네임';
	} else if (page === 'password') {
		option = '비밀번호';
	} else {
		option = '직업';
	}

	const renderOpt = (opt) => {
		if (opt === 'nickname') {
			return (
				<>
					<div className="after_title">변경 {option}</div>
					<input
						type="text"
						placeholder={`수정 할 ${option}`}
						className="userInfo_input_box"
					/>
				</>
			);
		} else {
			return (
				<>
					<div className="after_title">변경 {option}</div>
					<input
						type="text"
						placeholder={`수정 할 ${option}`}
						className="userInfo_input_box"
					/>
					<div className="after_title">다시 입력</div>
					<input
						type="text"
						placeholder={'한 번 더 입력해주세요'}
						className="userInfo_input_box"
					/>
				</>
			);
		}
	};

	return (
		<>
			<Header />
			<div className="userInfo_container">
				<div className="userInfo_title_wrapper">{option} 수정</div>
				<div className="userInfo_content">
					<div className="userInfo_before_wrapper">
						<div className="before_title">현재 {option}</div>
						<div className="userInfo_box">{nickname}</div>
					</div>
					<div className="userInfo_after_wrapper">{renderOpt(page)}</div>
					<Btn text={'수정하기'} type="editConfirm" />
				</div>
				<Footer />
			</div>
		</>
	);
};

export default UserInfo;
