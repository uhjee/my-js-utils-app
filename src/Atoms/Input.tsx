import React, { FC } from 'react';
import styled from 'styled-components';

const InputContainer = styled.input`
  width: 100%;
`;

interface IProps {
  onChange: React.FocusEventHandler<HTMLInputElement>;
}

const Input: FC<IProps> = ({ onChange }) => {
  return <InputContainer onBlur={onChange} />;
};

export default Input;
