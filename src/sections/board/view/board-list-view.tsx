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
import {useRouter} from 'src/routes/hooks';

import {useBoolean} from 'src/hooks/use-boolean';

import {fISO, fIsAfter, fIsBetween} from 'src/utils/format-time';

import {DashboardContent} from 'src/layouts/dashboard';

import {Iconify} from 'src/components/iconify';
import {Scrollbar} from 'src/components/scrollbar';
import {ConfirmDialog} from 'src/components/custom-dialog';
import {CustomBreadcrumbs} from 'src/components/custom-breadcrumbs';
import {
  emptyRows,
  rowInPage,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';

import {Swagger} from "../../../utils/API";
import BoardViewBody from './board-view-body';
import {BoardTableRow} from '../board-table-row';
import BoardNewEditForm from "./board-new-edit-form";
import {BoardTableToolbar} from '../board-table-toolbar';
import {useBoardManagerContext} from "../board-manage-provider";
import {BoardTableFiltersResult} from '../board-table-filters-result';
import {DrawerWrapper} from "../../../components/drawer/DrawerWrapper";

import type {IBoardFilters} from "../../../types/board";
import type {RBoard, RBoardCategory} from "../../../generated/swagger/swagger.api";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  {id: "id", label: "ID", align: "left"},
  {id: "title", label: "제목", align: "left", width: 220},
  {id: "categories.name", label: "카테고리", align: "center"},
  {id: "top", label: "상단고정", align: "center"},
  {id: "pageView", label: "페이지 뷰", align: "center"},
  {id: "createdTime", label: "등록시간", align: "center"},
  {id: ""},
];

// ----------------------------------------------------------------------

export function BoardListView() {
  const router = useRouter();

  const confirm = useBoolean();
  const loading = useBoolean();
  const openNew = useBoolean();
  const openView = useBoolean();
  const openEdit = useBoolean();

  const {
    table,
    denseHeight,

    defaultFilters,
    filters,
    handleFilters,
    handleResetFilters,

    searchParams,
    paramQuery,
    paramStartDate,
    paramEndDate,
  } = useBoardManagerContext();

  const [selectedId, setSelectedId] = useState<number | undefined>();
  const [tableData, setTableData] = useState<RBoard[]>([]);
  const [detailData, setDetailData] = useState<RBoard>();
  const [categories, setCategories] = useState<RBoardCategory[]>([]);

  const loadData = useCallback(async () => {
    loading.onTrue();
    // setTableData([]);
    let _query = '';
    if (filters.state.query && filters.state.query.length > 1) {
      _query = filters.state.query;
    }
    const {data} = await Swagger.api.pageBoard({
      size: table.rowsPerPage,
      page: table.page,
      query: _query,
      startTime: fISO(filters.state.startTime),
      endTime: fISO(filters.state.endTime),
      categoryIds:
        filters.state.categoryIds !== undefined
          ? filters.state.categoryIds
            .filter((id): id is number => true)
          : []
    });
    setTableData(data.content || []);
    table.setRowsPerPage(data.size);
    table.setPage(data.page);
    table.setTotal(data.totalElements)
    loading.onFalse();
  }, [filters.state.categoryIds, filters.state.endTime, filters.state.query, filters.state.startTime, loading, table]);

  const loadCategoryData = useCallback(async () => {
    try {
      const {data} = await Swagger.api.listBoardCategory();
      if (data) {
        setCategories(data);
      }
      handleFilters("categories", []);
    } catch (e) {
      console.error(e);
    }
  }, [handleFilters]);

  const loadDetailData = useCallback(async (id: number) => {
    const {data} = await Swagger.api.getBoardById(id);
    setDetailData(data);
  }, []);


  const handleReset = useCallback(async () => {
    loadData();
    loadCategoryData();
  }, [loadCategoryData, loadData]);

  const handleCloseDrawer = () => {
    openNew.onFalse();
    openView.onFalse();
    openEdit.onFalse();
    setSelectedId(undefined);
  };


  const dateError = fIsAfter(filters.state.startTime, filters.state.endTime);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
    dateError,
  });

  const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

  const canReset =
    !!filters.state.query ||
    filters.state.categoryIds.length > 0 ||
    (!!filters.state.startTime && !!filters.state.endTime);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleDeleteRow = useCallback(
    async (id: number) => {
      try {
        const response = await Swagger.api.deleteBoard(id);
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

  const handleDeleteRows = useCallback(async () => {
    try {
      if (table.selected) {
        const selectedIdsAsNumbers = table.selected.map(id => Number(id));
        const response = await Swagger.api.deleteBoards(selectedIdsAsNumbers);
        if (response.status === 200) {
          toast.success('삭제되었습니다.');
          handleReset().then(()=> {});
        }
      }
    } catch (e) {
      toast.error(e.message);
    }
  }, [handleReset, table.selected]);

  const handleOpenNew = useCallback(
    () => {
      openNew.onTrue();
      openView.onFalse();
      openEdit.onFalse();
      setSelectedId(undefined);
    },
    [openEdit, openNew, openView]
  );

  const handleEditRow = useCallback(
    (id: number) => {
      openNew.onFalse();
      openView.onFalse();
      openEdit.onTrue();
      setSelectedId(id)
    },
    [openEdit, openNew, openView]
  );

  const handleViewRow = useCallback(
    (id: number) => {
      openNew.onFalse();
      openView.onTrue();
      openEdit.onFalse();
      setSelectedId(id);
    },
    [openEdit, openNew, openView]
  );

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
    filters.state.endTime,
    filters.state.categoryIds
  ]);

  useEffect(() => {
    loadCategoryData().then(() => {
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {

    if (selectedId) {
      loadDetailData(selectedId).then(() => {
      });
    } else {
      setDetailData(undefined);
    }
  }, [loadDetailData, selectedId]);

  useEffect(() => {
    console.log(table, 'table');
  }, [table]);

  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="List"
          links={[
            {name: '대시보드', href: paths.dashboard.root},
            {name: '게시판', href: paths.dashboard.board},
            {name: '목록'},
          ]}
          action={
            <Button
              onClick={handleOpenNew}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line"/>}
            >
              새글 추가
            </Button>
          }
          sx={{mb: {xs: 3, md: 5}}}
        />

        <Card>

          <BoardTableToolbar
            filters={filters}
            dateError={dateError}
            onResetPage={table.onResetPage}
            options={{categories}}
          />

          {canReset && (
            <BoardTableFiltersResult
              filters={filters}
              onResetPage={table.onResetPage}
              totalResults={dataFiltered.length}
              sx={{p: 2.5, pt: 0}}
            />
          )}

          <Box sx={{position: 'relative'}}>
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
                  <Tooltip title="Sent">
                    <IconButton color="primary">
                      <Iconify icon="iconamoon:send-fill"/>
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Download">
                    <IconButton color="primary">
                      <Iconify icon="eva:download-outline"/>
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Print">
                    <IconButton color="primary">
                      <Iconify icon="solar:printer-minimalistic-bold"/>
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete">
                    <IconButton color="primary" onClick={confirm.onTrue}>
                      <Iconify icon="solar:trash-bin-trash-bold"/>
                    </IconButton>
                  </Tooltip>
                </Stack>
              }
            />

            <Scrollbar sx={{minHeight: 444}}>
              <Table size={table.dense ? 'small' : 'medium'} sx={{minWidth: 800}}>
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
                  {dataFiltered
                    .map((row) => (
                      <BoardTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(`${row.id}`)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onViewRow={() => handleViewRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, table.total + 1)}
                  />

                  {!loading.value && <TableNoData notFound={notFound}/>}
                </TableBody>
              </Table>
            </Scrollbar>
          </Box>

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

      <DrawerWrapper
        title="새글 작성"
        open={openNew.value}
        onClose={handleCloseDrawer}
        children={<BoardNewEditForm
          categories={categories}
          onEnd={() => {
            handleCloseDrawer();
            handleReset();
          }}/>}
      />

      <DrawerWrapper
        title="수정"
        open={openEdit.value}
        onClose={handleCloseDrawer}
        children={detailData ? <BoardNewEditForm
          categories={categories}
          id={selectedId}
          currentData={{
            title: detailData.title,
            content: detailData.content,
            categoryIds: detailData.categories && detailData.categories.map(category => category.id)
          }}
          isEdit
          onEnd={() => {
            handleCloseDrawer();
            handleReset();
          }}/> : <>존재하지 않음</>}
      />

      <DrawerWrapper
        title="상세 보기"
        open={openView.value}
        onClose={handleCloseDrawer}
        children={detailData ? <BoardViewBody data={detailData}/> : <>존재하지 않음</>}
      />

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="삭제"
        content={
          <>
            Are you sure want to delete <strong> {table.selected.length} </strong> items?
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

type ApplyFilterProps = {
  dateError: boolean;
  inputData: RBoard[];
  filters: IBoardFilters;
  comparator: (a: any, b: any) => number;
};

function applyFilter({inputData, comparator, filters, dateError}: ApplyFilterProps) {
  const {query, startTime, endTime, categoryIds} = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  // if (query) {
  //   inputData = inputData.filter(
  //     (invoice) =>
  //       invoice.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
  //   );
  // }

  if (!dateError) {
    if (startTime && endTime) {
      inputData = inputData.filter((invoice) => fIsBetween(invoice.createdAt, startTime, endTime));
    }
  }

  return inputData;
}
