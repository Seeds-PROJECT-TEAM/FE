import MathRenderer from './MathRenderer'

interface MultipleChoiceOptionsProps {
  options: string[]
  selectedAnswer: number | null
  onAnswerSelect: (index: number) => void
  showResult: boolean
  correctAnswer: number
}

export default function MultipleChoiceOptions({ 
  options, 
  selectedAnswer, 
  onAnswerSelect, 
  showResult, 
  correctAnswer 
}: MultipleChoiceOptionsProps) {
  const isCorrect = selectedAnswer === correctAnswer

  return (
    <div className="mb-6">
      <h3 className="text-md font-semibold mb-3 text-gray-700">선택지</h3>
      <div className="space-y-2">
        {options.map((option, index) => (
          <label
            key={index}
            className={`block p-3 border rounded-lg cursor-pointer transition-colors ${
              selectedAnswer === index
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            } ${
              showResult && index === correctAnswer
                ? 'border-green-500 bg-green-50'
                : showResult && selectedAnswer === index && !isCorrect
                ? 'border-red-500 bg-red-50'
                : ''
            }`}
          >
            <input
              type="radio"
              name="answer"
              value={index}
              checked={selectedAnswer === index}
              onChange={() => onAnswerSelect(index)}
              disabled={showResult}
              className="sr-only"
            />
            <div className="flex items-center">
              <span className="font-medium mr-3 text-gray-600">
                {String.fromCharCode(65 + index)}.
              </span>
              <MathRenderer content={option} />
            </div>
          </label>
        ))}
      </div>
    </div>
  )
}