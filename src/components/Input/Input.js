import React, { useRef } from "react";
import styled from "styled-components";

const Input = ({ placeholder, width, height, onChange }) => {
  // You could use useRef here if needed, but for simplicity and to keep it generic, let's stick with onChange
  return (
    <StyledInput
      type="text"
      placeholder={placeholder}
      width={width}
      height={height}
      onChange={onChange} // Use the passed onChange prop for handling changes
    />
  );
};

// Styled component for the input
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
