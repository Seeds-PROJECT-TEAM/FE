"use client";

import 개념집 from "../practice/개념집.svg";
import 문제집 from "../practice/문제집.svg";
import 어휘집 from "../practice/어휘집.svg";
import 마라톤 from "../practice/마라톤.svg";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Calculator,
  Menu,
  Bell,
  Settings,
  User,
  BookOpen,
  Brain,
  FileText,
  Trophy,
  Target,
  Clock,
  Flame,
  Star,
  TrendingUp,
  Play,
  ChevronRight,
} from "lucide-react";
import { link } from "fs";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { icon: BookOpen, label: "개념집", sublabel: "Concept Learning" },
    { icon: Brain, label: "어휘집", sublabel: "Vocabulary" },
    { icon: FileText, label: "문제집", sublabel: "Problem Solving" },
    { icon: Trophy, label: "마라톤", sublabel: "Mock Test" },
    { icon: Target, label: "마이페이지", sublabel: "My Page" },
    { icon: Settings, label: "설정", sublabel: "Settings" },
  ];

  const quickAccessImages = [개념집, 문제집, 어휘집, 마라톤];

  const quickAccess = [
    {
      title: "개념집",
      subtitle: "Concept Book",
      image: 개념집,
      color: "bg-blue-500",
    },
    {
      title: "어휘집",
      subtitle: "Vocabulary",
      image: 어휘집,
      color: "bg-green-500",
    },
    {
      title: "문제집",
      subtitle: "Problem Set",
      image: 문제집,
      color: "bg-orange-500",
    },
    {
      title: "마라톤",
      subtitle: "Marthon",
      image: 마라톤,
      color: "bg-purple-500",
    },
  ];

  const todayRecommendations = [
    {
      title: "이차함수의 그래프",
      subtitle: "Quadratic Functions",
      type: "개념학습",
      duration: "15분",
      difficulty: "중급",
    },
    {
      title: "수학 용어 복습",
      subtitle: "Math Vocabulary Review",
      type: "어휘학습",
      duration: "10분",
      difficulty: "초급",
    },
    {
      title: "함수 문제 풀이",
      subtitle: "Function Problems",
      type: "문제풀이",
      duration: "20분",
      difficulty: "고급",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <Calculator className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Nerd<span className="text-blue-600">Math</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                🧑‍🔬
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-medium text-gray-900">Newton</div>
                <div className="text-xs text-gray-500">Level 5 • Pre-Nerd</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out`}
        >
          <div className="p-6">
            <nav className="space-y-2">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                >
                  <item.icon className="w-5 h-5" />
                  <div>
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-gray-500">{item.sublabel}</div>
                  </div>
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                안녕하세요, 권현석님 👋
              </h2>
              <p className="text-gray-600">너드남이 되어봅시다.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Learning Progress */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-full">
                    Pre-Nerd
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">학습 현황</h3>
                <p className="text-2xl font-bold text-gray-900 mb-2">Level 5</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "65%" }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">다음 레벨까지 35%</p>
              </div>

              {/* Study Time */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  이번 주 학습
                </h3>
                <p className="text-2xl font-bold text-gray-900 mb-2">
                  4시간 32분
                </p>
                <p className="text-sm text-green-600">+23% 지난주 대비</p>
              </div>

              {/* Streak */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Flame className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">연속 학습</h3>
                <p className="text-2xl font-bold text-gray-900 mb-2">7일</p>
                <p className="text-sm text-orange-600">🔥 연속 기록 갱신!</p>
              </div>

              {/* Achievement */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">획득 배지</h3>
                <p className="text-2xl font-bold text-gray-900 mb-2">12개</p>
                <p className="text-sm text-purple-600">새 배지 2개!</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Today's Recommendations */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                      오늘의 추천 학습
                      <span className="block text-sm font-normal text-gray-500">
                        Today's Recommendations
                      </span>
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {todayRecommendations.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">
                            {item.title}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">
                            {item.subtitle}
                          </p>
                          <div className="flex items-center gap-4">
                            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                              {item.type}
                            </span>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {item.duration}
                            </span>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                item.difficulty === "초급"
                                  ? "bg-green-100 text-green-600"
                                  : item.difficulty === "중급"
                                  ? "bg-yellow-100 text-yellow-600"
                                  : "bg-red-100 text-red-600"
                              }`}
                            >
                              {item.difficulty}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Access & Performance */}
              <div className="space-y-6">
                {/* Quick Access */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    빠른 액세스
                    <span className="block text-sm font-normal text-gray-500">
                      Quick Access
                    </span>
                  </h3>

                  {/* <div className="grid grid-cols-2 gap-3">
                    {quickAccess.map((item, index) => (
                      <div
                        key={index}
                        className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                      >
                        <div
                          className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center mb-3`}
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-6 h-6 object-contain"
                          />
                        </div>
                        <h4 className="font-medium text-gray-900 text-sm mb-1">
                          {item.title}
                        </h4>
                        <p className="text-xs text-gray-500">{item.subtitle}</p>
                      </div>
                    ))}
                  </div>
                </div> */}

                  <div className="grid grid-cols-2 gap-3">
                    {/* 개념집 카드 */}
                    <Link href="/concept" className="block">
                      <div className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                        <div className="w-10 h-10 bg-gradient-to-b from-teal-300 to-teal-600 rounded-lg flex items-center justify-center mb-3">
                          <Image
                            src={개념집}
                            alt="개념집"
                            className="w-6 h-6 object-contain"
                          />
                        </div>
                        <h4 className="font-medium text-gray-900 text-sm mb-1">
                          개념집
                        </h4>
                        <p className="text-xs text-gray-500">Concept Book</p>
                      </div>
                    </Link>

                    {/* 어휘집 카드 */}
                    <Link href="/vocabulary" className="block">
                      <div className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                        <div className="w-10 h-10 bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-lg flex items-center justify-center mb-3">
                          <Image
                            src={어휘집}
                            alt="어휘집"
                            className="w-6 h-6 object-contain"
                          />
                        </div>
                        <h4 className="font-medium text-gray-900 text-sm mb-1">
                          어휘집
                        </h4>
                        <p className="text-xs text-gray-500">Vocabulary</p>
                      </div>
                    </Link>

                    {/* 문제집 카드 */}
                    <Link href="/problems" className="block">
                      <div className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                        <div className="w-10 h-10 bg-gradient-to-b from-orange-300 to-orange-600 rounded-lg flex items-center justify-center mb-3">
                          <Image
                            src={문제집}
                            alt="문제집"
                            className="w-6 h-6 object-contain"
                          />
                        </div>
                        <h4 className="font-medium text-gray-900 text-sm mb-1">
                          문제집
                        </h4>
                        <p className="text-xs text-gray-500">Problem Set</p>
                      </div>
                    </Link>

                    {/* 마라톤 카드 */}
                    <Link href="/marathon" className="block">
                      <div className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                        <div className="w-10 h-10 bg-gradient-to-b from-blue-300 to-blue-600 rounded-lg flex items-center justify-center mb-3">
                          <Image
                            src={마라톤}
                            alt="마라톤"
                            className="w-6 h-6 object-contain"
                          />
                        </div>
                        <h4 className="font-medium text-gray-900 text-sm mb-1">
                          마라톤
                        </h4>
                        <p className="text-xs text-gray-500">Marathon</p>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Performance Tracking */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    성과 트래킹
                    <span className="block text-sm font-normal text-gray-500">
                      Performance
                    </span>
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">정답률</span>
                      <span className="font-semibold text-gray-900">87%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: "87%" }}
                      ></div>
                    </div>

                    <div className="pt-2">
                      <div className="text-sm text-gray-600 mb-2">
                        약점 영역
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>함수 (Functions)</span>
                          <span className="text-red-500">개선 필요</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>기하 (Geometry)</span>
                          <span className="text-green-500">우수</span>
                        </div>
                      </div>
                    </div>

                    <button className="w-full mt-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                      상세 분석 보기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all flex items-center justify-center">
        <Play className="w-6 h-6" />
      </button>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
