import { Box, Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import CustomTextField from 'src/components/CustomForms/CustomTextField';
import { BoxCustom } from 'src/components/General/CustomBox/CustomBox';
import { TokenName } from 'src/libs/crypto-icons';
import { IconToken } from 'src/libs/crypto-icons/common/IconToken';
import SelectedNetwork from '../SelectedNetwork';
import DestinationDialog from './DestinationDialog';

const listNetwork = ['solana', 'ethereum'];

const WalletSection = () => {
  const [sourceWallet, setSourceWallet] = useState<string>('');
  const [selectedNetworkSource, setSelectedNetworkSource] = useState<string>('solana');

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
            endAdornment: (
              <SelectedNetwork
                options={listNetwork}
                value={selectedNetworkSource}
                onChange={(e) => setSelectedNetworkSource(e.target.value as string)}
              />
            ),
            startAdornment: <IconToken tokenName={TokenName.SOL} sx={{ mr: 1 }} />,
            sx: { px: 2, py: 1, fontSize: '24px', height: 'unset' },
          }}
          inputProps={{ style: { padding: 0, paddingTop: 1 } }}
          sx={{ mt: 1 }}
          onChange={(event) => setSourceWallet(event.target.value)}
          value={sourceWallet}
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
