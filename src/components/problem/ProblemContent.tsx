import MathRenderer from './MathRenderer'

interface ProblemContentProps {
  content: string
}

export default function ProblemContent({ content }: ProblemContentProps) {
  return (
    <div className="mb-6">
      <h2 className="text-md font-semibold mb-3 text-gray-700">문제</h2>
      <div className="p-3 bg-gray-50 rounded-lg">
        <MathRenderer content={content} className="text-md leading-relaxed" />
      </div>
    </div>
  )
}