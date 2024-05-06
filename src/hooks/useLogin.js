import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContextProvider";
import api from "../services/api";

export default function useLogin() {
  const [loginError, setLoginError] = useState(false);
  const { setUserId, setUserPwd } = useContext(LoginContext);
  const navigate = useNavigate();

  const loginUser = async (id, password) => {
    setUserId(id);
    setUserPwd(password);
    try {
      await api.post(
        "/login",
        { username: id, password },
        { withCredentials: true }
      );
      navigate("/main");
    } catch (error) {
      console.error(error);
      setLoginError(true);
    }
  };

  return { loginUser, loginError };
}
