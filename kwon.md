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
  throw new Error('SESSION_SECRET environment variable is required');
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
