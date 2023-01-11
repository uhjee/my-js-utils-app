import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { MENU_PROPS } from '../types/common';
import DifferenceObject from './DifferenceObject';

const Container = styled.aside<{ width: string }>`
  border-right: 1px solid #7e7976;
  background-color: var(--default-background-color);
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
  ${({ isActive }) => (isActive ? 'color: #da9967;' : '')}
  &:hover {
    font-weight: 600;
  }
`;

// type MENU_PROPS = 'DIFF_OBJECT' | 'ETC';

interface IMenu {
  title: string;
  prop: MENU_PROPS;
}

export const MENUS: IMenu[] = [
  {
    title: 'difference object',
    prop: MENU_PROPS.DIFF_OBJECT,
  },
  {
    title: 'etc',
    prop: MENU_PROPS.ETC,
  },
];

interface IProps {
  selectedMenu: MENU_PROPS;
  setSelectedMenu: (...args: any[]) => void;
}

const SideBar: FC<IProps> = ({ selectedMenu, setSelectedMenu }) => {
  //   const [selectedMenu, setSelectedMenu] = useState<MENU_PROPS>(
  //     MENU_PROPS.DIFF_OBJECT,
  //   );

  const onClickMenu = (selected: MENU_PROPS) => {
    setSelectedMenu(selected);
  };
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
