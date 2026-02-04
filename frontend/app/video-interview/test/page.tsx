'use client';

import { useState, useRef, useEffect } from 'react';

export default function TestPage() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startCamera = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setError(`Camera error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
    
    setIsLoading(false);
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Camera Test
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex gap-4 mb-6">
            <button
              onClick={startCamera}
              disabled={isLoading || !!stream}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {isLoading ? 'Starting...' : 'Start Camera'}
            </button>
            
            <button
              onClick={stopCamera}
              disabled={!stream}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Stop Camera
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="relative bg-black rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            
            {!stream && (
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-6xl mb-4">📹</div>
                  <p>Click "Start Camera" to begin</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Debug Info:</h3>
          <ul className="text-sm text-blue-700 space-y-2">
            <li>Camera: {stream ? '✅ Active' : '❌ Inactive'}</li>
            <li>Loading: {isLoading ? '⏳ Yes' : '✅ No'}</li>
            <li>Error: {error ? '❌ Yes' : '✅ No'}</li>
            <li>Video Element: {videoRef.current ? '✅ Found' : '❌ Missing'}</li>
            <li>Stream Object: {stream ? `✅ ${stream.id}` : '❌ None'}</li>
            {stream && (
              <>
                <li>Video Tracks: {stream.getVideoTracks().length}</li>
                <li>Audio Tracks: {stream.getAudioTracks().length}</li>
              </>
            )}
          </ul>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => window.location.href = '/video-interview'}
            className="text-blue-600 hover:text-blue-800"
          >
            ← Back to Video Interview
          </button>
        </div>
      </div>
    </div>
  );
}
