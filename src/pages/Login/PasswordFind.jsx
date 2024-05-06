import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Input from "../../components/Input/Input";
import FormInput from "../../components/Login/FormInput ";
import FormEmail from "../../components/Login/FormEmail";
import { FormProvider, useForm } from "react-hook-form";
import api from "../../services/api";

const PasswordFind = () => {
  let navigate = useNavigate();

  const methods = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    const { name, username, emailUsername, emailDomainInput } = data;
    const email = `${emailUsername}@${emailDomainInput}`;
    const formData = {
      name,
      username,
      email,
    };

    console.log(formData);

    try {
      // API 요청을 보냅니다. 여기서는 URL을 예시로 사용하였습니다.
      const response = await api.post("/password-find", formData);

      // API 응답을 처리합니다.
      if (response.data.isSuccess) {
        navigate("/id-find-result");
      } else {
        alert("요청한 정보를 찾을 수 없습니다. 입력하신 정보를 확인해 주세요.");
      }
    } catch (error) {
      console.error("요청 실패:", error);
      alert("요청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }
  };

  return (
    <FormProvider {...methods}>
      <section>
        <Title>비밀번호 찾기</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            type="name"
            register={register}
            name="name"
            rules={{
              required: "이름을 입력해주세요",
            }}
            placeholder="이름"
            errors={errors}
          />
          <FormInput
            type="text"
            register={register}
            name="username"
            rules={{
              required: "ID를 입력해주세요",
              maxLength: {
                value: 12,
                message: "ID 12글자 이하로 입력해주세요",
              },
              minLength: {
                value: 6,
                message: "ID 6글자 이상으로 입력해주세요",
              },
            }}
            placeholder="아이디"
            errors={errors}
          />
          <FormEmail />
          <article style={{ display: "flex", justifyContent: "space-between" }}>
            <StyledButton style={{ background: "#C8EDF2" }} type="submit">
              찾기
            </StyledButton>
            <StyledButton
              style={{ background: "#FFDADF" }}
              onClick={() => navigate("/login")}
              type="button"
            >
              취소
            </StyledButton>
          </article>
        </form>
      </section>
    </FormProvider>
  );
};

export default PasswordFind;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 83px;
`;

const StyledButton = styled.button`
  width: 48%;
  font-weight: bold;
  font-size: 20px;
  border-radius: 10px;
  height: 45px;
`;
