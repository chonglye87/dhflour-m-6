import type {RUser} from "../generated/swagger/swagger.api";

export type UserType = Record<string, any> | null;

export type AuthState = {
  user: UserType | RUser | null;
  loading: boolean;
};

export type AuthContextValue = {
  user: UserType | RUser | null;
  loading: boolean;
  authenticated: boolean;
  unauthenticated: boolean;
  checkUserSession?: () => Promise<void>;
};
