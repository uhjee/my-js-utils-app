import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../Atoms/Button';

const Box = styled.div`
  display: inline-block;
  width: 12px;
  height: 12px;
  background-color: green;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleBar = styled.div`
  padding: 8px 14px;
  font-size: 1.4em;
  margin-bottom: 8px;
  height: 38px;
`;

const ContentContainer = styled.div`
  padding: 10px 18px;
`;

const title = 'Differrence Object';

const DifferenceObject = () => {
  const [cnt, setCnt] = useState<number>(0);

  const countUp = () => {
    setCnt(cnt + 1);
  };
  return (
    <Container>
      <TitleBar>{title}</TitleBar>
      <ContentContainer>
        {cnt}
        <div>
          <Button cb={countUp}>count + 1</Button>
        </div>
        {!!cnt &&
          Array(cnt)
            .fill(1)
            .map((_, index) => <Box key={index} />)}
      </ContentContainer>
    </Container>
  );
};

export default DifferenceObject;
