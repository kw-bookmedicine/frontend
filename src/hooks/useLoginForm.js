import { useForm } from "react-hook-form";
import useLogin from "./useLogin";
import { useState } from "react";

export const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange", // 제출 시 유효성 검사 실행
  });
  const { loginUser, loginError } = useLogin();
  const [loginState, setLoginState] = useState(null);

  const onSubmit = async ({ id, password }) => {
    const response = await loginUser(id, password);
    setLoginState(response); // 예시로, 로그인 상태를 지역 상태로 관리합니다.
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    loginError,
    loginState,
  };
};
