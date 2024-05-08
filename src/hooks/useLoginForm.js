import { useForm } from "react-hook-form";
import useLogin from "./useLogin";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const onSubmit = async ({ id, password }) => {
    const response = await loginUser(id, password);
    setLoginState(response);
    navigate("/main");
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    loginError,
    loginState,
  };
};
