const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');
const path = require('path');

// Keep a global reference of the window object
let mainWindow;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  });

  // Load the index.html file
  mainWindow.loadFile(path.join(__dirname, '../public/index.html'));

  // Open DevTools
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Setup global shortcuts
function setupShortcuts() {
  // Register shortcuts for video assignment
  const registerShortcuts = () => {
    globalShortcut.register('A', () => {
      if (mainWindow) {
        mainWindow.webContents.send('assign-video', { side: 'A' });
      }
    });

    globalShortcut.register('B', () => {
      if (mainWindow) {
        mainWindow.webContents.send('assign-video', { side: 'B' });
      }
    });
  };

  // Unregister shortcuts
  const unregisterShortcuts = () => {
    globalShortcut.unregister('A');
    globalShortcut.unregister('B');
  };

  // Register shortcuts when window is focused
  mainWindow.on('focus', registerShortcuts);
  
  // Unregister shortcuts when window loses focus
  mainWindow.on('blur', unregisterShortcuts);

  // Initial registration
  registerShortcuts();
}

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
  createWindow();
  setupShortcuts();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Handle cleanup on exit
process.on('exit', () => {
  // Unregister all shortcuts
  globalShortcut.unregisterAll();
}); 