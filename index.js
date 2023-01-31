const { app, BrowserWindow } = require('electron')

const path = require('path')
const { Menu } = require('electron')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    //menu: null,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })
  win.webContents.openDevTools()
  win.loadFile('index.html')
  // process.platform === 'win32' && win.removeMenu()
  // process.platform === 'darwin' &&
  //   Menu.setApplicationMenu(Menu.buildFromTemplate([]))
  // Menu.setApplicationMenu(null)
}

console.log('here is dirname ', __dirname)

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
