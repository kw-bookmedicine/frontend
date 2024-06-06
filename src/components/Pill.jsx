import React from "react";
import styled from "styled-components";

const Pill = ({ text, onClick }) => {
  return (
    <KeywordPill className="user-pill" onClick={onClick}>
      #{text} &times;
    </KeywordPill>
  );
};

export default Pill;

const KeywordPill = styled.span`
  height: 30px;
  display: flex;
  align-items: center;
  /* gap: 5px; */
  margin-right: 5px;
  color: black;
  background-color: #c8edf2;
  padding: 5px 10px;
  border-radius: 16px;
  font-size: 16px;
  cursor: pointer;
`;
