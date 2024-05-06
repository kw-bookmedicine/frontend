import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../../styles/Login/IdFindResult.module.css"; // CSS 모듈 불러오기

const IdFindResult = () => {
  const location = useLocation();
  const { name, userId, isSuccess } = location.state || {
    name: "",
    userId: "",
    isSuccess: false,
  };
  const navigate = useNavigate();
  console.log(location.state);

  const maskStartIndex = Math.floor((userId ? userId.length : 0) / 2);
  const maskedUserId =
    userId?.substring(0, maskStartIndex) +
    "*".repeat(userId ? userId.length - maskStartIndex : 0);

  return (
    <section>
      <h1 className={styles.title}>아이디 찾기 결과</h1>
      <article>
        <div className={styles.contentTitle}>
          {name} 님의 아이디 조회 결과 입니다.
        </div>
        {isSuccess ? (
          <SuccessResult maskedUserId={maskedUserId} onNavigate={navigate} />
        ) : (
          <FailureResult onNavigate={navigate} />
        )}
      </article>
    </section>
  );
};

const SuccessResult = ({ maskedUserId, onNavigate }) => (
  <>
    <div className={styles.userIdDisplay}>아이디: {maskedUserId}</div>
    <div className={styles.resultNotification}>
      <p>아이디 찾기가 성공적으로 이루어졌습니다!</p>
      <p>오늘도 책국과 함께하는 즐거운 독서 생활 바랍니다!</p>
    </div>
    <div className={styles.buttonsContainer}>
      <button
        className={`${styles.button} ${styles.loginButton}`}
        onClick={() => onNavigate("/login")}
      >
        로그인
      </button>
      <button
        className={`${styles.button} ${styles.passwordFindButton}`}
        onClick={() => onNavigate("/password-find")}
      >
        비밀번호 찾기
      </button>
    </div>
  </>
);

const FailureResult = ({ onNavigate }) => (
  <>
    <div className={styles.resultNotification}>
      <div className={styles.userIdDisplay}>등록되지 않은 회원입니다.</div>
      <p>이름이나 이메일을 잘못 입력하셨을 수 있으니, 다시 시도해주십시오.</p>
    </div>
    <div className={styles.buttonsContainer}>
      <button
        className={`${styles.button} ${styles.idFindButton}`}
        onClick={() => onNavigate("/id-find")}
      >
        아이디 찾기
      </button>
      <button
        className={`${styles.button} ${styles.joinButton}`}
        onClick={() => onNavigate("/join")}
      >
        회원가입
      </button>
    </div>
  </>
);

export default IdFindResult;
