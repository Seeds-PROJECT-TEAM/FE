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
  // 특정 문제 조회 (API 명세에 맞게 수정)
  getProblem: async (problemId: string) => {
    return api.get<Problem>(`/v1/problems/${problemId}`, {
      headers: {
        'X-Request-Id': `req_problem_${Date.now()}`
      }
    })
  },

  // 문제 답안 제출
  submitAnswer: async (problemId: string, request: SubmitAnswerRequest) => {
    return api.post<SubmitAnswerResponse>(`/v1/problems/${problemId}/submit`, request, {
      headers: {
        'X-Request-Id': `req_submit_${Date.now()}`
      }
    })
  }
}

export default problemService