# 인증 시스템 구현 현황 정리

## 📋 전체 구현 상태

### ✅ 완료된 기능

- [x] 회원가입 폼 UI 및 유효성 검증
- [x] 로그인 폼 UI 및 유효성 검증
- [x] JWT 세션 관리 시스템
- [x] MongoDB 사용자 데이터 저장/조회
- [x] 토스트 알림 시스템

### 🔧 수정 필요한 사항

- [ ] 비밀번호 해시화 구현
- [ ] 타입 정의 일관성 개선
- [ ] 에러 메시지 오타 수정
- [ ] HTML 접근성 개선

---

## 1. 프론트엔드 UI 구성

### 회원가입 폼 (`src/components/auth/SignUpForm.tsx`)

**✅ 구현 완료**

- 이름, 이메일, 비밀번호 입력 필드
- 실시간 유효성 검증 (`useFormValidate` 훅 사용)
- 서버 액션 연동 (`useFormState` 훅 사용)
- 토스트 알림을 통한 사용자 피드백

### 로그인 폼 (`src/components/auth/LoginForm.tsx`)

**✅ 구현 완료**

- 이메일, 비밀번호 입력 필드
- 실시간 유효성 검증
- 서버 액션 연동
- 토스트 알림 시스템

**🔧 수정 필요**

- `Label htmlFor="name"` → `htmlFor="email"` 수정 필요 (접근성)
- `TSignUpFormError` → `TLoginFormError` 타입 사용 필요

---

## 2. 유효성 검증 스키마

### Zod 스키마 (`src/schemas/auth.ts`)

**✅ 회원가입 스키마 완료**

```typescript
SignUpSchema: {
  name: 문자만 허용, 1글자 이상
  email: 이메일 형식 검증
  password: 8자 이상, 대소문자/숫자/특수문자 각 1개 포함
}
```

**✅ 로그인 스키마 완료**

```typescript
LoginSchema: {
  email: 이메일 형식 검증
  password: 1글자 이상 (간단한 검증)
}
```

---

## 3. 서버 액션 (Server Actions)

### 회원가입 액션 (`src/actions/signup.ts`)

**✅ 핵심 기능 완료**

- FormData 유효성 검증 (Zod)
- 이메일 중복 체크
- MongoDB에 사용자 데이터 저장
- 성공/에러 응답 반환

**🔧 수정 필요**

- 비밀번호 해시화 미구현 (평문 저장 중)

```typescript
// TODO: 추가해야 할 코드
import { hash } from "bcryptjs";
const hashedPassword = await hash(password, 12);
```

### 로그인 액션 (`src/actions/login.ts`)

**✅ 핵심 기능 완료**

- FormData 유효성 검증
- 사용자 존재 여부 확인
- 비밀번호 일치 검증 (현재 평문 비교)
- JWT 세션 생성 및 쿠키 저장
- `/dashboard`로 리다이렉트

**🔧 수정 필요**

- `errorMesage` → `errorMessage` 오타 수정
- 불필요한 `getDB` import 제거
- 비밀번호 해시 비교로 변경 필요

```typescript
// 현재: const passwordMatch = password === dbPassword;
// TODO: const passwordMatch = await compare(password, dbPassword);
```

---

## 4. 세션 관리 시스템

### JWT 세션 관리 (`src/actions/session.ts`)

**✅ 구현 완료**

- JWT 생성/검증 함수 (`jose` 라이브러리 사용)
- 쿠키 생성/삭제 함수
- 세션 검증 및 리다이렉트 함수

**구현된 함수들:**

```typescript
- encrypt(): JWT 토큰 생성
- verify(): JWT 토큰 검증
- createSession(): 세션 생성 및 쿠키 저장
- deleteSession(): 세션 삭제
- verifySession(): 세션 검증 후 사용자 정보 반환
```

**🔧 수정 필요**

- `SESSION_SECRET` 환경변수 존재 여부 체크

```typescript
// TODO: 추가 필요
if (!secretKey) {
  throw new Error("SESSION_SECRET environment variable is required");
}
```

---

## 5. 데이터베이스 스키마

### MongoDB 스키마 (`src/db/schema.ts`)

**✅ 구현 완료**

```typescript
interface User {
  _id?: ObjectId;
  email: string;
  password: string; // 현재 평문, 해시화 필요
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}
```

### 데이터 액세스 (`src/data/user.ts`)

**✅ 구현 완료**

- `getUserByEmail()`: 이메일로 사용자 조회

---

## 6. 타입 정의

### 폼 에러 타입 (`src/types/form.ts`)

**✅ 회원가입 타입 완료**

- `TSignUpFormError`: 회원가입 폼 에러 타입

**✅ 로그인 타입 완료**

- `TLoginFormError`: 로그인 폼 에러 타입 (최근 추가)

---

## 7. 커스텀 훅

### 폼 검증 훅 (`src/hooks/useFormValidate.ts`)

**✅ 구현 완료**

- 실시간 폼 유효성 검증
- Zod 스키마 연동
- 에러 메시지 상태 관리

---

## 8. UI 라이브러리

### 토스트 알림

**✅ 구현 완료**

- `react-hot-toast` 사용
- 에러/성공 메시지 표시
- 사용자 친화적 알림

---

## 🚨 현재 알려진 주요 이슈

### 1. 보안 이슈 (중요도: 높음)

- **비밀번호 평문 저장**: 회원가입 시 해시화하지 않고 평문으로 DB 저장
- **비밀번호 평문 비교**: 로그인 시 해시 비교가 아닌 평문 비교

### 2. 코드 품질 이슈 (중요도: 중간)

- **타입 불일치**: 로그인 폼에서 회원가입 타입 사용
- **HTML 접근성**: Label의 htmlFor 속성 오류
- **오타**: `errorMesage` → `errorMessage`

### 3. 환경 설정 이슈 (중요도: 중간)

- **환경변수 체크**: `SESSION_SECRET` 존재 여부 확인 로직 없음

---

## 🎯 우선순위별 수정 계획

### 우선순위 1 (보안 관련)

1. 회원가입 시 비밀번호 해시화 구현
2. 로그인 시 해시 비교로 변경
3. 기존 평문 비밀번호 데이터 마이그레이션

### 우선순위 2 (버그 수정)

1. `errorMesage` 오타 수정
2. HTML `htmlFor` 속성 수정
3. 타입 정의 일관성 개선

### 우선순위 3 (개선사항)

1. 환경변수 검증 로직 추가
2. 불필요한 import 제거
3. 에러 처리 개선

---

# 메인 애플리케이션 개발 계획

## 🎯 개발 목표

- **메인화면 (대시보드)**: 학습 진도, 최근 문제, 성취도 표시
- **마이페이지**: 프로필 관리, 설정, 학습 통계

---

## 📁 컴포넌트 구조 설계

### 1. 공통 컴포넌트 (Shared Components)

```
src/components/
├── layout/
│   ├── Header.tsx              # 상단 네비게이션 바
│   ├── Sidebar.tsx             # 사이드 메뉴 (모바일: 햄버거)
│   ├── Footer.tsx              # 하단 정보
│   └── Layout.tsx              # 전체 레이아웃 래퍼
├── ui/                         # shadcn-ui 기본 컴포넌트들
├── common/
│   ├── LoadingSpinner.tsx      # 로딩 상태
│   ├── ErrorBoundary.tsx       # 에러 처리
│   ├── UserAvatar.tsx          # 사용자 아바타
│   └── ProgressBar.tsx         # 진도 표시바
└── features/                   # 기능별 컴포넌트
    ├── dashboard/
    │   ├── WelcomeCard.tsx     # 환영 메시지
    │   ├── StudyProgress.tsx   # 학습 진도
    │   ├── RecentProblems.tsx  # 최근 풀어본 문제들
    │   └── AchievementBadge.tsx # 성취 뱃지
    └── profile/
        ├── ProfileHeader.tsx   # 프로필 헤더
        ├── EditProfileForm.tsx # 프로필 수정 폼
        └── StudyStats.tsx      # 학습 통계
```

### 2. 페이지 컴포넌트 구조

```
src/app/
├── (dashboard)/
│   ├── page.tsx               # 메인 대시보드
│   └── layout.tsx             # 대시보드 전용 레이아웃
├── profile/
│   ├── page.tsx               # 마이페이지
│   ├── edit/
│   │   └── page.tsx           # 프로필 편집
│   └── settings/
│       └── page.tsx           # 설정 페이지
└── (auth)/                    # 기존 인증 라우트
    ├── login/
    └── signup/
```

---

## 🛣️ 라우팅 전략 (Next.js App Router)

### 1. 라우트 구조

```typescript
// 주요 라우트 정의
const routes = {
  // 인증되지 않은 사용자
  AUTH: {
    LOGIN: "/login",
    SIGNUP: "/signup",
  },

  // 인증된 사용자 (Protected Routes)
  DASHBOARD: "/",
  PROFILE: {
    VIEW: "/profile",
    EDIT: "/profile/edit",
    SETTINGS: "/profile/settings",
  },

  // 학습 관련 (추후 확장)
  STUDY: {
    PROBLEMS: "/problems",
    RESULTS: "/results",
  },
};
```

### 2. 라우트 보호 (Route Protection)

```typescript
// middleware.ts - 인증 미들웨어
export function middleware(request: NextRequest) {
  const token = request.cookies.get("session")?.value;

  // 보호된 라우트 목록
  const protectedPaths = ["/", "/profile"];
  const authPaths = ["/login", "/signup"];

  if (
    protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))
  ) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (authPaths.includes(request.nextUrl.pathname)) {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}
```

### 3. 레이아웃 계층 구조

```typescript
// app/layout.tsx (Root Layout)
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>
          {" "}
          {/* 상태 관리 프로바이더 */}
          <ErrorBoundary>
            {" "}
            {/* 전역 에러 처리 */}
            {children}
          </ErrorBoundary>
        </Providers>
      </body>
    </html>
  );
}

// app/(dashboard)/layout.tsx (Dashboard Layout)
export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
```

---

## 🎛️ 상태 관리 전략

### 1. 상태 관리 도구 선택: **Zustand**

```bash
npm install zustand
```

**선택 이유:**

- 가볍고 간단한 API
- TypeScript 친화적
- Redux DevTools 지원
- 보일러플레이트 코드 최소

### 2. 스토어 구조 설계

```typescript
// stores/authStore.ts - 인증 상태
interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,

  login: (userData) =>
    set({
      user: userData,
      isAuthenticated: true,
    }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),

  updateProfile: (data) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...data } : null,
    })),
}));

// stores/studyStore.ts - 학습 상태
interface StudyState {
  currentProgress: number;
  recentProblems: Problem[];
  achievements: Achievement[];
  fetchDashboardData: () => Promise<void>;
}

// stores/uiStore.ts - UI 상태
interface UIState {
  sidebarOpen: boolean;
  theme: "light" | "dark";
  toggleSidebar: () => void;
  setTheme: (theme: "light" | "dark") => void;
}
```

### 3. 데이터 페칭 전략

```typescript
// hooks/useUser.ts - 사용자 데이터 훅
export const useUser = () => {
  const { user, isLoading, updateProfile } = useAuthStore();

  const mutateProfile = useMutation({
    mutationFn: (data: UpdateProfileData) => updateUserProfile(data),
    onSuccess: (updatedUser) => {
      updateProfile(updatedUser);
      toast.success("프로필이 업데이트되었습니다.");
    },
  });

  return {
    user,
    isLoading,
    updateProfile: mutateProfile.mutate,
    isUpdating: mutateProfile.isPending,
  };
};
```

---

## 🎨 UI/UX 설계 가이드라인

### 1. 디자인 시스템

```typescript
// styles/design-system.ts
export const designTokens = {
  colors: {
    primary: {
      50: "#eff6ff",
      500: "#3b82f6",
      900: "#1e3a8a",
    },
    semantic: {
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
    },
  },

  spacing: {
    xs: "0.5rem",
    sm: "1rem",
    md: "1.5rem",
    lg: "2rem",
    xl: "3rem",
  },

  typography: {
    heading: "font-bold text-gray-900",
    body: "text-gray-700",
    caption: "text-sm text-gray-500",
  },
};
```

### 2. 반응형 디자인

```typescript
// 브레이크포인트 정의
const breakpoints = {
  mobile: "768px",
  tablet: "1024px",
  desktop: "1280px",
};

// 모바일 우선 설계
const ResponsiveGrid = () => (
  <div
    className="
    grid grid-cols-1 gap-4
    md:grid-cols-2 md:gap-6
    lg:grid-cols-3 lg:gap-8
  "
  >
    {/* 컨텐츠 */}
  </div>
);
```

---

## 🔄 개발 단계별 계획

### Phase 1: 기초 구조 (1주차)

1. **레이아웃 컴포넌트** 구축
   - Header, Sidebar, Layout 컴포넌트
   - 반응형 네비게이션
2. **라우팅 설정**
   - 미들웨어 구성
   - 보호된 라우트 설정
3. **상태 관리 구축**
   - Zustand 스토어 설정
   - 인증 상태 관리

### Phase 2: 대시보드 개발 (1주차)

1. **대시보드 페이지** 구현
   - 환영 메시지 카드
   - 학습 진도 표시
   - 최근 활동 목록
2. **공통 컴포넌트** 개발
   - 진도바, 아바타, 로딩 등

### Phase 3: 마이페이지 개발 (1주차)

1. **프로필 페이지** 구현
   - 사용자 정보 표시
   - 프로필 편집 폼
   - 학습 통계 차트
2. **설정 페이지** 구현
   - 계정 설정
   - 테마 변경

### Phase 4: 최적화 & 테스트 (0.5주차)

1. **성능 최적화**
   - 이미지 최적화
   - 코드 스플리팅
   - 캐싱 전략
2. **테스트 코드** 작성
3. **접근성** 개선

---

## 🛠️ 기술 스택 요약

### 프론트엔드

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **상태관리**: Zustand
- **HTTP Client**: Fetch API / Axios
- **Form**: React Hook Form + Zod
- **Toast**: react-hot-toast

### 개발 도구

- **TypeScript**: 타입 안정성
- **ESLint + Prettier**: 코드 품질
- **Husky**: Git hooks

---

## 📊 예상 개발 일정

- **총 소요 시간**: 3.5주
- **핵심 기능 완성**: 2.5주
- **테스트 및 최적화**: 1주

이 계획을 바탕으로 단계적으로 개발을 진행하면, 확장 가능하고 유지보수성이 높은 애플리케이션을 구축할 수 있습니다.

## 앞으로의 개발 계획

### 백엔드 로직 분리 방향

- 핸들러 함수와 폼 전달 부분(백엔드 로직)은 별도 개발
- DTO(Data Transfer Object) 정의 후 프론트엔드 개발 진행
- API 스펙이 확정되면 그에 맞는 UI만 빠르게 구현하는 방식으로 전환

### 개발 방식 변경

1. **백엔드 팀과 API 스펙 협의**
2. **DTO 및 인터페이스 정의**
3. **목업 데이터로 UI 먼저 구현**
4. **실제 API 연동은 마지막 단계에서 진행**

이를 통해 프론트엔드와 백엔드 개발을 병렬로 진행하여 개발 효율성을 높일 예정입니다.
