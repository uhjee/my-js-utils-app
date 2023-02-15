import React, { FC } from 'react';
const { ipcRenderer } = window.require('electron');

const MybatisParser: FC = () => {
  const handler = async () => {
    const res = await ipcRenderer.send('ping', 1, 2, 3);
    console.log(res);
  };

  return (
    <div>
      <button onClick={handler}>ping</button>
    </div>
  );
};

export default MybatisParser;
