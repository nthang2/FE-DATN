import { Box, Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import ButtonLoading from 'src/components/General/ButtonLoading/ButtonLoading';
import { BoxCustom } from 'src/components/General/CustomBox/CustomBox';
import useRequestLink from '../../hooks/useRequestLink';
import { useDestinationWalletState, useGenMessageState, useSourceWalletState } from '../../state/hooks';
import DestinationDialog from './DestinationDialog';
import SignMessageBtn from './SignMessageBtn';
import SourceWalletDialog from './SourceWalletDialog';

const WalletSection = () => {
  const { mutate: requestLink, isPending: isRequestLinkPending } = useRequestLink();
  const [destinationWallet] = useDestinationWalletState();
  const [sourceWallet] = useSourceWalletState();
  const [isShowRequestLink, setIsShowRequestLink] = useState<boolean>(false);
  const [genMessage] = useGenMessageState();

  const isDisableRequest =
    destinationWallet.address === '' || sourceWallet.address === '' || destinationWallet.address === sourceWallet.address;

  return (
    <BoxCustom sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h6" fontWeight={600}>
        Wallet
      </Typography>

      <Box>
        <Typography variant="body2" fontWeight={600} color="text.secondary">
          Source Wallet
        </Typography>

        <SourceWalletDialog />
      </Box>

      {isShowRequestLink && (
        <Box>
          <Typography variant="body2" fontWeight={600} color="text.secondary">
            Destination Wallet
          </Typography>

          <DestinationDialog />
        </Box>
      )}

      {isShowRequestLink && (!genMessage || genMessage === '') && (
        <ButtonLoading
          variant="contained"
          disabled={isDisableRequest}
          fullWidth
          onClick={() => requestLink()}
          loading={isRequestLinkPending}
        >
          Request to link wallet
        </ButtonLoading>
      )}

      {!isShowRequestLink && (!genMessage || genMessage === '') && (
        <Stack gap={2}>
          <Button variant="outlined" fullWidth onClick={() => setIsShowRequestLink(true)}>
            Add destination wallet
          </Button>
          <Button variant="contained" fullWidth>
            Create universal wallet
          </Button>
        </Stack>
      )}

      <SignMessageBtn />
    </BoxCustom>
  );
};

export default WalletSection;
