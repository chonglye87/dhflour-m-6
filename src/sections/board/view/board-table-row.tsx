import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import {useBoolean} from 'src/hooks/use-boolean';

import {Iconify} from 'src/components/iconify';
import {ConfirmDialog} from 'src/components/custom-dialog';
import {usePopover, CustomPopover} from 'src/components/custom-popover';

import {fDateTime} from "../../../utils/format-time";

import type {RBoard} from "../../../generated/swagger/swagger.api";

// ----------------------------------------------------------------------

type Props = {
  row: RBoard;
  selected: boolean;
  onSelectRow: () => void;
  onViewRow: () => void;
  onEditRow: () => void;
  onDeleteRow: () => void;
};

// 공지사항 게시판 테이블 행 컴포넌트 정의
export function BoardTableRow({
                                row,
                                selected,
                                onSelectRow,
                                onViewRow,
                                onEditRow,
                                onDeleteRow,
                              }: Props) {
  const {id, title, createdAt, categories} = row;
  const confirm = useBoolean();
  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        {/* 선택 체크박스 */}
        <TableCell padding="checkbox">
          <Checkbox
            checked={selected}
            onClick={onSelectRow}
            inputProps={{id: `row-checkbox-${row.id}`, 'aria-label': `Row checkbox`}}
          />
        </TableCell>

        {/* 게시글 ID */}
        <TableCell>
          {id}
        </TableCell>

        {/* 게시글 제목 */}
        <TableCell>
          {title}
        </TableCell>

        {/* 카테고리 */}
        <TableCell align="center">
          <Stack direction="row" spacing={1}>
            {categories && categories.map(category => <Chip
              key={category.id}
              size="small"
              variant="soft"
              label={category.name}
            />)}
          </Stack>
        </TableCell>

        <TableCell align="center">
          -
        </TableCell>

        <TableCell align="center">
          0
        </TableCell>

        {/* 생성일시 */}
        <TableCell align="center">
          {createdAt && fDateTime(createdAt * 1000)}
        </TableCell>

        {/* 액션 버튼 */}
        <TableCell align="right" sx={{px: 1}}>
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill"/>
          </IconButton>
        </TableCell>
      </TableRow>

      {/* 액션 팝오버 */}
      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{arrow: {placement: 'right-top'}}}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              onViewRow();
              popover.onClose();
            }}
          >
            <Iconify icon="solar:eye-bold"/>
            상세 보기
          </MenuItem>

          <MenuItem
            onClick={() => {
              onEditRow();
              popover.onClose();
            }}
          >
            <Iconify icon="solar:pen-bold"/>
            수정 하기
          </MenuItem>

          <Divider sx={{borderStyle: 'dashed'}}/>

          <MenuItem
            onClick={() => {
              confirm.onTrue();
              popover.onClose();
            }}
            sx={{color: 'error.main'}}
          >
            <Iconify icon="solar:trash-bin-trash-bold"/>
            삭제 하기
          </MenuItem>
        </MenuList>
      </CustomPopover>

      {/* 삭제 확인 다이얼로그 */}
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="삭제"
        content="정말 데이터를 삭제하시겠습니까?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            삭제 하기
          </Button>
        }
      />
    </>
  );
}
