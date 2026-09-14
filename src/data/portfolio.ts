/** Material symbol icon names used across the project. */
export type IconName = string;

export interface Project {
  id: string;
  title: string;
  description: string;
  /** Material Symbols icon name, e.g. 'terminal', 'work' */
  icon: IconName;
  tags: string[];
  link: string;
}

export const projectsData: Project[] = [
  {
    id: 'cv-terminal',
    title: 'CV Terminal Tool',
    description: 'An interactive command-line interface for viewing my resume, skills, and background directly in the terminal.',
    icon: 'terminal',
    tags: ['Node.js', 'CLI', 'Chalk'],
    link: 'https://github.com/dulith/cv-terminal',
  },
  {
    id: 'browser-ext',
    title: 'Productivity Extension',
    description: 'A custom browser extension that streamlines workflow tasks and integrates with daily developer tools.',
    icon: 'extension',
    tags: ['JavaScript', 'Browser API', 'HTML/CSS'],
    link: 'https://github.com/dulith/browser-ext',
  },
  {
    id: 'ecommerce-dash',
    title: 'E-Commerce Dashboard',
    description: 'Full-stack admin dashboard for managing inventory, sales, and analytics with real-time updates.',
    icon: 'work',
    tags: ['React', 'Node.js', 'MongoDB'],
    link: 'https://github.com/dulith/ecommerce-dash',
  },
];

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  link: string;
}

export const certificationsData: Certification[] = [
  {
    title: 'AWS Certified Developer',
    issuer: 'Amazon Web Services',
    date: '2025',
    link: 'https://aws.amazon.com/verification-link',
  },
  {
    title: 'Advanced React Patterns',
    issuer: 'Frontend Masters',
    date: '2024',
    link: 'https://frontendmasters.com/verification',
  },
];

export interface Education {
  institution: string;
  degree: string;
  status: string;
  duration: string;
}

export const educationData: Education[] = [
  {
    institution: 'Sri Lanka Institute of Information Technology (SLIIT)',
    degree: 'BSc (Hons) in Information Technology',
    status: 'Undergraduate',
    duration: '2023 - 2027',
  },
];

export interface Experience {
  role: string;
  organization: string;
  duration: string;
}

export const experienceData: Experience[] = [
  {
    role: 'Open Source Contributor',
    organization: 'GitHub Global Campus',
    duration: '2023 - Present',
  },
  {
    role: 'Member',
    organization: 'IEEE Student Branch',
    duration: '2024 - Present',
  },
];

/* ─── New Quiz Data for Resources Tab ────────────────────────────────────── */

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export const quizData: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'In modern React, which hook is used to perform side effects in a functional component?',
    options: ['useState', 'useMemo', 'useEffect', 'useReducer'],
    correctAnswerIndex: 2
  },
  {
    id: 'q2',
    question: 'What does the "C" in the ACID properties of a database stand for?',
    options: ['Consistency', 'Concurrency', 'Control', 'Calculated'],
    correctAnswerIndex: 0
  },
  {
    id: 'q3',
    question: 'Which of the following is a core principle of Google Material Design 3?',
    options: ['Skeuomorphic textures', 'Dynamic color and personalized themes', 'Heavy drop shadows', 'Web-safe colors only'],
    correctAnswerIndex: 1
  }
];