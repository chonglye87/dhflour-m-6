# 게시판 만들기 가이드

## 게시판 만들기 가이드 - 폴더 구성

```
/src
│
├── /pages
│   └── /dashboard
│       └── /board
│           └── list.tsx                // 페이지 콤퍼넌트
│
├── /routes
│   └── /sections
│       └── dashboard.tsx               // 메뉴 라우터 추가 및 공지사항 게시판 리액트훅 Wrapping
│
├── /sections
│   └── /board
│       ├── board-manager-provider.tsx  // BoardManagerProvider
│       ├── board-table-filters-result.tsx // 게시판 필터
│       ├── board-table-toolbar.tsx     // 게시판 툴바
│       │
│       └── /view
│           ├── board-list-view.tsx     // 게시판 몸체 BoardListView 컴퍼넌트
│           ├── board-new-edit-form.tsx // 등록/수정 컴퍼넌트
│           ├── board-view-body.tsx     // 상세보기 컴퍼넌트
│           └── board-table-row.tsx     // 테이블 행 컴퍼넌트
```

## 세부 설명
## 게시판 훅 만들기
**BoardManagerProvider 생성**

- **파일 위치:** `/src/sections/board/board-manager-provider.tsx`

## 페이지 만들기
**BoardPage 생성**

- **파일 위치:** `/src/pages/dashboard/board/list.tsx`

## 메뉴 추가 및 페이지 Wrapping
- **파일 위치:** `/src/routes/sections/dashboard.tsx`
- `dashboardRoutes > children` 배열에 추가하기
```jsx
{ path: 'board', element: <BoardManagerProvider><BoardPage /></BoardManagerProvider> },
```

## 게시판 몸체 생성
**BoardListView 컴퍼넌트**

- **파일 위치:** `/src/sections/board/view/board-list-view.tsx`

## 게시판 필터 및 툴바
- **필터:** `/src/sections/board/board-table-filters-result.tsx`
- **툴바:** `/src/sections/board/board-table-toolbar.tsx`

## 등록/수정 컴퍼넌트
**BoardNewEditForm 컴퍼넌트**

- **파일 위치:** `/src/sections/board/view/board-new-edit-form.tsx`

## 상세보기 컴퍼넌트
**BoardViewBody 컴퍼넌트**

- **파일 위치:** `/src/sections/board/view/board-view-body.tsx`

## 테이블 행 컴퍼넌트
**BoardTableRow 컴퍼넌트**

- **파일 위치:** `/src/sections/board/view/board-table-row.tsx`
