import {z as zod} from 'zod';
import {toast} from "sonner";
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {Card, Stack} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import {Form, Field} from 'src/components/hook-form';

import {Swagger} from "../../../utils/API";

import type { RequestRUser} from "../../../generated/swagger/swagger.api";

// ----------------------------------------------------------------------
// UserSchema: 게시판 제목, 내용, 카테고리 ID에 대한 유효성 검사 스키마 정의
const UserSchema = zod.object({
  username: zod.string()
    .min(1, '이름을 입력해주세요.')
    .max(30, '최대 30자 이내로 작성해주세요'),
  email: zod.string()
    .email('유효한 이메일을 입력해주세요.')
    .max(255, '최대 255자 이내로 작성해주세요'),
  mobile: zod.string()
    .min(1, '휴대폰번호를 입력해주세요.')
    .max(255, '최대 255자 이내로 작성해주세요'),
  password: zod.string()
    .max(255, '최대 255자 이내로 작성해주세요')
    .optional(),
  policy: zod.boolean().refine(value => value, '이용약관에 동의해야 합니다.'),
  privacy: zod.boolean().refine(value => value, '개인정보처리방침에 동의해야 합니다.'),
  marketing: zod.boolean().optional(),
});
type UserSchemaType = zod.infer<typeof UserSchema>;

// Props 타입 정의
type Props = {
  isEdit?: boolean;
  id?: number;
  currentData?: RequestRUser;
  onEnd: VoidFunction;
};

export default function RUserNewEditForm({isEdit, id, currentData, onEnd}: Props) {
  // 기본값 설정
  const defaultValues = {
    username: currentData?.username || '',
    email: currentData?.email || '',
    mobile: currentData?.mobile || '',
    policy: currentData?.policy || false,
    privacy: currentData?.privacy || false,
    marketing: currentData?.marketing || false,
  };

  // 폼 메서드 설정
  const methods = useForm<UserSchemaType>({
    resolver: zodResolver(UserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: {isSubmitting},
    reset
  } = methods;

  // 등록/수정 폼 제출(submit) 함수
  const onSubmit = handleSubmit(async (data) => {
    const body = data as RequestRUser;
    // 수정 폼 제출
    if (isEdit) {
      if (!id) {
        toast.error('수정할 ID가 없습니다.');
        return;
      }
      try {
        const response = await Swagger.api.updateUser(id, body);
        if (response.status === 200) {
          toast.success('수정이 완료되었습니다.');
          reset();
          onEnd();
        }
      } catch (e) {
        console.error(e);
        toast.error(e.message);
      }
    } else {
      // 등록 폼 제출
      try {
        const response = await Swagger.api.createUser(body);
        console.log(response, 'response');
        if (response.status === 201) {
          toast.success('등록이 완료되었습니다.');
          reset();
          onEnd();
        }
      } catch (e) {
        console.error(e);
        toast.error(e.message);
      }
    }
  });

  // 컴포넌트가 마운트되거나, isEdit 또는 currentData가 변경될 때마다 실행되는 useEffect
  useEffect(() => {
    if (isEdit && currentData) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentData]);

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3}>
        <Card>
          <Stack spacing={3} sx={{p: 3}}>

            <Stack spacing={3} sx={{p: 3}}>
              {/* 이름 필드 */}
              <Field.Text name="username" label="이름" InputLabelProps={{shrink: true}}/>
              {/* 이메일 필드 */}
              <Field.Text name="email" label="이메일" InputLabelProps={{shrink: true}}/>
              {/* 휴대폰번호 필드 */}
              <Field.Text name="mobile" label="휴대폰번호" InputLabelProps={{shrink: true}}/>
              {/* 비밀번호 필드 */}
              {!isEdit && <Field.Text name="password" label="비밀번호" type="password" InputLabelProps={{shrink: true}}/>}
              {/* 이용약관동의 여부 */}
              <Field.Checkbox name="policy" label="이용약관에 동의합니다."/>
              {/* 개인정보처리방침동의 여부 */}
              <Field.Checkbox name="privacy" label="개인정보처리방침에 동의합니다."/>
              {/* 마케팅수신동의 여부 */}
              <Field.Checkbox name="marketing" label="마케팅 수신에 동의합니다."/>
            </Stack>

          </Stack>
        </Card>
      </Stack>
      {/* 제출 버튼 */}
      <Stack sx={{mt: 5}}>
        <LoadingButton
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting}
        >
          {!isEdit ? "등록하기" : "수정하기"}
        </LoadingButton>
      </Stack>
    </Form>
  );
}
