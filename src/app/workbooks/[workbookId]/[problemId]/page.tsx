'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Problem } from '@/types/problem'
import ProblemHeader from '@/components/problem/ProblemHeader'
import ProblemContent from '@/components/problem/ProblemContent'
import MultipleChoiceOptions from '@/components/problem/MultipleChoiceOptions'
import SubmitButton from '@/components/problem/SubmitButton'
import ResultDisplay from '@/components/problem/ResultDisplay'

const sampleProblems: { [key: string]: Problem } = {
  '1': {
    id: '1',
    title: '이차방정식의 해',
    content: '다음 이차방정식의 해를 구하시오: $x^2 - 5x + 6 = 0$',
    options: ['$x = 1, 2$', '$x = 2, 3$', '$x = 3, 4$', '$x = 1, 6$'],
    type: 'multiple-choice',
    difficulty: 'medium',
    subject: '수학',
    tags: ['이차방정식', '인수분해'],
    correctAnswer: 1,
    explanation: '주어진 방정식을 인수분해하면 $(x-2)(x-3) = 0$이므로 $x = 2$ 또는 $x = 3$입니다.'
  },
  '2': {
    id: '2',
    title: '이차함수의 그래프',
    content: '이차함수 $y = x^2 - 4x + 3$의 꼭짓점을 구하시오.',
    options: ['$(2, -1)$', '$(2, 1)$', '$(-2, -1)$', '$(-2, 1)$'],
    type: 'multiple-choice',
    difficulty: 'medium',
    subject: '수학',
    tags: ['이차함수', '그래프'],
    correctAnswer: 0,
    explanation: '완전제곱식으로 변형하면 $y = (x-2)^2 - 1$이므로 꼭짓점은 $(2, -1)$입니다.'
  },
  '3': {
    id: '3',
    title: '연립방정식',
    content: '다음 연립방정식을 풀어보시오: $\\begin{cases} 2x + y = 7 \\\\ x - y = 2 \\end{cases}$',
    options: ['$x = 3, y = 1$', '$x = 2, y = 3$', '$x = 1, y = 5$', '$x = 4, y = -1$'],
    type: 'multiple-choice',
    difficulty: 'easy',
    subject: '수학',
    tags: ['연립방정식', '방정식'],
    correctAnswer: 0,
    explanation: '첫 번째 식에서 두 번째 식을 더하면 $3x = 9$, 따라서 $x = 3$, $y = 1$입니다.'
  }
}

export default function ProblemSolvePage() {
  const params = useParams()
  const router = useRouter()
  const workbookId = params.workbookId as string
  const problemId = params.problemId as string
  
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [startTime] = useState(Date.now())

  const problem = sampleProblems[problemId]

  if (!problem) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">문제를 찾을 수 없습니다</h1>
        <Link href={`/workbooks/${workbookId}`} className="text-blue-600 hover:text-blue-800">
          문제집으로 돌아가기
        </Link>
      </div>
    )
  }

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      setShowResult(true)
    }
  }

  const handleNextProblem = () => {
    const currentIndex = parseInt(problemId)
    const nextIndex = currentIndex + 1
    if (sampleProblems[nextIndex.toString()]) {
      router.push(`/workbooks/${workbookId}/${nextIndex}`)
    }
  }

  const handlePrevProblem = () => {
    const currentIndex = parseInt(problemId)
    const prevIndex = currentIndex - 1
    if (prevIndex > 0 && sampleProblems[prevIndex.toString()]) {
      router.push(`/workbooks/${workbookId}/${prevIndex}`)
    }
  }

  const isCorrect = selectedAnswer === problem.correctAnswer
  const currentIndex = parseInt(problemId)
  const totalProblems = Object.keys(sampleProblems).length

  return (
    <div className="max-w-7xl mx-auto p-4 flex gap-6">
      {/* Left: Main */}
      <div className="flex-1 bg-white rounded-lg shadow-sm p-4 space-y-4">
        {/* 네비게이션 */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b">
          <Link 
            href={`/workbooks/${workbookId}`}
            className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
          >
            ← 문제집으로 돌아가기
          </Link>
          <div className="text-sm text-gray-600">
            문제 {currentIndex} / {totalProblems}
          </div>
        </div>

        <ProblemHeader
          title={problem.title}
          difficulty={problem.difficulty}
          subject={problem.subject}
          tags={problem.tags}
        />

        <ProblemContent content={problem.content} />

        {problem.type === 'multiple-choice' && problem.options && (
          <MultipleChoiceOptions
            options={problem.options}
            selectedAnswer={selectedAnswer}
            onAnswerSelect={setSelectedAnswer}
            showResult={showResult}
            correctAnswer={problem.correctAnswer as number}
          />
        )}

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <button
              onClick={handlePrevProblem}
              disabled={currentIndex <= 1}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              이전 문제
            </button>
            <button
              onClick={handleNextProblem}
              disabled={currentIndex >= totalProblems}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              다음 문제
            </button>
          </div>

          <SubmitButton
            onSubmit={handleSubmit}
            disabled={selectedAnswer === null || showResult}
            showResult={showResult}
          />
        </div>
      </div>

      {/* Right: Sidebar */}
      <div className="w-80 bg-white rounded-lg shadow-sm p-6">
        <ResultDisplay
          showResult={showResult}
          isCorrect={isCorrect}
          correctAnswer={problem.correctAnswer as number}
          explanation={problem.explanation}
        />
        
        {!showResult && (
          <div className="text-center text-gray-500 text-sm">
            문제를 풀고 제출해보세요!
          </div>
        )}
      </div>
    </div>
  )
}