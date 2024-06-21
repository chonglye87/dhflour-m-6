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
