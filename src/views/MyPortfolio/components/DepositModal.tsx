import { Box, FormHelperText, Stack, TextField, Typography } from '@mui/material';
import { Icon } from 'crypto-token-icon';
import { useState } from 'react';
import { TSolanaToken } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { SolanaEcosystemTokenInfo } from 'src/constants/tokens/solana-ecosystem/SolanaEcosystemTokenInfo';
import useQueryAllTokensPrice from 'src/hooks/useQueryAllTokensPrice';
import useSolanaBalanceToken from 'src/states/wallets/solana-blockchain/hooks/useSolanaBalanceToken';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';
import { BN } from 'src/utils';

export default function DepositModal({ token }: { token: SolanaEcosystemTokenInfo }) {
  const wallet = useSummarySolanaConnect();
  const { data: tokensPrice } = useQueryAllTokensPrice();
  const { balance } = useSolanaBalanceToken(wallet.address, token.symbol as TSolanaToken);

  const [valueDeposit, setValueDeposit] = useState<string>('');
  const [valueInUSD, setValueInUSD] = useState<string>('0');
  const [valueDepositHelpertext] = useState<string | undefined>(undefined);

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

  return (
    <Box>
      <Typography variant="body2" sx={{ fontWeight: 500, color: '#888880' }}>
        Amount
      </Typography>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          mt: 1,
          py: 2,
          height: '83px',
          placeItems: 'center',
          bgcolor: 'background.secondary',
          borderRadius: '16px',
          alignItems: 'center',
          // borderColor: error ? 'error.main' : '#666662',
          color: '#fff',
        }}
      >
        <Stack
          sx={{
            alignItems: 'center',
            px: 2,
            py: 2,
            mx: 2,
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
            <TextField
              type="number"
              variant="filled"
              focused={true}
              value={valueDeposit}
              sx={{
                input: {
                  bgcolor: 'background.secondary',
                  fontSize: '24px',
                  fontFamily: 'inherit',
                  fontWeight: '700',
                  ml: '-12px',
                  width: '100%',
                  color: '#fff',
                  '&::placeholder': {
                    color: 'text.tertiary',
                    opacity: 0.6,
                  },
                },
              }}
              onChange={handleChangeValueDeposit}
            />
            {valueInUSD ? (
              <Typography variant="body3" sx={{ color: 'text.secondary' }}>
                ${valueInUSD}
              </Typography>
            ) : null}
          </Box>
        </Box>
        <Box sx={{ alignItems: 'center', gap: 1.5, height: '100%', display: 'flex' }}>
          <Box>
            <Typography variant="h5" sx={{ cursor: 'pointer', fontWeight: 600, color: '#FCFFD8' }} onClick={handleMax}>
              Max
            </Typography>
          </Box>
        </Box>
        <FormHelperText sx={{ px: 1, py: 0, minHeight: '16px' }} error>
          {valueDepositHelpertext}
        </FormHelperText>
      </Box>
    </Box>
  );
}
