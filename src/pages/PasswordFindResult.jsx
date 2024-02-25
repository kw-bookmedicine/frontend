import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const PasswordFindResult = () => {
  const navigate = useNavigate();
  return (
    <section>
      <Title>비밀번호 결과</Title>
      <EmailInstruction>
        입력하신 이메일로 임시 비밀번호가 발급되었습니다.
      </EmailInstruction>
      <TemporaryPasswordNotice>
        발급받으신 임시 비밀번호로 로그인하십시오.
      </TemporaryPasswordNotice>
      <LoginButton onClick={() => navigate('/login')}>로그인</LoginButton>
    </section>
  );
};

export default PasswordFindResult;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 83px;
`;

const EmailInstruction = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const TemporaryPasswordNotice = styled.p`
margin-bottom: 36px;
`

const LoginButton = styled.button`
  width: 100%;
  height: 45px;
  font-weight: bold;
  font-size: 20px;
  border-radius: 10px;
  background-color: #c8edf2;
`;
