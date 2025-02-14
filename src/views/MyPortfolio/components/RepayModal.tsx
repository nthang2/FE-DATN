import { SettingsOutlined } from '@mui/icons-material';
import { Avatar, Box, Divider, FormHelperText, Stack, Typography } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { clsx } from 'clsx';
import { Icon } from 'crypto-token-icon';
import { useState } from 'react';
import CustomTextField from 'src/components/CustomForms/CustomTextField';
import ButtonLoading from 'src/components/General/ButtonLoading/ButtonLoading';
import { SolanaEcosystemTokenInfo } from 'src/constants/tokens/solana-ecosystem/SolanaEcosystemTokenInfo';
import { LendingContract } from 'src/contracts/solana/contracts/LendingContract';
import useAsyncExecute from 'src/hooks/useAsyncExecute';
import useQueryAllTokensPrice from 'src/hooks/useQueryAllTokensPrice';
import useQueryDepositValue from 'src/hooks/useQueryHook/queryMyPortfolio/useQueryDepositValue';
import useQueryYourBorrow from 'src/hooks/useQueryHook/queryMyPortfolio/useQueryYourBorrow';
import { BN } from 'src/utils';
import { formatNumber } from 'src/utils/format';

export default function RepayModal({ token }: { token: SolanaEcosystemTokenInfo }) {
  const wallet = useWallet();
  const { data: tokensPrice } = useQueryAllTokensPrice();
  const { asyncExecute, loading } = useAsyncExecute();
  const { data: yourBorrow, refetch: refetchYourBorrow } = useQueryYourBorrow();
  const { refetch: refetchDepositValue } = useQueryDepositValue();

  const [valueRepay, setValueRepay] = useState<string>('');
  const [valueInUSD, setValueInUSD] = useState<string>('0');
  const [valueRepayHelperText, setValueRepayHelperText] = useState<string | undefined>(undefined);

  const handleChangeValueDeposit = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValueRepay(e.target.value);
    if (!tokensPrice) return;
    const _valueInUSD = BN(e.target.value).times(BN(tokensPrice[token.address].price)).toString();
    setValueInUSD(_valueInUSD);
  };

  const handleMax = () => {
    if (yourBorrow?.[token.address] != undefined) {
      setValueRepay(yourBorrow?.[token.address].toString());
      if (!tokensPrice) return;
      const _valueInUSD = BN(yourBorrow?.[token.address]).times(BN(tokensPrice[token.address].price)).toString();
      setValueInUSD(_valueInUSD);
    }
  };

  const handleRepay = async () => {
    if (!wallet || !wallet.wallet?.adapter.publicKey) return;
    const lendingContract = new LendingContract(wallet);
    await lendingContract.repay(Number(valueRepay), token.address);
    setValueRepay('');
    setValueInUSD('0');
    refetchYourBorrow();
    refetchDepositValue();
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
      <Typography variant="body2" sx={{ fontWeight: 500, color: '#888880' }}>
        Amount
      </Typography>
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
              rule={{ min: { min: 0 }, max: { max: Number(yourBorrow?.[token.address]) } }}
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
            // borderColor: error ? 'error.main' : '#666662',
          }}
        >
          <Typography variant="body2" sx={{ color: '#888880', minWidth: '100px' }}>
            Debt
          </Typography>
          <Box className="flex-center" sx={{ ml: 4 }}>
            <Icon tokenName={token.symbol} sx={{ mr: 1 }} />
            <Box>
              <Typography sx={{ fontWeight: 600, ml: 1 }}>--</Typography>
              <Typography variant="body3" sx={{ fontWeight: 600, ml: 1, color: '#888880' }}>
                --
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
          <Box className="flex-center">
            <Box sx={{ height: '24px', borderRadius: '99px', bgcolor: '#08DBA4', ml: 4, p: '5px 8px' }} className="flex-center">
              <Typography variant="body3" sx={{ color: 'background.default' }}>
                Healthy
              </Typography>
            </Box>
            <Typography sx={{ fontWeight: 600, ml: 1 }}>--</Typography>
          </Box>
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
          <Avatar sx={{ width: '20px', height: '20px' }} />
          <Typography sx={{ ml: 1, fontWeight: 600 }}>Redeem {token.symbol}</Typography>
        </Box>
        <ButtonLoading size="small" loading={loading} variant="contained" onClick={() => asyncExecute({ fn: handleRepay })}>
          Redeem
        </ButtonLoading>
      </Box>
    </Box>
  );
}
