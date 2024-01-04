import React, { useState } from "react";
import axios from "axios";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(true);

  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
  };

  const handleNicknameChange = (e) => {
    const newNickname = e.target.value;
    setNickname(newNickname);
  };

  const checkUsernameAvailability = () => {
    // POST 요청으로 아이디 중복 확인
    axios
      .post("/api/check-username", { username })
      .then((response) => {
        const isAvailable = response.data.isAvailable;
        setIsUsernameAvailable(isAvailable);
      })
      .catch((error) => {
        console.error("Error checking username:", error);
      });
  };

  const checkNicknameAvailability = () => {
    // POST 요청으로 닉네임 중복 확인
    axios
      .post("/api/check-nickname", { nickname })
      .then((response) => {
        const isAvailable = response.data.isAvailable;
        setIsNicknameAvailable(isAvailable);
      })
      .catch((error) => {
        console.error("Error checking nickname:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 등록 로직 또는 다른 처리
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={handleUsernameChange} />
        <button type="button" onClick={checkUsernameAvailability}>
          아이디 중복 확인
        </button>
        {!isUsernameAvailable && <p>이 아이디는 이미 사용 중입니다.</p>}
      </label>

      <label>
        Nickname:
        <input type="text" value={nickname} onChange={handleNicknameChange} />
        <button type="button" onClick={checkNicknameAvailability}>
          닉네임 중복 확인
        </button>
        {!isNicknameAvailable && <p>이 닉네임은 이미 사용 중입니다.</p>}
      </label>

      <button type="submit">회원 가입</button>
    </form>
  );
};

export default Registration;
