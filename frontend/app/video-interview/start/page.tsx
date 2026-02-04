'use client';

import VideoInterview from '@/components/video-interview/VideoInterview';

export default function InterviewPage() {
  const handleInterviewStart = () => {
    console.log('Interview started');
  };

  const handleInterviewEnd = () => {
    console.log('Interview ended');
    
    setTimeout(() => {
      if (confirm('Interview completed. Would you like to return to the dashboard?')) {
        window.location.href = '/dashboard';
      }
    }, 1000);
  };

  return (
    <VideoInterview
      interviewDuration={1800}
      onInterviewStart={handleInterviewStart}
      onInterviewEnd={handleInterviewEnd}
    />
  );
}
