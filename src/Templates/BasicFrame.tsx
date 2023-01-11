import React, { FC, ReactNode, useState } from 'react';
import styled from 'styled-components';
import DifferenceObject from '../Organisms/DifferenceObject';
import SideBar from '../Organisms/SideBar';
import { MENU_PROPS } from '../types/common';

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: var(--default-background-color);
  user-select: none;
`;

const ContentContainer = styled.div`
  /* padding: 20px 26px; */
  width: 100%;
`;

interface IProps {
  children?: ReactNode;
}

const BasicFrame: FC<IProps> = ({ children }) => {
  const [selectedMenu, setSelectedMenu] = useState(MENU_PROPS.DIFF_OBJECT);

  const getComponentBySelectedMenu = () => {
    if (selectedMenu === MENU_PROPS.DIFF_OBJECT)
      return <DifferenceObject></DifferenceObject>;
    else return <div>etc</div>;
  };
  return (
    <Container>
      <SideBar selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
      <ContentContainer>{getComponentBySelectedMenu()}</ContentContainer>
    </Container>
  );
};

export default BasicFrame;
