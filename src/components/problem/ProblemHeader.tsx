interface ProblemHeaderProps {
  title: string
  difficulty: 'easy' | 'medium' | 'hard'
  subject: string
  tags: string[]
}

export default function ProblemHeader({ title, difficulty, subject, tags }: ProblemHeaderProps) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-xl font-bold text-gray-800">{title}</h1>
        <div className="flex gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            difficulty === 'easy' ? 'bg-green-100 text-green-800' :
            difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {difficulty}
          </span>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
            {subject}
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        {tags.map((tag, index) => (
          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  )
}