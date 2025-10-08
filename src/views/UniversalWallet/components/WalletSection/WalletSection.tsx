import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import ButtonLoading from 'src/components/General/ButtonLoading/ButtonLoading';
import { BoxCustom } from 'src/components/General/CustomBox/CustomBox';
import useGetGenMessage from '../../hooks/useGetGenMessage';
import useRequestLink from '../../hooks/useRequestLink';
import { useDestinationWalletState, useGenMessageState, useSourceWalletState } from '../../state/hooks';
import DestinationDialog from './DestinationDialog';
import SignMessageBtn from './SignMessageBtn';
import SourceWalletDialog from './SourceWalletDialog';
import useGetListWallet from '../../hooks/useGetListWallet';

const WalletSection = () => {
  const { mutate: requestLink, isPending: isRequestLinkPending } = useRequestLink();
  const [destinationWallet] = useDestinationWalletState();
  const [sourceWallet] = useSourceWalletState();
  const { data: genMessageFromApi } = useGetGenMessage();
  const [genMessage, setGenMessage] = useGenMessageState();
  const { data: listWalletDestination } = useGetListWallet(destinationWallet.chainId, destinationWallet.address);

  const isDestinationWalletExist = Boolean(listWalletDestination?.universalWallet?.length);
  const isDisableRequest =
    destinationWallet.address === '' ||
    sourceWallet.address === '' ||
    destinationWallet.address === sourceWallet.address ||
    isDestinationWalletExist;

  useEffect(() => {
    if (genMessageFromApi && (genMessage?.length === 0 || genMessage === undefined)) {
      setGenMessage(genMessageFromApi.message);
    }
  }, [genMessage, genMessageFromApi, setGenMessage]);

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

      {/* {isShowRequestLink && (
      )} */}
      <Box>
        <Typography variant="body2" fontWeight={600} color="text.secondary">
          Destination Wallet
        </Typography>

        <DestinationDialog error={isDestinationWalletExist} />
      </Box>

      <Box
        sx={{
          display: isDestinationWalletExist ? 'flex' : 'none',
          flexDirection: 'column',
          gap: 1,
          p: 1.5,
          borderRadius: '8px',
          border: '1px solid',
          borderColor: 'error.main',
          bgcolor: '#5037336b',
        }}
      >
        <Typography variant="body2" fontWeight={600} color="error">
          Destination wallet invalid !
        </Typography>
      </Box>

      {(!genMessage || genMessage === '') && (
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

      {/* {!isShowRequestLink && (!genMessage || genMessage === '') && (
        <Stack gap={2}>
          <Button variant="outlined" fullWidth onClick={() => setIsShowRequestLink(true)}>
            Add destination wallet
          </Button>
          <Button variant="contained" fullWidth>
            Create universal wallet
          </Button>
        </Stack>
      )} */}

      <SignMessageBtn />
    </BoxCustom>
  );
};

export default WalletSection;
