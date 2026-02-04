import { z } from 'zod';

// Assessment form schema with validation
export const assessmentSchema = z.object({
  // Personal Information
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  experience: z.string().min(1, 'Please select your experience level'),
  
  // Multiple Choice Questions
  question1: z.string().min(1, 'Please select an answer for Question 1'),
  question2: z.string().min(1, 'Please select an answer for Question 2'),
  question3: z.string().min(1, 'Please select an answer for Question 3'),
  
  // Text Input Questions
  codingExperience: z.string().min(10, 'Please provide at least 10 characters describing your experience'),
  projectDescription: z.string().min(20, 'Please provide at least 20 characters describing a project'),
  
  // Checkbox Questions (Skills)
  skills: z.array(z.string()).min(1, 'Please select at least one skill'),
  
  // Agreement
  termsAccepted: z.boolean().refine(val => val === true, 'You must accept the terms and conditions'),
});

export type AssessmentFormData = z.infer<typeof assessmentSchema>;

// Question definitions
export interface Question {
  id: string;
  type: 'radio' | 'text' | 'textarea' | 'checkbox';
  question: string;
  options?: string[];
  required: boolean;
  placeholder?: string;
}

export const assessmentQuestions: Question[] = [
  {
    id: 'question1',
    type: 'radio',
    question: 'What is the primary purpose of React hooks?',
    options: [
      'To replace class components entirely',
      'To manage state and side effects in functional components',
      'To improve performance of React applications',
      'To handle routing in React applications'
    ],
    required: true
  },
  {
    id: 'question2',
    type: 'radio',
    question: 'Which HTTP method is typically used for updating existing resources?',
    options: [
      'GET',
      'POST',
      'PUT',
      'DELETE'
    ],
    required: true
  },
  {
    id: 'question3',
    type: 'radio',
    question: 'What is the main advantage of using TypeScript over JavaScript?',
    options: [
      'Better performance at runtime',
      'Static type checking and better IDE support',
      'Smaller bundle sizes',
      'Built-in testing framework'
    ],
    required: true
  }
];

export const skillOptions = [
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Python',
  'Java',
  'Spring Boot',
  'SQL',
  'MongoDB',
  'AWS',
  'Docker',
  'Git',
  'REST APIs',
  'GraphQL'
];

export const experienceLevels = [
  { value: 'junior', label: '0-2 years (Junior)' },
  { value: 'mid', label: '2-5 years (Mid-level)' },
  { value: 'senior', label: '5+ years (Senior)' },
  { value: 'lead', label: '8+ years (Lead/Architect)' }
];