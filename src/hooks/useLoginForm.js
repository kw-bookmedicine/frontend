import { useForm } from "react-hook-form";
import useLogin from "./useLogin";
import { useEffect, useRef, useState } from "react";

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
  const isMounted = useRef(true); // 컴포넌트가 마운트되었는지 확인하기 위한 ref

  useEffect(() => {
    return () => {
      isMounted.current = false; // 컴포넌트가 언마운트되면 false로 설정
    };
  }, []);

  const onSubmit = async ({ id, password }) => {
    const response = await loginUser(id, password);
    // 예시로, 로그인 상태를 지역 상태로 관리합니다.
    if (isMounted.current) {
      // 컴포넌트가 마운트된 상태라면 상태 업데이트
      setLoginState(response);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    loginError,
    loginState,
  };
};
