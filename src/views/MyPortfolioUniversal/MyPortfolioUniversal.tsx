import { Box, Grid2 } from '@mui/material';
import Lockout from 'src/components/StatusData/Lockout';
import Borrow from './Borrow';
import Deposit from './Deposit';
// import MyWallet from './MyWallet';
import YourPosition from './YourPosition';
import SwitchMode from './components/SwitchMode';
import HealthFactor from './HealthFactor';
import useSummaryFirstActiveConnect from 'src/states/wallets/hooks/useSummaryFirstActiveConnect';
import useGetListWallet from '../UniversalWallet/hooks/useGetListWallet';
import { useCrossModeState } from 'src/states/hooks';
import { useEffect } from 'react';

export default function MyPortfolioUniversal() {
  const { status, chainId, address } = useSummaryFirstActiveConnect();
  const { data: listWallet } = useGetListWallet(chainId, address);
  const [crossMode, setCrossMode] = useCrossModeState();

  useEffect(() => {
    if (!crossMode) {
      setCrossMode(true);
    }
  }, [crossMode, setCrossMode]);

  return (
    <>
      {status == 'Connected' && (
        <Box sx={{ bgcolor: 'background.selection', padding: '0px 32px 32px 32px', mt: 4, borderRadius: '32px' }}>
          <SwitchMode />
          <Grid2 container spacing={3}>
            <Grid2 size={{ xs: 12, md: 8 }}>
              <YourPosition />
              <Deposit />
              <Borrow />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 4 }}>
              <HealthFactor />
              {/* <MyWallet /> */}
            </Grid2>
          </Grid2>
        </Box>
      )}

      {Boolean(address.length) || (!listWallet?.universalWallet && <Lockout />)}
    </>
  );
}
