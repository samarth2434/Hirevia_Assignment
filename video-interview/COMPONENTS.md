# Component Documentation

## Architecture Overview

The video interview interface is built with a modular component architecture using React hooks for state management and WebRTC for video streaming.

```
VideoInterview (Main Container)
├── Timer (Interview countdown)
├── VideoPlayer (Remote video - Candidate)
├── VideoPlayer (Local video - Self preview)
└── CameraControls (Media controls)

Custom Hooks:
├── useWebRTC (WebRTC stream management)
└── useTimer (Countdown timer logic)
```

## Components

### 1. VideoInterview (Main Component)

**Purpose**: Main container that orchestrates the entire interview interface

**Props**:
```typescript
interface VideoInterviewProps {
  interviewDuration?: number; // Duration in seconds (default: 30 minutes)
  onInterviewEnd?: () => void;
  onInterviewStart?: () => void;
}
```

**Features**:
- Layout management (main video + sidebar)
- Interview session control
- Error handling and warnings
- Integration of all sub-components

**Usage**:
```tsx
<VideoInterview
  interviewDuration={1800} // 30 minutes
  onInterviewStart={() => console.log('Started')}
  onInterviewEnd={() => console.log('Ended')}
/>
```

### 2. Timer Component

**Purpose**: Countdown timer with visual warnings and controls

**Props**:
```typescript
interface TimerProps {
  duration: number; // Duration in seconds
  onExpired?: () => void;
  onWarning?: () => void;
  autoStart?: boolean;
}
```

**Features**:
- MM:SS format display
- Color-coded warnings (green → yellow → red)
- Progress bar visualization
- Start/Stop/Pause/Reset controls
- Auto-expiration handling

**States**:
- **Green**: Normal time remaining
- **Yellow**: Warning (< 1 minute)
- **Red**: Time expired

### 3. VideoPlayer Component

**Purpose**: Video stream display with overlays and status indicators

**Props**:
```typescript
interface VideoPlayerProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isLocal?: boolean;
  isVideoEnabled?: boolean;
  className?: string;
  placeholder?: string;
}
```

**Features**:
- Loading state overlay
- Error state handling
- Video disabled overlay
- Recording indicator (for local video)
- Stream labels and status

**Overlays**:
- Loading spinner during stream initialization
- Camera off icon when video disabled
- Error message for stream failures
- Recording indicator with pulsing dot

### 4. CameraControls Component

**Purpose**: Media device controls and session management

**Props**:
```typescript
interface CameraControlsProps {
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  isConnected: boolean;
  onToggleVideo: () => void;
  onToggleAudio: () => void;
  onStartVideo: () => void;
  onStopVideo: () => void;
}
```

**Features**:
- Video toggle (camera on/off)
- Audio toggle (microphone mute/unmute)
- Start/End interview buttons
- Connection status indicator
- Visual feedback for all states

## Custom Hooks

### 1. useWebRTC Hook

**Purpose**: Manages WebRTC media streams and device access

**Returns**:
```typescript
interface UseWebRTCReturn {
  localVideoRef: React.RefObject<HTMLVideoElement>;
  remoteVideoRef: React.RefObject<HTMLVideoElement>;
  localStream: MediaStream | null;
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  isConnected: boolean;
  error: string | null;
  startVideo: () => Promise<void>;
  stopVideo: () => void;
  toggleVideo: () => void;
  toggleAudio: () => void;
}
```

**Key Functions**:
- `startVideo()`: Requests camera access and starts streaming
- `stopVideo()`: Stops all tracks and cleans up resources
- `toggleVideo()`: Enables/disables video track
- `toggleAudio()`: Enables/disables audio track

**Error Handling**:
- Permission denied
- Device not found
- Device already in use
- Constraint not supported

### 2. useTimer Hook

**Purpose**: Countdown timer with advanced controls

**Returns**:
```typescript
interface UseTimerReturn {
  timeLeft: number;
  isRunning: boolean;
  isWarning: boolean;
  isExpired: boolean;
  formattedTime: string;
  start: () => void;
  stop: () => void;
  reset: () => void;
  pause: () => void;
  resume: () => void;
}
```

**Features**:
- Automatic countdown
- Warning threshold detection
- Formatted time display (MM:SS)
- Multiple control methods
- Auto-cleanup on unmount

## Styling with Tailwind CSS

### Color Scheme
```css
/* Background colors */
--video-bg: #1a1a1a (dark background)
--control-bg: #2d2d2d (control panel background)

/* Status colors */
--green: Success/Normal state
--yellow: Warning state
--red: Error/Critical state
--blue: Active/Interactive elements
```

### Responsive Design
- Mobile-first approach
- Grid layout for desktop (3 columns)
- Stack layout for mobile (1 column)
- Flexible video aspect ratios

### Animations
```css
/* Custom animations */
.timer-warning: pulse animation for warnings
.control-btn: hover and active state transitions
.animate-pulse-red: red pulsing for expired timer
```

## State Management Flow

```
User Action → Hook State Update → Component Re-render → UI Update

Example: Toggle Video
1. User clicks video button
2. CameraControls calls onToggleVideo
3. useWebRTC toggles video track
4. isVideoEnabled state updates
5. VideoPlayer shows/hides video
6. CameraControls updates button appearance
```

## Error Boundaries and Handling

### Component Level
- Each component handles its own loading states
- Error messages displayed inline
- Graceful degradation for missing features

### Hook Level
- WebRTC errors caught and exposed as state
- Timer errors handled internally
- Cleanup guaranteed on unmount

### Global Level
- Interview-level error handling
- Session recovery mechanisms
- User feedback for critical errors

## Performance Considerations

### Optimization Strategies
1. **Memoization**: useCallback for event handlers
2. **Cleanup**: Proper resource disposal
3. **Lazy Loading**: Components loaded on demand
4. **Stream Management**: Efficient track handling

### Memory Management
- MediaStream tracks properly stopped
- Event listeners cleaned up
- Interval timers cleared
- Component refs nullified

## Testing Strategy

### Unit Tests
- Hook behavior testing
- Component rendering tests
- State transition validation

### Integration Tests
- WebRTC flow testing
- Timer integration
- Error scenario handling

### E2E Tests
- Full interview flow
- Browser compatibility
- Permission handling