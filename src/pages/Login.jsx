import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// COMPONENTS
import Btn from '../components/Button';

// ASSETS
import kakaoIcon from '../assets/kakao-icon.jpg';
import naverIcon from '../assets/naver-icon.jpg';
import banner from '../assets/Login-Banner.png';

// STYLE
import { styled } from 'styled-components';
import { login } from '../services/login';

export default function Login() {
	const [id, setId] = useState('');
	const [pwd, setPwd] = useState('');
	const router = useNavigate();
	const [notAllow, setNotAllow] = useState(true);

	const [idValid, setIdValid] = useState(false);
	const [pwdValid, setPwdValid] = useState(false);

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		if (name === 'id') {
			setId(value);
			if (value.length >= 1) {
				setIdValid(true);
			} else {
				setIdValid(false);
			}
		}

		if (name === 'password') {
			setPwd(value);
			const regex =
				/^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
			if (regex.test(value)) {
				setPwdValid(true);
			} else {
				setPwdValid(false);
			}
		}
	};

	const handleDeleteButtonClick = (inputType) => {
		if (inputType === 'Id') {
			setId('');
			setIdValid(false);
		} else if (inputType === 'password') {
			setPwd('');
			setPwdValid(false);
		}
	};

	// 로그인 요청, login
	// useEffect(() => {
	//   const postFetch = async () => {
	//     try {
	//       localStorage.clear();
	//       const result = await login(id, pwd);
	//       console.log("result.data", result.data);
	//       const token = result.headers.authorization;
	//       // console.log(token);
	//       localStorage.setItem("token", token); // 전체 토큰 저장
	//       localStorage.setItem("accessToken", token.split(" ")[1]); // 액세스 토큰 저장
	//       localStorage.setItem("refreshToken", token.split(" ")[2]); // 리프레시 토큰 저장
	//       // router('/main'); // 메인 페이지로 이동
	//     } catch (error) {
	//       console.error("로그인 요청 실패", error);
	//     }
	//   };
	//   postFetch();
	// }, []);

	// hello 요청
	// useEffect(() => {
	//   const token = localStorage.getItem("token"); // 로컬 스토리지에서 전체 토큰 추출
	//   const accessToken = localStorage.getItem("accessToken"); // 필요한 경우 액세스 토큰만 따로 추출

	//   if (token) {
	//     // 토큰이 존재할 경우에만 GET 요청 수행
	//     const getFetch = async () => {
	//       try {
	//         const result = await axios.get(
	//           "https://port-0-backend-book-pharmacy-umnqdut2blqqhv7sd.sel5.cloudtype.app/hello",
	//           {
	//             headers: {
	//               // Authorization: `Bearer ${accessToken}`, // 'Bearer ' 접두어 추가하여 액세스 토큰 설정
	//               Authorization: token,
	//             },
	//             withCredentials: true, // 쿠키를 이용한 인증
	//           }
	//         );
	//         console.log(result);
	//       } catch(error) {
	//         console.error("로그인 요청 실패", error);
	//       }
	//     };
	//     getFetch();
	//   }
	// }, []);

	// 나중에 상태관리 사용해서 로그인 관리하도록 하기
	// refresh에 대한 post 요청 api 추가해야할거같음
	useEffect(() => {
		localStorage.clear();
	});

	const loginData = { username: id, password: pwd };

	const postLogin = async () => {
		// console.log('아이디:', id, '비번:', pwd);
		if (id.length > 0 && pwd.length > 0) {
			localStorage.setItem('id', id);
			localStorage.setItem('password', pwd);
			axios
				.post(
					'https://port-0-backend-book-pharmacy-umnqdut2blqqhv7sd.sel5.cloudtype.app/login',
					loginData,
				)
				.then((res) => {
					let token = res.headers.authorization;
					// localStorage.setItem('token', token); // 전체 토큰 저장
					localStorage.setItem('accessToken', 'Bearer ' + token.split(' ')[1]); // 액세스 토큰 저장
					localStorage.setItem('refreshToken', 'Bearer ' + token.split(' ')[2]); // 리프레시 토큰 저장

					// 받아온 token을 암호화 하는 방식에 대해 고민 필요함.

					window.location.replace('/main');
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	useEffect(() => {
		if (idValid && pwdValid) {
			setNotAllow(false);
			return;
		}
		setNotAllow(true);
	}, [idValid, pwdValid]);

	return (
		<LoginContainer>
			<ImageContent />
			<LoginContent>
				<Title>Login</Title>

				<InputWrap>
					<Input
						type="text"
						name="id"
						placeholder="아이디"
						value={id}
						onChange={handleInputChange}
					/>
					{id.length > 0 && (
						<InputDelete onClick={() => handleDeleteButtonClick('Id')}>
							X
						</InputDelete>
					)}
				</InputWrap>
				<ErrorMessageWrap>
					{!idValid && id.length > 0 && (
						<div>
							<p>4글자 이상 입력해주세요.</p>
						</div>
					)}
				</ErrorMessageWrap>

				<InputWrap>
					<Input
						type="password"
						name="password"
						placeholder="비밀번호"
						value={pwd}
						onChange={handleInputChange}
					/>
					{pwd.length > 0 && (
						<InputDelete onClick={() => handleDeleteButtonClick('password')}>
							X
						</InputDelete>
					)}
				</InputWrap>
				<ErrorMessageWrap>
					{!pwdValid && pwd.length > 0 && (
						<div>
							<p>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</p>
						</div>
					)}
				</ErrorMessageWrap>

				{/* <LoginButton disabled={notAllow}>로그인</LoginButton> */}

				<LoginButton
					onClick={() => {
						postLogin();
					}}
				>
					로그인
				</LoginButton>
				<LoginSubMenu>
					<LoginSubMenuItem>
						<Link to={'/signup'}>회원가입</Link>
					</LoginSubMenuItem>
					<LoginSubMenuItem>
						<Link to={'/id-find'}>아이디 찾기</Link>
					</LoginSubMenuItem>
					<LoginSubMenuItem>
						<Link to={'/password-find'}>비밀번호 찾기</Link>
					</LoginSubMenuItem>
				</LoginSubMenu>
				<Or>
					<p>or</p>
				</Or>
				<SnsList>
					<button>
						<img src={kakaoIcon} alt="" />
					</button>
					<button>
						<img src={naverIcon} alt="" />
					</button>
				</SnsList>
			</LoginContent>
		</LoginContainer>
	);
}

const LoginContainer = styled.div`
	display: flex;
	height: 100vh;
	color: black;
`;

const ImageContent = styled.div`
	flex: 1;
	max-width: 50%;
	box-sizing: border-box;
	/* background-image: url('https://d3udu241ivsax2.cloudfront.net/v3/images/login/promotion_intro_bg.ac5237a5bed49b864cccee5224a464e4.jpg'); */
	/* background-image: url('https://www.flybook.kr/FlyBookSitePublishing/assets/img/main/top-banner.jpg'); */
	background-image: url('../../public/Login-Banner.png');
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
	padding: 128px 60px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	overflow-y: auto;
`;

const Title = styled.h1`
	font-size: 60px;
	font-weight: 700;
	margin-bottom: 60px;
`;

const InputWrap = styled.div`
	margin-bottom: 15px;
	position: relative;
`;

const ErrorMessageWrap = styled.div`
	color: red;
	font-weight: bold;
	margin-bottom: 10px;
	p {
		font-size: 16px;
	}
`;

const InputDelete = styled.button`
	position: absolute;
	right: 20px;
	top: 50%;
	transform: translateY(-50%);
	background: none;
	border: none;
	font-size: 20px;
	cursor: pointer;
`;

const Input = styled.input`
	box-sizing: border-box;
	width: 100%;
	height: 75px;
	padding: 10px 12px;
	border: 1px solid #000;
	border-radius: 4px;
	font-family: var(--basic-font);
	font-size: 20px;
`;

// const LoginButton = styled.button`
// 	width: 100%;
// 	height: 75px;
// 	background: #888888;
// 	color: #fff;
// 	font-size: large;
// 	font-weight: bold;
// 	padding: 10px;
// 	border: none;
// 	border-radius: 4px;
// 	margin-top: 10px;
// 	cursor: pointer;
// `;

const LoginButton = styled.button`
	width: 100%;
	height: 74px;
	border-radius: 10px;
	background: #c8edf2;

	/* Font */
	font-family: var(--basic-font);
	font-style: normal;
	font-weight: 600;
	font-size: 32px;
	line-height: 38px;
	color: #525252;

	&:hover {
		cursor: pointer;
	}
`;

const LoginSubMenu = styled.ul`
	list-style: none;
	display: flex;
	justify-content: center;
	margin: 20px;
`;

const LoginSubMenuItem = styled.li`
	a {
		color: #818181;
		font-size: 20px;
		font-weight: 400;
		position: relative;
		margin: 0px 8px;
	}

	&:not(:last-child) a::after {
		content: '';
		height: 20px;
		width: 1px;
		background-color: #8b8b8b;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: -8px; /* 위 a 마진만큼 - */
	}
`;

const Or = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	color: #a5a5a5;
	margin-bottom: 20px;
	position: relative;

	p {
		text-align: center;
		font-size: 13px;
		word-break: keep-all;
		padding: 0px 24px;
		background-color: white;
	}
	p::before {
		content: '';
		display: block;
		position: absolute;
		height: 1px;
		width: 45%;
		top: 50%;
		left: 0;
		background-color: #a5a5a5;
	}
	p::after {
		content: '';
		display: block;
		position: absolute;
		height: 1px;
		width: 45%;
		top: 50%;
		right: 0;
		background-color: #a5a5a5;
	}
`;

const SnsList = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 50px;

	button {
		padding: 0;
		margin: 0px 10px;
		height: 100%;
	}

	img {
		width: 50px;
		height: 100%;
	}
`;
