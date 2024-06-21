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
import {RouterLink} from 'src/routes/components';

import {useBoolean} from 'src/hooks/use-boolean';

import {fISO, fIsAfter, fIsBetween} from 'src/utils/format-time';

import {INVOICE_SERVICE_OPTIONS} from 'src/_mock';
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
import {BoardTableRow} from '../board-table-row';
import {BoardTableToolbar} from '../board-table-toolbar';
import {useBoardManagerContext} from "../board-manage-provider";
import {BoardTableFiltersResult} from '../board-table-filters-result';

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
  const [tableData, setTableData] = useState<RBoard[]>([]);
  const [categories, setCategories] = useState<RBoardCategory[]>([]);

  const loadData = async () => {
    loading.onTrue();
    setTableData([]);
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
        filters.state.categories !== undefined
          ? filters.state.categories
            .map((category) => category.id)
            .filter((id): id is number => typeof id === 'number')
          : []
    });
    console.log(table.rowsPerPage, 'table.rowsPerPage');
    console.log(table.page + 1, 'table.page + 1');
    console.log(data, 'board');
    setTableData(data.content || []);
    // table.setPageMetadata(data.metadata);
    loading.onFalse();
  };

  const loadCategoryData = async () => {
    try {
      const {data} = await Swagger.api.listBoardCategory();
      if (data) {
          setCategories(data);
      }
      handleFilters("categories", []);
    } catch (e) {
      console.error(e);
    }
  };

  const handleReset = async () => {
    loadData();
    loadCategoryData();
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
    (!!filters.state.startTime && !!filters.state.endTime);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleDeleteRow = useCallback(
    (id: number) => {
      // const deleteRow = tableData.filter((row) => row.id !== id);
      //
      // toast.success('Delete success!');
      //
      // setTableData(deleteRow);
      //
      // table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [
      // dataInPage.length, table, tableData
    ]
  );

  const handleDeleteRows = useCallback(() => {
    // const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));
    //
    // toast.success('Delete success!');
    //
    // setTableData(deleteRows);
    //
    // table.onUpdatePageDeleteRows({
    //   totalRowsInPage: dataInPage.length,
    //   totalRowsFiltered: dataFiltered.length,
    // });
  }, [
    // dataFiltered.length, dataInPage.length, table, tableData
  ]);

  const handleEditRow = useCallback(
    (id: number) => {
      router.push(paths.dashboard.board);
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id: number) => {
      router.push(paths.dashboard.board);
    },
    [router]
  );

  useEffect(() => {
    loadData().then(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    table.rowsPerPage,
    table.page,
    table.orderBy,
    table.order,
    filters.state.query,
    filters.state.startTime,
    filters.state.endTime,
    filters.state.categories
  ]);


  useEffect(() => {
    loadCategoryData().then(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="List"
          links={[
            {name: 'Dashboard', href: paths.dashboard.root},
            {name: 'Board', href: paths.dashboard.board},
            {name: 'List'},
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.invoice.new}
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
            options={{services: INVOICE_SERVICE_OPTIONS.map((option) => option.name)}}
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
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
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
                    height={table.dense ? 56 : 56 + 20}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                  />

                  <TableNoData notFound={notFound}/>
                </TableBody>
              </Table>
            </Scrollbar>
          </Box>

          <TablePaginationCustom
            page={table.page}
            dense={table.dense}
            count={dataFiltered.length}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onChangeDense={table.onChangeDense}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />
        </Card>
      </DashboardContent>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
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
            Delete
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
  const {query, startTime, endTime} = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (query) {
    inputData = inputData.filter(
      (invoice) =>
        invoice.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }

  if (!dateError) {
    if (startTime && endTime) {
      inputData = inputData.filter((invoice) => fIsBetween(invoice.createdAt, startTime, endTime));
    }
  }

  return inputData;
}
