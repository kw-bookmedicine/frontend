import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';

// SERVICE
import api from '../../services/api';

// COMPONENTS
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Btn from '../../components/Button';
import DropDown from '../../components/DropDown';

// STYLES
import '../../styles/Profile/Edit.css';

const Edit = () => {
	const [name, setName] = useState('');
	const [nickname, setNickname] = useState('');
	const [gender, setGender] = useState('');
	const [birth, setBirth] = useState('');
	const [email, setEmail] = useState('');
	const [userId, setUserId] = useState('');
	const [description, setDescription] = useState('');
	const [password, setPassword] = useState('');
	const [handleOauth, setHandleOauth] = useState(false);

	const getUserData = () => {
		try {
			api.get('/client', { withCredentials: true }).then((res) => {
				res.data.nickname === null
					? setNickname('닉네임을 설정해주세요')
					: setNickname(res.data.nickname);

				res.data.gender === 'M' ? setGender('남성') : setGender('여성');

				setName(res.data.name);
				setBirth(res.data.birth);
				setEmail(res.data.email);
				setUserId(res.data.loginId);
				setDescription(res.data.description);
				setHandleOauth(res.data.isOauth);
				setPassword('*'.repeat(res.data.passwordLength));
			});
		} catch (err) {
			window.location.replace('/login');
		}
	};

	// 자기소개랑 직업정보 가져오기
	const getChangeData = () => {
		const changeComment = document.getElementById('comment_inputBox').value;
		const changeJob = document.getElementById('job-box').innerText;
		try {
			api
				.put(
					'/client/info',
					{
						occupation: changeJob,
						description: changeComment,
					},
					{
						withCredentials: true,
					},
				)
				.then((res) => {
					if (res.data === 'success') {
						alert('회원정보가 변경되었습니다.');

						// 페이지 이동
						window.location.replace('/mypage');
					}
				});
		} catch (err) {
			window.location.replace('/login');
		}
	};

	useEffect(() => {
		getUserData();
	}, []);

	return (
		<>
			<Header />
			<div className='edit_container'>
				<div className='edit_title_wrapper'>
					<span className='edit_title_text'>개인정보 수정</span>
				</div>
				<div className='edit_content_wrapper'>
					<div className='edit_profile_img_wrapper'>
						<img
							className='edit_profile_img'
							src='/icon/profile/basic_profile_img.svg'
						/>
					</div>
					<div className='edit_user_info_wrapper'>
						<div className='user_nickname_wrapper'>
							<div className='input_title'>닉네임</div>
							<div className='nickname_input_wrapper'>
								<div className='nickname_text'>{nickname}</div>
								<Btn text={'수정하기'} type='nickname' />
							</div>
						</div>
						<div className='user_comment_wrapper'>
							<div className='input_title'>자기소개</div>
							<textarea
								name='userComment'
								id='comment_inputBox'
								cols='30'
								rows='10'
								placeholder={
									description !== '' ? description : '자기소개를 입력하세요'
								}
							></textarea>
						</div>
						<div className='user_id_wrapper' id='user_name_wrapper'>
							<div className='input_title'>이름</div>
							<div className='id_input_wrapper'>
								<div className='id_text'>{name}</div>
							</div>
						</div>
						<div className='user_id_wrapper'>
							<div className='input_title'>아이디</div>
							<div className='id_input_wrapper'>
								<div className='id_text'>{userId}</div>
							</div>
						</div>
						<div
							className={
								handleOauth
									? 'oauth_password_input_wrapper'
									: 'user_password_wrapper'
							}
						>
							<div className='input_title'>비밀번호</div>
							<div className={handleOauth ? '' : 'password_input_wrapper'}>
								<div
									className={
										handleOauth ? 'oauth_password_text' : 'password_text'
									}
								>
									{password}
								</div>
								{!handleOauth && <Btn text={'수정하기'} type='password' />}
							</div>
						</div>
						<div className='user_email_wrapper'>
							<div className='input_title'>이메일</div>
							<div className='email_input_wrapper'>
								<div type='text' className='email_text'>
									{email}
								</div>
							</div>
						</div>
						<div className='user_birthday_wrapper'>
							<div className='input_title'>생년월일</div>
							<div className='birthday_text'>{birth}</div>
						</div>
						<div className='user_job_wrapper'>
							<div className='input_title'>직업정보</div>
							<div className='job_input_wrapper' id='job-box'>
								<DropDown DropDownTitle={'학생'} type={'job'} />

								{/* <Btn text={'수정하기'} type="job" /> */}
							</div>
						</div>
						<div className='user_gender_wrapper'>
							<div className='input_title'>성별</div>
							<div className='gender_text'>{gender}</div>
						</div>
						<button
							id='total_submit_btn'
							onClick={() => {
								getChangeData();
								// swal('제출되었습니다!', '정보가 변경되었습니다!', 'success');
							}}
						>
							수정하기
						</button>
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
};

export default Edit;
