import React, { FC, MouseEventHandler, ReactNode, useCallback } from 'react';
import styled from 'styled-components';

type Color = 'orange' | 'grey' | 'white';

const Btn = styled.div<{ color: Color }>`
  border: solid 1px #666;
  border-radius: 6%;
  line-height: 1;
  box-sizing: border-box;
  display: inline-block;
  padding: 4px 8px;
  text-align: center;
  margin: 2px 4px;
  cursor: pointer;
  user-select: none;

  ${({ color }) => {
    switch (color) {
      case 'orange':
        return {
          backgroundColor: 'var(--orange)',
          color: 'var(--black)',
        };
      case 'white':
        return {
          backgroundColor: 'var(--white)',
          color: 'var(--black)',
        };
      default:
        return {
          backgroundColor: 'var(--grey)',
          color: 'var(--black)',
        };
    }
  }}

  &:hover {
    font-weight: 600;
  }
`;

interface IProps {
  children: ReactNode;
  cb: React.MouseEventHandler<HTMLDivElement>;
  color?: Color;
  className?: string | undefined;
}

const Button: FC<IProps> = ({
  color = 'grey',
  children,
  cb,
  className = '',
}) => {
  const onClickBtn: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      e.stopPropagation();
      cb(e);
    },
    [cb],
  );

  return (
    <Btn className={className} color={color} onClick={onClickBtn}>
      {children}
    </Btn>
  );
};

export default React.memo(Button);
