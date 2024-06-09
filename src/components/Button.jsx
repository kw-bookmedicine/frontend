import { Link, useNavigate } from "react-router-dom";

import styles from "../styles/Button.module.css";
import api from "../services/api";
import { useNickname } from "../hooks/useNickname";

const Button = ({ text, type }) => {
  // 페이지전환 Hook
  const navigate = useNavigate();
  // 닉네임 정보 hook
  const { revalidate } = useNickname();
  let btnType = [
    "login",
    "postLogin",
    "join",
    "logout",
    "profile_logout",
    "exp",
    "edit",
    "editConfirm",
    "rank",
    "withdraw",
    "add",
    "delete",
  ].includes(type)
    ? type
    : "default";

  let btnUrl = "";
  if (type === "nickname" || type === "password" || type === "job") {
    btnUrl = `/edit/${type}`;
    btnType = "edit2";
  } else if (type === "logout" || type === "profile_logout") {
    // localStorage.clear();
    btnUrl = "/";
  } else {
    btnUrl = `/${btnType}`;
  }

  const logout = () => {
    console.log("logout!");
    sessionStorage.clear();
    revalidate(); // 로그아웃 후 쿼리 무효화
    api.get("/logout", { withCredentials: true }).then((res) => {
      console.log(res.data);
    });
    navigate("/");
  };

  const withdraw = () => {
    let isWithdraw = window.confirm("정말로 회원탈퇴 하시나요?");
    if (isWithdraw) {
      console.log("withdraw!");
      sessionStorage.clear();
      api.delete("/client", { withCredentials: true }).then((res) => {
        console.log(res.data);
        if (res.data === "success") {
          navigate("/");
        }
      });
    }
  };

  const renderButton = (url, type) => {
    if (type === "add" || type === "delete" || type === "exp") {
      return <button className={styles[`Btn-${type}`]}>{text}</button>;
    } else {
      if (type === "logout" || type === "profile_logout") {
        return (
          <button
            onClick={() => {
              logout();
            }}
            className={styles[`Btn-${type}`]}
          >
            {text}
          </button>
        );
      } else if (type === "withdraw") {
        return (
          <button
            onClick={() => {
              withdraw();
            }}
            className={styles[`Btn-${type}`]}
          >
            {text}
          </button>
        );
      } else {
        return (
          <button className={styles[`Btn-${type}`]}>
            <Link to={url}>{text}</Link>
          </button>
        );
      }
    }
  };

  return <div className="button_wrapper">{renderButton(btnUrl, type)}</div>;
};

Button.defaultProps = {
  type: "default",
};

export default Button;
