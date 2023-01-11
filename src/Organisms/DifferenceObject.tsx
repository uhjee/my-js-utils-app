import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../Atoms/Button';

const Box = styled.div`
  display: inline-block;
  width: 12px;
  height: 12px;
  background-color: green;
`;

const DifferenceObject = () => {
  const [cnt, setCnt] = useState<number>(0);

  const countUp = () => {
    setCnt(cnt + 1);
  };
  return (
    <div>
      DifferenceObject
      {cnt}
      <div>
        <Button cb={countUp}>count + 1</Button>
      </div>
      {!!cnt &&
        Array(cnt)
          .fill(1)
          .map((_, index) => <Box key={index} />)}
    </div>
  );
};

export default DifferenceObject;
