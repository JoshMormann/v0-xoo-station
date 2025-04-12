# XooStation Product Requirements Document (PRD)

## Overview
XooStation is a real-time video and GIF sourcing tool for VJs, enabling them to search, preview, and assign media to MIDI pads for live performances. Built as an Electron app, it supports Windows and Mac, integrates with MIDI devices (initially Ableton Push 2), and outputs video via the Syphon spec (Mac) or Spout (Windows). It features a QR code toggle to display creator credits during live sets, ensuring ethical attribution.

## Goals
- Enable VJs to source videos and GIFs in real-time from YouTube, Giphy, Vimeo, and Twitch.
- Allow drag-and-drop assignment of media to MIDI pads for triggering via a connected device.
- Provide video mixing with a crossfader and output to external apps (e.g., VDMX, Resolume).
- Display creator credits via a QR code toggle for ethical attribution.

## Target Audience
- VJs and live performance artists who need to source and mix media on the fly.
- Designers and developers at our company, as a proof-of-concept for AI-driven prototyping.

## Terminology
- **Discovery Section**: The left-hand side of the UI, containing the Preferences/Settings menu, Search, Source Tabs, Preview/Results Grid, Credits, and Credit Toggle.
- **Search**: The search field at the top of the Discovery Section, with recent searches displayed as clickable chips below (e.g., "animation", "music videos"). Search terms apply to all Source Tabs.
- **Source Tab**: Tabs for each media source (YouTube, Giphy, Vimeo, Twitch) to view search results in a 3x3 grid of Preview Thumbnails.
- **Preview Thumbnails**: Thumbnails of the top 9 search results, displayed in a 3x3 grid below the Source Tabs. Clicking a thumbnail selects it and plays the video/GIF in place within the thumbnail.
- **Preview/Results Grid**: The 3x3 grid of Preview Thumbnails.
- **Credits**: A section below the Preview Grid showing the title and creator of the currently selected video (if the Credit Toggle is off) or the 100% active video (if the Credit Toggle is on, based on the Fader position).
- **Credit Toggle**: A toggle button to the right of the Credits section, displaying a QR code with the URL of the currently playing video (A or B) when the Fader is at 100% for either video. The QR code position is set in Preferences/Settings. The toggle automatically turns off if the Fader is not at 100% for either video.
- **Performance Section**: The right-hand side of the UI, containing the A/B Video Players, Controller Grid, and Fader.
- **A/B Video Players**: Two video players at the top of the Performance Section, displaying videos/GIFs. Each player shows a numeric percentage overlay in the bottom-right corner, reflecting the Fader’s mix (e.g., 100%/0%, 50%/50%).
- **Controller Grid**: A grid below the A/B Video Players, mapped to the Ableton Push 2 MIDI controller:
  - **Column Triggers**: A 1x8 row at the top (8 buttons). The first 4 buttons correlate to Video Player A, the last 4 to Video Player B. Clicking a button plays the last video selected in that column and sets the Fader to 100% for the corresponding player.
  - **Performance Triggers**: An 8x8 grid (64 pads) below the Column Triggers. The first 4 columns (32 pads) correlate to Video Player A, the last 4 columns (32 pads) to Video Player B. Clicking a pad plays its assigned video/GIF without affecting the Fader. Assigned pads display a thumbnail with a subtle box shadow; unassigned pads are blank gray rectangles with no shadow.
- **Fader**: A horizontal slider below the Controller Grid, controlling the mix between Video Players A and B. At the left, Video A is 100%; at the right, Video B is 100%; in the middle, both are 50%/50%.

## Key Features

### 1. Search and Preview
- **Search Bar**: A text input at the top of the Discovery Section, with recent searches displayed as clickable chips below (e.g., "animation", "music videos"). Search terms apply to all Source Tabs.
- **Source Tabs**: Tabs for YouTube, Giphy (initially), with Vimeo and Twitch as stretch goals. Each tab displays search results in a 3x3 Preview Grid.
- **Preview Grid**: A 3x3 grid of Preview Thumbnails showing the top 9 search results. Clicking a thumbnail selects it and plays the video/GIF in place within the thumbnail.
- **Initial State**: When no search is performed, the Preview Grid is empty (as shown in the "empty search state" design).

### 2. MIDI Pad Integration
- **Controller Grid**:
  - **Column Triggers**: 1x8 row (8 buttons). First 4 buttons play the last video in their column on Video Player A and set the Fader to 100% for A. Last 4 buttons do the same for Video Player B.
  - **Performance Triggers**: 8x8 grid (64 pads). First 4 columns (32 pads) play on Video Player A; last 4 columns (32 pads) play on Video Player B. Pads play their assigned media without affecting the Fader.
- **Assignment**:
  - Drag-and-drop from the Preview Grid to a pad in the Controller Grid.
  - Keyboard shortcuts: Press "A" to assign the selected video to the next available pad on the A side (first 4 columns); press "B" for the B side (last 4 columns).
- **Visuals**: Assigned pads show a thumbnail with a subtle box shadow; unassigned pads are blank gray rectangles.
- **MIDI Support**: Trigger playback via Ableton Push 2 MIDI input (stretch goal for prototype).

### 3. Video Playback and Mixing
- **A/B Video Players**: Two players at the top of the Performance Section, displaying videos/GIFs. Each player shows a percentage overlay (e.g., 100%/0%, 50%/50%) based on the Fader position.
- **Fader**: A horizontal slider below the Controller Grid, blending between Video Players A and B. Left: 100% A; right: 100% B; middle: 50%/50%.
- **Output**: Output the mixed video via Syphon (Mac) or Spout (Windows) to external apps like VDMX or Resolume (stretch goal).

### 4. Credit Attribution
- **Credits Section**: Below the Preview Grid, showing the title and creator of the selected video (Credit Toggle off) or the 100% active video (Credit Toggle on, based on Fader).
- **Credit Toggle**: A toggle button to the right of the Credits section. When on, displays a QR code with the URL of the 100% active video (A or B). The QR code position is set in Preferences/Settings. The toggle auto-disables if the Fader is not at 100% for either video.
- **Visuals**: When the toggle is on, the QR code appears next to the toggle button (as shown in the "QR code on" design).

### 5. Preferences/Settings
- **Active Services**: Toggle services (YouTube, Giphy, Vimeo, Twitch). At least one must be active to save preferences.
- **Set Log**: Choose to save the set log locally or push to the XooStation API.
- **Credit Placement**: Toggle QR code placement on the screen (options shown in the "preferences panel" design).
- **Design Reference**: Figma Preference Panel design: [link provided].

## Non-Functional Requirements
- Cross-platform support (Windows, Mac) via Electron.
- Dark theme UI to match the designs (black background, gray accents, green/red highlights).
- Responsive performance for live use (cache media locally to avoid lag).

## Success Metrics
- Build a functional prototype in 1-2 weeks using Cursor and AI assistance.
- Successfully demo XooStation, showing real-time media sourcing, drag-and-drop, and video mixing.
- Use the project to learn AI-driven development processes for a future hackathon.