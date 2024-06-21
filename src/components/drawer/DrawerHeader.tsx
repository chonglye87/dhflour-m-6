import type {StackProps} from "@mui/material";

import {useState} from "react";

import Tooltip from "@mui/material/Tooltip";
import {Stack, MenuItem, IconButton, Typography} from "@mui/material";

import {useResponsive} from "src/hooks/use-responsive";

import {Iconify} from "../iconify";
import {CustomPopover} from "../custom-popover";

// ----------------------------------------------------------------------

interface Props extends StackProps {
  title: string;
  onClose: VoidFunction;
  onView?: VoidFunction | undefined;
  onEdit?: VoidFunction | undefined;
  onDelete?: VoidFunction | undefined;
  fullscreen?: boolean | undefined;
  onToggleFullscreen?: VoidFunction | undefined;
}

export function DrawerHeader({
                               title,
                               onClose,
                               onView,
                               onEdit,
                               onDelete,
                               fullscreen,
                               onToggleFullscreen,
                               sx,
                               ...other
                             }: Props) {
  const isEmptyMenu = !onView && !onEdit && !onDelete;
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };
  const handleClosePopover = () => {
    setOpenPopover(null);
  };
  const isDesktop = useResponsive("up", "sm");

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        flexShrink={0}
        sx={{
          px: 2,
          height: 80,
          borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
          ...sx,
        }}
        {...other}
      >
        <Stack direction="row" alignItems="center" flexGrow={1} spacing={1}>
          <Tooltip title="닫기">
            <IconButton onClick={onClose}>
              {isDesktop ? <Iconify icon="ep:arrow-right-bold"/> : <Iconify icon="ep:arrow-left-bold"/>}
            </IconButton>
          </Tooltip>

          <Typography display="inline" variant="h5">
            {title}
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          {onToggleFullscreen && (
            <IconButton
              color={fullscreen ? "inherit" : "default"}
              onClick={onToggleFullscreen}
            >
              {!fullscreen ?  <Iconify icon="bi:fullscreen"/> : <Iconify icon="bi:fullscreen-exit"/>}
            </IconButton>
          )}
          {!isEmptyMenu && (
            <IconButton
              color={openPopover ? "inherit" : "default"}
              onClick={handleOpenPopover}
            >
              <Iconify icon="eva:more-vertical-fill"/>
            </IconButton>
          )}
        </Stack>
      </Stack>

      <CustomPopover
        open={!!openPopover}
        onClose={handleClosePopover}
        // arrow="right-top"
        sx={{width: 160}}
      >
        {onView && (
          <MenuItem
            onClick={() => {
              onView();
              handleClosePopover();
            }}
          >
            <Iconify icon="eva:eye-fill"/>
            상세
          </MenuItem>
        )}

        {onEdit && (
          <MenuItem
            onClick={() => {
              onEdit();
              handleClosePopover();
            }}
          >
            <Iconify icon="mingcute:pencil-line"/>
            수정
          </MenuItem>
        )}

        {onDelete && (
          <MenuItem
            onClick={() => {
              onDelete();
              handleClosePopover();
            }}
            sx={{color: "error.main"}}
          >
            <Iconify icon="eva:trash-2-outline"/>
            삭제
          </MenuItem>
        )}
      </CustomPopover>
    </>
  );
}
