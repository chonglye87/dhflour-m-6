import {toast} from "sonner";
import {useState, useEffect, useCallback} from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';

import {paths} from 'src/routes/paths';

import {useBoolean} from 'src/hooks/use-boolean';

import {fISO, fIsAfter} from 'src/utils/format-time';

import {DashboardContent} from 'src/layouts/dashboard';

import {Iconify} from 'src/components/iconify';
import {Scrollbar} from 'src/components/scrollbar';
import {ConfirmDialog} from 'src/components/custom-dialog';
import {CustomBreadcrumbs} from 'src/components/custom-breadcrumbs';
import {
  emptyRows,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';

import {Swagger} from "../../../utils/API";
import RUserViewBody from './ruser-view-body';
import {RUserTableRow} from './ruser-table-row';
import RUserNewEditForm from "./ruser-new-edit-form";
import {RUserTableToolbar} from '../ruser-table-toolbar';
import {useRUserManagerContext} from "../ruser-manage-provider";
import {RUserTableFiltersResult} from '../ruser-table-filters-result';
import {DrawerWrapper} from "../../../components/drawer/DrawerWrapper";

import type {IRUserFilters} from "../../../types/ruser";
import type {RUser} from "../../../generated/swagger/swagger.api";

// ----------------------------------------------------------------------

/* 테이블 헤더 데이터 */
const TABLE_HEAD = [
  {id: "id", label: "ID", align: "left"},
  {id: "name", label: "사용자", align: "left", width: 220},
  {id: "mobile", label: "휴대폰번호"},
  {id: "policy", label: "약관정보"},
  {id: "createdAt", label: "등록시간", align: "center"},
  {id: ""},
];

// ----------------------------------------------------------------------

export function RUserListView() {
  // 상태 정의
  const [selectedId, setSelectedId] = useState<number | undefined>();
  const [tableData, setTableData] = useState<RUser[]>([]);
  const [detailData, setDetailData] = useState<RUser>();

  // Boolean 상태 훅들
  const confirm = useBoolean();
  const loading = useBoolean();
  const openNew = useBoolean();
  const openView = useBoolean();
  const openEdit = useBoolean();

  // 회원 관리 Context에서 필요한 정보들을 가져옴
  const {
    table, // use-table 훅
    denseHeight, // 밀집 높이
    filters,// 필터 관리
  } = useRUserManagerContext();

  // 페이지 데이터를 불러오는 함수
  const loadData = useCallback(async () => {
    loading.onTrue();  // 로딩 상태를 true로 설정
    let _query = '';
    if (filters.state.query && filters.state.query.length > 1) {
      _query = filters.state.query;
    }
    const {data} = await Swagger.api.pageUser({
      size: table.rowsPerPage, // 페이지 크기 기본: 10
      page: table.page, // 현재 페이지 0번 부터 시작
      query: _query, // 검색어
      startTime: fISO(filters.state.startTime), // 시작일
      endTime: fISO(filters.state.endTime), // 종료일
    });
    setTableData(data.content || []); // 테이블 데이터를 설정
    table.setRowsPerPage(data.size); // 페이지 사이즈
    table.setPage(data.page); // 현재 페이지
    table.setTotal(data.totalElements); // 총수량
    loading.onFalse();
  }, [filters.state.endTime, filters.state.query, filters.state.startTime, loading, table]);

  // 상세 데이터를 불러오는 함수
  const loadDetailData = useCallback(async (id: number) => {
    const {data} = await Swagger.api.getUserById(id); // 상세 호출
    setDetailData(data);
  }, []);

  // 데이터와 카테고리를 리셋하는 함수
  const handleReset = useCallback(async () => {
    loadData();
  }, [loadData]);

  // 필터 날짜 에러 확인
  const dateError = fIsAfter(filters.state.startTime, filters.state.endTime);

  // 필터를 적용한 데이터
  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
    dateError,
  });

  // 필터 리셋 가능한지 여부 확인
  const canReset =
    !!filters.state.query ||
    (!!filters.state.startTime && !!filters.state.endTime);

  // 게시판 데이터가 없을 경우 표시
  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  // 행을 삭제하는 함수
  const handleDeleteRow = useCallback(
    async (id: number) => {
      try {
        const response = await Swagger.api.deleteUser(id);
        if(response.status === 200) {
          toast.success('삭제되었습니다.');
          handleReset().then(()=> {});
        }
      } catch (e) {
        toast.error(e.message);
      }
    },
    [handleReset]
  );

  // 선택된 행들을 삭제하는 함수
  const handleDeleteRows = useCallback(async () => {
    try {
      if (table.selected) {
        const selectedIdsAsNumbers = table.selected.map(id => Number(id));
        const response = await Swagger.api.deleteUsers(selectedIdsAsNumbers);
        if (response.status === 200) {
          toast.success('삭제되었습니다.');
          handleReset().then(()=> {});
        }
      }
    } catch (e) {
      toast.error(e.message);
    }
  }, [handleReset, table.selected]);

  // 드로어(서랍)를 닫는 함수
  const handleCloseDrawer = useCallback(() => {
    openNew.onFalse();
    openView.onFalse();
    openEdit.onFalse();
    setSelectedId(undefined);
  }, [openEdit, openNew, openView]);

  // 새 항목을 열기 위한 함수
  const handleOpenNew = useCallback(
    () => {
      openNew.onTrue();
      openView.onFalse();
      openEdit.onFalse();
      setSelectedId(undefined);
    },
    [openEdit, openNew, openView]
  );

  // 행을 수정하기 위한 함수
  const handleEditRow = useCallback(
    (id: number) => {
      openNew.onFalse();
      openView.onFalse();
      openEdit.onTrue();
      setSelectedId(id)
    },
    [openEdit, openNew, openView]
  );

  // 행을 보기 위한 함수
  const handleViewRow = useCallback(
    (id: number) => {
      openNew.onFalse();
      openView.onTrue();
      openEdit.onFalse();
      setSelectedId(id);
    },
    [openEdit, openNew, openView]
  );

  // 데이터 로드를 위한 useEffect
  useEffect(() => {
    loadData().then(() => {
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    table.rowsPerPage,
    table.page,
    table.orderBy,
    table.order,
    filters.state.query,
    filters.state.startTime,
    filters.state.endTime
  ]);

  // 상세 데이터 로드를 위한 useEffect
  useEffect(() => {
    if (selectedId) {
      loadDetailData(selectedId).then(() => {
      });
    } else {
      setDetailData(undefined);
    }
  }, [loadDetailData, selectedId]);

  return (
    <>
      <DashboardContent>
        {/* 상단 Breadcrumbs */}
        <CustomBreadcrumbs
          heading="회원 관리"
          links={[
            {name: '대시보드', href: paths.dashboard.root},
            {name: '회원', href: paths.dashboard.ruser},
            {name: '목록'},
          ]}
          action={
          <>
            {/* 새글 추가 버튼 */}
            <Button
              onClick={handleOpenNew}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line"/>}
            >
              새글 추가
            </Button>
          </>
          }
          sx={{mb: {xs: 3, md: 5}}}
        />

        <Card>
          {/* 테이블 툴바 콤포넌트 */}
          <RUserTableToolbar
            filters={filters}
            dateError={dateError}
            onResetPage={table.onResetPage}
          />

          {/* 테이블 필터 결과 콤포넌트 */}
          {canReset && (
            <RUserTableFiltersResult
              filters={filters}
              onResetPage={table.onResetPage}
              totalResults={dataFiltered.length}
              sx={{p: 2.5, pt: 0}}
            />
          )}

          <Box sx={{position: 'relative'}}>
            {/* 테이블 행 선택 엑션 콤포넌트 */}
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={dataFiltered.length}
              onSelectAllRows={(checked) => {
                table.onSelectAllRows(
                  checked,
                  dataFiltered.map((row) => `${row.id}`)
                );
              }}
              action={
                <Stack direction="row">
                  <Tooltip title="전송">
                    <IconButton color="primary" onClick={() => {toast.info('전송')}}>
                      <Iconify icon="iconamoon:send-fill"/>
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="다운로드">
                    <IconButton color="primary" onClick={() => {toast.info('다운로드')}}>
                      <Iconify icon="eva:download-outline"/>
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="프린트">
                    <IconButton color="primary" onClick={() => {toast.info('프린트')}}>
                      <Iconify icon="solar:printer-minimalistic-bold"/>
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="삭제">
                    <IconButton color="primary" onClick={confirm.onTrue}>
                      <Iconify icon="solar:trash-bin-trash-bold"/>
                    </IconButton>
                  </Tooltip>
                </Stack>
              }
            />

            <Scrollbar sx={{minHeight: 444}}>
              {/* 테이블 */}
              <Table size={table.dense ? 'small' : 'medium'} sx={{minWidth: 800}}>

                {/* 테이블 헤더 */}
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={dataFiltered.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      dataFiltered.map((row) => `${row.id}`)
                    )
                  }
                />

                <TableBody>
                  {/* 테이블 결과 결과 Row */}
                  {dataFiltered
                    .map((row) => (
                      <RUserTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(`${row.id}`)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onViewRow={() => handleViewRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                      />
                    ))}

                  {/* 테이블 결과 빈 결과 Row */}
                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, table.total + 1)}
                  />
                  {/* 테이블 결과 데이터가 없을때 */}
                  {!loading.value && <TableNoData notFound={notFound}/>}
                </TableBody>
              </Table>
            </Scrollbar>
          </Box>

          {/* 테이블 페이지네이션 컴포넌트 */}
          <TablePaginationCustom
            page={table.page}
            dense={table.dense}
            count={table.total}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onChangeDense={table.onChangeDense}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />
        </Card>
      </DashboardContent>

      {/* 새글 작성 Drawer */}
      <DrawerWrapper
        title="새글 작성"
        open={openNew.value}
        onClose={handleCloseDrawer}
        children={<RUserNewEditForm
          onEnd={() => {
            handleCloseDrawer();
            handleReset();
          }}/>}
      />

      {/* 수정 Drawer */}
      <DrawerWrapper
        title="수정 하기"
        open={openEdit.value}
        onClose={handleCloseDrawer}
        children={detailData ? <RUserNewEditForm
          id={selectedId}
          currentData={{
            email: detailData.email,
            username: detailData.username,
            mobile: detailData.mobile,
            policy: detailData.policy,
            privacy: detailData.privacy,
            marketing: detailData.marketing
          }}
          isEdit
          onEnd={() => {
            handleCloseDrawer();
            handleReset();
          }}/> : <>존재하지 않음</>}
      />

      {/* 상세 보기 Drawer */}
      <DrawerWrapper
        title="상세 보기"
        open={openView.value}
        onClose={handleCloseDrawer}
        children={detailData ? <RUserViewBody data={detailData}/> : <>존재하지 않음</>}
      />

      {/* 삭제 확인 다이얼로그 */}
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="삭제"
        content={
          <>
            정말 <strong> {table.selected.length} </strong>개 데이터를 삭제하겠습니까?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirm.onFalse();
            }}
          >
            삭제하기
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

// 테이블 필터 관리
type ApplyFilterProps = {
  dateError: boolean;
  inputData: RUser[];
  filters: IRUserFilters;
  comparator: (a: any, b: any) => number;
};

function applyFilter({inputData, comparator, filters, dateError}: ApplyFilterProps) {
  const {query, startTime, endTime} = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  return inputData;
}
