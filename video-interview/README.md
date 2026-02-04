# Real-Time Video Interview Interface

A complete video interview system built with Next.js, WebRTC, and Tailwind CSS.

## Features

- 🎥 **WebRTC Video Streaming**: Native browser video capture
- ⏱️ **Interview Timer**: Countdown with warnings
- 🔄 **Camera Controls**: Toggle on/off functionality
- 📱 **Responsive Layout**: Main video + floating self-preview
- 🎛️ **Interview Controls**: Start/Stop session management
- 🧹 **Clean Cleanup**: Proper media track disposal

## Components

- `VideoInterview` - Main interview interface
- `Timer` - Countdown timer with warnings
- `VideoPlayer` - WebRTC video stream handler
- `CameraControls` - Camera toggle controls

## WebRTC Flow

1. **getUserMedia()** - Request camera/microphone access
2. **Stream Display** - Show local video feed
3. **Remote Simulation** - Placeholder for candidate stream
4. **Cleanup** - Properly dispose media tracks on unmount

## Quick Start

```bash
cd video-interview
npm install
npm run dev
```

Open: http://localhost:3000/interview