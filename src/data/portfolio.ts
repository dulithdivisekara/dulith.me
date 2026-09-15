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

export interface QuizOption {
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface QuizQuestion {
  topic: string;
  topicDesc: string;
  topicFocus: string;
  question: string;
  options: QuizOption[];
}

export const quizData: QuizQuestion[] = [
  {
    topic: "Expert Systems",
    topicDesc: "You correctly identified rule-based reasoning strategies (Forward Chaining) based on starting facts.",
    topicFocus: "Review rule-based reasoning. Remember that Forward Chaining starts with known facts, while Backward Chaining starts with a goal.",
    question: "An expert system evaluates rules to diagnose a medical patient. It starts by looking at observed symptoms like fever and cough, and gradually evaluates rules to reach a final diagnosis. Which reasoning strategy is being used?",
    options: [
      { text: "Backward Chaining", isCorrect: false, explanation: "Backward chaining starts with a hypothetical conclusion (goal) and works backward to see if the facts support it." },
      { text: "Forward Chaining", isCorrect: true, explanation: "Correct. Forward chaining is data-driven: it starts with known facts (symptoms) and triggers rules forward to reach a conclusion." },
      { text: "Support Vector Machines", isCorrect: false, explanation: "SVM is a machine learning algorithm, not an expert system reasoning method." },
      { text: "Gini Impurity", isCorrect: false, explanation: "Gini Impurity is a metric used to split decision trees." }
    ]
  },
  {
    topic: "Ontologies",
    topicDesc: "Great job distinguishing between broader categories (Classes) and specific real-world entities (Instances).",
    topicFocus: "Brush up on Ontological elements to clearly distinguish between Classes, Instances, and Restrictions.",
    question: "In the context of Ontologies, how is a specific, single real-world entity distinguished from a broader category?",
    options: [
      { text: "A Restriction of a Relationship", isCorrect: false, explanation: "Restrictions define constraints, not specific entities." },
      { text: "A Class", isCorrect: false, explanation: "A Class defines the broad category (e.g., 'Car')." },
      { text: "An Instance of a Class", isCorrect: true, explanation: "Correct. An Instance represents a specific entity (e.g., 'My Red 2018 Honda Civic') belonging to a Class." },
      { text: "An Axiom", isCorrect: false, explanation: "An Axiom is a logical rule." }
    ]
  },
  {
    topic: "Data Preprocessing",
    topicDesc: "You showed an excellent grasp of essential data preparation techniques like One-Hot Encoding for categorical variables.",
    topicFocus: "Review preprocessing techniques. Encoding text categories into un-ordered binary indicators requires One-Hot Encoding.",
    question: "Which data preprocessing technique creates separate binary indicator columns (0 or 1) for categorical variables without imposing an artificial numerical order?",
    options: [
      { text: "Variance Thresholding", isCorrect: false, explanation: "Removes features with identical values." },
      { text: "Min-Max Scaling", isCorrect: false, explanation: "Scaling adjusts numerical ranges." },
      { text: "Principal Component Analysis", isCorrect: false, explanation: "PCA is used for dimensionality reduction." },
      { text: "One-Hot Encoding", isCorrect: true, explanation: "Correct. Converts categories into separate binary columns without mathematical superiority." }
    ]
  },
  {
    topic: "Regression Models",
    topicDesc: "You perfectly understand core linear regression concepts, including interpreting slope parameters.",
    topicFocus: "Review Ordinary Least Squares (OLS) equations. The slope (β₁) represents the change in Y per unit of X.",
    question: "Given a simple linear regression line ŷ = β₀ + β₁x, what does the slope parameter β₁ represent?",
    options: [
      { text: "The baseline value of y when x is exactly zero", isCorrect: false, explanation: "This describes the intercept (β₀)." },
      { text: "The expected change in y for a one-unit increase in x", isCorrect: true, explanation: "Correct. The slope tells us exactly how much the predicted output changes for every 1-unit step forward." },
      { text: "The average squared error", isCorrect: false, explanation: "This describes MSE." },
      { text: "The maximum threshold before overfitting", isCorrect: false, explanation: "Unrelated to regression slope definitions." }
    ]
  },
  {
    topic: "Classification Evaluation",
    topicDesc: "You understand when to prioritize specialized evaluation metrics over general accuracy in critical systems.",
    topicFocus: "Review evaluation metrics. In medical screening where missing a positive case is dangerous, Recall is much more important than Accuracy.",
    question: "In medical disease screening, missing an actual positive patient case is far more dangerous than triggering a false alarm. Which evaluation metric should be prioritized and maximized?",
    options: [
      { text: "Accuracy", isCorrect: false, explanation: "Accuracy can be misleading when disease cases are rare." },
      { text: "Precision", isCorrect: false, explanation: "Precision minimizes False Positives, the opposite of our goal." },
      { text: "Recall (Sensitivity)", isCorrect: true, explanation: "Correct. Recall minimizes False Negatives, ensuring we catch as many actual positive cases as possible." },
      { text: "Gini Impurity", isCorrect: false, explanation: "Used for decision trees, not final predictions." }
    ]
  }
];