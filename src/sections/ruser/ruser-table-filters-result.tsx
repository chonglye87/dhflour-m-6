import type {Theme, SxProps} from '@mui/material/styles';
import type {UseSetStateReturn} from 'src/hooks/use-set-state';

import {useCallback} from 'react';

import Chip from '@mui/material/Chip';

import {fDateRangeShortLabel} from 'src/utils/format-time';

import {chipProps, FiltersBlock, FiltersResult} from 'src/components/filters-result';

import type {IRUserFilters} from "../../types/ruser";


// ----------------------------------------------------------------------

type Props = {
  totalResults: number;
  sx?: SxProps<Theme>;
  onResetPage: () => void;
  filters: UseSetStateReturn<IRUserFilters>;
};
// 공지사항 게시판 테이블 검색 필터 결과 컴포넌트 정의
export function RUserTableFiltersResult({ filters, totalResults, onResetPage, sx }: Props) {

  // 검색어 필터 제거 핸들러
  const handleRemoveKeyword = useCallback(() => {
    onResetPage();
    filters.setState({ query: '' });
  }, [filters, onResetPage]);

  // 날짜 필터 제거 핸들러
  const handleRemoveDate = useCallback(() => {
    onResetPage();
    filters.setState({ startTime: null, endTime: null });
  }, [filters, onResetPage]);

  return (
    <FiltersResult totalResults={totalResults} onReset={filters.onResetState} sx={sx}>

      {/* 기간 필터 블록 */}
      <FiltersBlock
        label="기간:"
        isShow={Boolean(filters.state.startTime && filters.state.endTime)}
      >
        <Chip
          {...chipProps}
          label={fDateRangeShortLabel(filters.state.startTime, filters.state.endTime)}
          onDelete={handleRemoveDate}
        />
      </FiltersBlock>

      {/* 검색어 필터 블록 */}
      <FiltersBlock label="검색어:" isShow={!!filters.state.query}>
        <Chip {...chipProps} label={filters.state.query} onDelete={handleRemoveKeyword} />
      </FiltersBlock>
    </FiltersResult>
  );
}
