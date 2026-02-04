'use client';

import React from 'react';
import { useTimer } from '@/hooks/useTimer';

interface TimerProps {
  duration: number; // Duration in seconds
  onExpired?: () => void;
  onWarning?: () => void;
  autoStart?: boolean;
}

export const Timer: React.FC<TimerProps> = ({ 
  duration, 
  onExpired, 
  onWarning, 
  autoStart = false 
}) => {
  const {
    timeLeft,
    isRunning,
    isWarning,
    isExpired,
    formattedTime,
    start,
    stop,
    reset,
    pause,
    resume,
  } = useTimer(duration);

  // Handle callbacks
  React.useEffect(() => {
    if (isExpired && onExpired) {
      onExpired();
    }
  }, [isExpired, onExpired]);

  React.useEffect(() => {
    if (isWarning && onWarning) {
      onWarning();
    }
  }, [isWarning, onWarning]);

  // Auto start if specified
  React.useEffect(() => {
    if (autoStart) {
      start();
    }
  }, [autoStart, start]);

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Timer Display */}
      <div className={`
        text-6xl font-mono font-bold px-6 py-4 rounded-lg border-2 transition-all duration-300
        ${isExpired 
          ? 'text-red-500 border-red-500 bg-red-50 animate-pulse-red' 
          : isWarning 
            ? 'text-yellow-500 border-yellow-500 bg-yellow-50 timer-warning' 
            : 'text-green-500 border-green-500 bg-green-50'
        }
      `}>
        {formattedTime}
      </div>

      {/* Status Indicator */}
      <div className="flex items-center space-x-2">
        <div className={`
          w-3 h-3 rounded-full transition-colors duration-300
          ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}
        `} />
        <span className="text-sm font-medium text-gray-600">
          {isExpired 
            ? 'Time Expired!' 
            : isWarning 
              ? 'Less than 1 minute left!' 
              : isRunning 
                ? 'Interview in progress...' 
                : 'Interview paused'
          }
        </span>
      </div>

      {/* Timer Controls */}
      <div className="flex space-x-3">
        {!isRunning ? (
          <button
            onClick={timeLeft === duration ? start : resume}
            className="control-btn px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
          >
            {timeLeft === duration ? 'Start' : 'Resume'}
          </button>
        ) : (
          <button
            onClick={pause}
            className="control-btn px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium transition-colors"
          >
            Pause
          </button>
        )}
        
        <button
          onClick={stop}
          className="control-btn px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
        >
          Stop
        </button>
        
        <button
          onClick={reset}
          className="control-btn px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-md bg-gray-200 rounded-full h-2">
        <div 
          className={`
            h-2 rounded-full transition-all duration-1000 ease-linear
            ${isExpired 
              ? 'bg-red-500' 
              : isWarning 
                ? 'bg-yellow-500' 
                : 'bg-green-500'
            }
          `}
          style={{ 
            width: `${Math.max(0, (timeLeft / duration) * 100)}%` 
          }}
        />
      </div>
    </div>
  );
};