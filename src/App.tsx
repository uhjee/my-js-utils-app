import React from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';
import Button from './Atoms/Button';

const Title = styled.h1`
  font-size: 1.5em;
  background-color: red;
`;

function App() {

  const test = () => {
      console.log(process.env.ELECTRON_START_URL);
  }

  return (
    <>
      <GlobalStyle />
      <div>
        happy
        <Title>타이틀?</Title>
        <Button cb={test}>버튼</Button>
      </div>
    </>
  );
}

export default App;
