import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// SERVICE
import api from "../../services/api";

// ASSETS
import banner from "../../assets/Login-Banner.png";

// STYLE
import { styled } from "styled-components";
import "../../styles/Signup2.css";
import FormInput from "../../components/Login/FormInput ";
import ErrorMessage from "../../components/Login/ErrorMessage";
import useSignupStore from "../../store/signup-store";

const Signup2Oauth = () => {
  // 닉네임 중복 확인
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);

  // 생년월일, 성별, 성별 버튼 클릭 판단
  const [isMaleClicked, setIsMaleClicked] = useState(false);
  const [isFemaleClicked, setIsFemaleClicked] = useState(false);

  const navigate = useNavigate();
  // 회원정보 저장
  const setUserInfo = useSignupStore((state) => state.setUserInfo);

  const {
    setValue,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (!isNicknameAvailable) {
      alert("닉네임 중복확인을 해야합니다.");
      return;
    }
    const { confirmPassword, emailUsername, ...formData } = data;
    setUserInfo(formData); // 상태에 회원 정보 저장
    navigate("/signup/3");
  };
  const nickname = watch("nickname");

  const fetchIsNicknameAvailable = async () => {
    if (!nickname) {
      alert("닉네임을 입력해 주세요.");
      return;
    }
    try {
      const res = await api.get(`/duplicate/nickname?nickname=${nickname}`, {
        withCredentials: true,
      });
      if (!res.data) {
        // false여야 중복 허용
        setIsNicknameAvailable(true);
        alert("사용 가능한 닉네임입니다.");
      } else {
        setIsNicknameAvailable(false);
        alert("이미 사용 중인 닉네임입니다.");
      }
    } catch (error) {
      console.error("닉네임 중복 요청 오류", error);
    }
  };

  // 성별 버튼 클릭 핸들러 함수
  const handleGenderButtonClick = (genderValue) => {
    setValue("gender", genderValue);
    if (genderValue === "M") {
      setIsMaleClicked(true);
      setIsFemaleClicked(false);
    } else if (genderValue === "F") {
      setIsMaleClicked(false);
      setIsFemaleClicked(true);
    }
  };

  return (
    <LoginContainer>
      <ImageContent />
      <LoginContent>
        <div className="signup2Title_wrapper">
          <Title>책국 회원가입</Title>
          <div className="signup2_step_wrapper">
            <div className="signup2_circle-1">1</div>
            <div className="signup2_circleToLine" />
            <div className="signup2_circle-2">2</div>
            <div className="signup2_circleToLine2" />
            <div className="signup2_circle-3">3</div>
          </div>
        </div>

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
          <div style={{ position: "relative" }}>
            <FormInput
              type="nickname"
              register={register}
              name="nickname"
              rules={{
                required: "닉네임을 입력해주세요",
              }}
              placeholder="닉네임 입력"
              errors={errors}
            />
            <VerifyButton type="button" onClick={fetchIsNicknameAvailable}>
              중복 확인
            </VerifyButton>
          </div>

          <InputFlexWrap>
            <div style={{ width: "75%", display: "flex" }}>
              <BirthInputWrapper>
                <OptionTitle>생년월일</OptionTitle>
                <BirthInput
                  type="date"
                  max="9999-12-31"
                  {...register("birthDate", {
                    required: "생년월일을 입력해주세요.",
                  })}
                />
                <ErrorMessage>
                  {errors.birthDate && <p>{errors.birthDate.message}</p>}
                </ErrorMessage>
              </BirthInputWrapper>
              <GenderInput>
                <OptionTitle>성별</OptionTitle>
                <div style={{ width: "100%" }}>
                  <GenderWrap>
                    <button
                      type="button"
                      value="male"
                      onClick={() => handleGenderButtonClick("M")}
                      style={{
                        backgroundColor: isMaleClicked ? "#D9D9D9" : "#fff",
                        color: isMaleClicked ? "black" : "#D9D9D9",
                      }}
                    >
                      남성
                    </button>
                    <button
                      type="button"
                      value="female"
                      onClick={() => handleGenderButtonClick("F")}
                      style={{
                        backgroundColor: isFemaleClicked ? "#D9D9D9" : "#fff",
                        color: isFemaleClicked ? "black" : "#D9D9D9",
                      }}
                    >
                      여성
                    </button>
                  </GenderWrap>
                  <ErrorMessage>
                    {errors.gender && <p>{errors.gender.message}</p>}
                  </ErrorMessage>
                </div>
              </GenderInput>
            </div>
            <input
              type="hidden"
              {...register("gender", { required: "성별을 선택해주세요." })}
            />
          </InputFlexWrap>

          <InputWrap>
            <OptionTitle>직업 선택</OptionTitle>
            <JobSelect
              name="job"
              id="occupation"
              {...register("occupation", { required: "직업을 선택해주세요." })}
              placeholder="선택 없음"
              defaultValue={""}
            >
              <option value="" disabled hidden>
                선택 없음
              </option>
              <option value="학생">학생</option>
              <option value="직장인">직장인</option>
              <option value="자영업">자영업</option>
              <option value="프리랜서">프리랜서</option>
              <option value="무직">무직</option>
            </JobSelect>
            <ErrorMessage>
              {errors.occupation && <p>{errors.occupation.message}</p>}
            </ErrorMessage>
          </InputWrap>

          <LoginButton type="submit">가입하기</LoginButton>
        </form>
      </LoginContent>
    </LoginContainer>
  );
};

export default Signup2Oauth;

const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
  color: black;
`;

const ImageContent = styled.div`
  flex: 1;
  max-width: 50%;
  box-sizing: border-box;
  background: url(${banner});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const LoginContent = styled.div`
  flex: 1;
  max-width: 50%;
  box-sizing: border-box;
  height: 100%;
  background: #fff;
  padding: 80px 90px;
  overflow-y: auto;
  /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); */
`;

const Title = styled.h1`
  font-family: var(--basic-font);
  font-size: 40px;
  font-weight: 700;
`;

const InputWrap = styled.div`
  margin-bottom: 20px;
`;

const InputFlexWrap = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 75%;
  height: 56px;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: var(--basic-font);
  font-size: 20px;
`;

const LoginButton = styled.button`
  width: 100%;
  height: 75px;
  background: #888888;
  color: #fff;
  font-family: var(--basic-font);
  font-size: 32px;
  font-weight: 400;
  padding: 10px;
  border: none;
  border-radius: 4px;
  margin-top: 10px;
`;

const BirthInputWrapper = styled.div`
  width: 60%;
`;

const BirthInput = styled.input`
  font-family: var(--basic-font);
  font-size: 20px;
  margin-top: 10px;
  width: 90%;
  height: 40px;
  border: 1px solid #ccc;
  padding: 0px 10px;
`;
const GenderInput = styled.div`
  width: 40%;
  /* margin-left: -20px; */
  p {
    margin-left: 10px;
  }
`;

const OptionTitle = styled.p`
  font-family: var(--basic-font);
  font-size: 20px;
  font-weight: 300;
`;

const GenderWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    margin: 10px 0px 0px 10px;
    font-family: var(--basic-font);
    font-size: 20px;
    border: 1px solid #d9d9d9;
    color: black;
    border-radius: 4px;
    height: 40px;
    width: 95px;
  }
`;

const VerifyButton = styled.button`
  width: 20%;
  height: 56px;
  background: #d9d9d9;
  color: black;
  font-family: var(--basic-font);
  font-size: 20px;
  /* font-weight: bold; */
  border: none;
  border-radius: 4px;
  margin-left: 25px;
  position: absolute;
  top: 0;
  right: 0%;
`;

const JobSelect = styled.select`
  margin-top: 10px;
  height: 30px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-family: var(--basic-font);
  font-size: 20px;
`;
