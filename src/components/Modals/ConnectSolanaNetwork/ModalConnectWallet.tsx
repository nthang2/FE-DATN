import CloseIcon from '@mui/icons-material/Close';
import { Box, Dialog, DialogContent, DialogTitle, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import ConnectSolanaNetwork from './ConnectSolanaNetwork';
import ConnectEVMNetwork from './ConnectEVMNetwork';

interface IProps {
  open: boolean;
  onClose: () => void;
}

const ModalConnectWallet = (props: IProps) => {
  const { open, onClose } = props;
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Dialog open={open} onClose={onClose} onTransitionExited={onClose}>
      <DialogTitle>
        <Stack justifyContent={'space-between'} alignItems="center">
          <Typography variant="h5">Connect Wallet</Typography>
          <CloseIcon color="primary" onClick={onClose} sx={{ cursor: 'pointer' }} />
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Box mb={2}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Solana" value={0} />
            <Tab label="Ethereum" value={1} />
          </Tabs>
        </Box>

        {value === 0 && <ConnectSolanaNetwork onClose={onClose} />}
        {value === 1 && <ConnectEVMNetwork onClose={onClose} />}
      </DialogContent>
    </Dialog>
  );
};

export default ModalConnectWallet;
