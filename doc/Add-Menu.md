  # Dashboard Menu 추가 방법

1. path 경로 등록
   - 위치 : /src/routes/paths.ts
   - paths > dashboard 에  ```board: `${ROOTS.DASHBOARD}/board` ``` 경로 추가
2. 네비게이션 설정
   - 위치 : /src/layouts/config-nav-dashboard.tsx
   - navData 에 메뉴 추가
   ```typescript
    {
        subheader: 'sample',
        items: [
            {title: '게시판', path: paths.dashboard.board, icon: ICONS.blank},
            {title: '회원', path: paths.dashboard.user, icon: ICONS.user},
        ]
    }
   ```
3. 라우트 추가
   - 위치 : /src/routes/sections/dashboard.tsx
   - 콤포넌트 가져오기
   ```typescript
   const BoardPage = lazy(() => import('src/pages/dashboard/board/list'));
   ```
   - dashboardRoutes > children 배열에 추가하기
   ```typescript
    { path: 'board', element: <BoardPage /> },
   ```
