import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <h1>
        <Link to={"/login"}>로그인 페이지 이동</Link>
      </h1>
      <Link to={"/join2"}>회원가입 2 페이지 이동</Link>
      <Link to={"/test"}>중복확인</Link>
    </>
  );
}
