import { Box, Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import CustomTextField from 'src/components/CustomForms/CustomTextField';
import { BoxCustom } from 'src/components/General/CustomBox/CustomBox';
import { TokenName } from 'src/libs/crypto-icons';
import { IconToken } from 'src/libs/crypto-icons/common/IconToken';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';
import DestinationDialog from './DestinationDialog';
import SelectedNetwork from './SelectedNetwork';

const WalletSection = () => {
  const { address: sourceWallet } = useSummarySolanaConnect();
  const [selectedNetworkSource] = useState<string>('solana');

  return (
    <BoxCustom sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h6" fontWeight={600}>
        Wallet
      </Typography>

      <Box>
        <Typography variant="body2" fontWeight={600} color="text.secondary">
          Source Wallet
        </Typography>

        <CustomTextField
          fullWidth
          variant="outlined"
          inputType="number"
          placeholder="0"
          InputProps={{
            endAdornment: <SelectedNetwork value={selectedNetworkSource} />,
            startAdornment: <IconToken tokenName={TokenName.SOL} sx={{ mr: 1 }} />,
            sx: { px: 2, py: 1, fontSize: '14px', height: 'unset' },
          }}
          inputProps={{ style: { padding: 0, paddingTop: 1 } }}
          disabled
          sx={{ mt: 1 }}
          value={sourceWallet || ''}
        />
      </Box>

      <Box>
        <Typography variant="body2" fontWeight={600} color="text.secondary">
          Destination Wallet
        </Typography>

        <DestinationDialog />
      </Box>

      <Stack gap={2}>
        <Button variant="outlined" fullWidth>
          Add destination wallet
        </Button>
        <Button variant="contained" fullWidth>
          Create universal wallet
        </Button>
      </Stack>
    </BoxCustom>
  );
};

export default WalletSection;
