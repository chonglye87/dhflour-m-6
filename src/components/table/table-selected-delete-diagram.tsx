// @mui
import type { StackProps} from "@mui/material";

import {Box, Button} from "@mui/material";

// 선택박스를 선택후 삭제시 다이어로그 컴포넌트
import {ConfirmDialog} from "../custom-dialog";



// ----------------------------------------------------------------------

interface Props extends StackProps {
  open: boolean;
  onClose: VoidFunction;
  selected: number[];
  onDeleteSelected: VoidFunction;
}

export default function TableSelectedDeleteDiagram({
  open,
  onClose,
  selected,
  onDeleteSelected,
  sx,
  ...other
}: Props) {
  return (
    <ConfirmDialog
      open={open}
      onClose={onClose}
      title="삭제"
      content={
        <Box
          dangerouslySetInnerHTML={{
            __html: `<h3>${selected.length} 개 데이터를 선택하였습니다.<br/>정말 선택하신 데이터를 삭제하시겠습니까?</h3>삭제 후, 복구가 불가합니다.`,
          }}
         />
      }
      action={
        <Button variant="contained" color="error" onClick={onDeleteSelected}>
          네, 삭제합니다.
        </Button>
      }
    />
  );
}
