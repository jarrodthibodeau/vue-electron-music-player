const {app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let win;

require('electron-reload')(__dirname);

function createWindow() {
    win = new BrowserWindow({width: 800, height: 600});

    if (process.env.NODE_ENV === 'production') {
        win.loadURL(url.format({
            pathname: path.join(__dirname, 'dist/index.html')
        }));
    } else {
        win.loadURL('http://localhost:8080');
        win.webContents.openDevTools();
    }

    win.on('closed', function() {
        win = null;
    });
} 

app.on('ready', createWindow);

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function() {
    if (win === null) {
        createWindow();
    }
});