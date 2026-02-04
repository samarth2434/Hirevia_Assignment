'use client';

import React from 'react';

interface CameraControlsProps {
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  isConnected: boolean;
  onToggleVideo: () => void;
  onToggleAudio: () => void;
  onStartVideo: () => void;
  onStopVideo: () => void;
}

export const CameraControls: React.FC<CameraControlsProps> = ({
  isVideoEnabled,
  isAudioEnabled,
  isConnected,
  onToggleVideo,
  onToggleAudio,
  onStartVideo,
  onStopVideo,
}) => {
  return (
    <div className="flex items-center justify-center space-x-4 p-4 bg-control-bg rounded-lg">
      {/* Video Toggle */}
      <button
        onClick={onToggleVideo}
        disabled={!isConnected}
        className={`
          control-btn p-3 rounded-full transition-all duration-200
          ${isVideoEnabled 
            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
            : 'bg-red-600 hover:bg-red-700 text-white'
          }
          ${!isConnected ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        title={isVideoEnabled ? 'Turn off camera' : 'Turn on camera'}
      >
        {isVideoEnabled ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A2 2 0 0017 14V6a2 2 0 00-2-2h-2.586l-.707-.707A1 1 0 0011 3H9a1 1 0 00-.707.293L7.586 4H5a2 2 0 00-2 2v8c0 .601.265 1.14.686 1.510L3.707 2.293z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      {/* Audio Toggle */}
      <button
        onClick={onToggleAudio}
        disabled={!isConnected}
        className={`
          control-btn p-3 rounded-full transition-all duration-200
          ${isAudioEnabled 
            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
            : 'bg-red-600 hover:bg-red-700 text-white'
          }
          ${!isConnected ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        title={isAudioEnabled ? 'Mute microphone' : 'Unmute microphone'}
      >
        {isAudioEnabled ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0L18.485 7.757a1 1 0 010 1.414L17.071 10.585a1 1 0 11-1.414-1.414L16.899 8l-1.242-1.243a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      {/* Start/Stop Interview */}
      {!isConnected ? (
        <button
          onClick={onStartVideo}
          className="control-btn px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
        >
          Start Interview
        </button>
      ) : (
        <button
          onClick={onStopVideo}
          className="control-btn px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
        >
          End Interview
        </button>
      )}

      {/* Connection Status */}
      <div className="flex items-center space-x-2 ml-4">
        <div className={`
          w-3 h-3 rounded-full transition-colors duration-300
          ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}
        `} />
        <span className="text-sm font-medium text-gray-300">
          {isConnected ? 'Connected' : 'Disconnected'}
        </span>
      </div>
    </div>
  );
};