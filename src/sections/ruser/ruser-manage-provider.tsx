import {useLocation} from "react-router-dom";
import {useMemo, useContext, createContext,} from 'react';

import {useTable} from "../../components/table";
import {useSetState} from "../../hooks/use-set-state";

import type {IRUserFilters} from "../../types/ruser";
import type {TableProps} from "../../components/table";
import type {UseSetStateReturn} from "../../hooks/use-set-state";

// ----------------------------------------------------------------------

// 기본 필터 값 정의
const defaultFilters: IRUserFilters = {
  query: "", // 검색어
  startTime: null, // 시작일
  endTime: null, // 종료일
};

type Props = {
  searchParams: URLSearchParams;
  paramPage: number;
  paramSize: number;
  paramQuery: string;
  paramStartDate: string;
  paramEndDate: string;

  table: TableProps;
  denseHeight: number;
  defaultFilters: IRUserFilters;
  filters: UseSetStateReturn<IRUserFilters>;
};

// 초기 상태 정의
const initialState: Props = {
  searchParams: new URLSearchParams(''),
  paramPage: 0,
  paramSize: 0,
  paramQuery: '',
  paramStartDate: '',
  paramEndDate: '',
  // 테이블 훅 초기화
  table: {
    dense: false,
    page: 0,
    rowsPerPage: 10,
    order: 'asc',
    orderBy: 'id',
    selected: [],
    total: 0,
    onSelectRow: (id: string | number) => {},
    onSelectAllRows: (checked: boolean, newSelecteds: string[]) => {},
    onResetPage: () => {},
    onSort: (id: string) => {},
    onChangePage: (event: unknown, newPage: number) => {},
    onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => {},
    onChangeDense: (event: React.ChangeEvent<HTMLInputElement>) => {},
    onUpdatePageDeleteRow: (totalRowsInPage: number) => {},
    onUpdatePageDeleteRows({
                             totalRowsInPage,
                             totalRowsFiltered,
                           }: {
      totalRowsInPage: number;
      totalRowsFiltered: number;
    }) {
    },
    setPage: () => {},
    setDense: () => {},
    setOrder: () => {},
    setOrderBy: () => {},
    setSelected: () => {},
    setRowsPerPage: () => {},
    setTotal: () => {},
  },
  denseHeight: 72,
  defaultFilters,
  filters: {
    state: defaultFilters,
    canReset: true,
    onResetState: () => {},
    setState: () => {},
    setField: () => {},
  }
};

// RUserManagerContext를 생성하여 하위 컴포넌트들이 사용할 수 있게 함
export const RUserManagerContext = createContext(initialState);

// RUserManagerContext를 사용하기 위한 커스텀 훅
export const useRUserManagerContext = () => {
  const context = useContext(RUserManagerContext);

  if (!context)
    throw new Error(
      'useRUserManagerContext must be use inside RUserManaderProvider'
    );

  return context;
};

type ManagerProviderProps = {
  children: React.ReactNode;
};

// RUserManagerProvider 컴포넌트를 정의합니다. children prop을 사용하여 이 프로바이더 내의 요소를 전달합니다.
export function RUserManagerProvider({children}: ManagerProviderProps) {

  // React Router에서 위치 객체에 접근하기 위한 훅입니다.
  const location = useLocation();

  // 현재 URL의 쿼리 매개변수에서 `searchParams`를 파생시키고, 불필요한 재계산을 방지하기 위해 메모이제이션합니다.
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  // URL에서 페이징 및 필터링 매개변수를 추출하고, 없을 경우 기본값을 사용합니다.
  const paramPage = searchParams.get("page") ? Number(searchParams.get("page")) : 0;
  const paramSize = searchParams.get("size") ? Number(searchParams.get("size")) : 10;
  const paramQuery = searchParams.get("query") || "";
  const paramStartDate = searchParams.get("startTime") || "";
  const paramEndDate = searchParams.get("endTime") || "";

  // 정렬 및 페이징과 같은 테이블 상태를 관리하기 위한 사용자 정의 훅입니다.
  const table = useTable({
    defaultOrderBy: "id",
    defaultOrder: "desc",
    defaultRowsPerPage: paramSize,
    defaultCurrentPage: paramPage,
  });
  const filters = useSetState<IRUserFilters>(defaultFilters);

  // 테이블 밀도 설정에 따라 행 높이를 계산합니다.
  const denseHeight = table.dense ? 56 : 56 + 20;

  // 성능을 최적화하고 불필요한 렌더링을 방지하기 위해 제공자 값에 메모이제이션을 적용합니다.
  const memoizedValue = useMemo(
    () => ({
      searchParams, // 현재 URL의 쿼리 파라미터를 나타내는 URLSearchParams 객체
      paramPage, // 현재 페이지 번호
      paramSize, // 페이지 당 보여줄 데이터 수
      paramQuery, // 검색 쿼리 파라미터
      paramStartDate, // 필터링 시작 날짜 파라미터
      paramEndDate, // 필터링 종료 날짜 파라미터

      table, // useTable 훅에서 반환된 테이블 관리 객체
      denseHeight, // 행의 높이를 결정하는 값 (밀집도에 따라 변함)

      defaultFilters, // 필터의 기본값
      filters, // 현재 적용된 필터 상태
    }),
    [
      searchParams,
      paramPage,
      paramSize,
      paramQuery,
      paramStartDate,
      paramEndDate,
      table,
      denseHeight,
      filters,
    ]
  );

  return (
    <RUserManagerContext.Provider value={memoizedValue}>
      {children}
    </RUserManagerContext.Provider>
  );
}
