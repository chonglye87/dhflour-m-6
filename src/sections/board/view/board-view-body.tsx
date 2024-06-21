// @mui
import type {SxProps} from "@mui/system";
import type {Theme} from "@mui/material/styles/createTheme";

import IconButton from "@mui/material/IconButton";
import {Box, Card, Stack, Divider, Typography} from "@mui/material";

import {Label} from "src/components/label";
import {Iconify} from "src/components/iconify";
import TableViewBodyFooter from "src/components/table/table-view-body-footer";

import {fDateTime} from "../../../utils/format-time";
import {useBoolean} from "../../../hooks/use-boolean";

import type {RBoard} from "../../../generated/swagger/swagger.api";


// ----------------------------------------------------------------------

interface Props {
  data: RBoard;
  sx?: SxProps<Theme>;
}

export default function BoardViewBody({data, sx, ...other}: Props) {

  const {id, title, content, createdAt, updatedAt, categories, createdBy, updatedBy} = data;

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
              {/* 날짜 */}
              <Typography variant="caption" sx={{color: 'text.secondary', mb: 1}}>
                {fDateTime(createdAt * 1000)}
              </Typography>

              {/* 카테고리 */}
              {categories && categories.length > 0 && <Stack direction="row" spacing={1} sx={{mb: 1}}>
                {categories.map((category) => <Label variant="soft" color="default">
                  {category.name}
                </Label>)}
              </Stack>}

              {/* 제목 */}
              <Typography variant="h6" sx={{pt: 2}}>
                {title}
              </Typography>
            </Stack>
          </Stack>

          <Divider sx={{borderStyle: 'dashed'}}/>

          <Stack spacing={1}>
            {content && <Box sx={{mb: 1}} dangerouslySetInnerHTML={{__html: content}}/>}
          </Stack>
        </Stack>
      </Card>

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
