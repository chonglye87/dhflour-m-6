import { UNKNOWN_ERROR } from "../config-global";

/**
 * 공통 에러메세지
 * @param error
 */
export const customError = (error: any): Error => {
  let errorMsg = UNKNOWN_ERROR;
  if (error.status && error.status === 500) {
    errorMsg = UNKNOWN_ERROR;
  } else if (error.message) {
    errorMsg = error.message;
  }
  return new Error(errorMsg);
};
