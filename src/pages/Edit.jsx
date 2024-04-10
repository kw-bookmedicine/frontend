import React from 'react';

// COMPONENTS
import Header from '../components/Header';
import Footer from '../components/Footer';
import Btn from '../components/Button';
import DropDown from '../components/DropDown';

// STYLES
import '../styles/Edit.css';

const Edit = () => {
	return (
		<>
			<Header />
			<div className="edit_container">
				<div className="edit_title_wrapper">
					<span className="edit_title_text">개인정보 수정</span>
				</div>
				<div className="edit_content_wrapper">
					<div className="edit_profile_img_wrapper">
						<div className="edit_profile_img"></div>
					</div>
					<div className="edit_user_info_wrapper">
						<div className="user_nickname_wrapper">
							<div className="input_title">닉네임</div>
							<div className="nickname_input_wrapper">
								<div className="nickname_text">꿈꾸는 소나무</div>
								<Btn text={'수정하기'} type="nickname" />
							</div>
						</div>
						<div className="user_id_wrapper">
							<div className="input_title">아이디</div>
							<div className="id_input_wrapper">
								<div className="id_text">askdjfkjeio</div>
							</div>
						</div>
						<div className="user_password_wrapper">
							<div className="input_title">비밀번호</div>
							<div className="password_input_wrapper">
								<div className="password_text">********</div>
								<Btn text={'수정하기'} type="password" />
							</div>
						</div>
						<div className="user_email_wrapper">
							<div className="input_title">이메일</div>
							<div className="email_input_wrapper">
								<div type="text" className="email_text">
									akdsjfkja@akdsfjl.com
								</div>
							</div>
						</div>
						<div className="user_birthday_wrapper">
							<div className="input_title">생년월일</div>
							<div className="birthday_text">2024-01-29</div>
						</div>
						<div className="user_job_wrapper">
							<div className="input_title">직업정보</div>
							<div className="job_input_wrapper">
								<DropDown DropDownTitle={'학생'} />

								{/* <Btn text={'수정하기'} type="job" /> */}
								<button id="job_submit_btn">수정하기</button>
							</div>
						</div>
						<div className="user_gender_wrapper">
							<div className="input_title">성별</div>
							<div className="gender_text">여성</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
};

export default Edit;
