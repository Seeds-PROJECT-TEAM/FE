interface SubmitButtonProps {
  onSubmit: () => void
  disabled: boolean
  showResult: boolean
}

export default function SubmitButton({ onSubmit, disabled, showResult }: SubmitButtonProps) {
  return (
    <div className="flex justify-between items-center">
      <button
        onClick={onSubmit}
        disabled={disabled}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {showResult ? '제출완료' : '제출하기'}
      </button>
    </div>
  )
}