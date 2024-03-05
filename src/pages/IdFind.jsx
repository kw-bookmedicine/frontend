import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// STYLE
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import Input from '../components/Input/Input';

const IdFind = () => {
	let navigate = useNavigate();

	// const [name, setName, handleNameChange] = useInput('');
	const userName = useRef();
	// const [email, setEmail, handleEmailChange] = useInput('');
	const email = useRef();
	const emailUsername = useRef();
	// const [emailUsername, setEmailUsername, handleEmailUsernameChange] =
  //   useInput("");
	const [emailDomain, setEmailDomain, handleEmailDomain] = useInput('');
	const [isInputEnabled, setIsInputEnabled] = useState(false);

	const handleSelectedEmailDomain = (e) => {
		const selectedDomain = e.target.value;
		if (selectedDomain !== 'custom') {
			setEmailDomain(selectedDomain);
			setIsInputEnabled(true);
		} else {
			setEmailDomain('');
			setIsInputEnabled(false);
		}
	};

	useEffect(() => {
		if (emailUsername.current && emailDomain) {
			// setEmail(`${emailUsername}@${emailDomain}`);
			email.current = `${emailUsername.current}@${emailDomain}`;
		}
	}, [emailUsername, emailDomain]);

	console.log(userName.current);

	return (
    <>
      <section>
        <Title>아이디 찾기</Title>
        <article>
          <div>
            <Input
              placeholder="이름"
              width="100%"
              onChange={(e) => {
                userName.current = e.target.value;
              }}
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
              onChange={(e) => {
                emailUsername.current = e.target.value;
              }}
            />
            <span style={{ fontSize: "24px" }}> @ </span>
            <StyledInput
              type="text"
              style={{ width: "25%" }}
              onChange={handleEmailDomain}
              disabled={isInputEnabled}
              value={emailDomain}
            />
            <SelectEmail
              value={emailDomain}
              onChange={handleSelectedEmailDomain}
            >
              <option value="custom">직접 입력</option>
              <option value="naver.com">naver.com</option>
              <option value="google.com">google.com</option>
              <option value="hanmail.net">hanmail.net</option>
              <option value="nate.com">nate.com</option>
              <option value="kakao.com">kakao.com</option>
            </SelectEmail>
          </div>
        </article>
        <article style={{ display: "flex", justifyContent: "space-between" }}>
          <StyledButton
            style={{ background: "#C8EDF2" }}
            onClick={() => navigate("/id-find-result")}
          >
            찾기
          </StyledButton>
          <StyledButton
            style={{ background: "#FFDADF" }}
            onClick={() => navigate("/login")}
          >
            취소
          </StyledButton>
        </article>
      </section>
    </>
  );
};

export default IdFind;

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
