'use client';

import React, { useState, useCallback } from 'react';
import { useWebRTC } from '@/hooks/useWebRTC';
import { Timer } from './Timer';
import { VideoPlayer } from './VideoPlayer';
import { CameraControls } from './CameraControls';

interface VideoInterviewProps {
  interviewDuration?: number; // Duration in seconds (default: 30 minutes)
  onInterviewEnd?: () => void;
  onInterviewStart?: () => void;
}

export const VideoInterview: React.FC<VideoInterviewProps> = ({
  interviewDuration = 1800, // 30 minutes default
  onInterviewEnd,
  onInterviewStart,
}) => {
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const {
    localVideoRef,
    localStream,
    isVideoEnabled,
    isAudioEnabled,
    isConnected,
    error,
    startVideo,
    stopVideo,
    toggleVideo,
    toggleAudio,
  } = useWebRTC();

  const handleStartInterview = useCallback(async () => {
    try {
      await startVideo();
      setIsInterviewActive(true);
      onInterviewStart?.();
    } catch (err) {
      console.error('Failed to start interview:', err);
    }
  }, [startVideo, onInterviewStart]);

  const handleEndInterview = useCallback(() => {
    stopVideo();
    setIsInterviewActive(false);
    setShowWarning(false);
    onInterviewEnd?.();
  }, [stopVideo, onInterviewEnd]);

  const handleTimerExpired = useCallback(() => {
    handleEndInterview();
    alert('Interview time has expired!');
  }, [handleEndInterview]);

  const handleTimerWarning = useCallback(() => {
    setShowWarning(true);
    // Optional: Play warning sound or show notification
  }, []);

  return (
    <div className="min-h-screen bg-video-bg text-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">Video Interview</h1>
          <p className="text-gray-400">
            {isInterviewActive ? 'Interview in progress' : 'Ready to start interview'}
          </p>
        </div>

        {/* Interview Instructions */}
        {!isInterviewActive && (
          <div className="mb-6 p-6 bg-blue-900 border border-blue-700 rounded-lg">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-blue-400 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-blue-200 font-medium mb-2">Interview Simulation Mode</h3>
                <p className="text-blue-300 text-sm">
                  This is a demo video interview interface. Your camera will be activated when you start the interview. 
                  The interviewer section shows a simulation placeholder - in a real interview, you would see the interviewer's video there.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-900 border border-red-700 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-red-200">{error}</span>
            </div>
          </div>
        )}

        {/* Warning Banner */}
        {showWarning && (
          <div className="mb-6 p-4 bg-yellow-900 border border-yellow-700 rounded-lg animate-pulse">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-yellow-200 font-medium">
                Less than 1 minute remaining in the interview!
              </span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Video Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Remote Video (Candidate) - Mock Interview */}
            <div className="aspect-video">
              <div className="w-full h-full bg-gray-900 rounded-lg flex items-center justify-center relative">
                <div className="text-center text-white">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-lg font-medium">Interview Simulation</p>
                  <p className="text-sm text-gray-400 mt-2">
                    In a real interview, the interviewer's video would appear here
                  </p>
                </div>
                
                {/* Mock Label */}
                <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs font-medium">
                  Interviewer (Simulated)
                </div>
              </div>
            </div>

            {/* Camera Controls */}
            <CameraControls
              isVideoEnabled={isVideoEnabled}
              isAudioEnabled={isAudioEnabled}
              isConnected={isConnected}
              onToggleVideo={toggleVideo}
              onToggleAudio={toggleAudio}
              onStartVideo={handleStartInterview}
              onStopVideo={handleEndInterview}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Timer */}
            <div className="bg-control-bg p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-center">Interview Timer</h3>
              <Timer
                duration={interviewDuration}
                onExpired={handleTimerExpired}
                onWarning={handleTimerWarning}
                autoStart={isInterviewActive}
              />
            </div>

            {/* Local Video (Self Preview) */}
            <div className="bg-control-bg p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-3 text-gray-300">Your Video</h3>
              <div className="aspect-video">
                <VideoPlayer
                  videoRef={localVideoRef}
                  isLocal={true}
                  isVideoEnabled={isVideoEnabled}
                  placeholder="Your Camera"
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Interview Info */}
            <div className="bg-control-bg p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-3 text-gray-300">Session Info</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className={isInterviewActive ? 'text-green-400' : 'text-gray-400'}>
                    {isInterviewActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Duration:</span>
                  <span className="text-gray-300">
                    {Math.floor(interviewDuration / 60)} minutes
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Video:</span>
                  <span className={isVideoEnabled ? 'text-green-400' : 'text-red-400'}>
                    {isVideoEnabled ? 'On' : 'Off'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Audio:</span>
                  <span className={isAudioEnabled ? 'text-green-400' : 'text-red-400'}>
                    {isAudioEnabled ? 'On' : 'Off'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>
            Make sure your camera and microphone are working properly before starting the interview.
          </p>
        </div>
      </div>
    </div>
  );
};