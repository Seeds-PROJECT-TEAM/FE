export interface Problem {
  problemId: string;
  unitId: string;
  grade: number;
  chapter: number;
  context: {
    source: string;
    for: string[];
  };
  cognitiveType: string;
  level: string;
  type: string;
  tags: string[];
  content: {
    stem: {
      text: string;
    };
    choices?: Array<{
      key: string;
      text: string;
    }>;
  };
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  
  // 클라이언트 전용 필드 (기존 호환성을 위해)
  id?: string;
  title?: string;
  options?: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
  subject?: string;
  correctAnswer?: string | number;
  explanation?: string;
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