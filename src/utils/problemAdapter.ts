import { Problem } from '@/types/problem'

// API 응답을 기존 컴포넌트에서 사용할 수 있는 형태로 변환
export function adaptProblemFromApi(apiProblem: Problem): Problem {
  return {
    ...apiProblem,
    // 기존 컴포넌트 호환성을 위한 필드 매핑
    id: apiProblem.problemId,
    title: `${apiProblem.grade}학년 ${apiProblem.chapter}장 - ${apiProblem.cognitiveType}`,
    content: apiProblem.content.stem.text,
    options: apiProblem.content.choices?.map(choice => choice.text),
    type: apiProblem.type === '객관식' ? 'multiple-choice' as const : 'short-answer' as const,
    difficulty: mapLevelToDifficulty(apiProblem.level),
    subject: mapGradeToSubject(apiProblem.grade),
    // 테스트용 정답 설정 (실제로는 API에서 받아야 함)
    correctAnswer: 1, // ② 번 (x = 2, 3)
    explanation: "주어진 방정식을 인수분해하면 $(x-2)(x-3) = 0$이므로 $x = 2$ 또는 $x = 3$입니다."
  }
}

function mapLevelToDifficulty(level: string): 'easy' | 'medium' | 'hard' {
  switch (level) {
    case '하':
      return 'easy'
    case '중':
      return 'medium'
    case '상':
      return 'hard'
    default:
      return 'medium'
  }
}

function mapGradeToSubject(grade: number): string {
  return `${grade}학년 수학`
}

// 객관식 정답 키를 인덱스로 변환
export function parseCorrectAnswerKey(key: string): number {
  const keyMap: { [key: string]: number } = {
    '①': 0,
    '②': 1,
    '③': 2,
    '④': 3,
    '⑤': 4
  }
  return keyMap[key] ?? 0
}