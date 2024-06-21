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

import {fDateTime} from "../../utils/format-time";

import type {RBoard} from "../../generated/swagger/swagger.api";

// ----------------------------------------------------------------------

type Props = {
  row: RBoard;
  selected: boolean;
  onSelectRow: () => void;
  onViewRow: () => void;
  onEditRow: () => void;
  onDeleteRow: () => void;
};

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
        <TableCell padding="checkbox">
          <Checkbox
            checked={selected}
            onClick={onSelectRow}
            inputProps={{id: `row-checkbox-${row.id}`, 'aria-label': `Row checkbox`}}
          />
        </TableCell>

        <TableCell>
          {id}
        </TableCell>

        <TableCell>
          {title}
        </TableCell>

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

        <TableCell align="center">
          {createdAt && fDateTime(createdAt * 1000)}
        </TableCell>

        <TableCell align="right" sx={{px: 1}}>
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill"/>
          </IconButton>
        </TableCell>
      </TableRow>

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
            View
          </MenuItem>

          <MenuItem
            onClick={() => {
              onEditRow();
              popover.onClose();
            }}
          >
            <Iconify icon="solar:pen-bold"/>
            Edit
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
            Delete
          </MenuItem>
        </MenuList>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="삭제"
        content="정말 데이터를 삭제하시겠습니까?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            삭제하기
          </Button>
        }
      />
    </>
  );
}
