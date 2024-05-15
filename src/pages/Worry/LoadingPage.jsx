import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;
`;

const LoadingBar = styled.div`
  position: relative;
  height: 20px;
  width: 0%; // 시작 시 0%로 설정
  background-color: #4caf50;
  transition: width 3s linear; // 3초 동안 폭이 늘어나는 애니메이션
`;

const PercentText = styled.div`
  margin-top: 20px;
  font-size: 24px;
  font-weight: bold;
`;

const LoadingPage = () => {
  const [percent, setPercent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let timer = setInterval(() => {
      setPercent((prevPercent) => {
        const newPercent = prevPercent + 33.333; // 3초 동안 100% 달성을 위해
        if (newPercent >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            navigate("/counseling"); // 로딩 완료 후 메인 페이지로 이동
          }, 500); // 로딩 바의 완성을 볼 수 있도록 지연
          return 100;
        }
        return newPercent;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <LoadingContainer>
      <LoadingBar style={{ width: `${percent}%` }} />
      <PercentText>{Math.round(percent)}%</PercentText>
    </LoadingContainer>
  );
};

export default LoadingPage;
