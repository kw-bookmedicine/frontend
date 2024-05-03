import styled from "styled-components";
import ErrorMessage from "./ErrorMessage";

const FormInput = ({
  type = "text",
  register,
  name,
  rules,
  placeholder,
  errors,
}) => (
  <InputWrap>
    <Input type={type} {...register(name, rules)} placeholder={placeholder} />
    {errors[name] && <ErrorMessage>{errors[name].message}</ErrorMessage>}
  </InputWrap>
);

export default FormInput;

const InputWrap = styled.div`
  margin-bottom: 15px;
  position: relative;
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 75px;
  padding: 10px 12px;
  border: 1px solid #000;
  border-radius: 4px;
  font-family: var(--basic-font);
  font-size: 20px;
`;
