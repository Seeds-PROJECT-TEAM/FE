'use client'

import { useEffect, useRef } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'

interface MathRendererProps {
  content: string
  displayMode?: boolean
  className?: string
}

export default function MathRenderer({ content, displayMode = false, className = '' }: MathRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      const processedContent = content.replace(
        /\$\$([^$]+)\$\$/g,
        (match, latex) => {
          try {
            return katex.renderToString(latex, { displayMode: true })
          } catch (error) {
            console.error('LaTeX 렌더링 오류:', error)
            return match
          }
        }
      ).replace(
        /\$([^$]+)\$/g,
        (match, latex) => {
          try {
            return katex.renderToString(latex, { displayMode: false })
          } catch (error) {
            console.error('LaTeX 렌더링 오류:', error)
            return match
          }
        }
      )

      containerRef.current.innerHTML = processedContent
    }
  }, [content])

  return <div ref={containerRef} className={className} />
}