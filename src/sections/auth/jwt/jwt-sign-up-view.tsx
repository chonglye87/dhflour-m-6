import {z as zod} from 'zod';
import {useForm} from 'react-hook-form';
import {useState, useEffect} from 'react';
import {zodResolver} from '@hookform/resolvers/zod';

import Box from "@mui/material/Box";
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from "@mui/material/FormControlLabel";

import {paths} from 'src/routes/paths';
import {useRouter} from 'src/routes/hooks';
import {RouterLink} from 'src/routes/components';

import {useBoolean} from 'src/hooks/use-boolean';

import {Iconify} from 'src/components/iconify';
import {Form, Field} from 'src/components/hook-form';

import {useAuthContext} from 'src/auth/hooks';

import {signUp} from "../../../auth/context/jwt";

import type {RequestSignUp} from "../../../generated/swagger/swagger.api";


// ----------------------------------------------------------------------

export type SignUpSchemaType = zod.infer<typeof SignUpSchema>;

// src/pages/components/extra/form-validation/index.tsx => React hook form + Zod 예시
// src/sections/_examples/extra/form-validation-view/schema.ts => 필드별 schema 확인 가능
// 공식문서: https://zod.dev/

export const SignUpSchema = zod.object({
  email: zod.string()
    .min(1, '이메일을 입력해주세요.')
    .email('올바르지 않은 형식의 이메일 주소입니다.'),
  password: zod.string()
    .min(1, '비밀번호를 입력해 주세요.')
    .regex(
      /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W))(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,50}$/,
      '8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.'
    ),
  confirmPassword: zod.string()
    .min(1, '비밀번호를 한 번 더 입력해 주세요.')
    .regex(
      /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W))(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,50}$/,
      '8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.'
    ),
  username: zod.string().min(1, '이름을 입력해주세요.'),
  mobile: zod.string()
    .min(1, '휴대폰번호를 입력해 주세요.')
    .regex(/^\d+$/, '숫자만 입력하세요.'),
}).refine((data) => data.password === data.confirmPassword, {
  message: '비밀번호가 일치하지 않습니다.',
  path: ['confirmPassword']})

// ----------------------------------------------------------------------

export function JwtSignUpView() {
  const {checkUserSession} = useAuthContext();

  const router = useRouter();

  const password = useBoolean();
  //  에러 메세지
  const [errorMsg, setErrorMsg] = useState('');
  // 회원가입 버튼 비활성화
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const defaultValues = {
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    mobile: '',
  };

  const methods = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: {isSubmitting},
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      // SignUpSchema data 에서 confirmPassword는 제외한 나머지가 ...userData 입니다.
      const { confirmPassword, ...userData } = data;

      const userJoin: RequestSignUp = {
        ...userData,
        policy,
        privacy,
        marketing
      };

      // 회원가입 api 실행
      await signUp(userJoin);
      // 유저 정보 api 실행
      await checkUserSession?.();
      // 회원가입 후 이동하고자 하는 페이지 이동
      router.push(  paths.dashboard.root);
    } catch (error) {
      console.error(error);
      setErrorMsg(error instanceof Error ? error.message : error);
    }
  });

  // 이용약관 체크박스
  const [allAgree, setAllAgree] = useState(true);
  const [policy, setPolicy] = useState(true);
  const [privacy, setPrivacy] = useState(true);
  const [marketing, setMarketing] = useState(true);
  const [emailRcv, setEmailRcv] = useState(true);
  const [smsRcv, setSmsRcv] = useState(true);
  const [snsRcv, setSnsRcv] = useState(true);

  useEffect(() => {
    const remainingCheckboxes = [
      policy,
      privacy,
      marketing,
      emailRcv,
      smsRcv,
      snsRcv,
    ];
    // 조건 1: emailRcv, smsRcv, snsRcv 모두 false면 marketing false
    if (!emailRcv && !smsRcv && !snsRcv) {
      setMarketing(false);
    } else {
      // 조건 2: emailRcv, smsRcv, snsRcv 중 하나라도 true이면 marketing true
      setMarketing(true);
    }
    // 조건 3: 전부 true이면 전체 동의 true
    const allChecked = remainingCheckboxes.every((checkbox) => checkbox);
    setAllAgree(allChecked);
  }, [policy, privacy, marketing, emailRcv, smsRcv, snsRcv]);

  // 필수 이용약관 미 선택시 회원가입 버튼 비활성화
  useEffect(() => {
    setIsSubmitDisabled(!policy || !privacy);
  }, [policy, privacy]);


  /**
   * 이용약관 전체 동의
   */
  const handleAllAgreeChange = () => {
    const checked = !allAgree;
    setAllAgree(checked);
    setPolicy(checked);
    setPrivacy(checked);
    setMarketing(checked);
    setEmailRcv(checked);
    setSmsRcv(checked);
    setSnsRcv(checked);
  };

  /**
   * 이용약관 체크박스 선택
   * @param setState
   */
  const handleCheckboxChange = (setState: React.Dispatch<React.SetStateAction<boolean>>) => {
    setState(prevState => !prevState);
  };
  /**
   * 마케팅 체크박스 선택
   */
  const handleMarketingCheckboxChange = () => {
    const isChecked = !marketing;
    setMarketing(isChecked);
    setEmailRcv(isChecked);
    setSmsRcv(isChecked);
    setSnsRcv(isChecked);
  };


  const renderHead = (
    <Stack spacing={1.5} sx={{mb: 5}}>
      <Typography variant="h4">회원가입</Typography>


      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2"> 이미 계정이 있으신가요?</Typography>

        <Link component={RouterLink} href={paths.auth.jwt.signIn} variant="subtitle2">
          로그인
        </Link>
      </Stack>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={3}>

      <Field.Text
        name="email"
        label={<Typography>이메일<Typography component='span' sx={{color: "error.main"}}>*</Typography></Typography>}
        InputLabelProps={{shrink: true}}
      />

      <Field.Text
        name="password"
        label={<Typography>비밀번호<Typography component='span' sx={{color: "error.main"}}>*</Typography></Typography>}
        type={password.value ? 'text' : 'password'}
        helperText={<Stack direction='row' alignItems='center'><Iconify icon='eva:info-fill' sx={{mr: 0.5}}/><Typography
          variant='caption'>8자 이상의 숫자, 영문자, 특수문자를 조합하여 입력해 주세요.</Typography></Stack>}
        // InputLabelProps={{shrink: true}}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}/>
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Field.Text
        name="confirmPassword"
        label={<Typography>비밀번호 확인<Typography component='span' sx={{color: "error.main"}}>*</Typography></Typography>}
        type={password.value ? 'text' : 'password'}
        InputLabelProps={{shrink: true}}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}/>
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Field.Text
        name="username"
        label={<Typography>이름<Typography component='span' sx={{color: "error.main"}}>*</Typography></Typography>}
        InputLabelProps={{shrink: true}}/>

      <Field.Text
        name="mobile"
        label={<Typography>휴대폰번호<Typography component='span' sx={{color: "error.main"}}>*</Typography></Typography>}
        InputLabelProps={{shrink: true}}
        helperText='-을 제외한 숫자만 입력해주세요.'
      />

      {/* 이용약관 */}
      <FormGroup sx={{textAlign: 'left'}}>
        <FormControlLabel
          control={
            <Checkbox
              checked={allAgree}
              onChange={handleAllAgreeChange}
            />
          }
          label="모두 동의합니다."
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={policy}
                onChange={() => handleCheckboxChange(setPolicy)}
              />
            }
            label="(필수) 서비스 이용약관에 동의합니다."
          />
          <Iconify
            icon="carbon:chevron-right"
            sx={{cursor: 'pointer'}}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={privacy}
                onChange={() => handleCheckboxChange(setPrivacy)}
              />
            }
            label="(필수) 개인정보 처리방침에 동의합니다."
          />
          <Iconify
            icon="carbon:chevron-right"
            sx={{cursor: 'pointer'}}
          />
        </Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={marketing}
              onChange={handleMarketingCheckboxChange}
            />
          }
          label="(선택) 마케팅 정보 수신에 동의합니다."
        />
        <Stack sx={{pl: 2.5}}>
          <FormControlLabel
            control={
              <Checkbox
                checked={emailRcv}
                onChange={() => handleCheckboxChange(setEmailRcv)}
              />
            }
            label="(선택) 이메일 수신 동의"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={smsRcv}
                onChange={() => handleCheckboxChange(setSmsRcv)}
              />
            }
            label="(선택) SMS 수신 동의"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={snsRcv}
                onChange={() => handleCheckboxChange(setSnsRcv)}
              />
            }
            label="(선택) SNS 수신 동의"
          />
        </Stack>
      </FormGroup>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        disabled={isSubmitDisabled}
      >
        완료
      </LoadingButton>
    </Stack>
  );

  return (
    <>
      {renderHead}

      {!!errorMsg && (
        <Alert severity="error" sx={{mb: 3}}>
          {errorMsg}
        </Alert>
      )}

      <Form methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </Form>

    </>
  );
}
