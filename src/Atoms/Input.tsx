import React, { FC } from 'react';
import styled from 'styled-components';

const InputContainer = styled.input`
  /* width: 100%; */
  height: 28px;
  border-radius: 6px;
  padding: 0 12px;
`;

interface IProps {
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  value: string;
}

const Input: FC<IProps> = ({ onBlur, value = '' }) => {
  return <InputContainer onBlur={onBlur} defaultValue={value} />;
};

export default React.memo(Input);
