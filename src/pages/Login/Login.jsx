import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// COMPONENTS

// ASSETS
import kakaoIcon from "../../assets/kakao-icon.jpg";
import naverIcon from "../../assets/naver-icon.jpg";
import banner from "../../assets/Login-Banner.png";

// STYLE
import { styled } from "styled-components";
import FormInput from "./../../components/Login/FormInput ";
import { useLoginForm } from "../../hooks/useLoginForm";
import ErrorMessage from "../../components/Login/ErrorMessage";
import LoginErrorModal from "../../components/Modal/LoginErrorModal";

const Login = () => {
  const {
    register,
    handleSubmit,
    errors,
    loginError,
    showErrorModal,
    setShowErrorModal,
  } = useLoginForm();

  // 나중에 상태관리 사용해서 로그인 관리하도록 하기
  // refresh에 대한 post 요청 api 추가해야할거같음
  useEffect(() => {
    localStorage.clear();
  });

  const getOauth = () => {
    console.log("oauth");
    window.open("https://api.bookpharmacy.store/oauth2/authorization/naver");
  };

  return (
    <LoginContainer>
      <ImageContent />
      <LoginContent>
        <Title>Login</Title>
        <form onSubmit={handleSubmit}>
          <FormInput
            type="text"
            register={register}
            name="username"
            rules={{
              required: "ID를 입력해주세요",
              maxLength: {
                value: 12,
                message: "ID 12글자 이하로 입력해주세요",
              },
              minLength: {
                value: 6,
                message: "ID 6글자 이상으로 입력해주세요",
              },
            }}
            placeholder="아이디"
            errors={errors}
          />
          <FormInput
            type="password"
            register={register}
            name="password"
            rules={{
              required: "Password를 입력해주세요",
              pattern: {
                value:
                  /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/,
                message:
                  "비밀번호는 8자 이상이며, 영문, 숫자, 특수문자를 포함해야 합니다.",
              },
            }}
            placeholder="비밀번호"
            errors={errors}
          />
          {loginError && (
            <LoginErrorModal
              show={showErrorModal}
              onClose={() => setShowErrorModal(false)}
            />
          )}
          <LoginButton type="submit">로그인</LoginButton>
        </form>
        <LoginSubMenu>
          <LoginSubMenuItem>
            <Link to={"/signup/1"}>회원가입</Link>
          </LoginSubMenuItem>
          <LoginSubMenuItem>
            <Link to={"/id-find"}>아이디 찾기</Link>
          </LoginSubMenuItem>
          <LoginSubMenuItem>
            <Link to={"/password-find"}>비밀번호 찾기</Link>
          </LoginSubMenuItem>
        </LoginSubMenu>
        <Or>
          <p>or</p>
        </Or>
        <SnsList>
          {/* <button>
            <img src={kakaoIcon} alt="카카오 SNS 로그인 이미지" />
          </button> */}
          <button>
            <img
              src={naverIcon}
              alt="네이버 SNS 로그인 이미지"
              onClick={getOauth}
            />
          </button>
        </SnsList>
      </LoginContent>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
  color: black;
`;

const ImageContent = styled.div`
  flex: 1;
  max-width: 50%;
  box-sizing: border-box;
  background-image: url("../../public/Login-Banner.png");
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

const LoginButton = styled.button`
  width: 100%;
  height: 74px;
  border-radius: 10px;
  background: var(--secondary-color);

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
    content: "";
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
  }

  p::before {
    content: "";
    display: block;
    position: absolute;
    height: 1px;
    width: 45%;
    top: 50%;
    left: 0;
    background-color: #a5a5a5;
  }
  p::after {
    content: "";
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
