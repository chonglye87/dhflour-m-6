import type {RUser} from "../generated/swagger/swagger.api";


export type AuthState = {
  user: RUser | null;
  loading: boolean;
};

export type AuthContextValue = {
  user: RUser | null;
  loading: boolean;
  authenticated: boolean;
  unauthenticated: boolean;
  checkUserSession?: () => Promise<void>;
};
