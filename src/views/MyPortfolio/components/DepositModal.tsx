import { SettingsOutlined } from '@mui/icons-material';
import { Box, FormHelperText, Stack, Typography } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { clsx } from 'clsx';
import { Icon } from 'crypto-token-icon';
import { useState } from 'react';
import CustomTextField from 'src/components/CustomForms/CustomTextField';
import ButtonLoading from 'src/components/General/ButtonLoading/ButtonLoading';
import ValueWithStatus from 'src/components/General/ValueWithStatus/ValueWithStatus';
import { TSolanaToken } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { SolanaEcosystemTokenInfo } from 'src/constants/tokens/solana-ecosystem/SolanaEcosystemTokenInfo';
import useAsyncExecute from 'src/hooks/useAsyncExecute';
import useLendingContract from 'src/hooks/useContract/useLendingContract';
import useQueryAllTokensPrice from 'src/hooks/useQueryAllTokensPrice';
import useQueryDepositValue from 'src/hooks/useQueryHook/queryMyPortfolio/useQueryDepositValue';
import useSolanaBalanceToken from 'src/states/wallets/solana-blockchain/hooks/useSolanaBalanceToken';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';
import { BN } from 'src/utils';
import { formatNumber } from 'src/utils/format';
import CheckHealthFactor from './CheckHealthFactor';

export default function DepositModal({ token }: { token: SolanaEcosystemTokenInfo }) {
  const wallet = useWallet();
  const { address } = useSummarySolanaConnect();
  const { data: tokensPrice } = useQueryAllTokensPrice();
  const {
    balance,
    refetch: refetchBalance,
    isLoading: isLoadingBalance,
    error: errorBalance,
  } = useSolanaBalanceToken(address, token.symbol as TSolanaToken);
  const { refetch: refetchDepositValue } = useQueryDepositValue();
  const { initLendingContract } = useLendingContract();
  const { asyncExecute, loading } = useAsyncExecute();

  const [valueDeposit, setValueDeposit] = useState<string>('');
  const [valueInUSD, setValueInUSD] = useState<string>('0');
  const [valueDepositHelperText, setValueDepositHelperText] = useState<string | undefined>(undefined);

  const handleChangeValueDeposit = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValueDeposit(e.target.value);
    if (!tokensPrice) return;
    const _valueInUSD = BN(e.target.value).times(BN(tokensPrice[token.address].price)).toString();
    setValueInUSD(_valueInUSD);
  };

  const handleMax = () => {
    setValueDeposit(balance.toString());
    if (!tokensPrice) return;
    const _valueInUSD = BN(balance).times(BN(tokensPrice[token.address].price)).toString();
    setValueInUSD(_valueInUSD);
  };

  const handleDeposit = async () => {
    if (!wallet || !wallet.wallet?.adapter.publicKey) return;
    const lendingContract = initLendingContract(wallet);
    const hash = await lendingContract.deposit(Number(valueDeposit), token.address);
    setValueDeposit('');
    setValueInUSD('0');
    refetchBalance();
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
          status={[isLoadingBalance ? 'pending' : 'success', errorBalance ? 'error' : 'success']}
          value={
            <Typography variant="body3" sx={{ color: 'text.secondary' }}>
              Balance: {formatNumber(balance)}
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
              value={valueDeposit}
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
              rule={{ min: { min: 0 }, max: { max: BN(balance).toNumber() } }}
              onChange={handleChangeValueDeposit}
              helperText={undefined}
              _onError={(e) => {
                setValueDepositHelperText(e);
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
        {valueDepositHelperText}
      </FormHelperText>
      <Typography variant="body2" sx={{ fontWeight: 500, color: '#888880', mt: 3 }}>
        Transaction overview
      </Typography>
      <Box
        className="box"
        sx={{
          bgcolor: 'background.secondary',
        }}
      >
        <Typography variant="body2" sx={{ color: '#888880' }}>
          Health factor:
        </Typography>
        <CheckHealthFactor token={token} />
      </Box>
      <Box>
        <Box className="flex-space-between" sx={{ mt: 3 }}>
          <Typography variant="body2" sx={{ fontWeight: 500, color: '#888880' }}>
            Action
          </Typography>
          <SettingsOutlined sx={{ color: '#888880' }} />
        </Box>
        <Box className={clsx(['box', 'flex-space-between'])} sx={{ border: '#666662 solid 1px', position: 'relative' }}>
          <Box className="flex-center">
            <Icon tokenName={token.symbol} />
            <Typography sx={{ ml: 1, fontWeight: 600 }}>Deposit {token.symbol}</Typography>
          </Box>
          <ButtonLoading
            disabled={valueDepositHelperText != undefined || !Number(valueDeposit)}
            size="small"
            loading={loading}
            variant="contained"
            onClick={() => asyncExecute({ fn: handleDeposit })}
          >
            Deposit
          </ButtonLoading>
        </Box>
      </Box>
    </Box>
  );
}
