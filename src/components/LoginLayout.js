import React from 'react';
import { Outlet } from 'react-router-dom';

// ASSETS
import banner from '../assets/Login-Banner.png';

// STYLE
import styled from 'styled-components';

const LoginLayout = () => {
	return (
		<main>
			<aside>
				<LeftContainer>
					<BannerContainer />
					{/* <StyledImg
						src="/images/login/login_bg.png"
						alt="로그인 배경 이미지"
					/> */}
				</LeftContainer>
			</aside>

			<RightContainer>
				<Wrapper>
					<Outlet />
				</Wrapper>
			</RightContainer>
		</main>
	);
};

export default LoginLayout;

const LeftContainer = styled.div`
	display: flex;
	height: 100vh;
	color: black;
	/* width: 50%;
  height: 100%;
  position: absolute;
  box-sizing: border-box; */
`;

const RightContainer = styled.div`
	width: 50%;
	height: 100%;
	position: absolute;
	right: 0;
	top: 0;
`;

const StyledImg = styled.img`
	/* width: 100%;
  height: 100%;
  object-fit: cover;
  vertical-align: top; */
`;

const BannerContainer = styled.div`
	flex: 1;
	max-width: 50%;
	box-sizing: border-box;
	background-image: url(${banner});
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
`;

const Wrapper = styled.div`
	padding: 20% 10% 0 10%;
`;
