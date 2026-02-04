'use client';

export default function Home() {
  const navigateToInterview = () => {
    window.location.href = '/interview';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center text-white">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-4">
            Video Interview Interface
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Professional real-time video interview system with WebRTC technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-lg">
            <div className="text-4xl mb-4">🎥</div>
            <h3 className="text-xl font-semibold mb-2">WebRTC Video</h3>
            <p className="text-gray-300">
              Native browser video streaming with high quality and low latency
            </p>
          </div>
          
          <div className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-lg">
            <div className="text-4xl mb-4">⏱️</div>
            <h3 className="text-xl font-semibold mb-2">Smart Timer</h3>
            <p className="text-gray-300">
              Countdown timer with warnings and automatic session management
            </p>
          </div>
          
          <div className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-lg">
            <div className="text-4xl mb-4">🎛️</div>
            <h3 className="text-xl font-semibold mb-2">Full Controls</h3>
            <p className="text-gray-300">
              Complete camera and audio controls with real-time feedback
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={navigateToInterview}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105"
          >
            Start Video Interview
          </button>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => window.location.href = '/test'}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-medium"
            >
              Test Camera
            </button>
          </div>
          
          <p className="text-sm text-gray-400">
            Make sure your camera and microphone permissions are enabled
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div>
            <h3 className="text-lg font-semibold mb-3">Features</h3>
            <ul className="space-y-2 text-gray-300">
              <li>✅ Real-time video streaming</li>
              <li>✅ Interview timer with warnings</li>
              <li>✅ Camera and audio controls</li>
              <li>✅ Responsive design</li>
              <li>✅ Clean media track cleanup</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Technology</h3>
            <ul className="space-y-2 text-gray-300">
              <li>🔧 Next.js 14 with App Router</li>
              <li>🔧 WebRTC getUserMedia API</li>
              <li>🔧 Custom React Hooks</li>
              <li>🔧 Tailwind CSS Styling</li>
              <li>🔧 TypeScript Support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}