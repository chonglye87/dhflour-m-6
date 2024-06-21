// @mui
import type {DrawerProps} from "@mui/material";

import {useState} from "react";

import LinearProgress from "@mui/material/LinearProgress";
import {Box, Stack, Drawer, Container} from "@mui/material";

import {Scrollbar} from "../scrollbar";
import {DrawerHeader} from "./DrawerHeader";
import {useResponsive} from "../../hooks/use-responsive";


// ----------------------------------------------------------------------

interface Props extends DrawerProps {
  loading?: boolean | false;
  title: string;
  children: React.ReactNode;
  hideBackdrop?: boolean | false;

  onClose: VoidFunction;
  onView?: VoidFunction | undefined;
  onEdit?: VoidFunction | undefined;
  onDelete?: VoidFunction | undefined;
}

export function DrawerWrapper({
                                loading,
                                open,
                                onClose,

                                title,
                                children,

                                onView,
                                onEdit,
                                onDelete,

                                hideBackdrop,

                                ...other
                              }: Props) {
  const isDesktop = useResponsive("up", "md");
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="right"
      hideBackdrop={hideBackdrop}
      PaperProps={{
        sx: {
          width: {
            xs: "100%",
            sm: fullscreen ? "100%" : "65%",
            md: fullscreen ? "100%" : "50%",
          },
        },
      }}
      {...other}
    >

      <DrawerHeader
        title={title}
        onClose={onClose}
        onDelete={onDelete}
        onView={onView}
        onEdit={onEdit}
        fullscreen={fullscreen}
        onToggleFullscreen={() => setFullscreen(!fullscreen)}
        sx={{bgcolor: 'background.paper'}}
      />
      {loading && <Box sx={{width: '100%'}}>
        <LinearProgress/>
      </Box>}
      <Scrollbar sx={{height: 1}}>
        <Stack spacing={2.5} justifyContent="center" sx={{p: 2.5}}>
          <Container maxWidth={isDesktop ? "lg" : false} sx={{mt: 3, mb: 5}}>
            {children}
          </Container>
        </Stack>
      </Scrollbar>

    </Drawer>
  );
}

// ----------------------------------------------------------------------
