import { SettingsOutlined } from '@mui/icons-material';
import { Box, Divider, FormHelperText, Stack, Typography } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { clsx } from 'clsx';

import { useMemo, useState } from 'react';
import CustomTextField from 'src/components/CustomForms/CustomTextField';
import ButtonLoading from 'src/components/General/ButtonLoading/ButtonLoading';
import ValueWithStatus from 'src/components/General/ValueWithStatus/ValueWithStatus';
import { mapNameNetwork } from 'src/constants/network';
import { SolanaEcosystemTokenInfo } from 'src/constants/tokens/solana-ecosystem/SolanaEcosystemTokenInfo';
import { LendingContractUniversal } from 'src/contracts/solana/contracts/LendingContractUniversal/LendingContractUniversal';
import useAsyncExecute from 'src/hooks/useAsyncExecute';
import useQueryAllTokensPrice from 'src/hooks/useQueryAllTokensPrice';
import useQueryDepositValue from 'src/hooks/useQueryHook/queryMyPortfolio/useQueryDepositValue';
import useMyPortfolioUniversal from 'src/hooks/useQueryHook/queryMyPortfolioUniversal/useMyPortfolioUniversal';
import { IconToken } from 'src/libs/crypto-icons/common/IconToken';
import useSummaryFirstActiveConnect from 'src/states/wallets/hooks/useSummaryFirstActiveConnect';
import { BN } from 'src/utils';
import { formatNumber } from 'src/utils/format';
import useGetListWallet from 'src/views/UniversalWallet/hooks/useGetListWallet';
import CheckHealthFactor from './CheckHealthFactor';
import useDepositEVM from 'src/hooks/mutations/useDepositEVM';
import { EthereumChainTokenInfo } from 'src/constants/tokens/evm-ecosystem/list-tokens/ethereum/EthereumChainTokenInfo';
import useGetBalanceUniversalByToken from 'src/states/wallets/hooks/useGetBalanceUniversalByToken';
import { TokenName } from 'src/libs/crypto-icons';

export default function DepositModal({ token }: { token: SolanaEcosystemTokenInfo | EthereumChainTokenInfo }) {
  const wallet = useWallet();
  const { address, networkName, chainId } = useSummaryFirstActiveConnect();
  const { data: listWallet } = useGetListWallet(chainId, address);
  const { mutateAsync: depositEVM } = useDepositEVM();
  const { priceByTokenName } = useQueryAllTokensPrice();
  const {
    balance,
    refetch: refetchBalance,
    isLoading: isLoadingBalance,
    error: errorBalance,
  } = useGetBalanceUniversalByToken({ address, network: networkName, token: token.symbol as TokenName });
  const { refetch: refetchDepositValue } = useQueryDepositValue();
  const { asyncExecute, loading } = useAsyncExecute();
  const { assetByTokenName } = useMyPortfolioUniversal();

  const [valueDeposit, setValueDeposit] = useState<string>('');
  const [valueInUSD, setValueInUSD] = useState<string>('0');
  const [valueDepositHelperText, setValueDepositHelperText] = useState<string | undefined>(undefined);

  const collateral = useMemo(() => {
    return assetByTokenName?.[token.symbol]
      ? formatNumber(BN(assetByTokenName?.[token.symbol].depositedAmount).plus(Number(valueDeposit)))
      : '--';
  }, [assetByTokenName, token.symbol, valueDeposit]);

  const handleChangeValueDeposit = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValueDeposit(e.target.value);
    if (!priceByTokenName) return;
    const _valueInUSD = BN(e.target.value).times(BN(priceByTokenName[token.symbol].price)).toString();
    setValueInUSD(_valueInUSD);
  };

  const handleMax = () => {
    setValueDeposit(balance.toFixed(token.decimals));
    if (!priceByTokenName) return;
    const _valueInUSD = BN(balance).times(BN(priceByTokenName[token.symbol].price)).toString();
    setValueInUSD(_valueInUSD);
  };

  const handleDeposit = async () => {
    if (!address) return;
    let hash = '';
    if (networkName === mapNameNetwork.solana.name) {
      const lendingContract = new LendingContractUniversal(wallet);
      hash = await lendingContract.deposit(Number(valueDeposit), token.address, listWallet?.universalWallet);
    } else {
      hash = await depositEVM({ depositAmount: valueDeposit, selectedToken: token.address });
    }
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
        <Typography variant="body2" sx={{ fontWeight: 500, color: 'info.main' }}>
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
          <IconToken tokenName={token.symbol} sx={{ mr: 1 }} />
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
      <Typography variant="body2" sx={{ fontWeight: 500, color: 'info.main', mt: 3 }}>
        Transaction overview
      </Typography>
      <Box sx={{ bgcolor: 'background.secondary', borderRadius: '16px' }}>
        <Box
          className="box"
          sx={{
            bgcolor: 'background.secondary',
          }}
        >
          <Box className="flex-space-between">
            <Typography variant="body2" sx={{ color: 'info.main', minWidth: '100px' }}>
              Collateral:
            </Typography>
            <IconToken tokenName={token.symbol} sx={{ ml: 4 }} />
            <Box sx={{ ml: 2 }}>
              <Typography sx={{ fontWeight: 600 }}>{collateral}</Typography>
              <Typography variant="body3" sx={{ fontWeight: 600, color: 'info.main' }}>
                {formatNumber(BN(collateral).times(BN(priceByTokenName?.[token.symbol]?.price || 0)), { fractionDigits: 4, prefix: '$' })}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ borderColor: '#474744', height: '1px' }} />
        <Box
          className="box"
          sx={{
            bgcolor: 'background.secondary',
          }}
        >
          <Box className="flex-space-between">
            <Typography variant="body2" sx={{ color: 'info.main', minWidth: '100px' }}>
              Health factor:
            </Typography>
            <CheckHealthFactor token={token} depositAmount={valueDeposit} mintAmount="0" />
          </Box>
        </Box>
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
            <IconToken tokenName={token.symbol} />
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
