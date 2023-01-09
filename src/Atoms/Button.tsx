import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

const Btn = styled.div`
  border: solid 1px #666;
  border-radius: 15%;
  line-height: 1;
  box-sizing: border-box;
  display: inline-block;
  padding: 4px 8px;
  margin: 2px 4px;
  cursor: pointer;

  &:hover {
    font-weight: 600;
  }
`;

interface IProps {
  children: ReactNode;
  color?: 'red' | 'grey' | 'white';
}

const Button: FC<IProps> = ({ color = 'grey', children }) => {
  return <Btn>{children}</Btn>;
};

export default Button;
