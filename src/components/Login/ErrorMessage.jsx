import styled from "styled-components";

const ErrorMessage = ({ children }) => (
  <ErrorMessageWrap>{children}</ErrorMessageWrap>
);

const ErrorMessageWrap = styled.div`
  color: red;
  margin-top: 4px;
  margin-bottom: 10px;
  p {
    font-size: 16px;
  }
`;

export default ErrorMessage;
