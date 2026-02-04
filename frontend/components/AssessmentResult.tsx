'use client';

import React from 'react';
import { AssessmentFormData, assessmentQuestions, skillOptions, experienceLevels } from '@/types/assessment';

interface AssessmentResultProps {
  data: AssessmentFormData;
  onStartNew: () => void;
}

export const AssessmentResult: React.FC<AssessmentResultProps> = ({ data, onStartNew }) => {
  const getExperienceLabel = (value: string) => {
    return experienceLevels.find(level => level.value === value)?.label || value;
  };

  const getQuestionText = (questionId: string) => {
    return assessmentQuestions.find(q => q.id === questionId)?.question || questionId;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-900 mb-4 border border-green-700">
          <svg className="h-8 w-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Assessment Submitted Successfully!
        </h1>
        <p className="text-lg text-gray-300">
          Thank you for completing the technical assessment. Your responses have been recorded.
        </p>
      </div>

      {/* Submitted Answers */}
      <div className="space-y-8">
        {/* Personal Information */}
        <section className="border-b border-gray-600 pb-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
              <h3 className="font-medium text-gray-300 mb-1">Full Name</h3>
              <p className="text-white">{data.fullName}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
              <h3 className="font-medium text-gray-300 mb-1">Email</h3>
              <p className="text-white">{data.email}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg md:col-span-2 border border-gray-600">
              <h3 className="font-medium text-gray-300 mb-1">Experience Level</h3>
              <p className="text-white">{getExperienceLabel(data.experience)}</p>
            </div>
          </div>
        </section>

        {/* Technical Questions */}
        <section className="border-b border-gray-600 pb-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Technical Questions
          </h2>
          <div className="space-y-4">
            {assessmentQuestions.map((question, index) => (
              <div key={question.id} className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                <h3 className="font-medium text-gray-300 mb-2">
                  {index + 1}. {question.question}
                </h3>
                <p className="text-white bg-gray-800 p-3 rounded border-l-4 border-blue-500">
                  {data[question.id as keyof AssessmentFormData] as string}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Questions */}
        <section className="border-b border-gray-600 pb-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Experience Questions
          </h2>
          <div className="space-y-4">
            <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
              <h3 className="font-medium text-gray-300 mb-2">
                Coding Experience
              </h3>
              <div className="text-white bg-gray-800 p-3 rounded border-l-4 border-green-500">
                <p className="whitespace-pre-wrap">{data.codingExperience}</p>
              </div>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
              <h3 className="font-medium text-gray-300 mb-2">
                Project Description
              </h3>
              <div className="text-white bg-gray-800 p-3 rounded border-l-4 border-green-500">
                <p className="whitespace-pre-wrap">{data.projectDescription}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="border-b border-gray-600 pb-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Technical Skills
          </h2>
          <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
            <h3 className="font-medium text-gray-300 mb-3">
              Selected Skills ({data.skills.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-900 text-blue-200 border border-blue-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="bg-blue-900 p-6 rounded-lg border border-blue-700">
          <h2 className="text-xl font-semibold text-blue-200 mb-4">
            Assessment Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
              <div className="text-2xl font-bold text-blue-400 mb-1">
                {assessmentQuestions.length}
              </div>
              <div className="text-sm text-gray-300">Questions Answered</div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
              <div className="text-2xl font-bold text-green-400 mb-1">
                {data.skills.length}
              </div>
              <div className="text-sm text-gray-300">Skills Selected</div>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
              <div className="text-2xl font-bold text-purple-400 mb-1">
                100%
              </div>
              <div className="text-sm text-gray-300">Completion Rate</div>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="text-center">
          <div className="bg-green-900 p-6 rounded-lg mb-6 border border-green-700">
            <h2 className="text-xl font-semibold text-green-200 mb-2">
              What's Next?
            </h2>
            <p className="text-green-300 mb-4">
              Our team will review your assessment and get back to you within 2-3 business days.
              You'll receive an email with the next steps in the interview process.
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-green-400">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Assessment Reviewed
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Email Notification
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                </svg>
                Interview Scheduled
              </div>
            </div>
          </div>

          <div className="space-x-4">
            <button
              onClick={onStartNew}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
            >
              Take Another Assessment
            </button>
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md font-medium transition-colors"
            >
              Return to Dashboard
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};