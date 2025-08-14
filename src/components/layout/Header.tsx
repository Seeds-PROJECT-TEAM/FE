export function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="flex items-center justify-between px-16 py-4">
        {/* 로고 */}
        <h1 className="text-2xl font-bold text-gray-900">NerdMath</h1>

        {/* 우측 메뉴 */}
        <div className="flex items-center gap-4">
          {/* 알림 */}
          <button className="p-2 hover:bg-gray-100 rounded-lg">🔔</button>

          {/* 프로필 */}
          <button className="w-8 h-8 rounded-full bg-blue-500 text-white"></button>
        </div>
      </div>
    </header>
  );
}
