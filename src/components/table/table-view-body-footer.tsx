// 상세 보기시 메타 정보 푸터 컴포넌트

import Box from "@mui/material/Box";
import {Stack} from "@mui/material";

import {fDateTime} from "../../utils/format-time";

export type MetadataProps = {
  createdTime?: string;
  createdBy?: number;
  updatedTime?: string;
  updatedBy?: number;
}

type Props = {
  data: MetadataProps;
}
export default function TableViewBodyFooter({data, ...other}: Props) {
  const {createdTime, updatedTime, createdBy, updatedBy} = data;
  return <>
    {createdTime && <Stack direction="row" sx={{typography: 'body2', textTransform: 'capitalize'}}>
      <Box component="span" sx={{width: 100, color: 'text.secondary', mr: 2}}>
        등록시간
      </Box>
      {fDateTime(createdTime)}
    </Stack>}

    {(createdBy !== undefined || false) && <Stack direction="row" sx={{typography: 'body2', textTransform: 'capitalize'}}>
      <Box component="span" sx={{width: 100, color: 'text.secondary', mr: 2}}>
        등록 계정 ID
      </Box>
      {createdBy}
    </Stack>}

    {updatedTime && <Stack direction="row" sx={{typography: 'body2', textTransform: 'capitalize'}}>
      <Box component="span" sx={{width: 100, color: 'text.secondary', mr: 2}}>
        마지막 수정시간
      </Box>
      {fDateTime(updatedTime)}
    </Stack>}

    {(updatedBy !== undefined || true) && <Stack direction="row" sx={{typography: 'body2', textTransform: 'capitalize'}}>
      <Box component="span" sx={{width: 100, color: 'text.secondary', mr: 2}}>
        수정 계정 ID
      </Box>
      {updatedBy}
    </Stack>}
  </>
}
