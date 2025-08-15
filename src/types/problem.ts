export interface Problem {
  id: string;
  title: string;
  content: string; // LaTeX 수식이 포함된 문제 내용
  options?: string[]; // 객관식 선택지 (LaTeX 포함 가능)
  type: 'multiple-choice' | 'short-answer' | 'essay';
  difficulty: 'easy' | 'medium' | 'hard';
  subject: string;
  tags: string[];
  correctAnswer?: string | number; // 정답
  explanation?: string; // 해설 (LaTeX 포함 가능)
}

export interface ProblemAttempt {
  problemId: string;
  userAnswer: string | number;
  isCorrect: boolean;
  timeSpent: number; // 초 단위
  submittedAt: Date;
}

export interface Workbook {
  id: string;
  title: string;
  description: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  problemCount: number;
  completedCount: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  problems: Problem[];
}

export interface WorkbookProgress {
  workbookId: string;
  completedProblems: string[];
  totalTimeSpent: number;
  averageScore: number;
  lastAccessedAt: Date;
}