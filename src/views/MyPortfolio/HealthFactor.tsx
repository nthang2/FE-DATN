import { Box, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { BoxCustom } from 'src/components/General/CustomBox/CustomBox';
import TooltipInfo from 'src/components/General/TooltipInfo/TooltipInfo';
import ValueWithStatus from 'src/components/General/ValueWithStatus/ValueWithStatus';
import { listTokenAvailable } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import useHealthFactor from 'src/hooks/useQueryHook/queryBorrow/useHealthFactor';
import HealthFactorSection from '../Borrow/components/HealthFactor/HealthFactorSection';
import CustomSelectToken from './components/InputCustom/CustomSelectToken';
import useQueryAllTokensPrice from 'src/hooks/useQueryAllTokensPrice';

export default function HealthFactor() {
  const listToken = Object.values(listTokenAvailable).map((item) => item.address);
  const [selectedToken, setSelectedToken] = useState(listToken[0]);

  const { data: healthFactor, status: statusHealthFactor } = useHealthFactor({
    depositItems: [{ address: selectedToken, value: '0' }],
    mintAmount: 0,
    otherKeys: [selectedToken],
  });
  const { data: listPrice, status: statusListPrice } = useQueryAllTokensPrice();

  const selectedTokenInfo = useMemo(() => {
    return listTokenAvailable[selectedToken as keyof typeof listTokenAvailable] || listTokenAvailable['ORAI'];
  }, [selectedToken]);
  const liquidationPrice = useMemo(() => {
    if (healthFactor?.estimateLiquidationPrice) {
      return Number(healthFactor?.estimateLiquidationPrice || '0').toFixed(2);
    }

    const liquidationDetail = healthFactor?.liquidationDetails?.find((item) => item.token === selectedToken);
    if (liquidationDetail) {
      return Number(liquidationDetail?.estimateLiquidationPrice || '0').toFixed(2);
    }

    return '--';
  }, [healthFactor?.estimateLiquidationPrice, healthFactor?.liquidationDetails, selectedToken]);

  return (
    <BoxCustom
      sx={{
        borderRadius: '14px',
        background:
          'radial-gradient(426% 137.52% at 1.52% 1.91%, #100F02 0%, rgba(33, 21, 9, 0.00) 50%, rgba(33, 21, 9, 0.00) 100%), radial-gradient(328.92% 86.83% at 12.17% 86.26%, rgba(51, 7, 30, 0.80) 0%, rgba(33, 21, 9, 0.00) 50%, rgba(30, 30, 24, 0.00) 100%), radial-gradient(121.12% 86% at 85.21% 14.94%, rgba(6, 38, 3, 0.80) 0%, rgba(33, 21, 9, 0.00) 50%, rgba(30, 30, 24, 0.00) 100%), radial-gradient(106.92% 75.7% at 45.31% 45.56%, #464609 0%, #211509 50%, #1E1E18 100%)',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        height: 'fit-content',
        padding: 3,
        mb: 2,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box className="flex-start">
          <Typography variant="h6">Health Factor</Typography>
          <TooltipInfo title="HealthFactor" />
        </Box>

        <CustomSelectToken value={selectedToken} onChange={(e) => setSelectedToken(e.target.value)} options={listToken} />
      </Box>

      <HealthFactorSection
        healthFactor={Number(healthFactor?.healthFactor || '0').toFixed(2)}
        styleSvgWrapper={{ width: '220px', height: '110px' }}
      />

      <Box className="flex-space-between" mt={1}>
        <Box className="flex-start">
          <Typography>Liquidation Price</Typography>
          <TooltipInfo title="The price at which your collateral will be liquidated." />
        </Box>
        <ValueWithStatus status={[statusHealthFactor]} value={liquidationPrice} />
      </Box>
      <Box className="flex-space-between">
        <Box className="flex-start">
          <Typography>Current {selectedTokenInfo?.prettyName} Price</Typography>
          <TooltipInfo title="The current market price of this collateral." />
        </Box>
        <ValueWithStatus status={[statusListPrice]} value={listPrice?.[selectedToken]?.price?.toFixed(2)} />
      </Box>
    </BoxCustom>
  );
}
