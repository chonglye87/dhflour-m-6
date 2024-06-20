import { createContext } from 'react';

import type { AuthContextValue } from '../types';

// ----------------------------------------------------------------------

// AuthContext 생성
// createContext 함수를 사용하여 AuthContext를 생성합니다.
// 기본값은 undefined로 설정하여 컨텍스트가 초기에는 값이 없도록 합니다.
// AuthContext는 애플리케이션의 인증 상태를 관리하기 위한 컨텍스트입니다.
// 이 컨텍스트는 AuthProvider 컴포넌트에서 값을 제공하며,
// 하위 컴포넌트에서 이 컨텍스트를 사용하여 인증 상태와 관련된 값을 접근할 수 있습니다.

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);


