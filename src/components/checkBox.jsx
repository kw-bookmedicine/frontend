import React from 'react';

// STYLES
import { styled } from 'styled-components';

const checkBox = ({ children, type }) => {
	if (type === 'radio') {
		return (
			<RadioBtn>
				<input type="radio" name="agree_choice" />
				{children}
			</RadioBtn>
		);
	} else {
		return (
			<CheckBtn>
				<input type="checkbox" />
				{children}
			</CheckBtn>
		);
	}
};

export default checkBox;

const RadioBtn = styled.label`
	font-family: var(----basic-font);
	font-size: 19px;
	font-style: normal;
	font-weight: 500;
	line-height: 20px;
	display: flex;
	width: 35%;
	justify-content: flex-end;
`;

const CheckBtn = styled.label`
	font-family: var(----basic-font);
	font-size: 19px;
	font-style: normal;
	font-weight: 500;
	line-height: 22px;
`;
