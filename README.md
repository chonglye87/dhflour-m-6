# FRONT 개발 환경 설정 ( Windows )

## Node.js 설정

### nvm 설치
- [nvm-windows GitHub](https://github.com/coreybutler/nvm-windows/releases)
- nvm-setup.zip 다운로드
```
## 설치 확인 (버전 확인)
$ nvm -v
```
### Node.js 설치 및 관리

```
Node.js 20.x (Recommended)

## Node.js 버전 설치
$ nvm install <version>

## Node.js 버전 목록
$ nvm ls

## 사용할 Node.js 버전을 설정
$ nvm use <version>

## Node.js 버전 default 설정
$ nvm alias default <version>

## Node.js 버전 확인
$ node -v
```

## Yarn
### Yarn 패키지 매니저 설치
```
## Yarn 설치
$ npm install -g yarn

## Yarn 설치 확인 (버전 확인)
$ yarn -v
```

### Yarn으로 프로젝트 의존성 관리
```
## 프로젝트의 모든 의존성을 설치
$ yarn install

##  라이브러리나 프레임워크를 추가 설치 할 경우
$ yarn add <package-name>
```

### 잠금 파일 관리
- 버전 충돌이나 의존성 문제를 해결하기 위해 잠금 파일을 제거하고 패키지를 새로 설치할 수 있습니다.
```
## node_modules 디렉토리와 yarn.lock 파일을 삭제
$ rm -rf node_modules yarn.lock

## 패키지를 새로 설치
$ yarn install
```
## ESLint & Prettier
###  ESLint 설정 파일 : .eslintrc.cjs
- 현재 프로젝트는 Airbnb 스타일 가이드를 기반으로 ESLint가 설정되어 있습니다.
- rules 속성안에 새로운 규칙을 추가합니다.
```
"rules": {
  // 기존 규칙
 'no-alert': 0,
  camelcase: 0,
  'no-console': 0,
  'no-unused-vars': 0,
   ...
  // 새로운 규칙 추가
}
```

### .eslintignore 파일 설정
- ESLint가 무시할 파일 및 디렉토리를 작성합니다.
```
build/*
dist/*
public/*
...
```

###  Prettier 설정 파일 : prettier.config.mjs
```
const config = {
  semi: true,
  tabWidth: 2,
  endOfLine: 'lf',
  printWidth: 100,
  singleQuote: true,
  trailingComma: 'es5',
  ...
   // 새로운 규칙 추가
};

module.exports = config;
```
## Git 및 버전 관리 설정
### Git 설치
-[Git 공식 웹사이트](https://git-scm.com/)에서 다운로드
```
## 설치 확인 (버전 확인)
$ git --version
```
### .gitignore 파일 설정
- Git이 무시할 파일 및 디렉토리 작성합니다.
```
  node_modules/
  dist/
  .env
  ....
```
### Git  주요 명령어
```
## pull : 원격 저장소의 변경 사항을 현재 브랜치로 가져옵니다.
$ git pull origin <branchName> --rebase

## push: 변경 사항을 원격 저장소에 푸시합니다.
$ git add .
$ git commit -m "commit message"
$ git push origin <branchName>

## 충돌이 발생했을 때, 충돌 난 부분을 수정한 후 다음 명령어를 실행합니다.
$ git add .
$ git commit -m "commit message"
$ git rebase --continue

```

## 환경 변수 설정
### .env 파일 설정
```
## 환경 변수는 VITE로 시작해야 합니다.
VITE_SERVER_URL=https://api.example.com
```

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

