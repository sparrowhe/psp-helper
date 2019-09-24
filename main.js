// Modules to control application life and create native browser window
const {app, Menu, BrowserWindow} = require('electron')
const path = require('path')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

let dockMenu = [
  {
      label: '主页', 
      click: function () {
        mainWindow.loadURL('http://psp.china-vo.org');
      }
  },
  {
      label: '登录', 
      click: function () {
        mainWindow.loadURL('http://psp.china-vo.org/loginFrm?umt=true');
      },
  },
  {
      label: '看图', 
      click: function () {
        mainWindow.loadURL('http://psp.china-vo.org/search');
      },
  },
  {
      label: '提交记录', 
      click: function () {
        mainWindow.loadURL('http://psp.china-vo.org/imagecheck/mysubmithome');
      }
  }
];


function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadURL('http://psp.china-vo.org')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
const me = Menu.buildFromTemplate(dockMenu)
Menu.setApplicationMenu(me);
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
