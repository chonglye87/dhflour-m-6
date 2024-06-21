import {useState, useEffect} from "react";

import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import {Box, Link, Stack, Button, Container, Typography} from "@mui/material";

import {Swagger} from "../../../utils/API";
import {paths} from "../../../routes/paths";
import {useRouter} from "../../../routes/hooks";
import {Label} from "../../../components/label";
import {useAuthContext} from "../../../auth/hooks";
import {Iconify} from "../../../components/iconify";
import {useBoolean} from "../../../hooks/use-boolean";
import {useResponsive} from "../../../hooks/use-responsive";
import {EmptyContent} from "../../../components/empty-content";

import type {RBoardCategory} from "../../../generated/swagger/swagger.api";

export function SampleView() {
  //  반응형
  const mdUp = useResponsive('up', 'md');
  // 라우터
  const router = useRouter();
  // 로그인 여부
  const {authenticated} = useAuthContext();
  //  유저 정보 가져오기
  const {user, loading} = useAuthContext()
  // Boolean 활용
  const isBoolean = useBoolean(false);

  /**
   *   RESTful sample
   */
  // API를 실행하는 동안 로딩 상태를 관리하기 위한 useState
  const [isListLoading, setIsListLoading] = useState(true)
  // useState를 이용하여 상태와 상태 업데이트 함수 선언
  // listBoardCategory 함수의 응답값 타입인 RBoardCategory를 categories 타입으로 사용합니다.
  const [categories, setCategories] = useState<RBoardCategory[] | null>(null)
  // API 호출 함수 선언
  const getCategory = async () => {
    try {
      // Swagger API 파일에 정의된 listBoardCategory 함수를 호출합니다.
      const res = await Swagger.api.listBoardCategory();
      // 응답 데이터를 categories 상태로 설정합니다.
      setCategories(res.data)
    } catch (err) {
      console.error(err, 'err')
    } finally {
      // API 호출이 완료되면(성공 또는 실패) 로딩 상태를 false로 설정합니다.
      setIsListLoading(false)
    }
  }

  // 컴포넌트가 마운트될 때 API 호출
  useEffect(() => {
    getCategory();
  }, []);

  /**
   * 라우터 이동
   */
  const handleRouter = () => {
    // router.back(); // 뒤로 이동
    router.push(paths.dashboard.root) // 원하는 경로 이동
    // router.replace(paths.dashboard.root); // 원하는 경로로 교체
  }

  /**
   * 로딩
   */
  if (loading || isListLoading) {
    return (
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{height: mdUp ? '300px' : '200px'}}
      >
        <CircularProgress/>
      </Stack>
    );
  }


  return (
    <Container>
      <Stack spacing={2}>
        <Box>
          <Typography variant="h4"> 유저 정보 </Typography>
          <Stack>
            <Typography variant="body1"> id: {user?.id}</Typography>
            <Typography variant="body1"> email: {user?.email}</Typography>
          </Stack>
        </Box>
        <Box>
          <Typography variant="h4"> 로그인 여부 </Typography>
          <Typography variant="body1"> {authenticated ? '로그인' : '비로그인'}</Typography>
        </Box>
        <Stack spacing={1}>
          <Typography variant="h4"> 페이지 이동 </Typography>
          <Button
            variant='contained'
            onClick={handleRouter}
          >
            클릭시 페이지 이동
          </Button>
        </Stack>
        <Stack spacing={1}>
          <Typography variant="h4"> Boolean 활용 </Typography>
          <Typography variant="body1"> {isBoolean.value ? 'true' : 'false'}</Typography>
          <Button
            variant='contained'
            onClick={isBoolean.onToggle}
          >
            값 변경
          </Button>
        </Stack>
        <Stack spacing={2}>
          <Stack direction='row' alignItems='center' spacing={2}>
            <Typography variant="h4">Iconify 아이콘</Typography>
            <Link href="https://icon-sets.iconify.design/" target="_blank" rel="noopener" variant="subtitle1">
              https://icon-sets.iconify.design/
            </Link>
          </Stack>
          <Stack>
            <Box>
              <Typography variant="subtitle1">Iconify 기본 예시</Typography>
              <Iconify width={36} icon="solar:pen-bold" sx={{color: 'primary.main'}}/>
            </Box>
            <Box>
              <Typography variant="subtitle1">IconButton</Typography>
              <IconButton color="primary" onClick={() => {
                console.log('클릭함수 실행')
              }}>
                <Iconify width={36} icon="solar:pen-bold" sx={{color: 'primary.main'}}/>
              </IconButton>
            </Box>

          </Stack>
        </Stack>
        <Stack spacing={1}>
          <Typography variant="h4">useState와 map 함수를 사용하여 RESTful 데이터 렌더링</Typography>
          <Stack direction="row" spacing={1}>
            {categories && categories.map((category) => (
              <Label variant="soft" color="default" key={category.id}>
                {category.name}
              </Label>
            ))}
          </Stack>
          {categories?.length === 0 && (
            <EmptyContent filled title="등록된 카테고리가 없습니다."/>
          )}
        </Stack>
      </Stack>
    </Container>
  )
}
