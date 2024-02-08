import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// COMPONENTS
import Header from '../components/Header';
import Footer from '../components/Footer';
import Btn from '../components/Button';

// STYLES
import '../styles/UserInfo.css';

const UserInfo = () => {
	const [pageName, setPageName] = useState('');
	const { page } = useParams();
	let option = '';
	useEffect(() => {
		setPageName({ page });
	});

	if (page === 'nickname') {
		option = '닉네임';
	} else if (page === 'password') {
		option = '비밀번호';
	} else {
		option = '직업';
	}

	if (page === 'nickname' || page === 'password') {
		return (
			<>
				<Header />
				<div className="userInfo_container">
					<div className="userInfo_title_wrapper">{option} 수정</div>
					<div className="userInfo_content">
						<div className="userInfo_before_wrapper">
							<div className="before_title">현재 {option}</div>
							<div className="userInfo_box">꿈꾸는 소나무</div>
						</div>
						<div className="userInfo_after_wrapper">
							<div className="after_title">변경 {option}</div>
							<input
								type="text"
								placeholder={`수정 할 ${option}`}
								className="userInfo_input_box"
							/>
						</div>
						<Btn text={'수정하기'} type="editConfirm" />
					</div>
					<Footer />
				</div>
			</>
		);
	} else {
		return (
			<>
				<Header />
				<div className="userInfo_container">
					<div className="userInfo_title_wrapper">{option} 수정</div>
					<div className="userInfo_content">
						<div className="userInfo_before_wrapper">
							<div className="before_title">현재 {option}</div>
							<div className="userInfo_box">꿈꾸는 소나무</div>
						</div>
						<div className="userInfo_after_wrapper">
							<div className="after_title">변경 {option}</div>
							<div className="userInfo_job_menu">직업</div>
						</div>
						<Btn text={'수정하기'} type="editConfirm" />
					</div>
					<Footer />
				</div>
			</>
		);
	}

	const conditionRender = ({ option }) => {
		if (option === '직업') {
			return <div className="userInfo_job_menu"></div>;
		} else {
			return (
				<input
					type="text"
					placeholder={`수정 할 ${option}`}
					className="userInfo_input_box"
				/>
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
						<div className="userInfo_box">꿈꾸는 소나무</div>
					</div>
					<div className="userInfo_after_wrapper">
						<div className="after_title">변경 {option}</div>
						<conditionRender option={option} />
						{/* <input
							type="text"
							placeholder={`수정 할 ${option}`}
							className="userInfo_input_box"
						/> */}
					</div>
					<Btn text={'수정하기'} type="editConfirm" />
				</div>
				<Footer />
			</div>
		</>
	);
};

export default UserInfo;
