'use client';

import { VideoInterview } from '@/components/VideoInterview';

export default function InterviewPage() {
  const handleInterviewStart = () => {
    console.log('Interview started');
    // You can add analytics, logging, or other start actions here
  };

  const handleInterviewEnd = () => {
    console.log('Interview ended');
    // You can add cleanup, data saving, or redirect logic here
    
    // Optional: Show completion message
    setTimeout(() => {
      if (confirm('Interview completed. Would you like to return to the home page?')) {
        window.location.href = '/';
      }
    }, 1000);
  };

  return (
    <VideoInterview
      interviewDuration={1800} // 30 minutes
      onInterviewStart={handleInterviewStart}
      onInterviewEnd={handleInterviewEnd}
    />
  );
}