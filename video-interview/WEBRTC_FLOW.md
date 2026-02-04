# WebRTC Flow Explanation

## Overview
This video interview interface uses WebRTC (Web Real-Time Communication) to capture and display video streams directly in the browser without requiring external plugins or servers.

## WebRTC Flow Diagram

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Browser  │    │   getUserMedia  │    │  Video Element  │
│                 │    │       API       │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │ 1. Request Access     │                       │
         │──────────────────────▶│                       │
         │                       │                       │
         │ 2. Permission Dialog  │                       │
         │◀──────────────────────│                       │
         │                       │                       │
         │ 3. Grant Permission   │                       │
         │──────────────────────▶│                       │
         │                       │                       │
         │                       │ 4. Create MediaStream │
         │                       │──────────────────────▶│
         │                       │                       │
         │                       │ 5. Display Video     │
         │◀──────────────────────────────────────────────│
```

## Step-by-Step Process

### 1. **Media Access Request**
```typescript
const stream = await navigator.mediaDevices.getUserMedia({
  video: {
    width: { ideal: 1280 },
    height: { ideal: 720 },
    facingMode: 'user'
  },
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true
  }
});
```

### 2. **Stream Assignment**
```typescript
if (localVideoRef.current) {
  localVideoRef.current.srcObject = stream;
}
```

### 3. **Track Management**
```typescript
// Toggle video track
const videoTrack = stream.getVideoTracks()[0];
videoTrack.enabled = !videoTrack.enabled;

// Toggle audio track
const audioTrack = stream.getAudioTracks()[0];
audioTrack.enabled = !audioTrack.enabled;
```

### 4. **Cleanup Process**
```typescript
// Stop all tracks when component unmounts
stream.getTracks().forEach(track => {
  track.stop();
});
```

## Key Components

### useWebRTC Hook
- **Purpose**: Manages WebRTC media streams and device access
- **Features**:
  - Camera/microphone access
  - Stream management
  - Track control (enable/disable)
  - Error handling
  - Cleanup on unmount

### VideoPlayer Component
- **Purpose**: Displays video streams with overlays and controls
- **Features**:
  - Loading states
  - Error handling
  - Video disabled overlay
  - Recording indicator
  - Stream labels

### Timer Integration
- **Purpose**: Manages interview duration and warnings
- **Features**:
  - Countdown timer
  - Warning notifications
  - Auto-stop on expiration
  - Visual indicators

## Browser Compatibility

| Browser | WebRTC Support | getUserMedia |
|---------|----------------|--------------|
| Chrome  | ✅ Full        | ✅ Yes       |
| Firefox | ✅ Full        | ✅ Yes       |
| Safari  | ✅ Full        | ✅ Yes       |
| Edge    | ✅ Full        | ✅ Yes       |

## Security Considerations

### 1. **HTTPS Requirement**
- WebRTC requires HTTPS in production
- Localhost works for development

### 2. **User Permissions**
- Browser prompts for camera/microphone access
- Users can revoke permissions at any time

### 3. **Privacy**
- No video data is sent to external servers
- All processing happens locally in the browser

## Error Handling

### Common Errors:
1. **NotAllowedError**: User denied permission
2. **NotFoundError**: No camera/microphone found
3. **NotReadableError**: Device is already in use
4. **OverconstrainedError**: Requested constraints not supported

### Error Recovery:
```typescript
try {
  const stream = await navigator.mediaDevices.getUserMedia(constraints);
  // Success handling
} catch (error) {
  switch (error.name) {
    case 'NotAllowedError':
      setError('Camera access denied. Please allow camera access.');
      break;
    case 'NotFoundError':
      setError('No camera found. Please connect a camera.');
      break;
    default:
      setError('Failed to access camera: ' + error.message);
  }
}
```

## Performance Optimization

### 1. **Stream Constraints**
- Optimal resolution: 1280x720
- Frame rate: 30fps (default)
- Audio processing: Echo cancellation enabled

### 2. **Memory Management**
- Proper track cleanup on unmount
- Stream disposal when not needed
- Event listener cleanup

### 3. **UI Optimization**
- Loading states for better UX
- Error boundaries for graceful failures
- Responsive design for all devices

## Future Enhancements

1. **Screen Sharing**: Add screen capture capability
2. **Recording**: Implement MediaRecorder API
3. **Peer Connection**: Add real peer-to-peer communication
4. **Quality Control**: Dynamic quality adjustment
5. **Background Blur**: Add virtual background effects