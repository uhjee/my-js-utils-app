import React from 'react';
import './App.css';
import styled from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';
import Button from './Atoms/Button';

const Title = styled.h1`
  font-size: 1.5em;
  background-color: red;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <div>
        happy
        <Title>타이틀?</Title>
        <Button>text</Button>
      </div>
    </>
  );
}

export default App;
