import { api } from '@/lib/api'
import { Problem } from '@/types/problem'

export interface SubmitAnswerRequest {
  problemId: string
  userAnswer: string | number
  timeSpent: number
}

export interface SubmitAnswerResponse {
  isCorrect: boolean
  correctAnswer: string | number
  explanation?: string
  score?: number
}

export const problemService = {
  // 특정 문제 조회
  getProblem: async (problemId: string) => {
    return api.get<Problem>(`/problems/${problemId}`)
  },

  // 문제 답안 제출
  submitAnswer: async (problemId: string, request: SubmitAnswerRequest) => {
    return api.post<SubmitAnswerResponse>(`/problems/${problemId}/submit`, request)
  }
}

export default problemService