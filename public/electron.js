const { app, BrowserWindow, protocol, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const dotenv = require('dotenv');
const isDev = require('electron-is-dev');

dotenv.config();

/**
 * electron setting
 */

function createWindow() {
  const win = new BrowserWindow({
    width: 1920 * 0.6,
    height: 1080 * 0.6,
    webPreferences: {
      nodeIntegration: true, // renderder에서 nodejs 사용 가능
      contextIsolation: false,
      enableRemoteModule: true,
      // preload 기능 활성화 - react app 과 electron 간의 ipc 통신하도록 설정
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // ipc Module handler
  ipcMain.on('ping', (event, ...args) => {
    console.log({ event, args });
    return 'lalala';
  });

  const startUrl = isDev
    ? process.env.ELECTRON_START_URL
    : url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file',
        slashes: true,
      });

  win.loadURL(startUrl);
  if (isDev) {
    win.webContents.openDevTools(); // activiate devtool
  }
  win.setMenu(null);
}

// app.on('ready', createWindow);
app.whenReady().then(() => {
  createWindow();

  // macOS의 경우, window가 닫혀도 계속해서 running - 다라서 window count 체크
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
