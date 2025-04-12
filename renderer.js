// DOM Elements
const searchInput = document.getElementById("search-input")
const recentSearches = document.getElementById("recent-searches")
const sourceTabs = document.querySelectorAll(".tab")
const searchResults = document.getElementById("search-results")
const midiPads = document.getElementById("midi-pads")
const videoA = document.getElementById("video-a")
const videoB = document.getElementById("video-b")
const crossfader = document.getElementById("crossfader")
const crossfaderStatus = document.getElementById("crossfader-status")
const midiModal = document.getElementById("midi-modal")
const midiInputSelect = document.getElementById("midi-input-select")
const midiOutputSelect = document.getElementById("midi-output-select")
const midiConnectBtn = document.getElementById("midi-connect-btn")

// State
let currentSource = "youtube"
let recentSearchList = []
const padAssignments = Array(64).fill(null)
let activePadA = null
let activePadB = null
let midiDevices = { inputs: [], outputs: [] }
let selectedMidiInput = null
let selectedMidiOutput = null

// MIDI note to pad mapping (standard 8x8 grid)
const midiNotes = [
  [0, 1, 2, 3, 4, 5, 6, 7],
  [16, 17, 18, 19, 20, 21, 22, 23],
  [32, 33, 34, 35, 36, 37, 38, 39],
  [48, 49, 50, 51, 52, 53, 54, 55],
  [64, 65, 66, 67, 68, 69, 70, 71],
  [80, 81, 82, 83, 84, 85, 86, 87],
  [96, 97, 98, 99, 100, 101, 102, 103],
  [112, 113, 114, 115, 116, 117, 118, 119],
]

// Initialize
function init() {
  // Create MIDI pads
  createMidiPads()

  // Load recent searches
  loadRecentSearches()

  // Show MIDI device selection modal
  showMidiModal()

  // Set up event listeners
  setupEventListeners()
}

// Create MIDI pads grid
function createMidiPads() {
  midiPads.innerHTML = ""

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const pad = document.createElement("div")
      pad.className = "midi-pad"
      pad.dataset.row = row
      pad.dataset.col = col
      pad.dataset.index = row * 8 + col

      // Assign to player A or B based on column
      if (col < 4) {
        pad.classList.add("player-a")
      } else {
        pad.classList.add("player-b")
      }

      // Make pads droppable
      pad.addEventListener("dragover", handleDragOver)
      pad.addEventListener("drop", handleDrop)
      pad.addEventListener("dragleave", handleDragLeave)

      // Make pads clickable
      pad.addEventListener("click", handlePadClick)

      midiPads.appendChild(pad)
    }
  }
}

// Load recent searches from localStorage
function loadRecentSearches() {
  const savedSearches = localStorage.getItem("recentSearches")
  if (savedSearches) {
    recentSearchList = JSON.parse(savedSearches)
    renderRecentSearches()
  }
}

// Render recent searches as tags
function renderRecentSearches() {
  let html = '<span class="recent-label">Recent Searches:</span>'

  recentSearchList.forEach((search) => {
    html += `<span class="recent-tag" data-search="${search}">${search}</span>`
  })

  recentSearches.innerHTML = html

  // Add click event to tags
  document.querySelectorAll(".recent-tag").forEach((tag) => {
    tag.addEventListener("click", () => {
      searchInput.value = tag.dataset.search
      performSearch(tag.dataset.search)
    })
  })
}

// Show MIDI device selection modal
function showMidiModal() {
  midiModal.style.display = "flex"

  // Get MIDI devices
  window.api.getMidiDevices((devices) => {
    midiDevices = devices

    // Populate input select
    midiInputSelect.innerHTML = '<option value="">Select MIDI Input...</option>'
    devices.inputs.forEach((device) => {
      const option = document.createElement("option")
      option.value = device.id
      option.textContent = device.name
      midiInputSelect.appendChild(option)
    })

    // Populate output select
    midiOutputSelect.innerHTML = '<option value="">Select MIDI Output...</option>'
    devices.outputs.forEach((device) => {
      const option = document.createElement("option")
      option.value = device.id
      option.textContent = device.name
      midiOutputSelect.appendChild(option)
    })
  })
}

// Set up event listeners
function setupEventListeners() {
  // Search input
  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const query = searchInput.value.trim()
      if (query) {
        performSearch(query)
      }
    }
  })

  // Source tabs
  sourceTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      sourceTabs.forEach((t) => t.classList.remove("active"))
      tab.classList.add("active")
      currentSource = tab.dataset.source

      // Re-run search with new source if there's a query
      const query = searchInput.value.trim()
      if (query) {
        performSearch(query)
      }
    })
  })

  // Crossfader
  crossfader.addEventListener("input", () => {
    updateCrossfader()
  })

  // MIDI connect button
  midiConnectBtn.addEventListener("click", () => {
    selectedMidiInput = midiInputSelect.value ? Number.parseInt(midiInputSelect.value) : null
    selectedMidiOutput = midiOutputSelect.value ? Number.parseInt(midiOutputSelect.value) : null

    if (selectedMidiInput !== null || selectedMidiOutput !== null) {
      window.api.selectMidiDevice(selectedMidiInput, selectedMidiOutput)
      midiModal.style.display = "none"
    }
  })

  // MIDI message handler
  window.api.onMidiMessage((message) => {
    handleMidiMessage(message)
  })
}

// Perform search and update results
async function performSearch(query) {
  // Add to recent searches
  if (!recentSearchList.includes(query)) {
    recentSearchList.unshift(query)
    if (recentSearchList.length > 10) {
      recentSearchList.pop()
    }
    localStorage.setItem("recentSearches", JSON.stringify(recentSearchList))
    renderRecentSearches()
  }

  // Show loading state
  searchResults.innerHTML = '<div class="loading">Searching...</div>'

  try {
    let results

    switch (currentSource) {
      case "youtube":
        results = await window.api.searchYouTube(query)
        renderYouTubeResults(results)
        break
      case "vimeo":
        // Implement Vimeo search
        searchResults.innerHTML = '<div class="error">Vimeo search not implemented in this demo</div>'
        break
      case "giphy":
        results = await window.api.searchGiphy(query)
        renderGiphyResults(results)
        break
    }
  } catch (error) {
    searchResults.innerHTML = `<div class="error">Error: ${error.message}</div>`
  }
}

// Render YouTube search results
function renderYouTubeResults(data) {
  if (!data || !data.items || data.items.length === 0) {
    searchResults.innerHTML = '<div class="no-results">No results found</div>'
    return
  }

  let html = ""

  data.items.forEach((item) => {
    const videoId = item.id.videoId
    const thumbnail = item.snippet.thumbnails.medium.url
    const title = item.snippet.title

    html += `
      <div class="result-item" draggable="true" data-type="youtube" data-id="${videoId}" data-title="${title}">
        <img src="${thumbnail}" alt="${title}">
      </div>
    `
  })

  searchResults.innerHTML = html

  // Add drag events to results
  document.querySelectorAll(".result-item").forEach((item) => {
    item.addEventListener("dragstart", handleDragStart)
    item.addEventListener("dragend", handleDragEnd)
  })
}

// Render Giphy search results
function renderGiphyResults(data) {
  if (!data || !data.data || data.data.length === 0) {
    searchResults.innerHTML = '<div class="no-results">No results found</div>'
    return
  }

  let html = ""

  data.data.forEach((item) => {
    const gifId = item.id
    const thumbnail = item.images.fixed_height_small.url
    const title = item.title

    html += `
      <div class="result-item" draggable="true" data-type="giphy" data-id="${gifId}" data-title="${title}">
        <img src="${thumbnail}" alt="${title}">
      </div>
    `
  })

  searchResults.innerHTML = html

  // Add drag events to results
  document.querySelectorAll(".result-item").forEach((item) => {
    item.addEventListener("dragstart", handleDragStart)
    item.addEventListener("dragend", handleDragEnd)
  })
}

// Handle drag start
function handleDragStart(e) {
  e.dataTransfer.setData(
    "text/plain",
    JSON.stringify({
      type: this.dataset.type,
      id: this.dataset.id,
      title: this.dataset.title,
    }),
  )

  this.classList.add("dragging")
}

// Handle drag end
function handleDragEnd() {
  this.classList.remove("dragging")
}

// Handle drag over
function handleDragOver(e) {
  e.preventDefault()
  this.classList.add("drag-over")
}

// Handle drag leave
function handleDragLeave() {
  this.classList.remove("drag-over")
}

// Handle drop
function handleDrop(e) {
  e.preventDefault()
  this.classList.remove("drag-over")

  const data = JSON.parse(e.dataTransfer.getData("text/plain"))
  const padIndex = Number.parseInt(this.dataset.index)

  // Assign media to pad
  assignMediaToPad(padIndex, data)
}

// Assign media to pad
function assignMediaToPad(padIndex, data) {
  const pad = document.querySelector(`.midi-pad[data-index="${padIndex}"]`)

  // Store assignment
  padAssignments[padIndex] = data

  // Update pad visual
  let mediaElement

  if (data.type === "youtube") {
    // For YouTube, we'll use an image for the pad
    mediaElement = document.createElement("img")
    mediaElement.src = `https://img.youtube.com/vi/${data.id}/mqdefault.jpg`
    mediaElement.alt = data.title
  } else if (data.type === "giphy") {
    // For Giphy, we'll use the actual GIF
    mediaElement = document.createElement("img")
    mediaElement.src = `https://media.giphy.com/media/${data.id}/100.gif`
    mediaElement.alt = data.title
  }

  // Clear pad and add new media
  pad.innerHTML = ""
  pad.appendChild(mediaElement)
}

// Handle pad click
function handlePadClick() {
  const padIndex = Number.parseInt(this.dataset.index)
  const padData = padAssignments[padIndex]

  if (!padData) return

  const col = Number.parseInt(this.dataset.col)

  // Determine which player to use based on column
  if (col < 4) {
    // Player A (columns 0-3)
    playMediaInPlayer("a", padData, padIndex)
  } else {
    // Player B (columns 4-7)
    playMediaInPlayer("b", padData, padIndex)
  }
}

// Play media in specified player
function playMediaInPlayer(player, data, padIndex) {
  const videoElement = player === "a" ? videoA : videoB

  // Update active pad
  if (player === "a") {
    if (activePadA !== null) {
      document.querySelector(`.midi-pad[data-index="${activePadA}"]`).classList.remove("active")
    }
    activePadA = padIndex
    document.querySelector(`.midi-pad[data-index="${activePadA}"]`).classList.add("active")
  } else {
    if (activePadB !== null) {
      document.querySelector(`.midi-pad[data-index="${activePadB}"]`).classList.remove("active")
    }
    activePadB = padIndex
    document.querySelector(`.midi-pad[data-index="${activePadB}"]`).classList.add("active")
  }

  // Set video source based on media type
  if (data.type === "youtube") {
    videoElement.src = ""
    videoElement.innerHTML = `
      <iframe 
        width="100%" 
        height="100%" 
        src="https://www.youtube.com/embed/${data.id}?autoplay=1&loop=1&mute=1&controls=0&playlist=${data.id}" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen
      ></iframe>
    `
  } else if (data.type === "giphy") {
    videoElement.innerHTML = ""
    videoElement.src = ""

    const img = document.createElement("img")
    img.src = `https://media.giphy.com/media/${data.id}/giphy.gif`
    img.style.width = "100%"
    img.style.height = "100%"
    img.style.objectFit = "cover"

    videoElement.appendChild(img)
  }

  // Update crossfader if needed
  updateCrossfader()

  // Update Syphon output
  updateSyphonOutput()
}

// Update crossfader
function updateCrossfader() {
  const value = Number.parseInt(crossfader.value)

  // Update player percentages
  document.querySelector("#player-a .player-percentage").textContent = `${100 - value}%`
  document.querySelector("#player-b .player-percentage").textContent = `${value}%`

  // Update player opacity based on crossfader
  videoA.style.opacity = (100 - value) / 100
  videoB.style.opacity = value / 100

  // Update crossfader status
  if (value < 10) {
    crossfaderStatus.textContent = "A"
  } else if (value > 90) {
    crossfaderStatus.textContent = "B"
  } else {
    crossfaderStatus.textContent = "ON"
  }

  // If we have a MIDI output, send the crossfader value
  if (selectedMidiOutput !== null) {
    // Map 0-100 to 0-127 for MIDI
    const midiValue = Math.floor(value * 1.27)
    // Send on CC #7 (volume)
    sendMidiCC(7, midiValue)
  }
}

// Handle MIDI message
function handleMidiMessage(message) {
  const [status, data1, data2] = message.message

  // Note On message (144 = Note On, channel 1)
  if ((status & 0xf0) === 0x90 && data2 > 0) {
    // Find the pad that corresponds to this note
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (midiNotes[row][col] === data1) {
          // Simulate pad click
          const padIndex = row * 8 + col
          const pad = document.querySelector(`.midi-pad[data-index="${padIndex}"]`)
          if (pad) {
            pad.click()
          }
          break
        }
      }
    }
  }

  // CC message (176 = CC, channel 1)
  else if ((status & 0xf0) === 0xb0) {
    // CC #7 is often used for volume/faders
    if (data1 === 7) {
      // Map 0-127 to 0-100 for our crossfader
      const value = Math.floor((data2 * 100) / 127)
      crossfader.value = value
      updateCrossfader()
    }
  }
}

// Send MIDI CC message
function sendMidiCC(cc, value) {
  if (selectedMidiOutput === null) return

  // Create a MIDI CC message (176 = CC on channel 1)
  const message = [0xb0, cc, value]

  // This would normally send the MIDI message
  // For this demo, we'll just log it
  console.log("Sending MIDI CC:", message)
}

// Update Syphon output
function updateSyphonOutput() {
  // In a real implementation, this would capture the video textures
  // and send them to Syphon
  window.api.updateSyphon(
    document.getElementById("player-a").getBoundingClientRect(),
    document.getElementById("player-b").getBoundingClientRect(),
  )
}

// Initialize the app
init()
