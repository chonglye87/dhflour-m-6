import {z as zod} from 'zod';
import {useForm} from 'react-hook-form';
import {useState, useEffect} from 'react';
import {zodResolver} from '@hookform/resolvers/zod';

import Link from "@mui/material/Link";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import {useRouter} from 'src/routes/hooks';

import {useBoolean} from 'src/hooks/use-boolean';

import {Iconify} from 'src/components/iconify';
import {Form, Field} from 'src/components/hook-form';

import {useAuthContext} from 'src/auth/hooks';
import {signInWithPassword} from 'src/auth/context/jwt';

import {paths} from "../../../routes/paths";
import {RouterLink} from "../../../routes/components";

// ----------------------------------------------------------------------

export type SignInSchemaType = zod.infer<typeof SignInSchema>;


// src/pages/components/extra/form-validation/index.tsx => React hook form + Zod 예시
// src/sections/_examples/extra/form-validation-view/schema.ts => 필드별 schema 확인 가능
// 공식문서: https://zod.dev/
export const SignInSchema = zod.object({
  email: zod.string()
    .min(1, '이메일을 입력해주세요.') // 빈 문자열을 방지
    .email('올바르지 않은 형식의 이메일 주소입니다.'),
  password: zod.string()
    .min(1, '비밀번호를 입력해주세요.') // 빈 문자열을 방지
    .regex(
      /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W))(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,50}$/,
      '8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.'
    ),
});

// ----------------------------------------------------------------------

export function JwtSignInView() {
  const router = useRouter();

  // src/auth/context/jwt/auth-provider.tsx
  const { checkUserSession } = useAuthContext();

  const [errorMsg, setErrorMsg] = useState('');

  const password = useBoolean();

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // 로그인 버튼 누르면 실행
  const onSubmit = handleSubmit(async (data) => {
    try {
      // 로그인 api 실행
      await signInWithPassword({ email: data.email, password: data.password });
      // 유저 정보 불러오기 api 실행
      await checkUserSession?.();
      // 로그인 후 이동하고자 하는 페이지 이동
      router.push(  paths.dashboard.root);
    } catch (error) {
      setErrorMsg(error.message);
    }
  });


  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">로그인</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">새로 오셨나요?</Typography>

        <Link component={RouterLink} href={paths.auth.jwt.signUp} variant="subtitle2">
          회원가입
        </Link>
      </Stack>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={3}>
      <Field.Text name="email" label="이메일" InputLabelProps={{ shrink: true }} />

      <Stack spacing={1.5}>
        <Field.Text
          name="password"
          label="비밀번호"
          type={password.value ? 'text' : 'password'}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator="로그인 처리 중..."
      >
        로그인
      </LoadingButton>
    </Stack>
  );

  return (
    <>
      {renderHead}

      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </Form>
    </>
  );
}
