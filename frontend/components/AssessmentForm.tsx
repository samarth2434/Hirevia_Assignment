'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { assessmentSchema, AssessmentFormData, assessmentQuestions, skillOptions, experienceLevels } from '@/types/assessment';
import api from '@/lib/api';

interface AssessmentFormProps {
  onSubmitSuccess: (data: AssessmentFormData) => void;
}

export const AssessmentForm: React.FC<AssessmentFormProps> = ({ onSubmitSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch
  } = useForm<AssessmentFormData>({
    resolver: zodResolver(assessmentSchema),
    mode: 'onChange',
    defaultValues: {
      skills: [],
      termsAccepted: false
    }
  });

  const watchedSkills = watch('skills');

  const onSubmit = async (data: AssessmentFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await api.post('/submit-assessment', {
        ...data,
        submittedAt: new Date().toISOString(),
        userAgent: navigator.userAgent
      });

      if (response.status === 200) {
        onSubmitSuccess(data);
      }
    } catch (error: any) {
      console.error('Assessment submission failed:', error);
      setSubmitError(
        error.response?.data?.message || 
        'Failed to submit assessment. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Technical Assessment
        </h1>
        <p className="text-gray-300">
          Please complete all sections of this assessment. All fields are required.
        </p>
      </div>

      {submitError && (
        <div className="mb-6 p-4 bg-red-900 border border-red-700 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-red-200">{submitError}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Personal Information Section */}
        <section className="border-b border-gray-600 pb-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            Personal Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
                Full Name *
              </label>
              <input
                {...register('fullName')}
                type="text"
                id="fullName"
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-gray-700 ${
                  errors.fullName ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-400">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address *
              </label>
              <input
                {...register('email')}
                type="email"
                id="email"
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-gray-700 ${
                  errors.email ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="experience" className="block text-sm font-medium text-gray-300 mb-2">
              Experience Level *
            </label>
            <select
              {...register('experience')}
              id="experience"
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-gray-700 ${
                errors.experience ? 'border-red-500' : 'border-gray-600'
              }`}
            >
              <option value="">Select your experience level</option>
              {experienceLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
            {errors.experience && (
              <p className="mt-1 text-sm text-red-400">{errors.experience.message}</p>
            )}
          </div>
        </section>

        {/* Multiple Choice Questions */}
        <section className="border-b border-gray-600 pb-8">
          <h2 className="text-xl font-semibold text-white mb-6">
            Technical Questions
          </h2>
          
          {/* Group questions by category */}
          {['Frontend Development', 'Backend Development', 'Database & DevOps'].map((category) => {
            const categoryQuestions = assessmentQuestions.filter(q => q.category === category);
            return (
              <div key={category} className="mb-8">
                <h3 className="text-lg font-medium text-blue-300 mb-4 border-l-4 border-blue-500 pl-3">
                  {category}
                </h3>
                <div className="space-y-6">
                  {categoryQuestions.map((question, index) => {
                    const questionNumber = assessmentQuestions.findIndex(q => q.id === question.id) + 1;
                    return (
                      <div key={question.id} className="bg-gray-700 p-4 rounded-lg">
                        <fieldset>
                          <legend className="text-sm font-medium text-gray-200 mb-3">
                            {questionNumber}. {question.question} *
                          </legend>
                          <div className="space-y-2">
                            {question.options?.map((option, optionIndex) => (
                              <label key={optionIndex} className="flex items-start cursor-pointer hover:bg-gray-600 p-2 rounded transition-colors">
                                <input
                                  {...register(question.id as keyof AssessmentFormData)}
                                  type="radio"
                                  value={option}
                                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-500 bg-gray-600 mt-0.5 flex-shrink-0"
                                />
                                <span className="ml-3 text-sm text-gray-300 leading-relaxed">{option}</span>
                              </label>
                            ))}
                          </div>
                          {errors[question.id as keyof AssessmentFormData] && (
                            <p className="mt-2 text-sm text-red-400">
                              {errors[question.id as keyof AssessmentFormData]?.message}
                            </p>
                          )}
                        </fieldset>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>

        {/* Text Input Questions */}
        <section className="border-b border-gray-600 pb-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            Experience & Problem Solving
          </h2>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="codingExperience" className="block text-sm font-medium text-gray-300 mb-2">
                Describe your coding experience and preferred technologies *
              </label>
              <textarea
                {...register('codingExperience')}
                id="codingExperience"
                rows={4}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-gray-700 ${
                  errors.codingExperience ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="Tell us about your coding background, languages you're comfortable with, frameworks you've used, and your development philosophy..."
              />
              {errors.codingExperience && (
                <p className="mt-1 text-sm text-red-400">{errors.codingExperience.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-300 mb-2">
                Describe a challenging project you've worked on *
              </label>
              <textarea
                {...register('projectDescription')}
                id="projectDescription"
                rows={4}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-gray-700 ${
                  errors.projectDescription ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="Describe a complex project that challenged you, the technologies used, your specific role, obstacles you faced, and what you learned from the experience..."
              />
              {errors.projectDescription && (
                <p className="mt-1 text-sm text-red-400">{errors.projectDescription.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="problemSolving" className="block text-sm font-medium text-gray-300 mb-2">
                How do you approach debugging and problem-solving in your code? *
              </label>
              <textarea
                {...register('problemSolving')}
                id="problemSolving"
                rows={4}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-gray-700 ${
                  errors.problemSolving ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="Describe your methodology for debugging issues, tools you use, how you research solutions, and your approach to solving complex technical problems..."
              />
              {errors.problemSolving && (
                <p className="mt-1 text-sm text-red-400">{errors.problemSolving.message}</p>
              )}
            </div>
          </div>
        </section>

        {/* Skills Checkboxes */}
        <section className="border-b border-gray-600 pb-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            Technical Skills
          </h2>
          
          <fieldset>
            <legend className="text-sm font-medium text-gray-300 mb-3">
              Select all technologies you have experience with *
            </legend>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {skillOptions.map((skill) => (
                <Controller
                  key={skill}
                  name="skills"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        value={skill}
                        checked={field.value?.includes(skill) || false}
                        onChange={(e) => {
                          const updatedSkills = e.target.checked
                            ? [...(field.value || []), skill]
                            : (field.value || []).filter((s) => s !== skill);
                          field.onChange(updatedSkills);
                        }}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 bg-gray-700 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-300">{skill}</span>
                    </label>
                  )}
                />
              ))}
            </div>
            {errors.skills && (
              <p className="mt-1 text-sm text-red-400">{errors.skills.message}</p>
            )}
            {watchedSkills && watchedSkills.length > 0 && (
              <p className="mt-2 text-sm text-gray-400">
                Selected: {watchedSkills.length} skill{watchedSkills.length !== 1 ? 's' : ''}
              </p>
            )}
          </fieldset>
        </section>

        {/* Terms and Conditions */}
        <section className="pb-8">
          <div className="flex items-start">
            <input
              {...register('termsAccepted')}
              type="checkbox"
              id="termsAccepted"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 bg-gray-700 rounded mt-1"
            />
            <label htmlFor="termsAccepted" className="ml-2 text-sm text-gray-300">
              I accept the terms and conditions and confirm that all information provided is accurate *
            </label>
          </div>
          {errors.termsAccepted && (
            <p className="mt-1 text-sm text-red-400">{errors.termsAccepted.message}</p>
          )}
        </section>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !isValid}
            className={`px-8 py-3 rounded-md font-medium transition-colors ${
              isSubmitting || !isValid
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </div>
            ) : (
              'Submit Assessment'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};