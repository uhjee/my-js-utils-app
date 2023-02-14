const { contextBridge } = require('electron');

// define global object
contextBridge.exposeInMainWorld('versions', {
  node: () => process.version.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
});

// react app 과 electron 간의 ipc 통신하도록 설정
window.icpRenderer = require('electron').ipcRenderer;
