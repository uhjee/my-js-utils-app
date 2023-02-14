import React, { FC, memo, ReactNode } from 'react';
import styled from 'styled-components';

interface IProps {
  children: ReactNode;
}

const Container = styled.div`
  padding: 8px 14px;
  font-size: 1.24em;
  font-weight: 600;
  margin-bottom: 8px;
  border-bottom: 1px solid var(--warm-grey);
  height: 38px;
  display: flex;
  align-items: center;
`;

const TitleBar: FC<IProps> = memo(({ children }) => {
  return <Container>{children}</Container>;
});

export default TitleBar;
