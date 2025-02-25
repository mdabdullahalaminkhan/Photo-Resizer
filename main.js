const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle('resize-image', async (event, { imagePath, width, height }) => {
  const desktopPath = path.join(require('os').homedir(), 'Desktop');
  const outputDir = path.join(desktopPath, 'Photo Resizer');
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  const fileName = path.basename(imagePath);
  const outputPath = path.join(outputDir, `resized_${fileName}`);

  try {
    await sharp(imagePath)
      .resize(parseInt(width), parseInt(height))
      .toFile(outputPath);
    
    return outputPath;
  } catch (error) {
    throw error;
  }
}); 