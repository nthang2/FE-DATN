import { Box, Collapse, Link, Typography } from '@mui/material';
import { BoxCustom } from 'src/components/General/CustomBox/CustomBox';
import TooltipInfo from 'src/components/General/TooltipInfo/TooltipInfo';
import ValueWithStatus from 'src/components/General/ValueWithStatus/ValueWithStatus';
import { findTokenInfoByToken } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import useQueryAllTokensPrice from 'src/hooks/useQueryAllTokensPrice';
import useHealthFactor from 'src/hooks/useQueryHook/queryBorrow/useHealthFactor';
import { useBorrowState, useDepositState } from '../../state/hooks';
import HealthFactorSection from './HealthFactorSection';
import { useCrossModeState } from 'src/states/hooks';
import { displayDecimalByToken } from './constant';
import { decimalFlood } from 'src/utils/format';

export default function HealthFactor() {
  const { data: listPrice } = useQueryAllTokensPrice();
  const [depositItems] = useDepositState();
  const [borrowItems] = useBorrowState();
  const [crossMode] = useCrossModeState();

  const { data: healthFactorData, status: healthFactorStatus } = useHealthFactor({
    depositItems: depositItems,
    mintAmount: Number(borrowItems.value),
  });

  const selectedTokenInfo = findTokenInfoByToken(depositItems[0].address);
  const selectedTokenPrice = listPrice?.[selectedTokenInfo?.address || ''];
  const displayDecimal = displayDecimalByToken[selectedTokenInfo?.symbol as keyof typeof displayDecimalByToken] || 2;

  return (
    <BoxCustom
      sx={{
        background:
          'radial-gradient(54.44% 92.03% at 45.31% 45.56%, #464609 0%, #211509 50%, #1E1E18 100%),radial-gradient(117.19% 85.06% at 85.21% 14.94%, rgba(6, 38, 3, 0.8) 0%, rgba(33, 21, 9, 0) 50%, rgba(30, 30, 24, 0) 100%),radial-gradient(85.74% 327.55% at 12.17% 86.26%, rgba(51, 7, 30, 0.8) 0%, rgba(33, 21, 9, 0) 50%, rgba(30, 30, 24, 0) 100%),radial-gradient(214.19% 368.23% at 1.52% 1.91%, #100F02 0%, rgba(33, 21, 9, 0) 50%, rgba(33, 21, 9, 0) 100%)',
        borderRadius: '14px',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        height: 'fit-content',
        padding: 3,
      }}
    >
      <Box className="flex-start">
        <Typography variant="h6">Health Factor</Typography>
        <TooltipInfo
          title={
            <Typography variant="body2">
              Health Factor shows how safe your assets are in the protocol. A higher value means lower risk of liquidation. Calculations
              follow protocol rules, which may change.{' '}
              <Link
                target="_blank"
                href={'https://www.jpow.ai/Mechanism-for-Users-1ab930c1ef038079bc0ee0da4480e156'}
                sx={{ color: 'rgb(0, 153, 255)', cursor: 'pointer', textDecoration: 'unset' }}
              >
                Learn more.
              </Link>
            </Typography>
          }
        />
      </Box>

      <HealthFactorSection healthFactor={Number(healthFactorData?.healthFactor || 0).toFixed(2) || '0'} />

      <Collapse in={!crossMode}>
        <>
          <Box className="flex-space-between" mt={2}>
            <Box className="flex-start">
              <Typography>Liquidation Price</Typography>
              <TooltipInfo title="The price at which your collateral will be liquidated." />
            </Box>
            <ValueWithStatus
              status={[healthFactorStatus]}
              value={`${decimalFlood(healthFactorData?.estimateLiquidationPrice || 0, displayDecimal) || '--'}`}
            />
          </Box>
          <Box className="flex-space-between">
            <Box className="flex-start">
              <Typography>Current {selectedTokenInfo?.symbol} Price</Typography>
              <TooltipInfo title="The current market price of this collateral." />
            </Box>
            <ValueWithStatus
              status={['success']}
              value={`${selectedTokenPrice ? decimalFlood(selectedTokenPrice.price, displayDecimal) : '--'}`}
            />
          </Box>
        </>
      </Collapse>
    </BoxCustom>
  );
}
