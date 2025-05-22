import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SettingsOutlined from '@mui/icons-material/SettingsOutlined';
import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { IconToken } from 'src/libs/crypto-icons/common/IconToken';
import { TokenName } from 'src/libs/crypto-icons/types';
import { BN } from 'src/utils';
import { useSlippageToleranceState } from '../../state/hooks';
import ModalSettingTrans from './ModalSettingTrans';
import CheckHealthFactor from '../CheckHealthFactor';
import { SolanaEcosystemTokenInfo } from 'src/constants/tokens/solana-ecosystem/SolanaEcosystemTokenInfo';
import useQueryAllTokensPrice from 'src/hooks/useQueryAllTokensPrice';
import { mapNameToInfoSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';

const usdaiInfo = mapNameToInfoSolana[TokenName.USDAI];
interface IProps {
  priceImpact?: string;
  minExpected?: string;
  token: SolanaEcosystemTokenInfo;
  mintedAmount?: string;
  usdaiRepay: string;
}

const RepayWithCollateralInfo = (props: IProps) => {
  const { priceImpact, minExpected, token, mintedAmount, usdaiRepay } = props;
  const { data: listTokenPrice } = useQueryAllTokensPrice();
  const [isOpenSetting, setIsOpenSetting] = useState(false);
  const [slippageTolerance] = useSlippageToleranceState();

  const usdaiPrice = listTokenPrice?.[usdaiInfo.address].price;

  return (
    <Stack direction={'column'} gap={1} mt={2}>
      <Typography variant="body2" sx={{ fontWeight: 500, color: 'info.main' }}>
        Transaction overview
      </Typography>
      <Box sx={{ bgcolor: 'background.secondary', borderRadius: '16px' }}>
        <Box
          sx={{
            bgcolor: 'background.secondary',
            height: '72px',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            p: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: 'info.main', minWidth: '100px' }}>
            Debt
          </Typography>
          <Box className="flex-center" sx={{ ml: 4 }}>
            <IconToken tokenName={TokenName.USDAI} sx={{ mr: 1 }} />
            <Box>
              <Typography sx={{ fontWeight: 600, ml: 1 }}>
                {BN(mintedAmount || 0)
                  .minus(BN(usdaiRepay || 0))
                  .toFixed(2)}
              </Typography>
              <Typography variant="body3" sx={{ fontWeight: 600, ml: 1, color: 'info.main' }}>
                {BN(mintedAmount || 0)
                  .minus(BN(usdaiRepay || 0))
                  .multipliedBy(usdaiPrice || 1)
                  .toFixed(2)}
                $
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ borderColor: '#474744', height: '1px' }} />
        <Box
          className="box"
          sx={{
            bgcolor: 'background.secondary',
            height: '72px',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            p: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: 'info.main', minWidth: '100px' }}>
            Health factor:
          </Typography>

          <CheckHealthFactor token={token} />
        </Box>
      </Box>

      <Accordion sx={{ bgcolor: 'transparent', ':before': { display: 'none' } }}>
        <AccordionSummary sx={{ paddingX: 0 }} expandIcon={<ExpandMoreIcon />}>
          <Stack justifyContent={'space-between'}>
            <Typography variant="body2" sx={{ color: 'info.main', fontWeight: 500, borderBottom: '1px dashed #f2f9a5' }}>
              Swap Info
            </Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction={'column'} gap={1}>
            <Stack justifyContent={'space-between'}>
              <Typography variant="body1" sx={{ color: 'info.main' }}>
                Price impact
              </Typography>

              <Typography variant="body1" fontWeight={'bold'} sx={{ color: 'info.main' }}>
                {(Number(priceImpact || 0) * 100).toFixed(2)}%
              </Typography>
            </Stack>
            <Stack justifyContent={'space-between'}>
              <Typography variant="body1" sx={{ color: 'info.main' }}>
                Slippage:
              </Typography>

              <Stack direction={'row'} gap={1} alignItems={'center'}>
                <Typography variant="body2" fontWeight={'bold'} sx={{ color: 'info.main' }}>
                  {slippageTolerance}%
                </Typography>
                <SettingsOutlined
                  onClick={() => setIsOpenSetting(true)}
                  sx={{ cursor: 'pointer', color: 'info.light', fontSize: '18px' }}
                />
              </Stack>
            </Stack>

            <Stack justifyContent={'space-between'}>
              <Typography variant="body1" sx={{ color: 'info.main' }}>
                Minimum received
              </Typography>

              <Typography variant="body1" fontWeight={'bold'} sx={{ color: 'info.main' }}>
                {BN(minExpected || 0)
                  .dividedBy(10 ** 6)
                  .toFixed(2)}
              </Typography>
            </Stack>
          </Stack>
        </AccordionDetails>
      </Accordion>

      <ModalSettingTrans isOpen={isOpenSetting} onClose={() => setIsOpenSetting(false)} />
    </Stack>
  );
};

export default RepayWithCollateralInfo;
