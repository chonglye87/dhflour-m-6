import type {Theme, SxProps} from '@mui/material/styles';
import type {UseSetStateReturn} from 'src/hooks/use-set-state';

import {useCallback} from 'react';

import Chip from '@mui/material/Chip';

import {fDateRangeShortLabel} from 'src/utils/format-time';

import {chipProps, FiltersBlock, FiltersResult} from 'src/components/filters-result';

import type {IBoardFilters} from "../../types/board";

// ----------------------------------------------------------------------

type Props = {
  totalResults: number;
  sx?: SxProps<Theme>;
  onResetPage: () => void;
  filters: UseSetStateReturn<IBoardFilters>;
};

export function BoardTableFiltersResult({ filters, totalResults, onResetPage, sx }: Props) {

  const handleRemoveCategory = useCallback(
    (inputValue: number) => {
      const newValue = filters.state.categoryIds.filter((item) => item !== inputValue);

      onResetPage();
      filters.setState({ categoryIds: newValue });
    },
    [filters, onResetPage]
  );

  const handleRemoveKeyword = useCallback(() => {
    onResetPage();
    filters.setState({ query: '' });
  }, [filters, onResetPage]);

  const handleRemoveDate = useCallback(() => {
    onResetPage();
    filters.setState({ startTime: null, endTime: null });
  }, [filters, onResetPage]);

  return (
    <FiltersResult totalResults={totalResults} onReset={filters.onResetState} sx={sx}>
      <FiltersBlock label="카테고리:" isShow={!!filters.state.categoryIds.length}>
        {filters.state.categoryIds.map((categoryId) => (
          <Chip {...chipProps} key={categoryId} label={categoryId} onDelete={() => handleRemoveCategory(categoryId)} />
        ))}
      </FiltersBlock>


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

      <FiltersBlock label="검색어:" isShow={!!filters.state.query}>
        <Chip {...chipProps} label={filters.state.query} onDelete={handleRemoveKeyword} />
      </FiltersBlock>
    </FiltersResult>
  );
}
