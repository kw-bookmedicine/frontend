import React from "react";
import { useNavigate } from "react-router-dom";

// STYLE
import styled from "styled-components";
import FormInput from "../../components/Login/FormInput ";
import { FormProvider, useForm } from "react-hook-form";
import FormEmail from "../../components/Login/FormEmail";
import api from "../../services/api";

const IdFind = () => {
  let navigate = useNavigate();

  const methods = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    const { name, emailUsername, emailDomainInput } = data;
    const email = `${emailUsername}@${emailDomainInput}`;
    const formData = {
      name,
      email,
    };

    console.log(formData);

    try {
      // API 요청을 보냅니다. 여기서는 URL을 예시로 사용하였습니다.
      const response = await api.post("/id-find", formData);

      // API 응답을 처리합니다.
      if (response.data.isSuccess) {
        // 성공적으로 아이디를 찾았을 경우
        navigate("/id-find-result", {
          state: { ...response.data, isSuccess: true },
        });
        // navigate("/id-find-result", { state: { name, userId, isSuccess: true } });
      } else {
        // 아이디를 찾지 못했을 경우
        navigate("/id-find-result", { state: { isSuccess: false } });
      }
    } catch (error) {
      console.error("ID 찾기 요청 실패:", error);
      // 에러 처리를 여기서 합니다.
      navigate("/id-find-result", { state: { isSuccess: false } });
    }
  };

  return (
    <FormProvider {...methods}>
      <section>
        <Title>아이디 찾기</Title>
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

export default IdFind;

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
