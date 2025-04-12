# XooStation Design System

This design system defines the visual and stylistic guidelines for XooStation, a real-time video and GIF sourcing tool for VJs. It ensures consistency across the UI when generating code with Cursor.

## Color Scheme
- **Primary Background**: Dark gray-black (`#707070`).
- **Accents**:
  - Green (`#36C17B`): Active states, highlights, Video A (left side of Fader, first 4 Column Triggers).
  - Red (`#FC4C6A`): Video B (right side of Fader, last 4 Column Triggers).
  - Gray (`#8E8E8E`): Secondary elements (unassigned MIDI pads, borders, toggle off state).
- **Text**:
  - Primary Text: White (`#FFFFFF`).
  - Secondary Text: Light gray (`#B0B0B0`).
- **Toggle States**:
  - On: Green (`#36C17B`).
  - Off: Gray (`#8E8E8E`).

## Typography
- **Font Families**: League Gothic, and Inter (sans-serif).
- **Font Sizes**:
  - Title (e.g., "XooStation" logo): League Gothic Regular, 64px,
  - Form labels (e.g., Search field placeholder, and entry, and QR Credit toggle): League Gothic Regular, 48px,
  - Headings (e.g, search term chips, preference section headings, credits, percentage overlays): League Gothic Regular, 24px,
  - Subheadings: Inter Italic 12px.
  - Body Text (e.g., preference labels): Inter Regular 20px,
- **Text Colors**:
  - Primary: White (`#FFFFFF`).
  - Secondary: Light gray (`#B0B0B0`).

## Spacing and Layout
- **Padding/Margins**:
  - Small: 11px (between elements like Pads in the Performance Grid).
  - Large: 22px (between sections like Thumbnails Preview Grid).
- **Grid Layout**:
  - Preview Grid: 3x3, 22px gaps between thumbnails.
  - Controller Grid:
    - Column Triggers: 1x8, 11px gaps.
    - Performance Triggers: 8x8, 11px gaps.
- **Borders**:
  - Thin: 2px solid gray (`#8E8E8E`) around sections (e.g., Preview Grid, A/B Video Players).
  - Selected: 2px solid blue (`#00BFFF`) for selected Preview Thumbnails, and 2px solid green (`#36C17B`) for selected A Pads, and 2px solid red (`#FC4C6A`) for selected B Pads.

## Component Styles

### Source Tabs
- **Active Tab**: Source Logo SVG, on Medium gray (`#363636`)
- **Inactive Tab**: Source Logo SVG 20% opacity, on Medium Dark gray (`#212121`).
- **Spacing**: 0px.

### Preview Thumbnails
- **Size**: 100x100px, square.
- **Border**:
  - Default: None.
  - Selected: 2px solid blue (`#00BFFF`).
- **Playback**: Video/GIF plays in place when clicked.
- **Grid**: 3x3, 8px gaps.

### Controller Grid
- **Column Triggers (1x8)**:
  - First 4 (Video A): Green (`#36C17B`).
  - Last 4 (Video B): Red (`#FC4C6A`).
  - Size: 40x40px, 4px gaps.
- **Performance Triggers (8x8)**:
  - Unassigned: Gray (`#8E8E8E`), no shadow.
  - Assigned: Thumbnail with subtle box shadow (`shadow-sm`, e.g., `0 1px 2px rgba(0,0,0,0.05)`).
  - Size: 40x40px, 4px gaps.
- **First 4 Columns**: Correlate to Video Player A.
- **Last 4 Columns**: Correlate to Video Player B.

### A/B Video Players
- **Size**: 300x200px each.
- **Percentage Overlay**:
  - Position: Bottom-right corner.
  - Style: White text, 12px, semi-transparent black background (`rgba(0,0,0,0.5)`).
- **Border**: 1px solid gray (`#8E8E8E`).

### Fader
- **Track**: Gradient from green (`#36C17B`) on the left to red (`#FC4C6A`) on the right.
- **Knob**: Gray (`#8E8E8E`), white border (`#FFFFFF`, 1px).
- **Size**: 400px wide, 16px high.

### QR Code Toggle
- **Off State**: Gray background (`#8E8E8E`), white text.
- **On State**: Green background (`#36C17B`), white text.
- **QR Code**:
  - Size: 48x48px.
  - Style: White with a black background.
- **Position**: Right of the Credits section; exact placement set in Preferences.

### Credits Section
- **Background**: Dark gray (`#1C2526`).
- **Text**: White (`#FFFFFF`) for title/creator, 14px.
- **Layout**: Title and creator stacked vertically.

### Recent Search Chips
- **Background**: Light gray (`#B0B0B0`).
- **Text**: White (`#FFFFFF`), 14px.
- **Border Radius**: 4px.
- **Spacing**: 8px between chips.

### Icons and Buttons
- **Menu Icon**: White (`#FFFFFF`), three horizontal lines (hamburger menu).
- **Close Button**: White “X” (`#FFFFFF`), 24px.
- **Button Styles**:
  - Default: Gray background (`#8E8E8E`), white text.
  - Active: Green background (`#36C17B`), white text.

## Accessibility
- **Contrast**: Ensure text has sufficient contrast against backgrounds (e.g., white text on dark gray meets WCAG 2.1 AA standards).
- **Keyboard Navigation**: Support tab navigation for all interactive elements (e.g., Source Tabs, Preview Thumbnails, Fader).
- **Focus States**: Use a blue outline (`#00BFFF`, 2px) for focused elements.