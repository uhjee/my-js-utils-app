const { contextBridge, ipcRenderer } = require('electron');

// define global object
// contextBridge.exposeInMainWorld('versions', {
//   node: () => process.version.node,
//   chrome: () => process.versions.chrome,
//   electron: () => process.versions.electron,
//   ping: () => ipcRenderer.invoke('ping'),
// });

// react app 과 electron 간의 ipc 통신하도록 설정
process.once('loaded', () => {
  window.ipcRenderer = ipcRenderer;
});
