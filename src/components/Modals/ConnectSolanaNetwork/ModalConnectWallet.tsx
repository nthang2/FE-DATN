import { Dialog, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import ConnectSolanaNetwork from './ConnectSolanaNetwork';
import CloseIcon from '@mui/icons-material/Close';

interface IProps {
  open: boolean;
  onClose: () => void;
}

const ModalConnectWallet = (props: IProps) => {
  const { open, onClose } = props;

  return (
    <Dialog open={open} onClose={onClose} onTransitionExited={onClose}>
      <DialogTitle>
        <Stack justifyContent={'space-between'} alignItems="center">
          <Typography variant="h5">Connect Wallet</Typography>
          <CloseIcon color="primary" onClick={onClose} sx={{ cursor: 'pointer' }} />
        </Stack>
      </DialogTitle>
      <DialogContent>
        <ConnectSolanaNetwork />
      </DialogContent>
    </Dialog>
  );
};

export default ModalConnectWallet;
