export function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-0 py-4">
        {/* 로고 */}
        <h1 className="text-2xl font-bold text-gray-900">NerdMath</h1>

        {/* 우측 메뉴 */}
        <div className="flex items-center gap-4">
          {/* 알림 */}
          <button className="p-2 hover:bg-gray-100 rounded-lg">🔔</button>

          {/* 프로필 */}
          <button className="w-8 h-8 rounded-full bg-blue-500 text-white"></button>
          {/* Join Nerd */}
          <button
            className="
        bg-yellow-600 hover:bg-yellow-700
        text-white font-semibold
        px-5 py-2
        rounded-lg
        flex items-center
        transition-colors duration-200
        "
          >
            Join Nerd
          </button>
        </div>
      </div>
    </header>
  );
}
