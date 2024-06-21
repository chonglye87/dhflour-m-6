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
const BoardSchema = zod.object({
  title: zod.string()
    .min(1, '제목을 입력해주세요.')
    .max(255, '최대 255자 이내로 작성해주세요'),
  content: zod.string()
    .min(1, '내용을 입력해주세요.')
    .max(3000, '최대 3000자 이내로 작성해주세요'),
  categoryIds: zod.array(zod.number())
    .nullable()
    .or(zod.null()),
});

type BoardSchemaType = zod.infer<typeof BoardSchema>;

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

  const defaultValues = {
    title: currentData?.title || '',
    content: currentData?.content || '',
    categoryIds: currentData?.categoryIds || []
  };

  const methods = useForm<BoardSchemaType>({
    resolver: zodResolver(BoardSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: {isSubmitting},
    reset
  } = methods;

  // 로그인 버튼을 눌렀을 때 실행되는 함수입니다.
  const onSubmit = handleSubmit(async (data) => {
    const body = data as RequestRBoard;
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

            <Field.Text name="title" label="제목" InputLabelProps={{shrink: true}}/>

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
