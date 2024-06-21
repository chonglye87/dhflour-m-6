import type {IDatePickerControl} from "./common";

export type IRUserFilters = {
  query: string;
  startTime: IDatePickerControl;
  endTime: IDatePickerControl;
};

export type IRUserFilterValue = string | Date | null;
