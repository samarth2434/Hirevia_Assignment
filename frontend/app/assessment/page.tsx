'use client';

import React, { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { AssessmentForm } from '@/components/AssessmentForm';
import { AssessmentResult } from '@/components/AssessmentResult';
import { AssessmentFormData } from '@/types/assessment';

export default function AssessmentPage() {
  const [submittedData, setSubmittedData] = useState<AssessmentFormData | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSubmitSuccess = (data: AssessmentFormData) => {
    setSubmittedData(data);
    setShowResult(true);
  };

  const handleStartNew = () => {
    setSubmittedData(null);
    setShowResult(false);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          {showResult && submittedData ? (
            <AssessmentResult 
              data={submittedData} 
              onStartNew={handleStartNew}
            />
          ) : (
            <AssessmentForm onSubmitSuccess={handleSubmitSuccess} />
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}