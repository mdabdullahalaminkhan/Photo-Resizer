const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  resizeImage: (data) => ipcRenderer.invoke('resize-image', data)
}); 