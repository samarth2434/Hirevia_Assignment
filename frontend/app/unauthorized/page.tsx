'use client';

export default function UnauthorizedPage() {
  const navigateTo = (path: string) => {
    window.location.href = path;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-red-600">403</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mt-4">
            Access Denied
          </h2>
          <p className="text-gray-600 mt-2">
            You don't have permission to access this resource.
          </p>
        </div>
        
        <button
          onClick={() => navigateTo('/dashboard')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-block transition-colors cursor-pointer"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}