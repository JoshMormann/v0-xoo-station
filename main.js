const { app, BrowserWindow, ipcMain } = require("electron")
const path = require("path")
const midi = require("midi")
const Syphon = require("electron-syphon")

// Keep a global reference of objects to prevent garbage collection
let mainWindow
let midiInput
let midiOutput
let syphonServerA
let syphonServerB

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, "preload.js"),
    },
  })

  mainWindow.loadFile("index.html")

  // Initialize Syphon servers for video output
  syphonServerA = new Syphon.Server("VJ App - Player A", mainWindow)
  syphonServerB = new Syphon.Server("VJ App - Player B", mainWindow)

  // Initialize MIDI
  setupMIDI()

  mainWindow.on("closed", () => {
    mainWindow = null

    // Clean up MIDI and Syphon
    if (midiInput) {
      midiInput.closePort()
      midiInput = null
    }

    if (midiOutput) {
      midiOutput.closePort()
      midiOutput = null
    }

    if (syphonServerA) {
      syphonServerA.stop()
      syphonServerA = null
    }

    if (syphonServerB) {
      syphonServerB.stop()
      syphonServerB = null
    }
  })
}

function setupMIDI() {
  midiInput = new midi.Input()
  midiOutput = new midi.Output()

  // List available MIDI devices
  const inputCount = midiInput.getPortCount()
  const outputCount = midiOutput.getPortCount()

  const midiDevices = {
    inputs: [],
    outputs: [],
  }

  for (let i = 0; i < inputCount; i++) {
    midiDevices.inputs.push({
      id: i,
      name: midiInput.getPortName(i),
    })
  }

  for (let i = 0; i < outputCount; i++) {
    midiDevices.outputs.push({
      id: i,
      name: midiOutput.getPortName(i),
    })
  }

  // Send MIDI device list to renderer
  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.webContents.send("midi-devices", midiDevices)
  })

  // Handle MIDI device selection from renderer
  ipcMain.on("select-midi-device", (event, { inputId, outputId }) => {
    if (inputId !== null && inputId !== undefined) {
      if (midiInput.isPortOpen()) {
        midiInput.closePort()
      }
      midiInput.openPort(inputId)

      // Set up MIDI message handler
      midiInput.on("message", (deltaTime, message) => {
        // Forward MIDI messages to renderer
        mainWindow.webContents.send("midi-message", { deltaTime, message })
      })
    }

    if (outputId !== null && outputId !== undefined) {
      if (midiOutput.isPortOpen()) {
        midiOutput.closePort()
      }
      midiOutput.openPort(outputId)
    }
  })
}

// Handle Syphon output
ipcMain.on("update-syphon", (event, { playerA, playerB }) => {
  if (playerA && syphonServerA) {
    syphonServerA.publishFrameTexture(playerA)
  }

  if (playerB && syphonServerB) {
    syphonServerB.publishFrameTexture(playerB)
  }
})

app.on("ready", createWindow)

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow()
  }
})
