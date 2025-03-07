import { SettingsOutlined } from '@mui/icons-material';
import { Box, Divider, FormHelperText, Stack, Typography } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { clsx } from 'clsx';
import { Icon, TokenName } from 'crypto-token-icon';
import { useMemo, useState } from 'react';
import CustomTextField from 'src/components/CustomForms/CustomTextField';
import ButtonLoading from 'src/components/General/ButtonLoading/ButtonLoading';
import ValueWithStatus from 'src/components/General/ValueWithStatus/ValueWithStatus';
import { SolanaEcosystemTokenInfo } from 'src/constants/tokens/solana-ecosystem/SolanaEcosystemTokenInfo';
import { LendingContract } from 'src/contracts/solana/contracts/LendingContract';
import useAsyncExecute from 'src/hooks/useAsyncExecute';
import useMyPortfolioInfo from 'src/hooks/useQueryHook/queryMyPortfolio/useMyPortfolio';
import useQueryDepositValue from 'src/hooks/useQueryHook/queryMyPortfolio/useQueryDepositValue';
import useSolanaBalanceToken from 'src/states/wallets/solana-blockchain/hooks/useSolanaBalanceToken';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';
import { BN } from 'src/utils';
import { decimalFlood, formatNumber } from 'src/utils/format';
import CheckHealthFactor from './CheckHealthFactor';

export default function RepayModal({ token }: { token: SolanaEcosystemTokenInfo }) {
  const wallet = useWallet();
  const { asyncExecute, loading } = useAsyncExecute();
  const { refetch: refetchDepositValue } = useQueryDepositValue();
  const { asset, status: statusMyPortfolioInfo, refetch: refetchMyPortfolioInfo } = useMyPortfolioInfo();
  const { address } = useSummarySolanaConnect();
  const { balance } = useSolanaBalanceToken(address, TokenName.USDAI);

  const [valueRepay, setValueRepay] = useState<string>('');
  const [valueInUSD, setValueInUSD] = useState<string>('0');
  const [valueRepayHelperText, setValueRepayHelperText] = useState<string | undefined>(undefined);

  const assetTokenInfo = useMemo(() => {
    return asset?.[token.address];
  }, [asset, token.address]);

  const maxValue = useMemo(() => {
    if (!assetTokenInfo) return '';
    if (balance.lt(assetTokenInfo.usdaiToRedeem)) {
      return balance.toString();
    }

    return assetTokenInfo.usdaiToRedeem.toString();
  }, [assetTokenInfo, balance]);

  const handleMax = () => {
    if (asset?.[token.address] != undefined) {
      setValueRepay(maxValue);
      const _valueInUSD = BN(assetTokenInfo?.usdaiToRedeem).toString();
      setValueInUSD(_valueInUSD);
    }
  };

  const handleChangeValueDeposit = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValueRepay(e.target.value);
    const _valueInUSD = BN(e.target.value).toString();
    setValueInUSD(_valueInUSD);
  };

  const handleRepay = async () => {
    if (!wallet || !wallet.wallet?.adapter.publicKey) return;
    const lendingContract = new LendingContract(wallet);
    const maxRepay = maxValue;
    const isMaxValue = Number(maxRepay) === Number(valueRepay);

    const hash = await lendingContract.repay(Number(valueRepay), token.address, isMaxValue);
    setValueRepay('');
    setValueInUSD('0');
    refetchMyPortfolioInfo();
    refetchDepositValue();

    return hash;
  };

  return (
    <Box
      sx={{
        '.box': {
          display: 'flex',
          py: 2,
          height: '82px',
          placeItems: 'center',
          borderRadius: '16px',
          alignItems: 'center',
          mt: 1,
          color: '#fff',
          px: 2,
        },
      }}
    >
      <Box className="flex-space-between">
        <Typography variant="body2" sx={{ fontWeight: 500, color: '#888880' }}>
          Amount
        </Typography>
        <ValueWithStatus
          status={[statusMyPortfolioInfo]}
          value={
            <Typography variant="body3" sx={{ color: 'text.secondary' }}>
              Max: {decimalFlood(maxValue, 3)}
            </Typography>
          }
        />
      </Box>
      <Box
        className="box"
        sx={{
          bgcolor: 'background.secondary',
        }}
      >
        <Stack
          sx={{
            alignItems: 'center',
            px: 2,
            py: 2,
            mr: 2,
            border: '1px solid rgba(102, 102, 98, 1)',
            borderRadius: '8px',
            bgcolor: 'secondary.dark',
          }}
        >
          <Icon tokenName={TokenName.USDAI} sx={{ mr: 1 }} />
          <Typography variant="body2">{TokenName.USDAI}</Typography>
        </Stack>
        <Box
          sx={{
            //  width: '-webkit-fill-available',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box sx={{ py: 2 }}>
            <CustomTextField
              type="number"
              variant="filled"
              fullWidth
              focused={true}
              value={valueRepay}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'background.secondary', // Đổi màu nền
                },
                '& .MuiInputBase-input': {
                  bgcolor: 'background.secondary',
                  fontSize: '24px',
                  fontFamily: 'inherit',
                  outline: 'none',
                  fontWeight: '700',
                  padding: 0,
                  mr: '12px',
                  // py: 0,
                  color: '#fff',
                  '&::placeholder': {
                    color: 'text.tertiary',
                    opacity: 0.6,
                  },
                  width: '100%',
                },
                '& .MuiFilledInput-root': {
                  backgroundColor: 'background.secondary',
                  '&:before, &:after': {
                    display: 'none',
                  },
                },
                '& .MuiFilledInput-root.Mui-focused': {
                  backgroundColor: 'background.secondary',
                },
              }}
              rule={{ min: { min: 0 }, max: { max: Number(maxValue) } }}
              onChange={handleChangeValueDeposit}
              helperText={undefined}
              _onError={(e) => {
                setValueRepayHelperText(e);
              }}
            />
            {valueInUSD ? (
              <Typography variant="body3" sx={{ color: 'text.secondary' }}>
                {formatNumber(valueInUSD, { fractionDigits: 2, suffix: '$' })}
              </Typography>
            ) : null}
          </Box>
        </Box>
        <Box sx={{ alignItems: 'center', gap: 1.5, height: '100%', display: 'flex' }}>
          <Typography variant="h5" sx={{ cursor: 'pointer', fontWeight: 600, color: '#FCFFD8' }} onClick={handleMax}>
            Max
          </Typography>
        </Box>
      </Box>
      <FormHelperText sx={{ px: 1, py: 0, minHeight: '16px' }} error>
        {valueRepayHelperText}
      </FormHelperText>
      <Typography variant="body2" sx={{ fontWeight: 500, color: '#888880', mt: 3 }}>
        Transaction overview
      </Typography>
      <Box sx={{ bgcolor: 'background.secondary', borderRadius: '16px' }}>
        <Box
          className="box"
          sx={{
            bgcolor: 'background.secondary',
            height: '72px',
          }}
        >
          <Typography variant="body2" sx={{ color: '#888880', minWidth: '100px' }}>
            Debt
          </Typography>
          <Box className="flex-center" sx={{ ml: 4 }}>
            <Icon tokenName={TokenName.USDAI} sx={{ mr: 1 }} />
            <Box>
              <Typography sx={{ fontWeight: 600, ml: 1 }}>{formatNumber(BN(maxValue).minus(Number(valueRepay) || 0))}</Typography>
              <Typography variant="body3" sx={{ fontWeight: 600, ml: 1, color: '#888880' }}>
                {formatNumber(BN(maxValue).minus(Number(valueRepay) || 0), { fractionDigits: 0, prefix: '$' })}
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
          }}
        >
          <Typography variant="body2" sx={{ color: '#888880', minWidth: '100px' }}>
            Health factor:
          </Typography>
          <CheckHealthFactor token={token} />
        </Box>
      </Box>
      <Box className="flex-space-between" sx={{ mt: 3 }}>
        <Typography variant="body2" sx={{ fontWeight: 500, color: '#888880' }}>
          Action
        </Typography>
        <SettingsOutlined sx={{ color: '#888880' }} />
      </Box>
      <Box className={clsx(['box', 'flex-space-between'])} sx={{ border: '#666662 solid 1px', position: 'relative' }}>
        <Box className="flex-center">
          <Icon tokenName={TokenName.USDAI} />
          <Typography sx={{ ml: 1, fontWeight: 600 }}>Redeem {TokenName.USDAI}</Typography>
        </Box>
        <ButtonLoading
          disabled={valueRepayHelperText != undefined || !Number(valueRepay)}
          size="small"
          loading={loading}
          variant="contained"
          onClick={() => asyncExecute({ fn: handleRepay })}
        >
          Redeem
        </ButtonLoading>
      </Box>
    </Box>
  );
}
