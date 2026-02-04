import { z } from 'zod';

// Assessment form schema with validation
export const assessmentSchema = z.object({
  // Personal Information
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  experience: z.string().min(1, 'Please select your experience level'),
  
  // Multiple Choice Questions - Frontend
  question1: z.string().min(1, 'Please select an answer for Question 1'),
  question2: z.string().min(1, 'Please select an answer for Question 2'),
  question3: z.string().min(1, 'Please select an answer for Question 3'),
  question4: z.string().min(1, 'Please select an answer for Question 4'),
  question5: z.string().min(1, 'Please select an answer for Question 5'),
  
  // Multiple Choice Questions - Backend
  question6: z.string().min(1, 'Please select an answer for Question 6'),
  question7: z.string().min(1, 'Please select an answer for Question 7'),
  question8: z.string().min(1, 'Please select an answer for Question 8'),
  question9: z.string().min(1, 'Please select an answer for Question 9'),
  question10: z.string().min(1, 'Please select an answer for Question 10'),
  
  // Multiple Choice Questions - Database & DevOps
  question11: z.string().min(1, 'Please select an answer for Question 11'),
  question12: z.string().min(1, 'Please select an answer for Question 12'),
  question13: z.string().min(1, 'Please select an answer for Question 13'),
  question14: z.string().min(1, 'Please select an answer for Question 14'),
  question15: z.string().min(1, 'Please select an answer for Question 15'),
  
  // Text Input Questions
  codingExperience: z.string().min(10, 'Please provide at least 10 characters describing your experience'),
  projectDescription: z.string().min(20, 'Please provide at least 20 characters describing a project'),
  problemSolving: z.string().min(15, 'Please provide at least 15 characters describing your approach'),
  
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
  category?: string;
}

export const assessmentQuestions: Question[] = [
  // Frontend Development Questions
  {
    id: 'question1',
    type: 'radio',
    category: 'Frontend Development',
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
    category: 'Frontend Development',
    question: 'Which of the following best describes the Virtual DOM in React?',
    options: [
      'A direct representation of the browser DOM',
      'A JavaScript representation of the UI kept in memory',
      'A server-side rendering technique',
      'A CSS-in-JS solution'
    ],
    required: true
  },
  {
    id: 'question3',
    type: 'radio',
    category: 'Frontend Development',
    question: 'What is the main advantage of using TypeScript over JavaScript?',
    options: [
      'Better performance at runtime',
      'Static type checking and better IDE support',
      'Smaller bundle sizes',
      'Built-in testing framework'
    ],
    required: true
  },
  {
    id: 'question4',
    type: 'radio',
    category: 'Frontend Development',
    question: 'In CSS, what does the "box-sizing: border-box" property do?',
    options: [
      'Includes padding and border in the element\'s total width and height',
      'Excludes padding and border from the element\'s dimensions',
      'Only applies to border calculations',
      'Sets the element to display as a flexbox'
    ],
    required: true
  },
  {
    id: 'question5',
    type: 'radio',
    category: 'Frontend Development',
    question: 'What is the purpose of the useEffect hook in React?',
    options: [
      'To manage component state',
      'To handle side effects and lifecycle events',
      'To optimize component rendering',
      'To create custom hooks'
    ],
    required: true
  },

  // Backend Development Questions
  {
    id: 'question6',
    type: 'radio',
    category: 'Backend Development',
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
    id: 'question7',
    type: 'radio',
    category: 'Backend Development',
    question: 'What is the main difference between authentication and authorization?',
    options: [
      'Authentication verifies identity, authorization determines permissions',
      'Authorization verifies identity, authentication determines permissions',
      'They are the same thing',
      'Authentication is for APIs, authorization is for web apps'
    ],
    required: true
  },
  {
    id: 'question8',
    type: 'radio',
    category: 'Backend Development',
    question: 'In RESTful API design, what does the HTTP status code 201 indicate?',
    options: [
      'Request successful, resource found',
      'Request successful, resource created',
      'Client error, bad request',
      'Server error, internal failure'
    ],
    required: true
  },
  {
    id: 'question9',
    type: 'radio',
    category: 'Backend Development',
    question: 'What is the primary benefit of using JWT (JSON Web Tokens) for authentication?',
    options: [
      'They are stored securely on the server',
      'They are stateless and contain encoded user information',
      'They never expire',
      'They are automatically encrypted'
    ],
    required: true
  },
  {
    id: 'question10',
    type: 'radio',
    category: 'Backend Development',
    question: 'In Spring Boot, what annotation is used to mark a class as a REST controller?',
    options: [
      '@Controller',
      '@RestController',
      '@Service',
      '@Component'
    ],
    required: true
  },

  // Database & DevOps Questions
  {
    id: 'question11',
    type: 'radio',
    category: 'Database & DevOps',
    question: 'What is the primary purpose of database indexing?',
    options: [
      'To encrypt sensitive data',
      'To improve query performance',
      'To backup data automatically',
      'To enforce data validation rules'
    ],
    required: true
  },
  {
    id: 'question12',
    type: 'radio',
    category: 'Database & DevOps',
    question: 'In SQL, which JOIN type returns all records from both tables?',
    options: [
      'INNER JOIN',
      'LEFT JOIN',
      'RIGHT JOIN',
      'FULL OUTER JOIN'
    ],
    required: true
  },
  {
    id: 'question13',
    type: 'radio',
    category: 'Database & DevOps',
    question: 'What is the main advantage of using Docker containers?',
    options: [
      'Better security than virtual machines',
      'Consistent environment across different systems',
      'Faster execution than native applications',
      'Automatic code deployment'
    ],
    required: true
  },
  {
    id: 'question14',
    type: 'radio',
    category: 'Database & DevOps',
    question: 'In Git, what command is used to combine changes from one branch into another?',
    options: [
      'git combine',
      'git merge',
      'git join',
      'git unite'
    ],
    required: true
  },
  {
    id: 'question15',
    type: 'radio',
    category: 'Database & DevOps',
    question: 'What does ACID stand for in database transactions?',
    options: [
      'Atomicity, Consistency, Isolation, Durability',
      'Authentication, Consistency, Integration, Deployment',
      'Availability, Consistency, Isolation, Distribution',
      'Atomicity, Concurrency, Integration, Durability'
    ],
    required: true
  }
];

export const skillOptions = [
  // Frontend Technologies
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Vue.js',
  'Angular',
  'HTML5',
  'CSS3',
  'Sass/SCSS',
  'Tailwind CSS',
  'Bootstrap',
  'Webpack',
  'Vite',
  
  // Backend Technologies
  'Node.js',
  'Express.js',
  'Python',
  'Django',
  'Flask',
  'Java',
  'Spring Boot',
  'C#',
  '.NET',
  'PHP',
  'Laravel',
  'Ruby',
  'Ruby on Rails',
  
  // Databases
  'MySQL',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'SQLite',
  'Oracle',
  'SQL Server',
  
  // Cloud & DevOps
  'AWS',
  'Azure',
  'Google Cloud',
  'Docker',
  'Kubernetes',
  'Jenkins',
  'GitHub Actions',
  'Terraform',
  
  // Tools & Others
  'Git',
  'REST APIs',
  'GraphQL',
  'Microservices',
  'Agile/Scrum',
  'Unit Testing',
  'Integration Testing',
  'Linux/Unix'
];

export const experienceLevels = [
  { value: 'intern', label: '0-1 years (Intern/Entry Level)' },
  { value: 'junior', label: '1-3 years (Junior Developer)' },
  { value: 'mid', label: '3-5 years (Mid-level Developer)' },
  { value: 'senior', label: '5-8 years (Senior Developer)' },
  { value: 'lead', label: '8+ years (Lead/Architect)' }
];