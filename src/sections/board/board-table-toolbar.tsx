import type {IBoardFilters} from "src/types/board";
import type {IDatePickerControl} from 'src/types/common';
import type {UseSetStateReturn} from 'src/hooks/use-set-state';
import type {RBoardCategory} from "src/generated/swagger/swagger.api";

import {useCallback} from 'react';

import Stack from '@mui/material/Stack';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from "@mui/material/Checkbox";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from '@mui/material/InputAdornment';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {formHelperTextClasses} from '@mui/material/FormHelperText';
import Select, {type SelectChangeEvent} from "@mui/material/Select";

import {Iconify} from 'src/components/iconify';
import {usePopover, CustomPopover} from 'src/components/custom-popover';

// ----------------------------------------------------------------------

type Props = {
  dateError: boolean;
  onResetPage: () => void;
  filters: UseSetStateReturn<IBoardFilters>;
  options: {
    categories: RBoardCategory[];
  };
};

// 공지사항 게시판 테이블 툴바 컴포넌트 정의
export function BoardTableToolbar({ filters, options, dateError, onResetPage }: Props) {
  // Popover 상태 관리 훅 사용
  const popover = usePopover();

  // 카테고리 필터 핸들러
  const handleFilterCategory = useCallback(
    (event: SelectChangeEvent<number[]>) => {
      // Select 컴포넌트에서 선택된 값을 number[] 타입으로 변환
      const newValue = event.target.value as number[];
      // 페이지 리셋 및 필터 상태 업데이트
      onResetPage();
      filters.setState({ categoryIds: newValue });
    },
    [filters, onResetPage]
  );

  // 검색어 필터 핸들러
  const handleFilterName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      // 페이지 리셋 및 필터 상태 업데이트
      onResetPage();
      filters.setState({ query: event.target.value });
    },
    [filters, onResetPage]
  );

  // 시작 날짜 필터 핸들러
  const handleFilterStartDate = useCallback(
    (newValue: IDatePickerControl) => {
      // 페이지 리셋 및 필터 상태 업데이트
      onResetPage();
      filters.setState({ startTime: newValue });
    },
    [filters, onResetPage]
  );

  // 종료 날짜 필터 핸들러
  const handleFilterEndDate = useCallback(
    (newValue: IDatePickerControl) => {
      // 페이지 리셋 및 필터 상태 업데이트
      onResetPage();
      filters.setState({ endTime: newValue });
    },
    [filters, onResetPage]
  );

  return (
    <>
      <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{ xs: 'column', md: 'row' }}
        sx={{ p: 2.5, pr: { xs: 2.5, md: 1 } }}
      >
        {/* 카테고리 필터 */}
        <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 180 } }}>
          <InputLabel htmlFor="invoice-filter-service-select-label">카테고리</InputLabel>

           <Select
            multiple
            value={filters.state.categoryIds}
            onChange={handleFilterCategory}
            input={<OutlinedInput label="카테고리" />}
            renderValue={(selected) => selected.map((value) => value).join(', ')}
            inputProps={{ id: 'invoice-filter-service-select-label' }}
            sx={{ textTransform: 'capitalize' }}
           >
            {options.categories.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                <Checkbox
                  disableRipple
                  size="small"
                  checked={filters.state.categoryIds.includes(option.id)}
                />
                {option.name}
              </MenuItem>
            ))}
           </Select>
        </FormControl>

        {/* 시작 날짜 필터 */}
        <DatePicker
          label="등록일"
          format="YYYY/MM/DD"
          value={filters.state.endTime}
          onChange={handleFilterStartDate}
          slotProps={{ textField: { fullWidth: true } }}
          sx={{ maxWidth: { md: 180 } }}
        />

        {/* 종료 날짜 필터 */}
        <DatePicker
          label="종료일"
          format="YYYY/MM/DD"
          value={filters.state.endTime}
          onChange={handleFilterEndDate}
          slotProps={{
            textField: {
              fullWidth: true,
              error: dateError,
              helperText: dateError ? 'End date must be later than start date' : null,
            },
          }}
          sx={{
            maxWidth: { md: 180 },
            [`& .${formHelperTextClasses.root}`]: {
              bottom: { md: -40 },
              position: { md: 'absolute' },
            },
          }}
        />

        {/* 검색 필터 */}
        <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
          <TextField
            fullWidth
            value={filters.state.query}
            onChange={handleFilterName}
            placeholder="게시물을 검색하세요."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />

          {/* 추가 옵션 버튼 */}
          <IconButton onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </Stack>
      </Stack>

      {/* 추가 옵션 팝오버 */}
      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuList>
            <MenuItem
              onClick={() => {
                popover.onClose();
              }}
            >
              <Iconify icon="solar:printer-minimalistic-bold" />
              인쇄
            </MenuItem>

            <MenuItem
              onClick={() => {
                popover.onClose();
              }}
            >
              <Iconify icon="solar:import-bold" />
              데이터 입력
            </MenuItem>

            <MenuItem
              onClick={() => {
                popover.onClose();
              }}
            >
              <Iconify icon="solar:export-bold" />
              데이터 출력
            </MenuItem>
          </MenuList>
        </MenuList>
      </CustomPopover>
    </>
  );
}
