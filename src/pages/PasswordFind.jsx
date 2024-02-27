import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Input from "../components/Input/Input";

const PasswordFind = () => {
  let navigate = useNavigate();

  const userName = useRef();
  const userId = useRef();
  const [email, setEmail] = useState("");
  const [emailUsername, setEmailUsername] = useState("");
  const [emailDomain, setEmailDomain] = useState();
  const [isInputEnabled, setIsInputEnabled] = useState(false);

  const handleNameChange = (e) => {
    userName.current = e.target.value;
  };

  const handleIDChange = (e) => {
    userId.current = e.target.value;
  }
  console.log(userId.current);

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
    <section>
      <Title>비밀번호 찾기</Title>
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
        <div>
          <Input
            placeholder="아이디"
            width="100%"
            onChange={(e) => {
              userId.current = e.target.value;
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
          {/* <SelectEmail name="" id="" onChange={handleSelectedEmailDomain}>
                <option value="type" selected>
                  직접 입력
                </option>
                <option value="naver.com">naver.com</option>
                <option value="google.com">google.com</option>
                <option value="hanmail.net">hanmail.net</option>
                <option value="nate.com">nate.com</option>
                <option value="kakao.com">kakao.com</option>
              </SelectEmail>
               */}
          <SelectEmail value={emailDomain} onChange={handleSelectedEmailDomain}>
            <option value="type">직접 입력</option>
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
          onClick={() => {
            navigate("/password-find-result");
          }}
        >
          찾기
        </StyledButton>
        <StyledButton
          style={{ background: "#FFDADF" }}
          onClick={() => {
            navigate("/login");
          }}
        >
          취소
        </StyledButton>
      </article>
    </section>
  );
};

export default PasswordFind;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
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
