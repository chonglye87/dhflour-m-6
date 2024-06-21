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
