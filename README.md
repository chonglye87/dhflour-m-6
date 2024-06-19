# FRONT 개발 환경 설정 ( Windows )

## Node.js

### node.js 설정
1. nvm 설치
- [nvm-windows GitHub](https://github.com/coreybutler/nvm-windows/releases)
- nvm-setup.zip 다운로드
```
## 설치 확인 (버전 확인)
$ nvm -v
```
2. Node.js 설치 및 관리
```
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
###  ESLint 설정 파일 : .eslintrc
- 현재 프로젝트는 Airbnb 스타일 가이드를 기반으로 ESLint가 설정되어 있습니다.
- rules 속성안에 새로운 규칙을 추가합니다.
```
"rules": {
// 기존 규칙
"no-unused-vars": "warn",
"no-console": "off",
// 새로운 규칙 추가
"quotes": ["error", "double"],
"semi": ["error", "always"]
...
}
```

### .eslintignore 파일 설정
- ESLint가 무시할 파일 및 디렉토리 작성
```
build/*
dist/*
public/*
...
```

###  Prettier 설정 파일 : .prettierrc
```
{
  "printWidth": 100,
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2
  ...
}

```
## Git 및 버전 관리 설정
### Git 설치
-[Git 공식 웹사이트](https://git-scm.com/)에서 다운로드
```
## 설치 확인 (버전 확인)
$ git --version
```
### .gitignore 파일 설정
- Git이 무시할 파일 및 디렉토리 작성
```
  node_modules/
  dist/
  .env
  ....
```

## 환경 변수 설정
### .env 파일 설정
```
REACT_APP_API_URL=https://api.example.com
```

## 프로젝트 스크립트
### package.json scripts 속성
```
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "api-build": "npx swagger-typescript-api -p http://localhost:8080/api-docs -o ./src/generated/swagger -n swagger.api.ts --axios"
  },
```
```
## 개발 서버
$ yarn start

## 빌드
$ yarn build

## TypeScript API 클라이언트를 생성
$ yarn api-build
```


# 프로젝트 구조 설명
# `1. public`
프로젝트의 정적 파일을 포함하며, 애플리케이션이 빌드될 때 그대로 복사되는 파일들을 담고 있습니다.

## `assets`
아이콘 및 이미지 파일들을 위치합니다.  <br/>
코드에서 root(/)를 기준으로 파일을 참조할 수 있습니다.
`/assets/img.png`

## `favicon`
파비콘 파일을 위치합니다.

## `fonts`
폰트 파일을 위치합니다.  <br/>
index.css 파일안에 글꼴을 설정합니다.
```
@font-face {
  font-family: 'CircularStd';
  font-weight: 400;
  font-style: normal;
  src: local('CircularStd'), url('CircularStd-Book.otf') format('opentype');
}
```
## `logo`
로고 파일을 위치합니다.

## `mock`
개발 과정에서 mock 데이터를 사용하기 위해 JSON 형식으로 저장된 파일들이 위치합니다.

## `index.html`
애플리케이션의 루트 HTML 파일입니다. 기본적인 HTML 구조와 메타데이터, 스타일시트 링크, 그리고 JavaScript가 삽입될 루트 요소를 포함합니다.

## `manifest.json`
앱 이름, 아이콘, 시작 URL, 테마 색상 등을 정의합니다.

## `robots.txt`
검색 엔진 크롤러에게 특정 페이지를 크롤링하지 않도록 지시하는 파일입니다. SEO(검색 엔진 최적화)에 사용됩니다.


# `2. src`
애플리케이션의 주요 소스 코드를 포함하고 있습니다.

## `_mock`
개발에 필요한 목업 데이터를 포함합니다

## `auth`
로그인, 회원가입, 회원정보, 로그아웃 등 유저와 관련된 provider와 context가 포함되어 있습니다. 유저 인증과 관련된 모든 로직이 여기에 위치합니다.

## `components`
재사용 가능한 UI 컴포넌트들이 포함됩니다. logo, label, iconify, image 등 다양한 컴포넌트들이 이 폴더에 위치합니다.

## `generated`
Swagger API 문서를 기반으로 yarn api-build 명령을 통해 생성된 파일들이 포함됩니다. API 클라이언트 코드가 위치합니다.

## `hooks`
React 커스텀 훅들이 포함됩니다. 상태 관리, 반응형 디자인 등을 위한 훅들이 정의되어 있습니다.

## `layouts`
레이아웃 구성 요소들을 포함하며, auth, dashboard, common, compact 등의 레이아웃 폴더로 구성됩니다. <br/>
주요 폴더 및 파일 상세설명은 아래와 같습니다.
### `auth 폴더`
인증 관련 레이아웃 컴포넌트를 포함합니다. <br/>
로그인 페이지와 같은 인증 페이지의 레이아웃을 정의합니다.
### `dashboard 폴더`
대시보드 페이지의 레이아웃 컴포넌트들을 포함합니다. <br/>
config-navigation.tsx 파일은 네비게이션 설정을 정의합니다.  <br/>
layout.tsx은 파일은 대시보드 페이지의 레이아웃을 정의합니다.  <br/>
### `config-layout.ts`
layouts 폴더 내에서 전역적으로 사용할 변수들을 정의합니다.

## `pages`
애플리케이션의 각 페이지 컴포넌트를 포함합니다. 예를 들어, 대시보드 페이지, 로그인 페이지, 회원가입 페이지 등이 여기에 위치합니다.

## `routes`
라우팅 관련 설정과 컴포넌트들이 포함됩니다.
### `components`
라우팅에 사용되는 공통 컴포넌트들을 포함합니다.
### `hooks`
라우팅과 관련된 커스텀 훅들을 포함합니다. <br/>
### `sections`
라우트 섹션을 정의합니다. <br/>
- auth.tsx: 인증 관련 라우트 섹션을 정의합니다.
- dashboard.tsx: 대시보드 관련 라우트 섹션을 정의합니다.
### `paths.ts 파일`
프로젝트 내 라우트 경로를 정의합니다.

## `sections`
페이지별로 섹션 폴더를 나누고, 각 섹션 폴더는 여러 섹션 파일과 해당 파일들을 보여주는 view 폴더로 구성되어 있습니다

## `theme`
theme 폴더에는 팔레트(palette), 타이포그래피(typography), 다크 모드(dark mode) 등 테마와 관련된 설정 파일들이 포함되어 있습니다.  <br/>
이 설정 파일들은 애플리케이션의 전반적인 스타일과 디자인을 정의합니다. <br/>
또한, overrides 폴더 내의 components 폴더에서는 MUI(Material-UI) 컴포넌트들을 오버라이드하여 커스터마이징할 수 있습니다.

## `types`
types 폴더에는 Swagger API 문서를 기반으로 생성된 타입들을 제외한, 프론트엔드에서만 사용되는 타입 정의가 포함됩니다.  <br/>
또한, 개발 단계에서 사용하는 목업 데이터 타입도 여기에 설정 할 수 있습니다.

## `utils`
utils 폴더에는 API 호출, Axios 설정, 날짜 포맷팅 등 유틸리티 함수들이 포함되어 있습니다.

## `App.tsx`
App.tsx 파일은 애플리케이션의 루트 컴포넌트로, 다양한 프로바이더와 설정을 통해 애플리케이션의 전역 상태와 기능을 관리합니다.
