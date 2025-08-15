"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Problem } from "@/types/problem";
import ProblemHeader from "@/components/problem/ProblemHeader";
import ProblemContent from "@/components/problem/ProblemContent";
import MultipleChoiceOptions from "@/components/problem/MultipleChoiceOptions";
import SubmitButton from "@/components/problem/SubmitButton";
import ResultDisplay from "@/components/problem/ResultDisplay";
import Loading from "@/components/common/Loading";
import ErrorMessage from "@/components/common/ErrorMessage";
import problemService from "@/services/problemService";

const sampleProblem: Problem = {
  id: "1",
  title: "이차방정식의 해",
  content: "다음 이차방정식의 해를 구하시오: $x^2 - 5x + 6 = 0$",
  options: ["$x = 1, 2$", "$x = 2, 3$", "$x = 3, 4$", "$x = 1, 6$"],
  type: "multiple-choice",
  difficulty: "medium",
  subject: "수학",
  tags: ["이차방정식", "인수분해"],
  correctAnswer: 1,
  explanation:
    "주어진 방정식을 인수분해하면 $(x-2)(x-3) = 0$이므로 $x = 2$ 또는 $x = 3$입니다.",
};

export default function ProblemPage() {
  const searchParams = useSearchParams();
  const problemId = searchParams.get('id') || '1'; // URL에서 문제 ID 가져오기
  
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [startTime] = useState(Date.now());
  const [apiResult, setApiResult] = useState<{
    isCorrect: boolean;
    correctAnswer: string | number;
    explanation?: string;
  } | null>(null);

  // 문제 데이터 로드
  useEffect(() => {
    const loadProblem = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await problemService.getProblem(problemId);
        
        if (response.success && response.data) {
          setProblem(response.data);
        } else {
          // API 실패 시 샘플 데이터 사용
          setProblem(sampleProblem);
        }
      } catch (err) {
        console.error('문제 로드 실패:', err);
        // 에러 시 샘플 데이터 사용
        setProblem(sampleProblem);
      } finally {
        setLoading(false);
      }
    };

    loadProblem();
  }, [problemId]);

  const handleSubmit = async () => {
    if (!problem || selectedAnswer === null || submitting) return;

    try {
      setSubmitting(true);
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);

      const response = await problemService.submitAnswer(problem.id, {
        problemId: problem.id,
        userAnswer: selectedAnswer,
        timeSpent
      });

      if (response.success && response.data) {
        setApiResult({
          isCorrect: response.data.isCorrect,
          correctAnswer: response.data.correctAnswer,
          explanation: response.data.explanation
        });
      } else {
        // API 실패 시 로컬 검증
        setApiResult({
          isCorrect: selectedAnswer === problem.correctAnswer,
          correctAnswer: problem.correctAnswer!,
          explanation: problem.explanation
        });
      }
      
      setShowResult(true);
    } catch (err) {
      console.error('답안 제출 실패:', err);
      // 에러 시 로컬 검증으로 폴백
      setApiResult({
        isCorrect: selectedAnswer === problem.correctAnswer,
        correctAnswer: problem.correctAnswer!,
        explanation: problem.explanation
      });
      setShowResult(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    setProblem(null);
    setLoading(true);
    // 페이지 새로고침 효과
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <Loading message="문제를 불러오는 중..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <ErrorMessage message={error} onRetry={handleRetry} />
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <ErrorMessage message="문제를 찾을 수 없습니다." onRetry={handleRetry} />
      </div>
    );
  }

  const isCorrect = apiResult ? apiResult.isCorrect : selectedAnswer === problem.correctAnswer;

  return (
    <div className="max-w-7xl mx-auto p-4 flex gap-6">
      {/* Left: Main */}
      <div className="flex-1 bg-white rounded-lg shadow-sm p-4 space-y-4">
        <ProblemHeader
          title={problem.title}
          difficulty={problem.difficulty}
          subject={problem.subject}
          tags={problem.tags}
        />

        <ProblemContent content={problem.content} />

        {problem.type === "multiple-choice" && problem.options && (
          <MultipleChoiceOptions
            options={problem.options}
            selectedAnswer={selectedAnswer}
            onAnswerSelect={setSelectedAnswer}
            showResult={showResult}
            correctAnswer={(apiResult?.correctAnswer || problem.correctAnswer) as number}
          />
        )}

        <SubmitButton
          onSubmit={handleSubmit}
          disabled={selectedAnswer === null || showResult || submitting}
          showResult={showResult}
        />
        
        {submitting && (
          <div className="text-center">
            <Loading message="답안을 제출하는 중..." />
          </div>
        )}
      </div>

      {/* Right: Sidebar */}
      <div className="w-80 bg-white rounded-lg shadow-sm p-6">
        <ResultDisplay
          showResult={showResult}
          isCorrect={isCorrect}
          correctAnswer={(apiResult?.correctAnswer || problem.correctAnswer) as number}
          explanation={apiResult?.explanation || problem.explanation}
        />
        
        {!showResult && (
          <div className="text-center text-gray-500 text-sm mt-4">
            <p>문제 ID: {problem.id}</p>
            <p>문제를 풀고 제출해보세요!</p>
          </div>
        )}
      </div>
    </div>
  );
}
