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
  const navigate = useNavigate();
  const [showErrorModal, setShowErrorModal] = useState(false);

  const onSubmit = async ({ username, password }) => {
    const response = await loginUser(username, password);
    if (response) {
      setShowErrorModal(false);
      navigate("/main");
    } else {
      setShowErrorModal(true);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    loginError,
    showErrorModal,
    setShowErrorModal,
  };
};
