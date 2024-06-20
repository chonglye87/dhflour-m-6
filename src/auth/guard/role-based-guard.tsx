import type { Theme, SxProps } from '@mui/material/styles';

import { m } from 'framer-motion';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { ForbiddenIllustration } from 'src/assets/illustrations';

import { varBounce, MotionContainer } from 'src/components/animate';

// ----------------------------------------------------------------------

export type RoleBasedGuardProp = {
  sx?: SxProps<Theme>;
  currentRole: string;
  hasContent?: boolean;
  acceptRoles: string[];
  children: React.ReactNode;
};

// 역할 기반으로 접근을 제어하는 컴포넌트입니다.
export function RoleBasedGuard({
  sx,
  children,
  hasContent,
  currentRole,
  acceptRoles,
}: RoleBasedGuardProp) {
  // 허용된 역할에 현재 사용자의 역할이 포함되어 있는지 확인합니다.
  if (typeof acceptRoles !== 'undefined' && !acceptRoles.includes(currentRole)) {
    // 허용된 역할에 포함되지 않는 경우 접근 권한이 없음을 표시합니다.
    return hasContent ? (
      <Container component={MotionContainer} sx={{ textAlign: 'center', ...sx }}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Permission denied
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            You do not have permission to access this page.
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <ForbiddenIllustration sx={{ my: { xs: 5, sm: 10 } }} />
        </m.div>
      </Container>
    ) : null;
  }

  return <> {children} </>;
}
