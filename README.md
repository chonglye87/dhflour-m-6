# FRONT 개발 환경 설정 ( Windows )
## Node.js 설치 및 설정
- [NVM_INSTALL.md](./doc/NVM_INSTALL.md) 파일을 참고하세요.

## ESLint & Prettier 설정
- [ESLint.md](./doc/ESLint.md) 파일을 참고하세요.

## Git 및 버전 관리 설정
- [Git.md](./doc/Git.md) 파일을 참고하세요.

## 환경 변수 설정
- [Env.md](./doc/Env.md) 파일을 참고하세요.

---
# 실행 방법
### 실행 환경
- node 버전 : 20+

### Yarn으로 프로젝트 의존성 관리
```bash
## 프로젝트의 모든 의존성을 설치
$ yarn
or
$ yarn install

##  라이브러리나 프레임워크를 추가 설치 할 경우
$ yarn add <package-name>
```

## 프로젝트 실행
```bash
## 개발 실행
$ yarn dev

## 빌드
$ yarn build

## 빌드 파일 시작
$ yarn start

## TypeScript API 클라이언트를 생성
$ yarn api-build
```

## 서버 배포 실행 (PM2 환경)
```bash
$ pm2 start
```
---
# 게시판 만들기 가이드
- [BoardGuide.md](./doc/BoardGuide.md) 파일을 참고하세요.
