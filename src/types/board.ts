import type {IDatePickerControl} from "./common";
import type {RBoardCategory} from "../generated/swagger/swagger.api";

export type IBoardFilters = {
  query: string;
  categories: RBoardCategory[];
  startTime: IDatePickerControl;
  endTime: IDatePickerControl;
};

export type IBoardFilterValue = string | RBoardCategory[] | Date | null;

export type IBoardCategoryFilters = {
  query: string;
  types: string[];
  startTime: IDatePickerControl;
  endTime: IDatePickerControl;
};
