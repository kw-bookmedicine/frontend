import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm, rules } from 'react-hook-form';

// ASSETS
import banner from '../assets/Login-Banner.png';

// STYLE
import { styled } from 'styled-components';
import '../styles/Signup2.css';

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
	position: relative;
	p {
		font-family: var(--basic-font);
		font-size: 20px;
		font-weight: 300;
	}
`;

const InputWrap2 = styled.div`
	display: flex;
	position: relative;
	margin-bottom: 20px;
	p {
		font-family: var(--basic-font);
		font-size: 20px;
		font-weight: 300;
	}
`;

const ErrorMessageWrap = styled.div`
	color: red;
	margin-top: 5px;
`;

const InputDelete = styled.button`
	position: absolute; /* X 버튼을 absolute로 설정 */
	right: 27%; /* 오른쪽 여백 조절 */
	top: 50%; /* 세로 중앙 정렬을 위해 50%로 설정 */
	transform: translateY(-50%);
	background: none;
	border: none;
	font-family: var(--basic-font);
	font-size: 20px;
	cursor: pointer;
	display: ${({ showDeleteButton }) => (showDeleteButton ? 'block' : 'none')};
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
	cursor: ${({ isButtonEnabled }) =>
		isButtonEnabled ? 'pointer' : 'not-allowed'};
`;

const BirthInput = styled.div`
	width: 50%;

	input {
		font-family: var(--basic-font);
		font-size: 20px;
		margin-top: 10px;
		width: 90%;
		height: 40px;
		border: 1px solid #ccc;
		padding: 0px 10px;
	}
`;

const GenderInput = styled.div`
	width: 50%;
	p {
		margin-left: 20px;
	}
`;

const GenderWrap = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	form {
		width: 100%;
	}
	button {
		margin: 10px 20px 0px;
		/* padding: 10px 20px; */
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
`;

const HalfWidthInput = styled(Input)`
	width: 34%;
`;

const VerifyButton = styled(EmailVerifyButton)`
	width: 15%;
`;

const JobSelect = styled.select`
	margin-top: 10px;
	height: 30px;
	border: 1px solid #d9d9d9;
	border-radius: 4px;
	font-family: var(--basic-font);
	font-size: 20px;
`;

const Signup2 = () => {
	// 유저에 대한 데이터를 객체로 담기

	const {
		watch,
		control,
		setValue,
		handleSubmit,
		setError,
		clearErrors,
		formState: { errors },
	} = useForm({
		mode: 'onChange',
		defaultValues: {
			id: '',
			pwd: '',
			passwordMismatch: '',
			term: false,
		},
	});

	useEffect(() => {
		if (
			watch('password') !== watch('passwordConfirm') &&
			watch('passwordConfirm')
		) {
			setError('passwordConfirm', {
				type: 'password-mismatch',
				message: '비밀번호가 일치하지 않습니다',
			});
		} else {
			clearErrors('passwordConfirm');
		}
	}, [watch('password'), watch('passwordConfirm'), setError, clearErrors]);

	// 아이디 및 아이디 중복 확인
	const [id, setId] = useState('');
	const [isIdAvailable, setIsIdAvailable] = useState(true);

	// 비밀번호 및 비밀번호 확인, 일치 여부
	const [pwd, setPwd] = useState('');
	const [pwdConfirm, setPwdConfirm] = useState('');
	const isSame = pwd === pwdConfirm;

	// 이름인데 필요한가? 어디에 활용하는거지?
	const [name, setName] = useState('');

	// 닉네임 및 닉네임 중복 확인
	const [nickname, setNickname] = useState('');
	const [isNicknameAvailable, setIsNicknameAvailable] = useState(true);

	// 생년월일, 성별, 성별 버튼 클릭 판단
	const [birthDate, setBirthDate] = useState('');
	const [gender, setGender] = useState('');
	const [isMaleClicked, setIsMaleClicked] = useState(false);
	const [isFemaleClicked, setIsFemaleClicked] = useState(false);

	// 이메일 및 이메일 유저이름과 도메인
	const [email, setEmail] = useState('');
	const [emailUsername, setEmailUsername] = useState('');
	const [emailDomain, setEmailDomain] = useState('');
	const [isInputEnabled, setIsInputEnabled] = useState(false);

	// 모든 것을 작성해야 가입하기 버튼 클릭 활성화
	const [isButtonEnabled, setIsButtonEnabled] = useState(true);

	// 입력 이벤트
	const handleInputChange = (e) => {
		if (e.target.name === 'id') {
			setId(e.target.value);
		} else if (e.target.name === 'password') {
			setPwd(e.target.value);
		} else if (e.target.name === 'passwordConfirm') {
			setPwdConfirm(e.target.value);
		} else if (e.target.name === 'name') {
			setName(e.target.value);
		} else if (e.target.name === 'nickname') {
			setNickname(e.target.value);
		} else if (e.target.name === 'birthDate') {
			setBirthDate(e.target.value);
		} else if (e.target.name === 'gender') {
			setGender(e.target.value);
		} else if (e.target.name === 'email') {
			setEmail(e.target.value);
		}
	};

	// 입력의 X 버튼 이벤트
	const handleDeleteButtonClick = (inputType) => {
		if (inputType === 'id') {
			setId('');
		} else if (inputType === 'password') {
			setPwd('');
		} else if (inputType === 'passwordConfirm') {
			setPwdConfirm('');
		} else if (inputType === 'name') {
			setName('');
		} else if (inputType === 'nickname') {
			setNickname('');
		} else if (inputType === 'birthDate') {
			setBirthDate('');
		} else if (inputType === 'gender') {
			setGender('');
		} else if (inputType === 'email') {
			setEmail('');
		}
	};

	const handleBirthDateChange = (e) => {
		setBirthDate(e.target.value);
	};

	const handleGenderButtonClick = (gender) => {
		if (gender === 'male') {
			setIsMaleClicked(true);
			setIsFemaleClicked(false);
		} else if (gender === 'female') {
			setIsMaleClicked(false);
			setIsFemaleClicked(true);
		}
	};

	const handleEmailDirectInput = (e) => {
		const input = e.target.value;
		setEmailUsername(input);
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

	useEffect(() => {
		// setEmailDomain이 변경될 때마다 실행
		setEmail(`${emailUsername}@${emailDomain}`);
	}, [emailUsername, emailDomain]);
	console.log(emailDomain);

	return (
		<LoginContainer>
			<ImageContent></ImageContent>
			<LoginContent>
				<div className="signup2Title_wrapper">
					<Title>책국 회원가입</Title>
					<div className="signup2_step_wrapper">
						<div className="signup2_circle-1">1</div>
						<div className="signup2_circleToLine" />
						<div className="signup2_circle-2">2</div>
						<div className="signup2_circleToLine2" />
						<div className="signup2_circle-3">3</div>
					</div>
				</div>

				<InputWrap2>
					<Input
						type="text"
						name="id"
						placeholder="아이디"
						value={id}
						onChange={handleInputChange}
					/>
					<InputDelete
						showDeleteButton={id.length > 0}
						onClick={() => handleDeleteButtonClick('id')}
					>
						X
					</InputDelete>
					<VerifyButton>중복 확인</VerifyButton>
				</InputWrap2>

				<InputWrap>
					<Input
						type="password"
						name="password"
						placeholder="비밀번호"
						value={pwd}
						control={control}
						label="비밀번호"
						maxLength="15"
						onChange={handleInputChange}
					/>
					<InputDelete
						showDeleteButton={pwd.length > 0}
						onClick={() => handleDeleteButtonClick('password')}
					>
						X
					</InputDelete>
				</InputWrap>
				<InputWrap>
					<Input
						type="password"
						name="passwordConfirm"
						placeholder="비밀번호 확인"
						value={pwdConfirm}
						onChange={handleInputChange}
					/>
					<InputDelete
						showDeleteButton={pwdConfirm.length > 0}
						onClick={() => handleDeleteButtonClick('passwordConfirm')}
					>
						X
					</InputDelete>
					{pwdConfirm !== '' && !isSame && (
						<ErrorMessageWrap>비밀번호가 일치하지 않습니다.</ErrorMessageWrap>
					)}
				</InputWrap>

				<InputWrap>
					<Input
						type="text"
						name="name"
						placeholder="이름"
						value={name}
						onChange={handleInputChange}
					/>
					<InputDelete
						showDeleteButton={name.length > 0}
						onClick={() => handleDeleteButtonClick('name')}
					>
						X
					</InputDelete>
				</InputWrap>

				<InputWrap2>
					<Input
						type="text"
						name="nickname"
						placeholder="닉네임 입력"
						value={nickname}
						onChange={handleInputChange}
					/>
					<InputDelete
						showDeleteButton={nickname.length > 0}
						onClick={() => handleDeleteButtonClick('nickname')}
					>
						X
					</InputDelete>
					<VerifyButton>중복 확인</VerifyButton>
				</InputWrap2>
				<InputWrap2>
					<BirthInput>
						<p>생년월일</p>
						<input
							type="date"
							max="9999-12-31"
							value={birthDate}
							onChange={handleBirthDateChange}
						/>
					</BirthInput>
					<GenderInput>
						<p>성별</p>
						<GenderWrap>
							<form>
								<button
									type="button"
									value="male"
									onClick={() => handleGenderButtonClick('male')}
									style={{
										backgroundColor: isMaleClicked ? '#D9D9D9' : '#fff',
										color: isMaleClicked ? 'black' : '#D9D9D9',
									}}
								>
									남성
								</button>
								<button
									type="button"
									value="female"
									onClick={() => handleGenderButtonClick('female')}
									style={{
										backgroundColor: isFemaleClicked ? '#D9D9D9' : '#fff',
										color: isFemaleClicked ? 'black' : '#D9D9D9',
									}}
								>
									여성
								</button>
							</form>
						</GenderWrap>
					</GenderInput>
				</InputWrap2>

				<InputWrap2>
					<EmailWrap>
						<input
							type="text"
							placeholder="이메일 입력"
							value={emailUsername}
							onChange={handleEmailDirectInput}
						/>
						<AtSymbol>@</AtSymbol>
						<input
							type="text"
							value={emailDomain}
							onChange={handleEmailDomain}
							disabled={isInputEnabled}
						/>
						<EmailSelect name="" id="" onChange={handleSelectedEmailDomain}>
							<option value="type" selected>
								직접 입력
							</option>
							<option value="naver.com">naver.com</option>
							<option value="google.com">google.com</option>
							<option value="hanmail.net">hanmail.net</option>
							<option value="nate.com">nate.com</option>
							<option value="kakao.com">kakao.com</option>
						</EmailSelect>
					</EmailWrap>
					<EmailVerifyButton>인증하기</EmailVerifyButton>
				</InputWrap2>

				<InputWrap>
					<HalfWidthInput
						type="text"
						placeholder="인증번호 입력"
					></HalfWidthInput>
					<VerifyButton>인증</VerifyButton>
				</InputWrap>

				<InputWrap>
					<p>직업 선택</p>
					<JobSelect name="" id="">
						<option value="0" selected>
							선택 없음
						</option>
						<option value="학생">학생</option>
						<option value="직장인">직장인</option>
						<option value="전문직">전문직</option>
						<option value="자영업">자영업</option>
						<option value="프리랜서">프리랜서</option>
						<option value="무직">무직</option>
					</JobSelect>
				</InputWrap>

				<LoginButton isButtonEnabled={isButtonEnabled}>
					<Link to={'/main'}>네, 동의합니다</Link>
				</LoginButton>
			</LoginContent>
		</LoginContainer>
	);
};

export default Signup2;
