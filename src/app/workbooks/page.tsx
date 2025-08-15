'use client'

import Link from 'next/link'
import { Workbook } from '@/types/problem'

const sampleWorkbooks: Workbook[] = [
  {
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
    problems: []
  },
  {
    id: '2',
    title: '고등학교 수학 I',
    description: '다항식과 방정식, 부등식을 다루는 문제집입니다.',
    subject: '수학',
    difficulty: 'hard',
    problemCount: 40,
    completedCount: 5,
    tags: ['다항식', '방정식', '부등식'],
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-10'),
    problems: []
  },
  {
    id: '3',
    title: '기초 대수학',
    description: '수학의 기초가 되는 대수학 문제집입니다.',
    subject: '수학',
    difficulty: 'easy',
    problemCount: 30,
    completedCount: 30,
    tags: ['대수', '기초', '연산'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-30'),
    problems: []
  }
]

export default function WorkbooksPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">문제집</h1>
        <p className="text-gray-600">다양한 주제별 문제집을 풀어보세요.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleWorkbooks.map((workbook) => (
          <Link key={workbook.id} href={`/workbooks/${workbook.id}`}>
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {workbook.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {workbook.description}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ml-2 ${
                  workbook.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                  workbook.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {workbook.difficulty}
                </span>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>진행률</span>
                  <span>{workbook.completedCount}/{workbook.problemCount}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(workbook.completedCount / workbook.problemCount) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-1 flex-wrap">
                  {workbook.tags.slice(0, 2).map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      #{tag}
                    </span>
                  ))}
                  {workbook.tags.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      +{workbook.tags.length - 2}
                    </span>
                  )}
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  {workbook.subject}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}