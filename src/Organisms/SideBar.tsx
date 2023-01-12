import React, { FC, useCallback } from 'react';
import styled from 'styled-components';
import { TITLE_TEXT } from '../constants/layout';
import { MENU_PROPS } from '../types/layout';

const Container = styled.aside<{ width: string }>`
  border-right: 1px solid var(--warm-grey);
  background-color: var(--black);
  box-sizing: border-box;
  /* margin-right: 16px; */
  width: ${({ width }) => width};
`;

const LogoBox = styled.div`
  margin-bottom: 16px;
  height: 140px;
  padding: 20px 10px;
`;

const MenusBox = styled.div`
  padding: 20px 14px;
`;

const Menu = styled.div<{ isActive: boolean }>`
  font-size: 0.84em;
  margin-bottom: 12px;
  cursor: pointer;
  ${({ isActive }) => (isActive ? 'color: var(--orange);' : '')}
  &:hover {
    font-weight: 600;
  }
`;

interface IMenu {
  title: string;
  prop: MENU_PROPS;
}

const MENUS: IMenu[] = [
  {
    title: TITLE_TEXT.DIFF_OBJECT,
    prop: MENU_PROPS.DIFF_OBJECT,
  },
  {
    title: TITLE_TEXT.MYBATIS_PARSER,
    prop: MENU_PROPS.MYBATIS_PARSER,
  },
  {
    title: TITLE_TEXT.ETC,
    prop: MENU_PROPS.ETC,
  },
];

interface IProps {
  selectedMenu: MENU_PROPS;
  setSelectedMenu: (...args: any[]) => void;
}

const SideBar: FC<IProps> = ({ selectedMenu, setSelectedMenu }) => {
  const onClickMenu = useCallback(
    (selected: MENU_PROPS) => {
      setSelectedMenu(selected);
    },
    [setSelectedMenu],
  );

  return (
    <Container width="200px">
      <LogoBox>Utils.</LogoBox>
      <MenusBox>
        {MENUS.map((m) => (
          <Menu
            isActive={selectedMenu && selectedMenu === m.prop}
            onClick={() => onClickMenu(m.prop)}
            key={m.prop}
          >
            {m.title}
          </Menu>
        ))}
      </MenusBox>
    </Container>
  );
};

export default SideBar;
