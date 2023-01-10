import React, {FC, MouseEventHandler, ReactNode, useCallback} from 'react';
import styled from 'styled-components';

const Btn = styled.div`
  border: solid 1px #666;
  border-radius: 6%;
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
    cb: (...args: any[]) => void;
}

const Button: FC<IProps> = ({color = 'grey', children, cb}) => {
    const onClickBtn: MouseEventHandler<HTMLDivElement> = useCallback(
        (e) => {
            e.stopPropagation();
            cb();
        },
        [cb],
    );


    return <Btn onClick={onClickBtn}>{children}</Btn>;
};

export default Button;
