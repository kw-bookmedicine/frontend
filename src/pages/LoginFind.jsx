import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom';

const LoginFind = () => {
   let navigate = useNavigate();

  const [name, setName] = useState();
  const [email, setEmail] = useState("");
  const [emailUsername, setEmailUsername] = useState("");
  const [emailDomain, setEmailDomain] = useState();
  const [isInputEnabled, setIsInputEnabled] = useState(false);

  const handleMoveLoginPage = () => {
    navigate('/login');
  }

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmailUsername(e.target.value);
  };

  const handleEmailDomain = (e) => {
    setEmailDomain(e.target.value);
  };

  const handleSelectedEmailDomain = (e) => {
    const selectedDomain = e.target.value;
    if (selectedDomain !== "type") {
      setEmailDomain(selectedDomain);
      setIsInputEnabled(true);
    } else {
      setEmailDomain("");
      setIsInputEnabled(false);
    }
  };

  useEffect(() => {
    if (emailUsername && emailDomain) {
      setEmail(`${emailUsername}@${emailDomain}`);
    }
  }, [emailUsername, emailDomain]);


  // console.log(name);
  console.log(email);

  return (
    <main>
      <LeftContainer>
        <StyledImg src="/images/login/login_bg.png" alt="로그인 배경 이미지" />
      </LeftContainer>
      <RightContainer>
        <Wrapper>
          <section>
            <Title>아이디 찾기</Title>
          </section>
          <section>
            <div>
              <StyledInput
                type="text"
                placeholder="이름"
                style={{ width: "100%" }}
                onChange={handleNameChange}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <StyledInput
                type="email"
                name="email"
                id=""
                placeholder="이메일"
                style={{ width: "40%" }}
                onChange={handleEmailChange}
              />
              <span style={{ fontSize: "24px" }}> @ </span>
              <StyledInput
                type="text"
                style={{ width: "25%" }}
                onChange={handleEmailDomain}
                disabled={isInputEnabled}
                value={emailDomain}
              />
              <SelectEmail name="" id="" onChange={handleSelectedEmailDomain}>
                <option value="type" selected>
                  직접 입력
                </option>
                <option value="naver.com">naver.com</option>
                <option value="google.com">google.com</option>
                <option value="hanmail.net">hanmail.net</option>
                <option value="nate.com">nate.com</option>
                <option value="kakao.com">kakao.com</option>
              </SelectEmail>
            </div>
          </section>
          <section style={{ display: "flex", justifyContent: "space-between" }}>
            <StyledButton style={{ background: "#C8EDF2" }}>찾기</StyledButton>
            <StyledButton style={{ background: "#FFDADF" }} onClick={handleMoveLoginPage}>취소</StyledButton>
          </section>
        </Wrapper>
      </RightContainer>
    </main>
  );
};

export default LoginFind;

const LeftContainer = styled.div`
  width: 50%;
  height: 100%;
  /* background-color: red; */
  position: absolute;
  box-sizing: border-box;
`;

const RightContainer = styled.div`
  width: 50%;
  height: 100%;
  /* background-color: blue; */
  position: absolute;
  right: 0;
  top: 0;
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  vertical-align: top;
`;

const Wrapper = styled.div`
  padding: 20% 10%;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  /* font-family: Pretendard; */
  margin-bottom: 83px;
`;

const StyledInput = styled.input`
  height: 60px;
  font-size: 1.2rem;
  padding-left: 10px;
  margin-bottom: 32px;
  border: 1px solid #707070;
  border-radius: 10px;
`;

const SelectEmail = styled.select`
  width: 26%;
  height: 60px;
  font-size: 1.2rem;
  padding-left: 10px;
  margin-bottom: 32px;
  border: 1px solid #707070;
  border-radius: 10px;
`;

const StyledButton = styled.button`
  width: 48%;
  font-weight: bold;
  font-size: 20px;
  border-radius: 10px;
  height: 45px;
`;
