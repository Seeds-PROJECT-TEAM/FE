import MathRenderer from './MathRenderer'

interface ResultDisplayProps {
  showResult: boolean
  isCorrect: boolean
  correctAnswer: number
  explanation?: string
}

export default function ResultDisplay({ showResult, isCorrect, correctAnswer, explanation }: ResultDisplayProps) {
  if (!showResult) return null

  return (
    <div className="mt-8 p-6 border-t">
      <div className={`mb-4 p-4 rounded-lg ${
        isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
      }`}>
        <h3 className={`font-semibold text-lg mb-2 ${
          isCorrect ? 'text-green-800' : 'text-red-800'
        }`}>
          {isCorrect ? '정답입니다! 🎉' : '틀렸습니다 😅'}
        </h3>
        <p className={isCorrect ? 'text-green-700' : 'text-red-700'}>
          정답: {String.fromCharCode(65 + correctAnswer)}번
        </p>
      </div>

      {explanation && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2 text-gray-800">해설</h4>
          <MathRenderer content={explanation} className="text-gray-700" />
        </div>
      )}
    </div>
  )
}