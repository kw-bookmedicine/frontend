import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

// SERVICE
import api from '../../services/api';

// COMPONENTS
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Btn from '../../components/Button';
import FormInput from '../../components/Login/FormInput ';
import ErrorMessage from '../../components/Login/ErrorMessage';

// STYLES
import '../../styles/Profile/UserInfo.css';

const UserInfo = () => {
	const [nickname, setNickname] = useState('');
	const [userId, setUserId] = useState('');

	const { page } = useParams();
	const [option, setOption] = useState('');
	const [pwOk, setPwOk] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [confirmMsg, setConfirmMsg] = useState('');

	// 유저 데이터 가져오기
	const getUserData = () => {
		try {
			api
				.get('/client', {
					withCredentials: true,
				})
				.then((res) => {
					res.data.nickname === null
						? setNickname('닉네임을 설정해주세요')
						: setNickname(res.data.nickname);

					setUserId(res.data.loginId);
				});
		} catch (err) {
			window.location.replace('/login');
		}
	};

	useEffect(() => {
		getUserData();
		getOption();
	}, []);

	// 옵션 지정하기
	const getOption = () => {
		if (page === 'nickname') {
			setOption('닉네임');
			// option = '닉네임';
		} else if (page === 'password') {
			setOption('비밀번호');
			// option = '비밀번호';
		}
	};

	// 닉네임 중복 확인 검사
	const nicknameDuplicate = (e) => {
		const changeNickname = document.getElementById('change-nickname').value;

		if (!changeNickname) {
			alert('변경할 닉네임을 작성해주세요.');
		} else {
			api
				.get(`/duplicate/nickname?nickname=${changeNickname}`, {
					withCredentials: true,
				})
				.then((res) => {
					// console.log(res.data);
					if (res.data === false) {
						postNickname(changeNickname);
					} else {
						alert('닉네임이 중복되었습니다!\n다시 입력해주세요.');
						document.getElementById('change-nickname').focus();
					}
				});
		}
	};

	// 닉네임 정보 수정 요청 보내기
	const postNickname = async (changeNickname) => {
		if (changeNickname !== null) {
			api
				.put(
					`/client/nickname?nickname=${changeNickname}`,
					{ nickname: changeNickname },
					{
						withCredentials: true,
					},
				)
				.then((res) => {
					if (res.data === 'success') {
						alert('닉네임이 변경되었습니다.');

						// 페이지 이동
						window.location.replace('/mypage');
					}
				});
		}
	};

	const {
		setValue,
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const password = watch('password');

	// 비밃번호 중복 확인 검사
	const passwordDuplicate = (e) => {
		const changePw = document.getElementById('change-pw').value;
		const confirmPw = document.getElementById('confirm-pw').value;

		if (!changePw || !confirmPw) {
			alert('변경할 비밀번호를 작성해주세요.');
		} else {
			const okPw = checkPw(changePw);
			console.log(okPw);
			if (okPw) {
				postPassword(changePw);
			}
		}
	};

	// 비밀번호 유효성 검사
	const checkPw = (changePw) => {
		return /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/.test(
			changePw,
		);
	};

	// 비밀번호 정보 수정 요청 보내기
	const postPassword = async (changePw) => {
		// console.log(changePw);
		if (changePw !== null) {
			api
				.put(
					'/client/password',
					{
						password: changePw,
					},
					{
						withCredentials: true,
					},
				)
				.then((res) => {
					if (res.data === 'success') {
						alert('비밀번호가 변경되었습니다.');

						// 페이지 이동
						window.location.replace('/mypage');
					}
				});
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
						<div className="userInfo_box">
							{option === '닉네임' ? nickname : null}
							{option === '비밀번호' ? userId : null}
						</div>
					</div>
					<div className="userInfo_after_wrapper">
						{option === '닉네임' ? (
							<>
								<div className="after_title">변경 {option}</div>
								<input
									type="text"
									placeholder={`수정 할 ${option}`}
									className="userInfo_input_box"
									id="change-nickname"
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											nicknameDuplicate();
										}
									}}
								/>
							</>
						) : (
							<>
								<div className="after_title">변경 {option}</div>
								<input
									type="password"
									placeholder={`수정 할 ${option}`}
									className="userInfo_input_box"
									id="change-pw"
									onChange={(e) => {
										// console.log(e.target.value);
										const check = checkPw(e.target.value);
										if (!check) {
											setErrorMsg('비밀번호가 잘못되었습니다.');
										} else {
											setErrorMsg('');
											setPwOk(true);
										}
										// console.log(check);
									}}
								/>
								<p style={{ color: 'red' }}>
									{errorMsg === '' ? null : errorMsg}
								</p>
								<div className="after_title">다시 입력</div>
								<input
									type="password"
									placeholder={'한 번 더 입력해주세요'}
									className="userInfo_input_box"
									id="confirm-pw"
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											if (
												e.target.value !==
												document.getElementById('change-pw').value
											) {
												setConfirmMsg('비밀번호가 일치하지 않습니다.');
											} else {
												setConfirmMsg('');
												passwordDuplicate();
											}
										}
									}}
									onChange={(e) => {
										if (
											e.target.value !==
											document.getElementById('change-pw').value
										) {
											setConfirmMsg('비밀번호가 일치하지 않습니다.');
										} else {
											setConfirmMsg('');
										}
									}}
								/>
								<p style={{ color: 'red' }}>
									{confirmMsg === '' ? null : confirmMsg}
								</p>
							</>
						)}
					</div>
					<button
						className="userInfo_edit_btn"
						onClick={() => {
							if (option !== '') {
								if (option === '닉네임') {
									nicknameDuplicate();
								} else {
									if (pwOk) {
										passwordDuplicate();
									}
								}
							}
						}}
					>
						수정하기
					</button>
				</div>
				<Footer />
			</div>
		</>
	);
};

export default UserInfo;
