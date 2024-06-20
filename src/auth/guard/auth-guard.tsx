import { useState, useEffect, useCallback } from 'react';

import { paths } from 'src/routes/paths';
import { useRouter, usePathname, useSearchParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';

import { SplashScreen } from 'src/components/loading-screen';

import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

// 인증된 사용자만 접근할 수 있는 경로를 보호하는 컴포넌트입니다.
export function AuthGuard({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const { authenticated, loading } = useAuthContext();

  const [isChecking, setIsChecking] = useState<boolean>(true);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const checkPermissions = async (): Promise<void> => {
    if (loading) {
      return;
    }
    // 인증되지 않은 경우 로그인 페이지로 리디렉션합니다.
    if (!authenticated) {
      const { method } = CONFIG.auth;

      const signInPath = {
        jwt: paths.auth.jwt.signIn,
        auth0: paths.auth.auth0.signIn,
        amplify: paths.auth.amplify.signIn,
        firebase: paths.auth.firebase.signIn,
        supabase: paths.auth.supabase.signIn,
      }[method];

      // 로그인 페이지로 이동합니다.
      const href = `${signInPath}?${createQueryString('returnTo', pathname)}`;

      router.replace(href);
      return;
    }

    setIsChecking(false);
  };

  // 컴포넌트가 마운트되거나 authenticated 또는 loading 상태가 변경될 때마다 권한을 확인합니다.
  useEffect(() => {
    checkPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, loading]);

  // 인증 상태를 확인 중일 때 로딩 화면을 표시합니다.
  if (isChecking) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
