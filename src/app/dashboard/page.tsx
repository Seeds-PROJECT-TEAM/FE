import Link from "next/link";
import QuickAccess from "@/components/dashboard/QuickAccess";

const mathUnits = [
  {
    id: "1.1",
    title: "소수와 합성수, 소인수분해",
    category: "수와 연산",
    grade: 1,
    progress: 85,
    color: "from-blue-50 to-blue-100",
  },
  {
    id: "2.12",
    title: "연립방정식의 풀이",
    category: "문자와 식",
    grade: 2,
    progress: 30,

    color: "from-green-50 to-green-100",
  },
  {
    id: "3.11",
    title: "이차함수의 뜻과 그래프",
    category: "함수",
    grade: 3,
    progress: 60,
    color: "from-purple-50 to-purple-100",
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-0 py-6 flex gap-6">
        {/* Left: Main */}
        <div className="flex-1 space-y-6">
          {/* 너드수학 웰컴 */}
          <div className=" p-8">
            <div>이미지</div>
            <div>말풍선: 안녕하세요, wp230님 오늘도 힘찬하루@@~~</div>
          </div>
          {/* 진행 중인 박스 */}
          <div className="bg-white border rounded-lg p-6 flex gap-6 shadow-sm">
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-900">문제집</h2>
              <p className="text-gray-600 text-sm mt-2">
                workbooks 테스트 화면 바로가기
              </p>
              <Link href="/workbooks">
                <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                  바로가기
                </button>
              </Link>
            </div>
            <div className="flex-1">
              {/* 이미지 영역 */}
              <div className="bg-gray-100 border rounded-lg h-60" />
            </div>
          </div>

          {/* 카드 리스트 */}
          <div className="p-0 flex">
            <h2 className="text-3xl font-bold text-gray-900">
              현재 진행중인 학습
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {mathUnits.map((unit) => (
              <div
                key={unit.id}
                className="bg-white border rounded-lg p-4 shadow-sm"
              >
                <div
                  className={`bg-gradient-to-br ${unit.color} h-40 rounded-lg mb-4 border flex items-center justify-center`}
                ></div>
                <p className="text-sm font-bold text-gray-900">
                  {unit.id} {unit.title}
                </p>
                <p className="text-xs text-gray-500">
                  {unit.category} • {unit.grade}학년
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  {unit.progress}% Complete
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="w-80 space-y-6">
          {/* 프로필 카드 */}
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <p className="font-bold text-gray-900">wp230</p>
            <p className="text-xs text-gray-600">Level 1</p>
          </div>

          {/* 퀵엑서스? */}
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <QuickAccess />
          </div>

          {/* 흠.. 달력?*/}
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <h3 className="font-bold text-gray-900">원래는 달력자리입니다.</h3>
            <p className="text-xs text-gray-600 mt-1">달력은 어떻게 넣지</p>
            <button className="mt-4 border border-gray-300 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors">
              버튼
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
