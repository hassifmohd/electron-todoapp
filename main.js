// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu} = require('electron')

const menuTemplate = [{
  label: 'File',
  submenu: [
    {
      label: 'Add new todo',
      click() {
        createAddWindow();
      }
    },
    {
      label: 'Quit', 
      // accelerator: 'Command+Q', simple mode

      //immedietly invoke function mode
      //aka taht invoke by javascript transplile invoker??? aaa?
      // accelerator: (() => {
      //   if (process.platform === 'darwin') {
      //     return 'Command+Q'; //for macOS
      //   }
      //   else {
      //     return 'Ctrl+Q';
      //   }
      // })(),

      //much simple solution!
      accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',

      click() {
        app.quit();
      }
    }
  ]
}];

//if macOS we want the File to be the 2nd menu
if (process.platform === 'darwin') {
  menuTemplate.unshift({});
}

//add "debugging" menu if enviroment is not production
if (process.env.NODE_ENV !== 'production') {
  menuTemplate.push({
    label: 'Developer',
    submenu: [
      {
        label: 'Toggle Developer Tools', 
        accelerator: process.platform === 'darwin' ? 'Command+Alt+I' : 'Ctrl+Shift+I',
        click( item, focusedWindow) { //need to decide open developer tool at which window?
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let addWindow;

//popup a small window, enter your "TODO-LIST", press submit and saved!
function createAddWindow() {
  addWindow = new BrowserWindow({width: 300, height: 200, title: 'Please add new TODO'});

  addWindow.loadFile('add.html');
}

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // setting up menus
  // when you do this, the default menu will be replace
  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;

    //closed if X
    app.quit();
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
