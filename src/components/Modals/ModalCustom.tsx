import { ClearRounded } from '@mui/icons-material';
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import { useModalFunction, useModalValue } from 'src/states/modal/hooks';

export default function ModalCustom() {
  const modal = useModalValue();
  const modalFunction = useModalFunction();

  return (
    <Dialog fullWidth maxWidth={modal.modalProps?.maxWidth || 'xsm'} open={modal.open} {...modal.modalProps}>
      <DialogTitle sx={{ bgcolor: 'background.content' }}>
        <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          {typeof modal.title == 'string' ? <Typography sx={{ fontWeight: 600 }}>{modal.title}</Typography> : modal.title}
          {modal.isShowCloseModal && (
            <IconButton onClick={() => modalFunction({ type: 'closeModal' })}>
              <ClearRounded sx={{ ml: 'auto', cursor: 'pointer', fontSize: '25px', color: '#888880' }} />
            </IconButton>
          )}
        </Box>
      </DialogTitle>
      <DialogContent sx={{ bgcolor: 'background.content' }}>{modal.content}</DialogContent>
    </Dialog>
  );
}
