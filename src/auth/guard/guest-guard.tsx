import { useState, useEffect } from 'react';

import { useRouter, useSearchParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';

import { SplashScreen } from 'src/components/loading-screen';

import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

// 비인증 사용자만 접근할 수 있는 경로를 보호하는 컴포넌트입니다.
export function GuestGuard({ children }: Props) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const { loading, authenticated } = useAuthContext();

  const [isChecking, setIsChecking] = useState<boolean>(true);

  const returnTo = searchParams.get('returnTo') || CONFIG.auth.redirectPath;

  const checkPermissions = async (): Promise<void> => {
    if (loading) {
      return;
    }

    // 인증된 경우 반환 경로로 리디렉션합니다.
    if (authenticated) {
      router.replace(returnTo);
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
