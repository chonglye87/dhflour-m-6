import type {RUser} from "../generated/swagger/swagger.api";


// 인증 상태를 나타내는 타입입니다. 사용자 정보와 로딩 상태를 포함합니다.
export type AuthState = {
  user:  RUser | null;
  loading: boolean;
};

//  AuthContext에서 사용할 값의 타입입니다. 사용자 정보, 로딩 상태, 인증 상태, 세션 확인 함수를 포함합니다.
export type AuthContextValue = {
  user:  RUser | null;
  loading: boolean;
  authenticated: boolean;
  unauthenticated: boolean;
  checkUserSession?: () => Promise<void>;
};
