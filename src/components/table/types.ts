// ----------------------------------------------------------------------

export type TableProps = {
  dense: boolean;
  page: number;
  rowsPerPage: number;
  order: 'asc' | 'desc';
  orderBy: string;
  total: number;
  //
  selected: string[];
  onSelectRow: (id: string | number) => void;
  onSelectAllRows: (checked: boolean, newSelecteds: string[]) => void;
  //
  onResetPage: () => void;
  onSort: (id: string) => void;
  onChangePage: (event: unknown, newPage: number) => void;
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDense: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdatePageDeleteRow: (totalRowsInPage: number) => void;
  onUpdatePageDeleteRows: ({
    totalRowsInPage,
    totalRowsFiltered,
  }: {
    totalRowsInPage: number;
    totalRowsFiltered: number;
  }) => void;
  //
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setDense: React.Dispatch<React.SetStateAction<boolean>>;
  setOrder: React.Dispatch<React.SetStateAction<'desc' | 'asc'>>;
  setOrderBy: React.Dispatch<React.SetStateAction<string>>;
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
};


export const initialTable: TableProps = {
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
  onUpdatePageDeleteRows: ({
                             totalRowsInPage,
                             totalRowsFiltered,
                           }: {
    totalRowsInPage: number;
    totalRowsFiltered: number;
  }) => {},
  setPage: () => {},
  setDense: () => {},
  setOrder: () => {},
  setOrderBy: () => {},
  setSelected: () => {},
  setRowsPerPage: () => {},
  setTotal: () => {}
};
