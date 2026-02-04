'use client';

import React from 'react';

interface VideoPlayerProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isLocal?: boolean;
  isVideoEnabled?: boolean;
  className?: string;
  placeholder?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoRef,
  isLocal = false,
  isVideoEnabled = true,
  className = '',
  placeholder = 'Video Stream'
}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleLoadedData = () => {
      console.log('✅ Video loaded data');
      setIsLoading(false);
      setHasError(false);
    };

    const handleError = (e: Event) => {
      console.error('❌ Video error:', e);
      setIsLoading(false);
      setHasError(true);
    };

    const handleLoadStart = () => {
      console.log('🔄 Video load start');
      setIsLoading(true);
      setHasError(false);
    };

    const handleCanPlay = () => {
      console.log('✅ Video can play');
    };

    videoElement.addEventListener('loadeddata', handleLoadedData);
    videoElement.addEventListener('error', handleError);
    videoElement.addEventListener('loadstart', handleLoadStart);
    videoElement.addEventListener('canplay', handleCanPlay);

    return () => {
      videoElement.removeEventListener('loadeddata', handleLoadedData);
      videoElement.removeEventListener('error', handleError);
      videoElement.removeEventListener('loadstart', handleLoadStart);
      videoElement.removeEventListener('canplay', handleCanPlay);
    };
  }, [videoRef]);

  return (
    <div className={`video-container relative ${className}`}>
      {/* Video Element */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={isLocal} // Mute local video to prevent feedback
        className={`w-full h-full object-cover rounded-lg ${!isVideoEnabled ? 'opacity-0' : ''}`}
        style={{ backgroundColor: '#1f2937' }}
      />

      {/* Video Disabled Overlay */}
      {!isVideoEnabled && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A2 2 0 0017 14V6a2 2 0 00-2-2h-2.586l-.707-.707A1 1 0 0011 3H9a1 1 0 00-.707.293L7.586 4H5a2 2 0 00-2 2v8c0 .601.265 1.14.686 1.510L3.707 2.293zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-sm font-medium">Camera Off</p>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-sm font-medium">Loading {placeholder}...</p>
          </div>
        </div>
      )}

      {/* Error Overlay */}
      {hasError && (
        <div className="absolute inset-0 bg-red-900 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-700 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-sm font-medium">Failed to load video</p>
          </div>
        </div>
      )}

      {/* Video Label */}
      <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs font-medium">
        {isLocal ? 'You' : placeholder}
      </div>

      {/* Recording Indicator */}
      {isLocal && isVideoEnabled && (
        <div className="absolute top-2 right-2 flex items-center space-x-1 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span>REC</span>
        </div>
      )}
    </div>
  );
};