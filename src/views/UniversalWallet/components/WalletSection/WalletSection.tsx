import { Box, Button, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { BoxCustom } from 'src/components/General/CustomBox/CustomBox';
import useSummaryConnect from 'src/states/wallets/hooks/useSummaryConnect';
import useRequestLink from '../../hooks/useRequestLink';
import DestinationDialog from './DestinationDialog';
import SourceWalletDialog from './SourceWalletDialog';
import ProviderEVMUniversalWallet from 'src/components/Providers/ProviderEVM/ProviderEVMUniversalWallet';
import ProviderSolana from 'src/components/Providers/ProviderSolana/ProviderSolana';
import SignMessageBtn from './SignMessageBtn';
import ButtonLoading from 'src/components/General/ButtonLoading/ButtonLoading';
import { useDestinationWalletState } from '../../state/hooks';

const WalletSection = () => {
  const { mutate: requestLink, isPending: isRequestLinkPending } = useRequestLink();
  const { address: sourceWallet, networkName } = useSummaryConnect();
  const [destinationWallet] = useDestinationWalletState();
  const [selectedNetworkSource, setSelectedNetworkSource] = useState<string>(networkName.toLowerCase());
  const [isShowRequestLink, setIsShowRequestLink] = useState<boolean>(false);

  const isDisableRequest = destinationWallet.address === '' || sourceWallet === '' || destinationWallet.address === sourceWallet;
  console.log('🚀 ~ WalletSection ~ destinationWallet:', { destinationWallet, sourceWallet });

  useEffect(() => {
    if (networkName && networkName.toLowerCase() !== selectedNetworkSource) {
      setSelectedNetworkSource(networkName.toLowerCase());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceWallet, networkName]);

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

      <ProviderSolana localStorageKey="destination.connectWallet">
        <ProviderEVMUniversalWallet>
          {isShowRequestLink ? (
            <Box>
              <Typography variant="body2" fontWeight={600} color="text.secondary">
                Destination Wallet
              </Typography>

              <DestinationDialog />
            </Box>
          ) : (
            <></>
          )}

          {isShowRequestLink ? (
            <ButtonLoading
              variant="contained"
              disabled={isDisableRequest}
              fullWidth
              onClick={() => requestLink()}
              loading={isRequestLinkPending}
            >
              Request to link wallet
            </ButtonLoading>
          ) : (
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
        </ProviderEVMUniversalWallet>
      </ProviderSolana>
    </BoxCustom>
  );
};

export default WalletSection;
