import React, { FC, ReactNode, useMemo, useState } from 'react';
import styled from 'styled-components';
import { TITLE_TEXT } from '../constants/layout';
import DifferenceObject from '../Organisms/DifferenceObject';
import Etc from '../Organisms/Etc';
import Report from '../Organisms/Report';
import SideBar from '../Organisms/SideBar';
import TitleBar from '../Organisms/TitleBar';
import { MENU_PROPS } from '../types/layout';

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: var(--black);
  user-select: none;
`;
const ContentContainer = styled.div`
  width: 100%;
`;
const MainContentContainer = styled.div`
  padding: 10px 18px;
`;

interface IProps {
  children?: ReactNode;
}

const BasicFrame: FC<IProps> = ({ children }) => {
  const [selectedMenu, setSelectedMenu] = useState(MENU_PROPS.DIFF_OBJECT);

  const componentBySelectedMenu = useMemo(() => {
    switch (selectedMenu) {
      case MENU_PROPS.DIFF_OBJECT:
        return <DifferenceObject />;
      case MENU_PROPS.ETC:
        return <Etc />;
      case MENU_PROPS.REPORT:
        return <Report />;
      default:
        break;
    }
  }, [selectedMenu]);

  const titleTextBySelectedMenu = useMemo(
    () => TITLE_TEXT[selectedMenu],
    [selectedMenu],
  );

  return (
    <Container>
      <SideBar selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
      <ContentContainer>
        <TitleBar>{titleTextBySelectedMenu}</TitleBar>
        <MainContentContainer>{componentBySelectedMenu}</MainContentContainer>
      </ContentContainer>
    </Container>
  );
};

export default BasicFrame;
