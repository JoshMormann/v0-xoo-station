# XooStation Tech Stack Overview

## Framework
- **Electron**: Cross-platform desktop app framework for Windows and Mac.
- **React**: Frontend library for building the UI.
- **Vanilla CSS**: Custom CSS with CSS variables for theming.
- **Sass**: CSS preprocessor for advanced styling capabilities.

## Media Handling
- **axios**: For querying APIs (YouTube, Giphy initially; Vimeo, Twitch as stretch goals).
- **video.js**: For video and GIF playback in the Preview Grid and A/B Video Players.
- **electron-dl**: For downloading and caching media locally.

## MIDI Integration
- **midi**: Node.js library for MIDI input/output (Ableton Push 2, stretch goal).

## Video Output
- **Syphon** (Mac): For outputting video to external apps (e.g., VDMX, Resolume, stretch goal).
- **Spout** (Windows): Alternative to Syphon for Windows (stretch goal).

## QR Code and Credits
- **qrcode**: Node.js library to generate QR codes for creator credits.

## Storage
- **electron-store**: For saving settings (e.g., active services, log location).
- Local file system for caching media.

## Keyboard Shortcuts
- **electron-global-shortcut**: For registering keyboard shortcuts ("A" and "B" to assign videos to pads).

## Development Tools
- **Cursor**: AI-powered IDE for code generation and troubleshooting.
- **Grok**: AI assistant for planning, prompting, and debugging.