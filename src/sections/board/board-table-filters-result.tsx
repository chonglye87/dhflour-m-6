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


      <FiltersBlock
        label="Date:"
        isShow={Boolean(filters.state.startTime && filters.state.endTime)}
      >
        <Chip
          {...chipProps}
          label={fDateRangeShortLabel(filters.state.startTime, filters.state.endTime)}
          onDelete={handleRemoveDate}
        />
      </FiltersBlock>

      <FiltersBlock label="Keyword:" isShow={!!filters.state.query}>
        <Chip {...chipProps} label={filters.state.query} onDelete={handleRemoveKeyword} />
      </FiltersBlock>
    </FiltersResult>
  );
}
