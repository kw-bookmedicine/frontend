import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LoginFindResult = () => {
  const navigate = useNavigate();
  const name = useRef("김일일");
  const userId = useRef("qweasdzxc");
  const isSuccess = useRef(true);

  const maskStartIndex = Math.floor(userId.current.length / 2); // userId의 길이의 절반을 내림 처리하여 마스킹을 시작할 인덱스로 설정

  // 마스킹 처리된 userId 생성
  const maskedUserId =
    userId.current.substring(0, maskStartIndex) +
    "*".repeat(userId.current.length - maskStartIndex);

  return (
    <section>
      <Title>아이디 찾기 결과</Title>

      <article>
        <ContentTitle>
          {name.current} 님의 아이디 조회 결과 입니다.
        </ContentTitle>

        {isSuccess.current ? (
          <SuccessResult maskedUserId={maskedUserId} onNavigate={navigate} />
        ) : (
          <FailureResult onNavigate={navigate} />
        )}
      </article>
    </section>
  );
};

const SuccessResult = ({ maskedUserId, onNavigate }) => (
  <>
    <UserIdDisplay>아이디: {maskedUserId}</UserIdDisplay>
    <ResultNotification>
      <p>아이디 찾기가 성공적으로 이루어졌습니다!</p>
      <p>오늘도 책국과 함께하는 즐거운 독서 생활 바랍니다!</p>
    </ResultNotification>
    <ButtonsContainer>
      <LoginButton onClick={() => onNavigate("/login")}>로그인</LoginButton>
      <PasswordFindButton wide onClick={() => onNavigate("/password-find")}>
        비밀번호 찾기
      </PasswordFindButton>
    </ButtonsContainer>
  </>
);

const FailureResult = ({ onNavigate }) => (
  <>
    <ResultNotification>
      <UserIdDisplay>등록되지 않은 회원입니다.</UserIdDisplay>
      <p>이름이나 이메일을 잘못 입력하셨을 수 있으니, 다시 시도해주십시오.</p>
    </ResultNotification>
    <ButtonsContainer>
      <LoginFindButton onClick={() => onNavigate("/login-find")}>
        아이디 찾기
      </LoginFindButton>
      <JoinButton wide onClick={() => onNavigate("/join")}>
        회원가입
      </JoinButton>
    </ButtonsContainer>
  </>
);

export default LoginFindResult;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 120px;
`;

const ContentTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const UserIdDisplay = styled.div`
  border: 1px solid black;
  border-radius: 8px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  margin-bottom: 8px;
  font-weight: bold;
  color: #0b60b0;
`;

const ResultNotification = styled.div`
  margin-bottom: 20px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LoginButton = styled.button`
  width: 30%;
  height: 45px;
  font-weight: bold;
  font-size: 20px;
  border-radius: 10px;
  background-color: #c8edf2;
`;

const PasswordFindButton = styled.button`
  width: 60%;
  height: 45px;
  font-weight: bold;
  font-size: 20px;
  border-radius: 10px;
  background-color: #a4c4dd;
`;

const LoginFindButton = styled(LoginButton)``;
const JoinButton = styled(PasswordFindButton)``;
