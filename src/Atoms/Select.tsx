import React, { FC } from 'react';
import styled from 'styled-components';

const SelectContainer = styled.select`
  height: 28px;
  border-radius: 6px;
`;

export interface IOption {
  value: string;
  text: string;
}

interface IProps {
  options: IOption[];
  selected: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

const Select: FC<IProps> = ({ options = [], onChange, selected }) => {
  return (
    <SelectContainer value={selected} onChange={onChange}>
      {options && options.map((o) => <option value={o.value}>{o.text}</option>)}
    </SelectContainer>
  );
};

export default React.memo(Select);
