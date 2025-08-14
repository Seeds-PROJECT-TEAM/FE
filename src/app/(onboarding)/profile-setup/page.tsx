"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const CHARACTER_INFO = {
  default1: {
    emoji: "🐶",
    name: "default1",
    description: "강아지",
    bgColor: "bg-blue-50",
    circleColor: "bg-blue-100",
  },
  default2: {
    emoji: "🐱",
    name: "default2",
    description: "고양이",
    bgColor: "bg-green-50",
    circleColor: "bg-green-100",
  },
};

export default function ProfileSetupPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState<
    "default1" | "default2" | null
  >(null);

  const nextStep = () => {
    if (currentStep === 3) {
      // 3단계 완료 후 대시보드로 리다이렉트
      router.push("/dashboard");
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <WelcomeStep onNext={nextStep} />;
      case 2:
        return (
          <CharacterSelectStep
            onNext={nextStep}
            selectedCharacter={selectedCharacter}
            setSelectedCharacter={setSelectedCharacter}
          />
        );
      case 3:
        return (
          <NicknameStep
            onNext={nextStep}
            selectedCharacter={selectedCharacter}
          />
        );
      default:
        return <WelcomeStep onNext={nextStep} />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full">{renderStep()}</div>
    </div>
  );
}

// 1단계: 환영 메시지
function WelcomeStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">
          너드수학에 온 걸<br />
          환영합니다!
        </h1>
        <p className="text-gray-600">
          수학 학습을 시작하기 전에
          <br />
          간단한 프로필을 설정해주세요
        </p>
      </div>

      <Button onClick={onNext} className="w-full" size="lg">
        다음
      </Button>
    </div>
  );
}

// 2단계: 캐릭터 선택
function CharacterSelectStep({
  onNext,
  selectedCharacter,
  setSelectedCharacter,
}: {
  onNext: () => void;
  selectedCharacter: "default1" | "default2" | null;
  setSelectedCharacter: (character: "default1" | "default2") => void;
}) {
  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">
          캐릭터를 선택하세요
        </h2>
        <p className="text-gray-600">학습을 함께할 캐릭터를 골라주세요</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div
          className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
            selectedCharacter === "default1"
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
          onClick={() => setSelectedCharacter("default1")}
        >
          <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center text-3xl">
            {CHARACTER_INFO.default1.emoji}
          </div>
          <h3 className="font-semibold text-gray-900">{CHARACTER_INFO.default1.name}</h3>
          <p className="text-sm text-gray-600 mt-2">{CHARACTER_INFO.default1.description}</p>
        </div>

        <div
          className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
            selectedCharacter === "default2"
              ? "border-green-500 bg-green-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
          onClick={() => setSelectedCharacter("default2")}
        >
          <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center text-3xl">
            {CHARACTER_INFO.default2.emoji}
          </div>
          <h3 className="font-semibold text-gray-900">{CHARACTER_INFO.default2.name}</h3>
          <p className="text-sm text-gray-600 mt-2">{CHARACTER_INFO.default2.description}</p>
        </div>
      </div>

      <Button
        onClick={onNext}
        className="w-full"
        size="lg"
        disabled={!selectedCharacter}
      >
        다음
      </Button>
    </div>
  );
}

// 3단계: 닉네임 입력
function NicknameStep({
  onNext,
  selectedCharacter,
}: {
  onNext: () => void;
  selectedCharacter: "default1" | "default2" | null;
}) {
  const characterInfo = selectedCharacter ? CHARACTER_INFO[selectedCharacter] : null;
  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">
          닉네임을 입력하세요
        </h2>
        <p className="text-gray-600">학습할 때 사용할 닉네임을 정해주세요</p>
      </div>

      {/* 선택한 캐릭터 표시 */}
      {characterInfo && (
        <div className={`p-4 rounded-lg ${characterInfo.bgColor} border`}>
          <div
            className={`w-16 h-16 mx-auto mb-3 ${characterInfo.circleColor} rounded-full flex items-center justify-center text-2xl`}
          >
            {characterInfo.emoji}
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">
            {characterInfo.name}
          </h3>
          <p className="text-sm text-gray-600">{characterInfo.description}</p>
        </div>
      )}

      <div className="space-y-4">
        <div className="text-left">
          <label
            htmlFor="nickname"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            닉네임
          </label>
          <input
            id="nickname"
            type="text"
            placeholder="닉네임을 입력하세요"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            maxLength={10}
          />
          <p className="text-xs text-gray-500 mt-1">
            최대 10자까지 입력 가능합니다
          </p>
        </div>
      </div>

      <Button onClick={onNext} className="w-full" size="lg">
        완료
      </Button>
    </div>
  );
}
