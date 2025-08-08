"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calculator,
  User,
  Mail,
  Lock,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    grade: "",
    character: "",
  });

  const characters = [
    {
      id: "newton",
      name: "Newton",
      emoji: "🧑‍🔬",
      description: "논리적이고 체계적인",
    },
    {
      id: "euler",
      name: "Euler",
      emoji: "🤓",
      description: "창의적이고 혁신적인",
    },
    { id: "gauss", name: "Gauss", emoji: "👨‍🎓", description: "꼼꼼하고 정확한" },
    {
      id: "ada",
      name: "Ada",
      emoji: "👩‍💻",
      description: "분석적이고 미래지향적인",
    },
  ];

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 text-6xl text-blue-600">∑</div>
        <div className="absolute top-40 right-32 text-4xl text-orange-500">
          ∫
        </div>
        <div className="absolute bottom-32 left-40 text-5xl text-blue-500">
          π
        </div>
        <div className="absolute bottom-20 right-20 text-3xl text-orange-400">
          ∞
        </div>
      </div>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Calculator className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Nerd<span className="text-blue-600">Math</span>
            </h1>
          </div>
          <p className="text-gray-600">Math Beyond Boundaries</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {step} of 2
            </span>
            <span className="text-sm text-gray-500">
              {step === 1 ? "기본 정보" : "캐릭터 선택"}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 2) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Signup Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {step === 1 && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  회원가입
                </h2>
                <p className="text-gray-600">기본 정보를 입력해주세요</p>
              </div>

              <form className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    이름
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="이름을 입력하세요"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    이메일 주소
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    비밀번호
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="비밀번호를 입력하세요"
                    />
                  </div>
                </div>

                {/* Grade Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    학년/연령대
                  </label>
                  <select
                    value={formData.grade}
                    onChange={(e) =>
                      setFormData({ ...formData, grade: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  >
                    <option value="">선택해주세요</option>
                    <option value="middle">중학생</option>
                    <option value="high">고등학생</option>
                    <option value="college">대학생</option>
                    <option value="adult">성인</option>
                  </select>
                </div>
              </form>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  캐릭터 선택
                </h2>
                <p className="text-gray-600">학습 파트너를 선택해주세요</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {characters.map((character) => (
                  <div
                    key={character.id}
                    onClick={() =>
                      setFormData({ ...formData, character: character.id })
                    }
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${
                      formData.character === character.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{character.emoji}</div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {character.name}
                      </h3>
                      <p className="text-xs text-gray-600">
                        {character.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                이전
              </button>
            )}

            <div className="ml-auto">
              {step < 2 ? (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                >
                  다음
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button className="bg-orange-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors shadow-md hover:shadow-lg">
                  시작하기
                </button>
              )}
            </div>
          </div>

          {/* Login Link */}
          <div className="mt-6 text-center text-sm text-gray-600">
            이미 계정이 있으신가요?{" "}
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              로그인
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
