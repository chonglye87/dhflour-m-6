import type {IDatePickerControl} from "./common";

export type IBoardFilters = {
  query: string;
  categoryIds: number[];
  startTime: IDatePickerControl;
  endTime: IDatePickerControl;
};

export type IBoardFilterValue = string | number[] | Date | null;

export type IBoardCategoryFilters = {
  query: string;
  types: string[];
  startTime: IDatePickerControl;
  endTime: IDatePickerControl;
};
