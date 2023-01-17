const { app, BrowserWindow, protocol } = require('electron');
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
      enableRemoteModule: true,
      // preload 기능 활성화 - react app 과 electron 간의 ipc 통신하도록 설정
      preload: __dirname + '/preload.js',
    },
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

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('active', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
