import { createContext, useState } from "react";

export const LoginContext = createContext(null);

const LoginContextProvider = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [userPwd, setUserPwd] = useState("");

  return (
    <LoginContext.Provider value={{ userId, userPwd, setUserId, setUserPwd }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
