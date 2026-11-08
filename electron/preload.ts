import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  saveProjectFile: (title: string, content: string) => ipcRenderer.invoke('save-project-file', title, content),
});
