import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

// SERVICE
import api from '../../services/api';

// ASSETS
import banner from '../../assets/Login-Banner.png';

// STYLE
import { styled } from 'styled-components';
import '../../styles/Signup2.css';
import FormInput from '../../components/Login/FormInput ';
import ErrorMessage from '../../components/Login/ErrorMessage';
import useSignupStore from '../../store/signup-store';

const Signup2 = () => {
	// 아이디 및 아이디 중복 확인
	const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);

	// 닉네임 중복 확인
	const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);

	// 이메일 중복 확인?
	const [isEmailAvailable, setIsEmailAvailable] = useState(false);

	// 생년월일, 성별, 성별 버튼 클릭 판단
	const [isMaleClicked, setIsMaleClicked] = useState(false);
	const [isFemaleClicked, setIsFemaleClicked] = useState(false);

	// 이메일 및 이메일 유저이름과 도메인
	const [emailDomain, setEmailDomain] = useState('');
	const [isInputEnabled, setIsInputEnabled] = useState(false);

	const navigate = useNavigate();
	// 회원정보 저장
	const setUserInfo = useSignupStore((state) => state.setUserInfo);

	const {
		setValue,
		register,
		handleSubmit,
		watch,
		trigger,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		if (!isUsernameAvailable) {
			alert('아이디 중복확인을 해야합니다.');
			return;
		}
		if (!isNicknameAvailable) {
			alert('닉네임 중복확인을 해야합니다.');
			return;
		}
		if (!isEmailAvailable) {
			alert('이메일 중복확인을 해야합니다.');
			return;
		}
		const { confirmPassword, emailUsername, ...formData } = data;
		setUserInfo(formData); // 상태에 회원 정보 저장
		navigate('/signup/3');
	};

	const username = watch('username');
	const nickname = watch('nickname');
	const email = watch('email');

	const fetchIsUsernameAvailable = async () => {
		if (!username) {
			alert('아이디를 입력해 주세요.');
			return;
		}
		try {
			const res = await api.get(`/duplicate/username?username=${username}`, {
				withCredentials: true,
			});
			if (!res.data) {
				// false여야 중복 허용
				setIsUsernameAvailable(true);
				alert('사용 가능한 아이디입니다.');
			} else {
				setIsUsernameAvailable(false);
				alert('이미 사용 중인 아이디입니다.');
			}
		} catch (error) {
			console.error('아이디 중복 요청 오류', error);
		}
	};

	const fetchIsNicknameAvailable = async () => {
		if (!nickname) {
			alert('닉네임을 입력해 주세요.');
			return;
		}
		try {
			const res = await api.get(`/duplicate/nickname?nickname=${nickname}`, {
				withCredentials: true,
			});
			if (!res.data) {
				// false여야 중복 허용
				setIsNicknameAvailable(true);
				alert('사용 가능한 닉네임입니다.');
			} else {
				setIsNicknameAvailable(false);
				alert('이미 사용 중인 닉네임입니다.');
			}
		} catch (error) {
			console.error('닉네임 중복 요청 오류', error);
		}
	};

	const fetchIsEmailAvailable = async () => {
		if (email === '@' || !email || !emailDomain) {
			alert('이메일을 입력해 주세요.');
			return;
		}
		try {
			const res = await api.get(`/duplicate/email?email=${email}`, {
				withCredentials: true,
			});
			if (!res.data) {
				// false여야 중복 허용
				setIsEmailAvailable(true);
				alert('사용 가능한 이메일입니다.');
			} else {
				setIsEmailAvailable(false);
				alert('이미 사용 중인 이메일입니다.');
			}
		} catch (error) {
			console.error('이메일 중복 요청 오류', error);
		}
	};

	// 성별 버튼 클릭 핸들러 함수
	const handleGenderButtonClick = (genderValue) => {
		setValue('gender', genderValue);
		if (genderValue === 'M') {
			setIsMaleClicked(true);
			setIsFemaleClicked(false);
		} else if (genderValue === 'F') {
			setIsMaleClicked(false);
			setIsFemaleClicked(true);
		}
	};

	const handleEmailDomain = (e) => {
		const input = e.target.value;
		setEmailDomain(input);
	};

	const handleSelectedEmailDomain = (e) => {
		const selectedDomain = e.target.value;
		if (selectedDomain !== 'type') {
			setEmailDomain(selectedDomain);
			setIsInputEnabled(true);
		} else {
			setEmailDomain('');
			setIsInputEnabled(false);
		}
	};

	const emailUsername = watch('emailUsername');
	const password = watch('password');

	useEffect(() => {
		// setEmailDomain이 변경될 때마다 실행
		setValue('email', `${emailUsername}@${emailDomain}`);
	}, [emailUsername, emailDomain]);

	useEffect(() => {
		if (username) {
			trigger('username');
		}
	}, [username, trigger]);
	useEffect(() => {
		if (password) {
			trigger('password');
		}
	}, [password, trigger]);

	return (
		<LoginContainer>
			<ImageContent />
			<LoginContent>
				<div className='signup2Title_wrapper'>
					<Title>책국 회원가입</Title>
					<div className='signup2_step_wrapper'>
						<div className='signup2_circle-1'>1</div>
						<div className='signup2_circleToLine' />
						<div className='signup2_circle-2'>2</div>
						<div className='signup2_circleToLine2' />
						<div className='signup2_circle-3'>3</div>
					</div>
				</div>

				<form onSubmit={handleSubmit(onSubmit)}>
					<div style={{ position: 'relative' }}>
						<FormInput
							type='text'
							name='username'
							register={register}
							rules={{
								required: '아이디를 입력해 주세요.',
								maxLength: {
									value: 12,
									message: 'ID 12글자 이하로 입력해주세요',
								},
								minLength: {
									value: 6,
									message: 'ID 6글자 이상으로 입력해주세요',
								},
							}}
							placeholder='아이디'
							errors={errors}
							onChange={() => trigger('username')}
						/>
						<VerifyButton type='button' onClick={fetchIsUsernameAvailable}>
							중복 확인
						</VerifyButton>
					</div>

					<FormInput
						type='password'
						register={register}
						name='password'
						rules={{
							required: 'Password를 입력해주세요',
							pattern: {
								value:
									/^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/,
								message:
									'비밀번호는 8자 이상이며, 영문, 숫자, 특수문자를 포함해야 합니다.',
							},
						}}
						placeholder='비밀번호'
						errors={errors}
						onChange={() => trigger('password')}
					/>

					<FormInput
						type='password'
						register={register}
						name='confirmPassword'
						rules={{
							required: '비밀번호 확인을 입력해주세요',
							validate: (value) =>
								value === password || '비밀번호가 일치하지 않습니다',
						}}
						placeholder='비밀번호 확인'
						errors={errors}
					/>

					<FormInput
						type='name'
						register={register}
						name='name'
						rules={{
							required: '이름을 입력해주세요',
						}}
						placeholder='이름'
						errors={errors}
					/>
					<div style={{ position: 'relative' }}>
						<FormInput
							type='nickname'
							register={register}
							name='nickname'
							rules={{
								required: '닉네임을 입력해주세요',
							}}
							placeholder='닉네임 입력'
							errors={errors}
						/>
						<VerifyButton type='button' onClick={fetchIsNicknameAvailable}>
							중복 확인
						</VerifyButton>
					</div>

					<InputFlexWrap>
						<div style={{ width: '75%', display: 'flex' }}>
							<BirthInputWrapper>
								<OptionTitle>생년월일</OptionTitle>
								<BirthInput
									type='date'
									max='9999-12-31'
									{...register('birth', {
										required: '생년월일을 입력해주세요.',
									})}
								/>
								<ErrorMessage>
									{errors.birth && <p>{errors.birth.message}</p>}
								</ErrorMessage>
							</BirthInputWrapper>
							<GenderInput>
								<OptionTitle>성별</OptionTitle>
								<div style={{ width: '100%' }}>
									<GenderWrap>
										<button
											type='button'
											value='male'
											onClick={() => handleGenderButtonClick('M')}
											style={{
												backgroundColor: isMaleClicked ? '#D9D9D9' : '#fff',
												color: isMaleClicked ? 'black' : '#D9D9D9',
											}}
										>
											남성
										</button>
										<button
											type='button'
											value='female'
											onClick={() => handleGenderButtonClick('F')}
											style={{
												backgroundColor: isFemaleClicked ? '#D9D9D9' : '#fff',
												color: isFemaleClicked ? 'black' : '#D9D9D9',
											}}
										>
											여성
										</button>
									</GenderWrap>
									<ErrorMessage>
										{errors.gender && <p>{errors.gender.message}</p>}
									</ErrorMessage>
								</div>
							</GenderInput>
						</div>
						<input
							type='hidden'
							{...register('gender', { required: '성별을 선택해주세요.' })}
						/>
					</InputFlexWrap>

					<InputFlexWrap>
						<div style={{ position: 'relative' }}>
							<EmailWrap>
								<input
									type='text'
									placeholder='이메일 입력'
									{...register('emailUsername', {
										required: '이메일 주소를 정확히 입력해주세요.',
									})}
								/>
								<AtSymbol>@</AtSymbol>
								<input
									type='text'
									value={emailDomain}
									onChange={handleEmailDomain}
									disabled={isInputEnabled}
								/>
								<EmailSelect
									name='emailDomain'
									id='emailDomain'
									onChange={handleSelectedEmailDomain}
									defaultValue={'type'}
								>
									<option value='type'>직접 입력</option>
									<option value='naver.com'>naver.com</option>
									<option value='gmail.com'>gmail.com</option>
									<option value='hanmail.net'>hanmail.net</option>
									<option value='nate.com'>nate.com</option>
									<option value='kakao.com'>kakao.com</option>
								</EmailSelect>
							</EmailWrap>
							<EmailVerifyButton type='button' onClick={fetchIsEmailAvailable}>
								인증하기
							</EmailVerifyButton>
							<ErrorMessage>
								{(errors.emailUsername || errors.emailDomain) && (
									<p>
										{errors.emailUsername?.message ||
											errors.emailDomain?.message}
									</p>
								)}
							</ErrorMessage>
						</div>
					</InputFlexWrap>

					<InputWrap>
						<div style={{ position: 'relative' }}>
							<HalfWidthInput
								type='text'
								placeholder='인증번호 입력'
								onInput={(event) => {
									// 숫자만 입력
									event.currentTarget.value = event.currentTarget.value.replace(
										/\D/g,
										'',
									);
								}}
							></HalfWidthInput>
							<VerifyButton type='button'>인증</VerifyButton>
						</div>
					</InputWrap>

					<InputWrap>
						<OptionTitle>직업 선택</OptionTitle>
						<JobSelect
							name='job'
							id='occupation'
							{...register('occupation', { required: '직업을 선택해주세요.' })}
							placeholder='선택 없음'
							defaultValue={''}
						>
							<option value='' disabled hidden>
								선택 없음
							</option>
							<option value='학생'>학생</option>
							<option value='직장인'>직장인</option>
							<option value='자영업자'>자영업자</option>
							<option value='프리랜서'>프리랜서</option>
							<option value='무직'>무직</option>
						</JobSelect>
						<ErrorMessage>
							{errors.occupation && <p>{errors.occupation.message}</p>}
						</ErrorMessage>
					</InputWrap>

					<LoginButton type='submit'>가입하기</LoginButton>
				</form>
			</LoginContent>
		</LoginContainer>
	);
};

export default Signup2;

const LoginContainer = styled.div`
	display: flex;
	height: 100vh;
	color: black;
`;

const ImageContent = styled.div`
	flex: 1;
	max-width: 50%;
	box-sizing: border-box;
	background: url(${banner});
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
`;

const LoginContent = styled.div`
	flex: 1;
	max-width: 50%;
	box-sizing: border-box;
	height: 100%;
	background: #fff;
	padding: 80px 90px;
	overflow-y: auto;
	/* box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); */
`;

const Title = styled.h1`
	font-family: var(--basic-font);
	font-size: 40px;
	font-weight: 700;
`;

const InputWrap = styled.div`
	margin-bottom: 20px;
`;

const InputFlexWrap = styled.div`
	display: flex;
	margin-bottom: 20px;
`;

const Input = styled.input`
	box-sizing: border-box;
	width: 75%;
	height: 56px;
	padding: 8px 12px;
	border: 1px solid #ccc;
	border-radius: 4px;
	font-family: var(--basic-font);
	font-size: 20px;
`;

const LoginButton = styled.button`
	width: 100%;
	height: 75px;
	background: #888888;
	color: #fff;
	font-family: var(--basic-font);
	font-size: 32px;
	font-weight: 400;
	padding: 10px;
	border: none;
	border-radius: 4px;
	margin-top: 10px;
`;

const BirthInputWrapper = styled.div`
	width: 60%;
`;

const BirthInput = styled.input`
	font-family: var(--basic-font);
	font-size: 20px;
	margin-top: 10px;
	width: 90%;
	height: 40px;
	border: 1px solid #ccc;
	padding: 0px 10px;
`;
const GenderInput = styled.div`
	width: 40%;
	/* margin-left: -20px; */
	p {
		margin-left: 10px;
	}
`;

const OptionTitle = styled.p`
	font-family: var(--basic-font);
	font-size: 20px;
	font-weight: 300;
`;

const GenderWrap = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	button {
		margin: 10px 0px 0px 10px;
		font-family: var(--basic-font);
		font-size: 20px;
		border: 1px solid #d9d9d9;
		color: black;
		border-radius: 4px;
		height: 40px;
		width: 95px;
	}
`;

const EmailWrap = styled.div`
	display: flex;
	align-items: center;
	width: 75%;
	input {
		width: 50%;
		height: 56px;
		border: 1px solid #d9d9d9;
		border-radius: 4px;
		font-family: var(--basic-font);
		font-size: 20px;
		padding: 10px;
		margin-right: 10px;
	}
`;

const AtSymbol = styled.p`
	width: auto;
	line-height: 56px;
	text-align: center;
	margin-right: 10px;
`;

const EmailSelect = styled.select`
	width: 50%;
	height: 56px;
	border: 1px solid #d9d9d9;
	border-radius: 4px;
	font-family: var(--basic-font);
	font-size: 20px;
	padding: 10px;
`;

const EmailVerifyButton = styled.button`
	width: 20%;
	height: 56px;
	background: #d9d9d9;
	color: black;
	font-family: var(--basic-font);
	font-size: 20px;
	/* font-weight: bold; */
	border: none;
	border-radius: 4px;
	margin-left: 25px;
	position: absolute;
	top: 0;
	right: 0%;
`;

const HalfWidthInput = styled(Input)`
	/* width: 34%; */
`;

const VerifyButton = styled(EmailVerifyButton)``;

const JobSelect = styled.select`
	margin-top: 10px;
	height: 30px;
	border: 1px solid #d9d9d9;
	border-radius: 4px;
	font-family: var(--basic-font);
	font-size: 20px;
`;
