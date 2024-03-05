import React, { useRef } from "react";
import styled from "styled-components";

const Input = ({ placeholder, width, height, onChange }) => {
  return (
    <StyledInput
      type="text"
      placeholder={placeholder}
      width={width}
      height={height}
      onChange={onChange} 
    />
  );
};

const StyledInput = styled.input`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "60px"};
  font-size: 1.2rem;
  padding-left: 10px;
  margin-bottom: 32px;
  border: 1px solid #707070;
  border-radius: 10px;
`;

export default Input;
