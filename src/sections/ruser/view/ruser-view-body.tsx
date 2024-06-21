// @mui
import type {SxProps} from "@mui/system";
import type {Theme} from "@mui/material/styles/createTheme";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import {Card, Stack, Typography} from "@mui/material";

import {Iconify} from "src/components/iconify";
import TableViewBodyFooter from "src/components/table/table-view-body-footer";

import {Label} from "../../../components/label";
import {fDateTime} from "../../../utils/format-time";
import {useBoolean} from "../../../hooks/use-boolean";

import type {RUser} from "../../../generated/swagger/swagger.api";


// ----------------------------------------------------------------------

interface Props {
  data: RUser;
  sx?: SxProps<Theme>;
}

export default function RUserViewBody({data, sx, ...other}: Props) {
  // 게시판 데이터 디스트럭처링
  const {id, username, email, mobile, createdAt, policy, privacy, marketing, updatedAt, createdBy, updatedBy} = data;

  // Boolean 상태 보기
  const properties = useBoolean(true);

  return (
    <Stack spacing={3}>
      <Card sx={{p: 5}}>
        <Stack spacing={1}>
          <Stack
            spacing={3}
            direction={{xs: 'column', sm: 'row'}}
            alignItems={{xs: 'flex-end', sm: 'center'}}
            sx={{mb: {xs: 3, md: 0}}}
          >
            <Stack flexGrow={1} sx={{width: 1}}>
              {/* 생성 날짜 표시 */}
              <Typography variant="caption" sx={{color: 'text.secondary', mb: 1}}>
                {fDateTime(createdAt * 1000)}
              </Typography>

              <Divider/>

              <Stack sx={{mt: 3}} spacing={3}>
                <Stack direction="row" sx={{typography: 'body2', textTransform: 'capitalize'}}>
                  <Box component="span" sx={{width: 100, color: 'text.secondary', mr: 2}}>
                    이름
                  </Box>
                  {username}
                </Stack>
                <Stack direction="row" sx={{typography: 'body2'}}>
                  <Box component="span" sx={{width: 100, color: 'text.secondary', mr: 2}}>
                    이메일
                  </Box>
                  {email}
                </Stack>
                <Stack direction="row" sx={{typography: 'body2', textTransform: 'capitalize'}}>
                  <Box component="span" sx={{width: 100, color: 'text.secondary', mr: 2}}>
                    휴대폰번호
                  </Box>
                  {mobile}
                </Stack>
                <Stack direction="row" sx={{typography: 'body2', textTransform: 'capitalize'}}>
                  <Box component="span" sx={{width: 100, color: 'text.secondary', mr: 2}}>
                    이용약관
                  </Box>
                  {policy ? <Label
                    variant="soft"
                    color='success'
                  >
                    동의
                  </Label> : <Label
                    variant="soft"
                    color='warning'
                  >
                    미동의
                  </Label> }
                </Stack>
                <Stack direction="row" sx={{typography: 'body2', textTransform: 'capitalize'}}>
                  <Box component="span" sx={{width: 100, color: 'text.secondary', mr: 2}}>
                    개인정보처리
                  </Box>
                  {privacy ? <Label
                    variant="soft"
                    color='success'
                  >
                    동의
                  </Label> : <Label
                    variant="soft"
                    color='warning'
                  >
                    미동의
                  </Label> }
                </Stack>
                <Stack direction="row" sx={{typography: 'body2', textTransform: 'capitalize'}}>
                  <Box component="span" sx={{width: 100, color: 'text.secondary', mr: 2}}>
                    마케팅 활용
                  </Box>
                  {marketing ? <Label
                    variant="soft"
                    color='success'
                  >
                    동의
                  </Label> : <Label
                    variant="soft"
                    color='warning'
                  >
                    미동의
                  </Label> }
                </Stack>
              </Stack>
            </Stack>
          </Stack>

        </Stack>
      </Card>

      {/* 메타 데이터 정보 */}
      <Stack spacing={1.5} sx={{p: 1}}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{typography: 'subtitle2'}}
        >
          메타 정보
          <IconButton size="small" onClick={properties.onToggle}>
            <Iconify
              icon={properties.value ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
            />
          </IconButton>
        </Stack>
        {properties.value && (
          <TableViewBodyFooter
            data={{
              id,
              createdAt,
              createdBy,
              updatedAt,
              updatedBy,
            }}
          />
        )}
      </Stack>
    </Stack>
  );
}
