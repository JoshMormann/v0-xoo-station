const { contextBridge, ipcRenderer } = require("electron")

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("api", {
  // MIDI functions
  getMidiDevices: (callback) => {
    ipcRenderer.on("midi-devices", (event, devices) => callback(devices))
  },
  selectMidiDevice: (inputId, outputId) => {
    ipcRenderer.send("select-midi-device", { inputId, outputId })
  },
  onMidiMessage: (callback) => {
    ipcRenderer.on("midi-message", (event, message) => callback(message))
  },

  // Syphon functions
  updateSyphon: (playerA, playerB) => {
    ipcRenderer.send("update-syphon", { playerA, playerB })
  },

  // Search API functions
  searchYouTube: async (query) => {
    // This would normally use the YouTube API
    // For demo purposes, we'll return mock data
    return fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&key=YOUR_API_KEY`,
    ).then((response) => response.json())
  },
  searchGiphy: async (query) => {
    // This would normally use the Giphy API
    return fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=YOUR_GIPHY_API_KEY&q=${encodeURIComponent(query)}&limit=25`,
    ).then((response) => response.json())
  },
})
