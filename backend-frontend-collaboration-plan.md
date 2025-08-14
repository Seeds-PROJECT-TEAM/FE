# 백엔드-프론트엔드 협업 계획서

## 개요
Express 백엔드와 Next.js 프론트엔드 간의 효율적인 협업을 위한 단계별 개발 계획

## 1단계: API 스펙 합의서 작성 (Swagger/OpenAPI)

### 목표
- 백엔드와 프론트엔드 팀 간 명확한 API 인터페이스 정의
- 개발 중 발생할 수 있는 커뮤니케이션 오류 최소화

### 작업 내용
#### 1.1 Swagger 문서 작성
```yaml
# swagger.yaml 예시
openapi: 3.0.0
info:
  title: 너드수학 API
  version: 1.0.0

paths:
  /api/auth/signup:
    post:
      summary: 회원가입
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                name:
                  type: string
                  example: "홍길동"
                email:
                  type: string
                  format: email
                  example: "user@example.com"
                password:
                  type: string
                  minLength: 8
                  example: "Password123!"
      responses:
        200:
          description: 회원가입 성공
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                  message:
                    type: string
                  user:
                    $ref: '#/components/schemas/User'
```

#### 1.2 정의해야 할 주요 API
- **인증**: 회원가입, 로그인, 로그아웃, 토큰 갱신
- **사용자**: 프로필 조회/수정, 비밀번호 변경
- **학습**: 문제 목록, 문제 풀이, 진도 관리
- **관리**: 사용자 관리, 통계 조회

### 산출물
- `swagger.yaml` 파일
- Swagger UI를 통한 API 문서 웹사이트
- 팀 간 API 스펙 합의서

---

## 2단계: 공통 타입 정의 (types/api.ts)

### 목표
- TypeScript를 활용한 타입 안정성 확보
- 프론트엔드와 백엔드 간 데이터 구조 일치

### 작업 내용
#### 2.1 공통 타입 정의
```typescript
// types/api.ts
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// API 엔드포인트별 타입 정의
export interface AuthAPI {
  'POST /api/auth/signup': {
    request: {
      name: string;
      email: string;
      password: string;
    };
    response: AuthResponse;
  };
  
  'POST /api/auth/login': {
    request: {
      email: string;
      password: string;
    };
    response: AuthResponse;
  };
}
```

#### 2.2 Zod 스키마와 연동
```typescript
// schemas/api.ts
import { z } from 'zod';

export const SignUpRequestSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

export type SignUpRequest = z.infer<typeof SignUpRequestSchema>;
```

### 산출물
- `types/api.ts` 파일
- `schemas/api.ts` 파일
- 타입 정의서 문서

---

## 3단계: Mock 서버로 프론트엔드 개발 (MSW 사용)

### 목표
- 백엔드 개발 완료를 기다리지 않고 프론트엔드 개발 시작
- 실제 API와 동일한 인터페이스로 개발 및 테스트

### 작업 내용
#### 3.1 MSW 설정
```bash
npm install --save-dev msw
```

```javascript
// mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
  rest.post('/api/auth/login', (req, res, ctx) => {
    const { email, password } = req.body;
    
    if (email === 'test@example.com' && password === 'password') {
      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          message: '로그인 성공',
          token: 'mock-jwt-token',
          user: {
            id: '1',
            name: '테스트 사용자',
            email: 'test@example.com',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }
        })
      );
    }
    
    return res(
      ctx.status(401),
      ctx.json({
        success: false,
        message: '이메일 또는 비밀번호가 잘못되었습니다.',
      })
    );
  }),
];
```

#### 3.2 API 클라이언트 구현
```typescript
// lib/api-client.ts
class APIClient {
  private baseURL: string;
  
  constructor(baseURL: string = '/api') {
    this.baseURL = baseURL;
  }
  
  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    return response.json();
  }
}

export const apiClient = new APIClient();
```

### 산출물
- MSW 핸들러 파일
- API 클라이언트 라이브러리
- Mock 데이터 세트

---

## 4단계: Express API 개발 완료 후 연동

### 목표
- Mock API에서 실제 API로 원활한 전환
- 최소한의 코드 변경으로 통합 완료

### 작업 내용
#### 4.1 환경별 API 엔드포인트 설정
```typescript
// lib/config.ts
export const config = {
  apiBaseURL: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3001/api'  // Express 서버
    : '/api',  // 프로덕션 환경
};
```

#### 4.2 API 클라이언트 업데이트
```typescript
// lib/api-client.ts (수정)
export class APIClient {
  constructor(baseURL: string = config.apiBaseURL) {
    this.baseURL = baseURL;
  }
  
  // 인증 토큰 처리 추가
  private getAuthHeaders() {
    const token = localStorage.getItem('auth-token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}
```

#### 4.3 Server Actions에서 API 호출로 변경
```typescript
// actions/auth.ts (기존 코드 수정)
export const login = async (_: any, formData: FormData) => {
  try {
    const response = await apiClient.post<AuthResponse>('/auth/login', {
      email: formData.get('email'),
      password: formData.get('password'),
    });
    
    if (response.success) {
      // JWT 토큰 저장
      cookies().set('auth-token', response.token!, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60, // 24시간
      });
      
      redirect('/dashboard');
    } else {
      return { errorMessage: response.message };
    }
  } catch (error) {
    return { errorMessage: '로그인 중 오류가 발생했습니다.' };
  }
};
```

### 산출물
- 환경별 설정 파일
- 업데이트된 API 클라이언트
- 실제 API 연동 코드

---

## 5단계: 통합 테스트

### 목표
- 전체 시스템의 정상 동작 확인
- 성능 및 보안 검증

### 작업 내용
#### 5.1 테스트 시나리오 작성
```typescript
// tests/integration/auth.test.ts
describe('인증 플로우 통합 테스트', () => {
  test('회원가입 -> 로그인 -> 대시보드 접근', async () => {
    // 회원가입 테스트
    const signupResponse = await apiClient.post('/auth/signup', {
      name: '테스트 사용자',
      email: 'test@example.com',
      password: 'Password123!',
    });
    expect(signupResponse.success).toBe(true);
    
    // 로그인 테스트
    const loginResponse = await apiClient.post('/auth/login', {
      email: 'test@example.com',
      password: 'Password123!',
    });
    expect(loginResponse.success).toBe(true);
    expect(loginResponse.token).toBeDefined();
    
    // 인증이 필요한 API 테스트
    const profileResponse = await apiClient.get('/user/profile', {
      headers: { Authorization: `Bearer ${loginResponse.token}` }
    });
    expect(profileResponse.success).toBe(true);
  });
});
```

#### 5.2 E2E 테스트
```typescript
// tests/e2e/auth.spec.ts (Playwright)
test('사용자 로그인 플로우', async ({ page }) => {
  await page.goto('/login');
  
  await page.fill('[name="email"]', 'test@example.com');
  await page.fill('[name="password"]', 'Password123!');
  await page.click('button[type="submit"]');
  
  await expect(page).toHaveURL('/dashboard');
  await expect(page.locator('h1')).toContainText('대시보드');
});
```

### 산출물
- 통합 테스트 코드
- E2E 테스트 시나리오
- 성능 테스트 결과
- 보안 검증 보고서

---

## 일정 및 역할 분담

### 예상 일정 (2주)
- **1-2일**: API 스펙 합의서 작성
- **3-4일**: 공통 타입 정의 및 Mock 서버 구축
- **5-10일**: 병렬 개발 (백엔드 API + 프론트엔드 UI)
- **11-12일**: API 연동 및 통합
- **13-14일**: 통합 테스트 및 버그 수정

### 역할 분담
#### 백엔드 팀 (Express)
- API 스펙 검토 및 합의
- Express API 서버 개발
- 데이터베이스 스키마 설계
- API 문서 유지보수

#### 프론트엔드 팀 (Next.js)
- 타입 정의 및 Mock 서버 구축
- UI 컴포넌트 개발
- 상태 관리 구현
- E2E 테스트 작성

#### 공통
- API 스펙 문서 작성
- 통합 테스트 시나리오 정의
- 코드 리뷰 및 품질 관리

---

## 성공 지표
- [ ] API 스펙 문서 100% 완성
- [ ] 타입 안정성 100% (TypeScript 에러 0개)
- [ ] 핵심 기능 E2E 테스트 통과율 95% 이상
- [ ] API 응답 시간 평균 200ms 이하
- [ ] 보안 취약점 0개

## 리스크 및 대응 방안
### 리스크
1. **API 스펙 변경**: 개발 중 API 스펙이 변경될 가능성
2. **일정 지연**: 백엔드/프론트엔드 개발 일정 불일치
3. **타입 불일치**: 실제 API와 타입 정의 간 차이

### 대응 방안
1. **버전 관리**: API 버전 관리 및 변경 로그 유지
2. **주간 동기화**: 매주 진행 상황 공유 미팅
3. **자동화 테스트**: CI/CD 파이프라인에 타입 검증 포함