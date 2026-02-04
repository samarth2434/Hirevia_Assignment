'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

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

export const useWebRTC = (): UseWebRTCReturn => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startVideo = useCallback(async () => {
    try {
      setError(null);
      console.log('🎥 Starting video...');
      
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

      console.log('✅ Got media stream:', stream);
      console.log('📹 Video tracks:', stream.getVideoTracks());
      console.log('🎤 Audio tracks:', stream.getAudioTracks());

      setLocalStream(stream);
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
        console.log('✅ Set video srcObject');
        
        // Force video to play
        localVideoRef.current.play().catch(e => {
          console.error('❌ Video play failed:', e);
        });
      } else {
        console.error('❌ localVideoRef.current is null');
      }

      setIsConnected(true);
      
      // Simulate remote stream for demo purposes
      if (remoteVideoRef.current) {
        // Create a placeholder for remote video
        const canvas = document.createElement('canvas');
        canvas.width = 640;
        canvas.height = 480;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          // Create animated placeholder
          const animate = () => {
            ctx.fillStyle = '#4F46E5';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = 'white';
            ctx.font = '24px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Candidate Video', canvas.width / 2, canvas.height / 2 - 20);
            ctx.fillText('(Simulated)', canvas.width / 2, canvas.height / 2 + 20);
            
            // Add timestamp
            ctx.font = '16px Arial';
            ctx.fillText(new Date().toLocaleTimeString(), canvas.width / 2, canvas.height / 2 + 60);
            
            requestAnimationFrame(animate);
          };
          animate();
          
          const remoteStream = canvas.captureStream(30);
          remoteVideoRef.current.srcObject = remoteStream;
        }
      }

    } catch (err) {
      console.error('❌ Error accessing media devices:', err);
      setError(err instanceof Error ? err.message : 'Failed to access camera/microphone');
    }
  }, []);

  const stopVideo = useCallback(() => {
    if (localStream) {
      localStream.getTracks().forEach(track => {
        track.stop();
      });
      setLocalStream(null);
    }

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }

    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }

    setIsConnected(false);
    setError(null);
  }, [localStream]);

  const toggleVideo = useCallback(() => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);
      }
    }
  }, [localStream]);

  const toggleAudio = useCallback(() => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioEnabled(audioTrack.enabled);
      }
    }
  }, [localStream]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopVideo();
    };
  }, [stopVideo]);

  return {
    localVideoRef,
    remoteVideoRef,
    localStream,
    isVideoEnabled,
    isAudioEnabled,
    isConnected,
    error,
    startVideo,
    stopVideo,
    toggleVideo,
    toggleAudio,
  };
};