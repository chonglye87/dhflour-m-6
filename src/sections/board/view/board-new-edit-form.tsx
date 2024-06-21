import {z as zod} from 'zod';
import {toast} from "sonner";
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import LoadingButton from "@mui/lab/LoadingButton";
import {Card, Stack, Divider, Typography} from "@mui/material";

import {Form, Field} from 'src/components/hook-form';

import {Swagger} from "../../../utils/API";

import type {RequestRBoard, RBoardCategory} from "../../../generated/swagger/swagger.api";

// ----------------------------------------------------------------------
// BoardSchema: 게시판 제목, 내용, 카테고리 ID에 대한 유효성 검사 스키마 정의
const BoardSchema = zod.object({

  title: zod.string()
    .min(1, '제목을 입력해주세요.')
    .max(255, '최대 255자 이내로 작성해주세요'), // 제목 유효성 검사

  content: zod.string()
    .min(1, '내용을 입력해주세요.')
    .max(3000, '최대 3000자 이내로 작성해주세요'), // 내용 유효성 검사

  categoryIds: zod.array(zod.number())
    .nullable()
    .or(zod.null()), // 카테고리 유효성 검사
});

type BoardSchemaType = zod.infer<typeof BoardSchema>;

// Props 타입 정의
type Props = {
  isEdit?: boolean;
  id?: number;
  currentData?: RequestRBoard;
  categories: RBoardCategory[];
  onEnd: VoidFunction;
};

export default function BoardNewEditForm({isEdit, id, currentData, categories, onEnd}: Props) {
  const options = categories ? categories.map((category) => ({
    label: `(${category.id}) ${category.name}`,
    value: category.id
  })) : [];

  // 기본값 설정
  const defaultValues = {
    title: currentData?.title || '',
    content: currentData?.content || '',
    categoryIds: currentData?.categoryIds || []
  };

  // 폼 메서드 설정
  const methods = useForm<BoardSchemaType>({
    resolver: zodResolver(BoardSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: {isSubmitting},
    reset
  } = methods;

  // 등록/수정 폼 제출(submit) 함수
  const onSubmit = handleSubmit(async (data) => {
    const body = data as RequestRBoard;
    // 수정 폼 제출
    if (isEdit) {
      if (!id) {
        toast.error('수정할 ID가 없습니다.');
        return;
      }
      try {
        const response = await Swagger.api.updateBoard(id, body);
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
        const response = await Swagger.api.createBoard(body);
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

            {/* 제목 필드 */}
            <Field.Text name="title" label="제목" InputLabelProps={{shrink: true}}/>

            {/* 본문 필드 */}
            <Stack spacing={1}>
              <Typography variant="subtitle2">
                본문
              </Typography>

              <Field.Editor name="content" helperText="본문을 입력하세요."/>
            </Stack>
          </Stack>
        </Card>
        <Divider/>
        <Card>
          <Stack spacing={3} sx={{p: 3}}>
            {/* 카테고리 필드 */}
            <Stack spacing={1}>
              <Typography variant="subtitle2">
                카테고리
              </Typography>
              <Field.MultiCheckbox
                name="categoryIds"
                options={options}
                helperText="카테고리를 선택하세요."
                slotProps={{
                  wrap: {mb: 2},
                  formLabel: {color: 'primary'},
                  formHelperText: {color: 'error'},
                }}
              />
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
