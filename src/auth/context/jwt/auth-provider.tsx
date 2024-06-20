import {useMemo, useEffect, useCallback} from 'react';

import {useSetState} from 'src/hooks/use-set-state';

// eslint-disable-next-line import/no-cycle
import {Swagger} from "../../../utils/API";
import {AuthContext} from '../auth-context';
import {customError} from "../../../utils/error";
import {getAccessToken, isTokenExpired} from "./utils";

import type {AuthState} from '../../types';

// ----------------------------------------------------------------------

/**
 * NOTE:
 * We only build demo at basic level.
 * Customer will need to do some extra handling yourself if you want to extend the logic and other features...
 */

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({children}: Props) {
  // useSetState 훅을 사용하여 인증 상태와 로딩 상태를 관리합니다.
  const {state, setState} = useSetState<AuthState>({
    user: null,
    loading: true,
  });

  const checkUserSession = useCallback(async () => {
    try {
      // 액세스 토큰 가져오기
      const accessToken = getAccessToken();

      // 토큰의 유무와 유효기간 확인
      if (accessToken && !isTokenExpired(accessToken)) {
        // 유효한 토큰이 있는 경우, 사용자 정보를 가져옴
        const responseMe = await Swagger.api.getAuthenticatedUserInfo()

        const user = responseMe.data;
        // 사용자 정보를 상태에 저장
        setState({user: {...user}, loading: false});
      } else {
        // 유효한 토큰이 없으면 사용자 정보를 null로 설정
        setState({user: null, loading: false});
      }
    } catch (error) {
      console.error(error);
      setState({user: null, loading: false});
      throw customError(error);
    }
  }, [setState]);

  // 컴포넌트가 마운트될 때 사용자 세션을 확인합니다. 즉, 새로고침하거나 새로 접속할 때 한 번 실행됩니다.
  useEffect(() => {
    checkUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----------------------------------------------------------------------

  // 인증 상태를 확인합니다. (authenticated: 로그인 상태, unauthenticated: 비로그인 상태)
  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  // 메모이제이션된 값을 생성합니다. 이를 통해 값이 변경될 때만 새로 생성됩니다.
  const memoizedValue = useMemo(
    () => ({
      user: state.user
        ? {
          ...state.user,
          // role: state.user?.role ?? 'admin',
        }
        : null,
      checkUserSession,
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
    }),
    [checkUserSession, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
