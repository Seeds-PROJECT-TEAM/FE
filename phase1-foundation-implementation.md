# Phase 1: 기초 구조 구축 상세 계획

## 🎯 현재 상황 분석

### 기존 DashboardPage 분석 결과
현재 `/dashboard/page.tsx`는 모든 UI가 하나의 컴포넌트에 집중되어 있음:
- **Header**: 로고, 햄버거 메뉴, 알림, 프로필 (98-131줄)
- **Sidebar**: 네비게이션 메뉴 (135-157줄)  
- **Main Content**: 환영 메시지, 통계 카드, 추천 학습, 빠른 액세스 (160-438줄)
- **상태**: 단순한 `sidebarOpen` 상태만 존재

### 리팩토링 목표
이 단일 컴포넌트를 **재사용 가능한 컴포넌트들로 분리**하고 **전역 상태 관리** 도입

---

## 📁 1단계: 레이아웃 컴포넌트 구축

### 1.1 Header 컴포넌트 분리
```typescript
// src/components/layout/Header.tsx
interface HeaderProps {
  onMenuClick: () => void;
  user: {
    name: string;
    level: string;
    avatar: string;
  };
}

export function Header({ onMenuClick, user }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="flex items-center justify-between px-6 py-4">
        {/* 로고 영역 */}
        <div className="flex items-center gap-4">
          <button onClick={onMenuClick} className="p-2 hover:bg-gray-100 rounded-lg lg:hidden">
            <Menu className="w-5 h-5" />
          </button>
          <Logo />
        </div>

        {/* 우측 메뉴 */}
        <div className="flex items-center gap-4">
          <NotificationButton />
          <UserProfile user={user} />
        </div>
      </div>
    </header>
  );
}
```

#### 1.1.1 세부 컴포넌트들
```typescript
// src/components/layout/Logo.tsx
export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Calculator className="w-8 h-8 text-blue-600" />
      <h1 className="text-2xl font-bold text-gray-900">
        Nerd<span className="text-blue-600">Math</span>
      </h1>
    </div>
  );
}

// src/components/layout/NotificationButton.tsx
export function NotificationButton() {
  const { notifications, unreadCount } = useNotifications();
  
  return (
    <button className="p-2 hover:bg-gray-100 rounded-lg relative">
      <Bell className="w-5 h-5 text-gray-600" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
      )}
    </button>
  );
}

// src/components/layout/UserProfile.tsx
interface UserProfileProps {
  user: {
    name: string;
    level: string;
    avatar: string;
  };
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2">
      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
        {user.avatar}
      </div>
      <div className="hidden sm:block">
        <div className="text-sm font-medium text-gray-900">{user.name}</div>
        <div className="text-xs text-gray-500">{user.level}</div>
      </div>
    </div>
  );
}
```

### 1.2 Sidebar 컴포넌트 분리
```typescript
// src/components/layout/Sidebar.tsx
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: BookOpen, label: "개념집", sublabel: "Concept Learning", href: "/concept" },
  { icon: Brain, label: "어휘집", sublabel: "Vocabulary", href: "/vocabulary" },
  { icon: FileText, label: "문제집", sublabel: "Problem Solving", href: "/problems" },
  { icon: Trophy, label: "마라톤", sublabel: "Mock Test", href: "/marathon" },
  { icon: Target, label: "마이페이지", sublabel: "My Page", href: "/profile" },
  { icon: Settings, label: "설정", sublabel: "Settings", href: "/settings" },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      <aside className={`${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out`}>
        <div className="p-6">
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href} item={item} />
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
}

// src/components/layout/SidebarMenuItem.tsx
interface MenuItemProps {
  item: {
    icon: React.ComponentType<any>;
    label: string;
    sublabel: string;
    href: string;
  };
}

export function SidebarMenuItem({ item }: MenuItemProps) {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <Link
      href={item.href}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        isActive 
          ? 'bg-blue-50 text-blue-600' 
          : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
      }`}
    >
      <item.icon className="w-5 h-5" />
      <div>
        <div className="font-medium">{item.label}</div>
        <div className="text-xs text-gray-500">{item.sublabel}</div>
      </div>
    </Link>
  );
}
```

### 1.3 Layout 컴포넌트 통합
```typescript
// src/components/layout/DashboardLayout.tsx
interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user } = useAuthStore();
  const { sidebarOpen, toggleSidebar } = useUIStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onMenuClick={toggleSidebar}
        user={user}
      />
      
      <div className="flex">
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => toggleSidebar(false)} 
        />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      <FloatingActionButton />
    </div>
  );
}

// src/components/common/FloatingActionButton.tsx
export function FloatingActionButton() {
  const handleQuickStart = () => {
    // 빠른 시작 로직
  };

  return (
    <button 
      onClick={handleQuickStart}
      className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all flex items-center justify-center"
    >
      <Play className="w-6 h-6" />
    </button>
  );
}
```

---

## 🛣️ 2단계: 라우팅 설정

### 2.1 미들웨어 구성
```typescript
// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/actions/session';

const protectedRoutes = ['/dashboard', '/profile', '/concept', '/vocabulary', '/problems', '/marathon'];
const authRoutes = ['/login', '/signup'];
const publicRoutes = ['/'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('session')?.value;
  
  // 보호된 라우트 접근 시 인증 확인
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    // 세션 유효성 검사
    try {
      await verifySession();
    } catch (error) {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('session');
      return response;
    }
  }
  
  // 인증된 사용자가 로그인/회원가입 페이지 접근 시 대시보드로 리다이렉트
  if (authRoutes.includes(pathname) && sessionCookie) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // 루트 경로 접근 시 적절한 페이지로 리다이렉트
  if (pathname === '/') {
    if (sessionCookie) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } else {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

### 2.2 라우트 상수 정의
```typescript
// src/constants/routes.ts
export const ROUTES = {
  // 인증
  AUTH: {
    LOGIN: '/login',
    SIGNUP: '/signup',
  },
  
  // 메인 앱
  DASHBOARD: '/dashboard',
  
  // 학습
  CONCEPT: '/concept',
  VOCABULARY: '/vocabulary', 
  PROBLEMS: '/problems',
  MARATHON: '/marathon',
  
  // 사용자
  PROFILE: {
    VIEW: '/profile',
    EDIT: '/profile/edit',
    SETTINGS: '/profile/settings',
  },
} as const;

// 라우트 헬퍼 함수
export const getRouteTitle = (pathname: string): string => {
  const routeTitles: Record<string, string> = {
    [ROUTES.DASHBOARD]: '대시보드',
    [ROUTES.CONCEPT]: '개념집',
    [ROUTES.VOCABULARY]: '어휘집', 
    [ROUTES.PROBLEMS]: '문제집',
    [ROUTES.MARATHON]: '마라톤',
    [ROUTES.PROFILE.VIEW]: '마이페이지',
  };
  
  return routeTitles[pathname] || '너드수학';
};
```

### 2.3 레이아웃 적용
```typescript
// src/app/(dashboard)/layout.tsx
import { DashboardLayout } from '@/components/layout/DashboardLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

// src/app/(dashboard)/dashboard/page.tsx
import { DashboardContent } from '@/components/features/dashboard/DashboardContent';

export default function DashboardPage() {
  return <DashboardContent />;
}
```

---

## 🎛️ 3단계: 상태 관리 구축

### 3.1 Zustand 설치 및 설정
```bash
npm install zustand
```

### 3.2 인증 스토어
```typescript
// src/stores/authStore.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  level: string;
  badge: string;
}

interface AuthState {
  // 상태
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  
  // 액션
  login: (userData: User) => void;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
  
  // 초기화
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        // 초기 상태
        user: null,
        isLoading: false,
        isAuthenticated: false,
        
        // 액션들
        login: (userData) => {
          set({
            user: userData,
            isAuthenticated: true,
            isLoading: false,
          });
        },
        
        logout: () => {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
          // 쿠키에서 세션 제거
          document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        },
        
        updateProfile: (data) => {
          const { user } = get();
          if (user) {
            set({
              user: { ...user, ...data }
            });
          }
        },
        
        setLoading: (loading) => {
          set({ isLoading: loading });
        },
        
        // 앱 시작 시 세션에서 사용자 정보 복원
        initialize: async () => {
          set({ isLoading: true });
          try {
            // 서버에서 현재 사용자 정보 가져오기
            const user = await getCurrentUser();
            if (user) {
              set({
                user,
                isAuthenticated: true,
                isLoading: false,
              });
            } else {
              set({ isLoading: false });
            }
          } catch (error) {
            console.error('사용자 정보 초기화 실패:', error);
            set({ 
              user: null,
              isAuthenticated: false,
              isLoading: false 
            });
          }
        },
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({ 
          user: state.user,
          isAuthenticated: state.isAuthenticated 
        }),
      }
    ),
    { name: 'auth-store' }
  )
);

// 헬퍼 함수
async function getCurrentUser(): Promise<User | null> {
  try {
    const response = await fetch('/api/user/me');
    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (error) {
    return null;
  }
}
```

### 3.3 UI 스토어
```typescript
// src/stores/uiStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type Theme = 'light' | 'dark';

interface UIState {
  // 상태
  sidebarOpen: boolean;
  theme: Theme;
  notifications: Notification[];
  
  // 액션
  toggleSidebar: (open?: boolean) => void;
  setTheme: (theme: Theme) => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  read: boolean;
  createdAt: Date;
}

export const useUIStore = create<UIState>()(
  devtools(
    (set, get) => ({
      // 초기 상태
      sidebarOpen: false,
      theme: 'light',
      notifications: [],
      
      // 액션들
      toggleSidebar: (open) => {
        const { sidebarOpen } = get();
        set({
          sidebarOpen: open !== undefined ? open : !sidebarOpen
        });
      },
      
      setTheme: (theme) => {
        set({ theme });
        // HTML 클래스 업데이트
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
      },
      
      addNotification: (notification) => {
        const newNotification: Notification = {
          ...notification,
          id: Date.now().toString(),
          read: false,
          createdAt: new Date(),
        };
        
        set((state) => ({
          notifications: [newNotification, ...state.notifications],
        }));
      },
      
      removeNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter(n => n.id !== id),
        }));
      },
      
      clearNotifications: () => {
        set({ notifications: [] });
      },
    }),
    { name: 'ui-store' }
  )
);
```

### 3.4 대시보드 스토어
```typescript
// src/stores/dashboardStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface StudyStats {
  level: number;
  progress: number;
  weeklyHours: string;
  streak: number;
  badges: number;
  accuracy: number;
}

interface Recommendation {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  duration: string;
  difficulty: '초급' | '중급' | '고급';
}

interface WeakArea {
  subject: string;
  status: '개선 필요' | '보통' | '우수';
  color: 'red' | 'yellow' | 'green';
}

interface DashboardState {
  // 상태
  stats: StudyStats | null;
  recommendations: Recommendation[];
  weakAreas: WeakArea[];
  isLoading: boolean;
  
  // 액션
  fetchDashboardData: () => Promise<void>;
  updateStats: (stats: Partial<StudyStats>) => void;
  markRecommendationCompleted: (id: string) => void;
}

export const useDashboardStore = create<DashboardState>()(
  devtools(
    (set, get) => ({
      // 초기 상태
      stats: null,
      recommendations: [],
      weakAreas: [],
      isLoading: false,
      
      // 액션들
      fetchDashboardData: async () => {
        set({ isLoading: true });
        try {
          // 병렬로 데이터 가져오기
          const [statsResponse, recommendationsResponse, weakAreasResponse] = await Promise.all([
            fetch('/api/dashboard/stats'),
            fetch('/api/dashboard/recommendations'), 
            fetch('/api/dashboard/weak-areas'),
          ]);
          
          const [stats, recommendations, weakAreas] = await Promise.all([
            statsResponse.json(),
            recommendationsResponse.json(),
            weakAreasResponse.json(),
          ]);
          
          set({
            stats,
            recommendations,
            weakAreas,
            isLoading: false,
          });
          
        } catch (error) {
          console.error('대시보드 데이터 로딩 실패:', error);
          set({ isLoading: false });
        }
      },
      
      updateStats: (newStats) => {
        const { stats } = get();
        if (stats) {
          set({
            stats: { ...stats, ...newStats }
          });
        }
      },
      
      markRecommendationCompleted: (id) => {
        set((state) => ({
          recommendations: state.recommendations.filter(rec => rec.id !== id)
        }));
      },
    }),
    { name: 'dashboard-store' }
  )
);
```

### 3.5 커스텀 훅으로 추상화
```typescript
// src/hooks/useAuth.ts
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

export const useAuth = () => {
  const store = useAuthStore();
  const router = useRouter();
  
  const logout = async () => {
    store.logout();
    router.push(ROUTES.AUTH.LOGIN);
  };
  
  return {
    ...store,
    logout,
  };
};

// src/hooks/useDashboard.ts
import { useDashboardStore } from '@/stores/dashboardStore';
import { useEffect } from 'react';

export const useDashboard = () => {
  const store = useDashboardStore();
  
  // 컴포넌트 마운트 시 데이터 자동 로딩
  useEffect(() => {
    if (!store.stats) {
      store.fetchDashboardData();
    }
  }, []);
  
  return store;
};

// src/hooks/useNotifications.ts
import { useUIStore } from '@/stores/uiStore';
import { useMemo } from 'react';

export const useNotifications = () => {
  const { notifications, addNotification, removeNotification, clearNotifications } = useUIStore();
  
  const unreadCount = useMemo(() => 
    notifications.filter(n => !n.read).length, 
    [notifications]
  );
  
  const success = (title: string, message?: string) => {
    addNotification({ type: 'success', title, message });
  };
  
  const error = (title: string, message?: string) => {
    addNotification({ type: 'error', title, message });
  };
  
  const warning = (title: string, message?: string) => {
    addNotification({ type: 'warning', title, message });
  };
  
  const info = (title: string, message?: string) => {
    addNotification({ type: 'info', title, message });
  };
  
  return {
    notifications,
    unreadCount,
    removeNotification,
    clearNotifications,
    success,
    error,
    warning,
    info,
  };
};
```

---

## 🔄 4단계: 프로바이더 설정

### 4.1 전역 프로바이더 구성
```typescript
// src/components/providers/Providers.tsx
'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';
import { Toaster } from 'react-hot-toast';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const initializeAuth = useAuthStore(state => state.initialize);
  const setTheme = useUIStore(state => state.setTheme);
  
  useEffect(() => {
    // 앱 초기화
    initializeAuth();
    
    // 테마 초기화
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, [initializeAuth, setTheme]);
  
  return (
    <>
      {children}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </>
  );
}
```

### 4.2 루트 레이아웃 업데이트
```typescript
// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers/Providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '너드수학 - NerdMath',
  description: '수학 학습 플랫폼',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
```

---

## 📋 5단계: 구현 순서

### 5.1 1일차: 기본 컴포넌트 분리
1. **Logo, NotificationButton, UserProfile** 컴포넌트 생성
2. **Header** 컴포넌트 생성 및 통합
3. **SidebarMenuItem** 컴포넌트 생성
4. **Sidebar** 컴포넌트 생성

### 5.2 2일차: 레이아웃 통합
1. **DashboardLayout** 컴포넌트 생성
2. **FloatingActionButton** 컴포넌트 분리
3. 기존 DashboardPage에서 레이아웃 부분 제거하고 **DashboardContent**로 변경

### 5.3 3일차: 상태 관리 구축
1. **Zustand** 설치 및 **authStore** 생성
2. **uiStore** 생성 (사이드바, 테마, 알림)
3. **dashboardStore** 생성

### 5.4 4일차: 커스텀 훅 및 프로바이더
1. **useAuth, useDashboard, useNotifications** 훅 생성
2. **Providers** 컴포넌트 구성
3. **루트 레이아웃**에 프로바이더 적용

### 5.5 5일차: 미들웨어 및 라우팅
1. **middleware.ts** 생성 및 인증 로직 구현
2. **routes.ts** 상수 정의
3. **(dashboard) 그룹 라우트** 생성 및 레이아웃 적용

### 5.6 6-7일차: 테스트 및 최적화
1. 각 컴포넌트 단위 테스트
2. 상태 관리 플로우 확인
3. 성능 최적화 (메모이제이션, 지연 로딩)
4. 반응형 디자인 검증

---

## ✅ 완료 후 달성 목표

### 구조적 개선
- [x] **단일 책임 원칙**: 각 컴포넌트가 하나의 역할만 담당
- [x] **재사용성**: Header, Sidebar 등을 다른 페이지에서도 사용 가능
- [x] **유지보수성**: 로직과 UI의 분리로 수정 용이

### 기능적 개선  
- [x] **전역 상태 관리**: 사용자 정보, UI 상태 등을 앱 전반에서 공유
- [x] **라우트 보호**: 인증되지 않은 사용자의 접근 차단
- [x] **타입 안전성**: TypeScript로 컴파일 타임 에러 방지

### 사용자 경험 개선
- [x] **일관된 네비게이션**: 모든 페이지에서 동일한 헤더/사이드바
- [x] **반응형 디자인**: 모바일/데스크톱 환경 최적화
- [x] **로딩 상태**: 데이터 로딩 중 사용자 피드백

이 기초 구조를 완성하면, 이후 **마이페이지**, **학습 페이지** 등을 빠르게 개발할 수 있는 견고한 토대가 마련됩니다.