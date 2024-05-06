import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import FormInput from "./FormInput ";
import styles from "../../styles/Login/FormEmail.module.css";
import ErrorMessage from "./ErrorMessage";

const FormEmail = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const selectedDomain = watch("emailDomainSelect");

  useEffect(() => {
    if (selectedDomain !== "custom") {
      setValue("emailDomainInput", selectedDomain, { shouldValidate: true });
    } else {
      setValue("emailDomainInput", "", { shouldValidate: false }); // '직접 입력' 선택 시 입력 필드를 비움
    }
  }, [selectedDomain, setValue]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <FormInput
          type="text"
          name="emailUsername"
          placeholder="이메일"
          register={register}
          rules={{ required: "이메일 사용자 이름은 필수입니다." }}
          errors={errors}
        />
        <span style={{ fontSize: "24px" }}> @ </span>
        <div>
          <div className={`${styles["email-domain-container"]}`}>
            <input
              type="text"
              className={`${styles["email-domain-input"]}`}
              {...register("emailDomainInput", {
                required:
                  selectedDomain === "custom" && "도메인을 입력해주세요.", // '직접 입력' 선택 시 필수
              })}
              disabled={selectedDomain !== "custom"}
            />

            <select
              className={`${styles["email-domain-select"]}`}
              {...register("emailDomainSelect")}
            >
              <option value="custom">직접 입력</option>
              <option value="naver.com">naver.com</option>
              <option value="google.com">google.com</option>
              <option value="hanmail.net">hanmail.net</option>
              <option value="nate.com">nate.com</option>
              <option value="kakao.com">kakao.com</option>
            </select>
          </div>
          <ErrorMessage>
            {errors.emailDomainInput && (
              <p>{errors.emailDomainInput.message}</p>
            )}
          </ErrorMessage>
        </div>
      </div>
    </>
  );
};

export default FormEmail;
