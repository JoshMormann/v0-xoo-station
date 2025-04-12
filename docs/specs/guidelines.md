# XooStation Frontend/Backend Guidelines

## Frontend Guidelines
- **Framework**: Use React for all UI components.
- **Styling**: Use Vanilla CSS exclusively for styling. Follow the dark theme from the designs (black background, gray accents, green/red highlights).
- **Component Structure**:
  - Break the UI into reusable components (e.g., `SearchBar.js`, `PreviewGrid.js`, `ControllerGrid.js`).
  - Use functional components with hooks (e.g., `useState`, `useEffect`).
- **State Management**:
  - Use React's built-in hooks for state (e.g., `useState` for search results, `useReducer` for Controller Grid assignments).
  - Avoid external state libraries (e.g., Redux) for the prototype.
- **Preview Grid**: Implement a 3x3 grid for search results. Clicking a thumbnail plays the video in place.
- **Controller Grid**:
  - Implement a 1x8 row for Column Triggers and an 8x8 grid for Performance Triggers.
  - Assigned pads show a thumbnail with a subtle box shadow; unassigned pads are gray with no shadow.
- **Fader**: Use a horizontal slider to blend between Video Players A and B. Update the percentage overlay in real-time.
- **Drag-and-Drop**: Use `react-dnd` for drag-and-drop from the Preview Grid to the Controller Grid.
- **Keyboard Shortcuts**: Use `electron-global-shortcut` to register "A" and "B" keys for assigning videos to the A or B side of the Controller Grid.

## Backend Guidelines
- **Electron Main Process**:
  - Handle API calls, MIDI input, and video output in the main process.
  - Use `ipcMain` and `ipcRenderer` for communication between main and renderer processes.
- **API Calls**:
  - Use `axios` for API requests (YouTube, Giphy initially).
  - Cache API responses locally using the file system to avoid repeated calls.
- **MIDI**:
  - Use the `midi` library for MIDI input (stretch goal).
  - Map Ableton Push 2's 8x8 grid (MIDI notes 36-99) to the Controller Grid.
- **Video Output**:
  - Implement Syphon (Mac) and Spout (Windows) in the main process (stretch goal).
  - For the prototype, focus on local preview in the A/B Video Players.

## General Guidelines
- **File Naming**: Use PascalCase for React components (e.g., `PreviewGrid.js`), kebab-case for other files (e.g., `utils/api-calls.js`).
- **Error Handling**: Add basic error handling for API calls (e.g., show a "Failed to load" message in the Preview Grid).
- **Performance**: Cache media locally to ensure smooth playback during live use.