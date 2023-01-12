import React from 'react';
import './styles/variable.scss';
import { GlobalStyle } from './styles/GlobalStyle';
import BasicFrame from './Templates/BasicFrame';

function App() {
  return (
    <>
      <GlobalStyle />
      <BasicFrame/>
    </>
  );
}

export default App;
