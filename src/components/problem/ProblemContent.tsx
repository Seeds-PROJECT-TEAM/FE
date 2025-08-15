import MathRenderer from './MathRenderer'
import Image from 'next/image'

interface ProblemContentProps {
  content: string
  imageUrl?: string
}

export default function ProblemContent({ content, imageUrl }: ProblemContentProps) {
  return (
    <div className="mb-6">
      <h2 className="text-md font-semibold mb-3 text-gray-700">문제</h2>
      <div className="p-3 bg-gray-50 rounded-lg space-y-3">
        <MathRenderer content={content} className="text-md leading-relaxed" />
        {imageUrl && (
          <div className="flex justify-center">
            <Image
              src={imageUrl}
              alt="문제 이미지"
              width={400}
              height={300}
              className="rounded-lg border border-gray-200"
              style={{ objectFit: 'contain' }}
            />
          </div>
        )}
      </div>
    </div>
  )
}