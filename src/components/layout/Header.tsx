import Link from 'next/link'

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-0 py-4">
        {/* 로고 */}
        <Link href="/dashboard">
          <h1 className="text-2xl font-bold text-gray-900 cursor-pointer hover:text-gray-700 transition-colors">
            NerdMath
          </h1>
        </Link>

        {/* 우측 메뉴 */}
        <div className="flex items-center gap-4">
          {/* 알림 */}
          <Link href="/#">
            <button className="p-2 hover:bg-gray-100 rounded-lg">🔔</button>
          </Link>

          {/* 프로필 */}
          <Link href="/#">
            <button className="w-8 h-8 rounded-full bg-blue-500 text-white"></button>
          </Link>
          
          {/* Join Nerd */}
          <Link href="/#">
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
          </Link>
        </div>
      </div>
    </header>
  );
}
