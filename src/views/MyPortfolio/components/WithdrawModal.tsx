import { SettingsOutlined } from '@mui/icons-material';
import { Box, FormHelperText, Stack, Typography } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { clsx } from 'clsx';
import { Icon } from 'crypto-token-icon';
import { useMemo, useState } from 'react';
import CustomTextField from 'src/components/CustomForms/CustomTextField';
import ButtonLoading from 'src/components/General/ButtonLoading/ButtonLoading';
import ValueWithStatus from 'src/components/General/ValueWithStatus/ValueWithStatus';
import { TSolanaToken } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { SolanaEcosystemTokenInfo } from 'src/constants/tokens/solana-ecosystem/SolanaEcosystemTokenInfo';
import useAsyncExecute from 'src/hooks/useAsyncExecute';
import useLendingContract from 'src/hooks/useContract/useLendingContract';
import useQueryAllTokensPrice from 'src/hooks/useQueryAllTokensPrice';
import useMyPortfolioInfo from 'src/hooks/useQueryHook/queryMyPortfolio/useMyPortfolio';
import useQueryDepositValue from 'src/hooks/useQueryHook/queryMyPortfolio/useQueryDepositValue';
import useSolanaBalanceToken from 'src/states/wallets/solana-blockchain/hooks/useSolanaBalanceToken';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';
import { BN } from 'src/utils';
import { decimalFlood, formatNumber } from 'src/utils/format';
import CheckHealthFactor from './CheckHealthFactor';
import { toast } from 'react-toastify';

export default function WithdrawModal({ token }: { token: SolanaEcosystemTokenInfo }) {
  const wallet = useWallet();
  const { address } = useSummarySolanaConnect();
  const { data: tokensPrice, status: statusQueryAllTokensPrice } = useQueryAllTokensPrice();
  const { asyncExecute, loading } = useAsyncExecute();
  const { refetch: refetchBalance } = useSolanaBalanceToken(address, token.symbol as TSolanaToken);
  const { asset, status: statusMyPortfolioInfo, refetch: refetchMyPortfolioInfo } = useMyPortfolioInfo();
  const { refetch: refetchDepositedValue } = useQueryDepositValue();
  const { initLendingContract } = useLendingContract();

  const [valueWithdraw, setValueWithdraw] = useState<string>('');
  const [valueInUSD, setValueInUSD] = useState<string>('0');
  const [valueWithdrawHelperText, setValueWithdrawHelperText] = useState<string | undefined>(undefined);

  const handleChangeValueWithdraw = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValueWithdraw(e.target.value);
    if (!tokensPrice) return;
    const _valueInUSD = BN(e.target.value).times(BN(tokensPrice[token.address].price)).toString();
    setValueInUSD(_valueInUSD);
  };

  const maxValue = useMemo(() => {
    if (!asset) return '';
    return asset[token.address]?.maxWithdrawable.toString();
  }, [asset, token.address]);

  const handleMax = () => {
    if (asset) {
      setValueWithdraw(maxValue);
      if (!tokensPrice) return;
      const _valueInUSD = BN(maxValue).times(BN(tokensPrice[token.address].price)).toString();
      setValueInUSD(_valueInUSD);
    }
  };

  const handleWithdraw = async () => {
    if (!wallet || !wallet.wallet?.adapter.publicKey) return;
    const lendingContract = initLendingContract(wallet);
    const depositoryVault = await lendingContract.getDepositoryVault(token.address);
    const loanAccount = await lendingContract.getLoan(token.address);

    if (BN(loanAccount.collateralAmount).isGreaterThan(depositoryVault.amount.toString())) {
      toast.error('Protocol has insufficient funds');
      return;
    }

    const hash = await lendingContract.withdraw(Number(valueWithdraw), token.address);
    setValueWithdraw('');
    setValueInUSD('0');
    refetchBalance();
    refetchDepositedValue();
    refetchMyPortfolioInfo();

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
          // borderColor: error ? 'error.main' : '#666662',
          color: '#fff',
          px: 2,
        },
      }}
    >
      <Box className="flex-space-between">
        <Typography variant="body2" sx={{ fontWeight: 500, color: 'info.main' }}>
          Amount
        </Typography>
        <ValueWithStatus
          status={[statusQueryAllTokensPrice, statusMyPortfolioInfo]}
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
          <Icon tokenName={token.symbol} sx={{ mr: 1 }} />
          <Typography variant="body2">{token.symbol}</Typography>
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
              value={valueWithdraw}
              rule={{
                min: { min: 0 },
                max: {
                  max: Number(maxValue),
                },
              }}
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
              _onError={(e) => {
                if (Number(maxValue) && Number(maxValue) < 0) {
                  setValueWithdrawHelperText('You cannot withdraw due to LTV constraint');
                } else {
                  setValueWithdrawHelperText(e);
                }
              }}
              helperText={undefined}
              onChange={handleChangeValueWithdraw}
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
        {valueWithdrawHelperText}
      </FormHelperText>
      <Typography variant="body2" sx={{ fontWeight: 500, color: 'info.main', mt: 3 }}>
        Transaction overview
      </Typography>
      <Box
        className="box"
        sx={{
          bgcolor: 'background.secondary',
          // borderColor: error ? 'error.main' : '#666662',
        }}
      >
        <Typography variant="body2" sx={{ color: 'info.main' }}>
          Health factor:
        </Typography>
        <CheckHealthFactor token={token} />
      </Box>
      <Box>
        <Box className="flex-space-between" sx={{ mt: 3 }}>
          <Typography variant="body2" sx={{ fontWeight: 500, color: 'info.main' }}>
            Action
          </Typography>
          <SettingsOutlined sx={{ color: 'info.main' }} />
        </Box>
        <Box className={clsx(['box', 'flex-space-between'])} sx={{ border: '#666662 solid 1px', position: 'relative' }}>
          <Box className="flex-center">
            <Icon tokenName={token.symbol} />
            <Typography sx={{ ml: 1, fontWeight: 600 }}>Withdraw {token.symbol}</Typography>
          </Box>
          <ButtonLoading
            disabled={valueWithdrawHelperText != undefined || !Number(valueWithdraw)}
            size="small"
            loading={loading}
            variant="contained"
            onClick={() => asyncExecute({ fn: handleWithdraw })}
          >
            Withdraw
          </ButtonLoading>
        </Box>
      </Box>
    </Box>
  );
}
