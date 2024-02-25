import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// COMPONENTS
import FindID from '../components/Signup/FindID';

// ASSETS
import banner from '../assets/Login-Banner.png';

// STYLE
import { styled } from 'styled-components';

const LoginContainer = styled.div`
	display: flex;
	height: 100vh;
	color: black;
`;

const ImageContent = styled.div`
	flex: 1;
	max-width: 50%;
	box-sizing: border-box;
	background-image: url(${banner});
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
	padding: 80px 60px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	overflow-y: auto;
`;

const FindUserInfo = () => {
	let { page } = useParams();

	return (
		<>
			<LoginContainer>
				<ImageContent></ImageContent>
				<LoginContent>
					{page === 'id' ? <FindID /> : <h1>비밀번호</h1>}
				</LoginContent>
			</LoginContainer>
		</>
	);
};

export default FindUserInfo;
