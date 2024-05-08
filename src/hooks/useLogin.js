import { useState, useContext } from "react";
import { LoginContext } from "../contexts/LoginContextProvider";
import api from "../services/api";

export default function useLogin() {
  const [loginError, setLoginError] = useState(null);
  const { setUserId, setUserPwd } = useContext(LoginContext);

  const loginUser = async (id, password) => {
    setUserId(id);
    setUserPwd(password);
    try {
      await api.post(
        "/login",
        { username: id, password },
        { withCredentials: true }
      );
      setLoginError(false);
      return true;
    } catch (error) {
      console.error(error);
      setLoginError(true);
      return false;
    }
  };

  return { loginUser, loginError };
}
