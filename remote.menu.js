
const { ipcMain, BrowserWindow, Menu, MenuItem } = require('electron');

ipcMain.on('show-context-menu', function (event, menu) {
        const win = BrowserWindow.fromWebContents(event.sender)
        menu.popup(win);
})