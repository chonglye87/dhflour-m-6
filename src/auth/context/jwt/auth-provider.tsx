import {useMemo, useEffect, useCallback} from 'react';

import {useSetState} from 'src/hooks/use-set-state';

import {Swagger} from "../../../utils/API";
import {AuthContext} from '../auth-context';
import {customError} from "../../../utils/error";
import {getAccessToken, isTokenExpired} from "../../../utils/auth";

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
  const {state, setState} = useSetState<AuthState>({
    user: null,
    loading: true,
  });

  const checkUserSession = useCallback(async () => {
    try {
      // 토큰 가져오기
      const accessToken = getAccessToken();

      // 토큰의 유무와 유효기간 확인
      if (accessToken && !isTokenExpired(accessToken)) {
        const responseMe = await Swagger.api.getAuthenticatedUserInfo()

        const user = responseMe.data;
        // 유저 정보 담기
        setState({user: {...user}, loading: false});
      } else {
        setState({user: null, loading: false});
      }
    } catch (error) {
      console.error(error);
      setState({user: null, loading: false});
      throw customError(error);
    }
  }, [setState]);

  useEffect(() => {
    checkUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

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
