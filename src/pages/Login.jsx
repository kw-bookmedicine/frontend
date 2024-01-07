import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import kakaoIcon from "../assets/kakao-icon.jpg";
import naverIcon from "../assets/naver-icon.jpg";

const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
  color: black;
`;

const ImageContent = styled.div`
  flex: 1;
  max-width: 50%;
  box-sizing: border-box;
  background-image: url("https://d3udu241ivsax2.cloudfront.net/v3/images/login/promotion_intro_bg.ac5237a5bed49b864cccee5224a464e4.jpg");
  background-image: url("https://www.flybook.kr/FlyBookSitePublishing/assets/img/main/top-banner.jpg");
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
  position: absolute; /* X 버튼을 absolute로 설정 */
  right: 20px; /* 오른쪽 여백 조절 */
  top: 50%; /* 세로 중앙 정렬을 위해 50%로 설정 */
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  display: ${({ showDeleteButton }) => (showDeleteButton ? "block" : "none")};
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 75px;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 20px;
`;

const LoginButton = styled.button`
  width: 100%;
  height: 75px;
  background: #888888;
  color: #fff;
  font-size: large;
  font-weight: bold;
  padding: 10px;
  border: none;
  border-radius: 4px;
  margin-top: 10px;
  cursor: pointer;
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
    background-color: white;
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

  button {
    padding: 0;
    margin: 0px 10px;
  }
`;

export default function Login() {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [notAllow, setNotAllow] = useState(true);

  const [idValid, setIdValid] = useState(false);
  const [pwdValid, setPwdValid] = useState(false);

  const handleInputChange = (e) => {
    if (e.target.name === "id") {
      setId(e.target.value);
      if (id.length > 5) {
        setIdValid(true);
      }
    }

    if (e.target.name === "password") {
      setPwd(e.target.value);
      const regex =
        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
      if (regex.test(e.target.value)) {
        setPwdValid(true);
      } else {
        setPwdValid(false);
      }
    }
  };

  const handleDeleteButtonClick = (inputType) => {
    if (inputType === "Id") {
      setId("");
    } else if (inputType === "password") {
      setPwd("");
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
      <ImageContent></ImageContent>
      <LoginContent>
        <Title>Login</Title>

        <InputWrap>
          <Input
            type="text"
            name="id"
            placeholder="아이디 입력"
            value={id}
            onChange={handleInputChange}
          />
          <InputDelete
            showDeleteButton={id.length > 0}
            onClick={() => handleDeleteButtonClick("Id")}
          >
            X
          </InputDelete>
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
            placeholder="비밀번호 입력"
            value={pwd}
            onChange={handleInputChange}
          />
          <InputDelete
            showDeleteButton={pwd.length > 0}
            onClick={() => handleDeleteButtonClick("password")}
          >
            X
          </InputDelete>
        </InputWrap>
        <ErrorMessageWrap>
          {!pwdValid && pwd.length > 0 && (
            <div>
              <p>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</p>
            </div>
          )}
        </ErrorMessageWrap>

        <LoginButton disabled={notAllow}>로그인</LoginButton>
        <LoginSubMenu>
          <LoginSubMenuItem>
            <Link to={"/"}>회원가입</Link>
          </LoginSubMenuItem>

          <LoginSubMenuItem>
            <Link to={"/"}>비밀번호 찾기</Link>
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
