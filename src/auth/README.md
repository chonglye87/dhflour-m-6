# auth 폴더 구조

```
auth/ : 사용자 인증과 관련된 모든 로직과 컴포넌트를 포함합니다.
├── context/
│   ├── action.ts : 사용자 로그인, 회원가입, 로그아웃 등의 기능을 처리하는 함수들
│   ├── auth-provider.tsx : 인증 컨텍스트 프로바이더 컴포넌트로, 사용자 세션을 확인하고 인증 상태를 관리
│   └── utils.ts : 토큰의 저장, 삭제, 유효성 검사 등의 유틸리티 함수들
├── hooks/
│   └── use-auth-context.ts : AuthContext를 사용하여 인증 상태와 사용자 정보를 가져오는 훅
├── guard/
│   ├── auth-guard.tsx : 인증된 사용자만 접근할 수 있는 경로를 보호
│   ├── guest-guard.tsx : 비인증 사용자만 접근할 수 있는 경로를 보호
│   └── role-based-guard.tsx : 사용자의 역할에 따라 접근을 제어
└── types.ts : 인증 상태와 컨텍스트 값에 대한 타입 정의
```
