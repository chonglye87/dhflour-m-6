import { useContext } from 'react';

import { AuthContext } from '../context/auth-context';

// ----------------------------------------------------------------------

// 이 훅은 AuthContext를 사용하여 현재 인증 상태와 관련된 값을 반환합니다.
export function useAuthContext() {
  // useContext 훅을 사용하여 AuthContext의 값을 가져옵니다.
  const context = useContext(AuthContext);
  // AuthContext의 값이 없는 경우, 즉 이 훅이 AuthProvider 내부에서 사용되지 않은 경우 오류를 발생시킵니다.
  if (!context) {
    throw new Error('useAuthContext: Context must be used inside AuthProvider');
  }

  return context;
}
