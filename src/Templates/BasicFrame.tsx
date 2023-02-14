import React, { FC, ReactNode, useMemo, useState } from 'react';
import styled from 'styled-components';
import { TITLE_TEXT } from '../constants/layout';
import DifferenceObject from './differentObject/DifferenceObject';
import Etc from './etc/Etc';
import Report from './report/Report';
import SideBar from '../Organisms/common/SideBar';
import TitleBar from '../Organisms/common/TitleBar';
import { MENU_PROPS } from '../types/layout';
import MybatisParserL from './mybatisParser/mybatisParser';
import MybatisParser from './mybatisParser/mybatisParser';

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
      case MENU_PROPS.REPORT:
        return <Report />;
      case MENU_PROPS.MYBATIS_PARSER:
        return <MybatisParser />;
      case MENU_PROPS.ETC:
        return <Etc />;
      default:
        break;
    }
  }, [selectedMenu]);

  const titleTextBySelectedMenu = useMemo(
    () =>
      selectedMenu === MENU_PROPS.REPORT
        ? `${TITLE_TEXT[selectedMenu]} (${new Intl.DateTimeFormat('KO-KR', {
            day: 'numeric', // 날도 숫자로
            month: 'long', // 달은 글자로
            year: 'numeric', // 연도는 숫자로
            weekday: 'long', // 요일은 글자로
          }).format(new Date())})`
        : TITLE_TEXT[selectedMenu],
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
