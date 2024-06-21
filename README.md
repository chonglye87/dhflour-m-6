# FRONT 개발 환경 설정 ( Windows )
## Node.js 설치 및 설정
- Nginx 설치 및 실행 방법은 [NGINX_INSTALL.md](./doc/NGINX_INSTALL.md) 파일을 참고하세요.

### Yarn으로 프로젝트 의존성 관리
```bash
## 프로젝트의 모든 의존성을 설치
$ yarn install

##  라이브러리나 프레임워크를 추가 설치 할 경우
$ yarn add <package-name>
```

### 잠금 파일 관리
- 버전 충돌이나 의존성 문제를 해결하기 위해 잠금 파일을 제거하고 패키지를 새로 설치할 수 있습니다.
```bash
## node_modules 디렉토리와 yarn.lock 파일을 삭제
$ rm -rf node_modules yarn.lock

## 패키지를 새로 설치
$ yarn install
```
## ESLint & Prettier
- [ESLint.md](./doc/ESLint.md) 파일을 참고하세요.

## Git 및 버전 관리 설정
- [Git.md](./doc/Git.md) 파일을 참고하세요.


## 환경 변수 설정
- [Env.md](./doc/Env.md) 파일을 참고하세요.

## 프로젝트 스크립트
### package.json scripts 속성
```
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "api-build": "npx swagger-typescript-api -p http://localhost:8000/api-docs -o ./src/generated/swagger -n swagger.api.ts --axios"
  },
```
```
## 개발 서버
$ yarn dev

## 빌드
$ yarn build

## TypeScript API 클라이언트를 생성
$ yarn api-build
```

