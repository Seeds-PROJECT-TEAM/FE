'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Problem, Workbook } from '@/types/problem'

const sampleProblems: Problem[] = [
  {
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
  {
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
  {
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
]

const sampleWorkbook: Workbook = {
  id: '1',
  title: '중학교 2학년 수학',
  description: '이차방정식과 함수의 기초를 다루는 문제집입니다.',
  subject: '수학',
  difficulty: 'medium',
  problemCount: 25,
  completedCount: 12,
  tags: ['이차방정식', '함수', '그래프'],
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-01-20'),
  problems: sampleProblems
}

export default function WorkbookDetailPage() {
  const params = useParams()
  const workbookId = params.workbookId as string

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* 문제집 정보 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {sampleWorkbook.title}
            </h1>
            <p className="text-gray-600 mb-4">
              {sampleWorkbook.description}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            sampleWorkbook.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
            sampleWorkbook.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {sampleWorkbook.difficulty}
          </span>
        </div>

        {/* 진행률 */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>진행률</span>
            <span>{sampleWorkbook.completedCount}/{sampleWorkbook.problemCount} 문제 완료</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(sampleWorkbook.completedCount / sampleWorkbook.problemCount) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* 태그 */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {sampleWorkbook.tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                #{tag}
              </span>
            ))}
          </div>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {sampleWorkbook.subject}
          </span>
        </div>
      </div>

      {/* 문제 목록 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">문제 목록</h2>
        
        <div className="space-y-3">
          {sampleProblems.map((problem, index) => (
            <Link key={problem.id} href={`/workbooks/${workbookId}/${problem.id}`}>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-full font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {problem.title}
                    </h3>
                    <div className="flex gap-2 mt-1">
                      {problem.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    problem.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                    problem.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {problem.difficulty}
                  </span>
                  
                  {/* 완료 상태 표시 (예시) */}
                  {index < sampleWorkbook.completedCount ? (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}