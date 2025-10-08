import { ArrowDropDown, SettingsOutlined } from '@mui/icons-material';
import { Box, Divider, FormHelperText, Popover, Stack, Typography } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { clsx } from 'clsx';

import { useMemo, useState } from 'react';
import CustomTextField from 'src/components/CustomForms/CustomTextField';
import ButtonLoading from 'src/components/General/ButtonLoading/ButtonLoading';
import ValueWithStatus from 'src/components/General/ValueWithStatus/ValueWithStatus';
import { mapNameNetwork } from 'src/constants/network';
import { EthereumChainTokenInfo } from 'src/constants/tokens/evm-ecosystem/list-tokens/ethereum/EthereumChainTokenInfo';
import { listTokenAvailable as listTokenAvailableETH } from 'src/constants/tokens/evm-ecosystem/mapNameToInfoEthereum';
import { listTokenAvailableSOLUniversal as listTokenAvailableSOL } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { SolanaEcosystemTokenInfo } from 'src/constants/tokens/solana-ecosystem/SolanaEcosystemTokenInfo';
import { LendingContractUniversal } from 'src/contracts/solana/contracts/LendingContractUniversal/LendingContractUniversal';
import useDepositEVM from 'src/hooks/mutations/useDepositEVM';
import useAsyncExecute from 'src/hooks/useAsyncExecute';
import useQueryAllPriceByName from 'src/hooks/useQueryAllPriceByName';
import useQueryAllTokensPrice from 'src/hooks/useQueryAllTokensPrice';
import useQueryDepositValue from 'src/hooks/useQueryHook/queryMyPortfolio/useQueryDepositValue';
import useMyPortfolioUniversal from 'src/hooks/useQueryHook/queryMyPortfolioUniversal/useMyPortfolioUniversal';
import { TokenName } from 'src/libs/crypto-icons';
import { IconToken } from 'src/libs/crypto-icons/common/IconToken';
import useGetBalanceUniversalByToken from 'src/states/wallets/hooks/useGetBalanceUniversalByToken';
import useSummaryFirstActiveConnect from 'src/states/wallets/hooks/useSummaryFirstActiveConnect';
import { BN } from 'src/utils';
import { formatNumber } from 'src/utils/format';
import useGetListWallet from 'src/views/UniversalWallet/hooks/useGetListWallet';
import { TAvailableToken, TNetwork } from '../type';
import CheckHealthFactor from './CheckHealthFactor';

export default function DepositModal({ token }: { token: SolanaEcosystemTokenInfo | EthereumChainTokenInfo }) {
  const wallet = useWallet();
  const { address, chainId } = useSummaryFirstActiveConnect();
  const { data: listWallet } = useGetListWallet(chainId, address);
  const { mutateAsync: depositEVM } = useDepositEVM();
  const { priceByTokenName } = useQueryAllTokensPrice();
  const { refetch: refetchDepositValue } = useQueryDepositValue();
  const { asyncExecute, loading } = useAsyncExecute();
  const { assetByTokenName } = useMyPortfolioUniversal();
  const { data: listPrice } = useQueryAllPriceByName();

  const [valueDeposit, setValueDeposit] = useState<string>('');
  const [valueInUSD, setValueInUSD] = useState<string>('0');
  const [valueDepositHelperText, setValueDepositHelperText] = useState<string | undefined>(undefined);
  const [selectedNetwork, setSelectedNetwork] = useState<TNetwork>('solana');
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const {
    balance,
    refetch: refetchBalance,
    isLoading: isLoadingBalance,
    error: errorBalance,
  } = useGetBalanceUniversalByToken({ address, network: selectedNetwork, token: token.symbol as TokenName });

  const id = anchorEl ? `popover_deposit` : undefined;
  const options = useMemo(() => {
    return {
      solana: [listTokenAvailableSOL[token.symbol as TAvailableToken]],
      ethereum: [listTokenAvailableETH[token.symbol as TAvailableToken]],
    };
  }, [token.symbol]);

  const optionByNetwork = useMemo(() => {
    return options[selectedNetwork as TNetwork];
  }, [selectedNetwork, options]);

  const collateral = useMemo(() => {
    return assetByTokenName?.[token.symbol]
      ? formatNumber(BN(assetByTokenName?.[token.symbol].depositedAmount).plus(Number(valueDeposit)))
      : '--';
  }, [assetByTokenName, token.symbol, valueDeposit]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = event.currentTarget;
    setAnchorEl(el);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
    const selectedTokenByNetwork = optionByNetwork.find((o) => o.symbol === token.symbol);
    if (!selectedTokenByNetwork) return;

    if (selectedNetwork.toLowerCase() === mapNameNetwork.solana.name.toLowerCase()) {
      const lendingContract = new LendingContractUniversal(wallet);
      hash = await lendingContract.deposit(Number(valueDeposit), selectedTokenByNetwork.address, listWallet?.universalWallet);
    } else {
      hash = await depositEVM({ depositAmount: valueDeposit, selectedToken: selectedTokenByNetwork.address });
    }
    setValueDeposit('');
    setValueInUSD('0');
    refetchBalance();
    refetchDepositValue();

    return hash;
  };

  const handleChangeNetworkInput = (network: TNetwork) => {
    setSelectedNetwork(network);
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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            mr: 2,
            p: '4px 10px',
            border: '1px solid #666662',
            borderRadius: '8px',
            gap: '8px',
            height: '47px',
            bgcolor: '#444443',
          }}
          aria-describedby={id}
          onClick={(e) => {
            handleClick(e);
          }}
        >
          <Stack sx={{ alignItems: 'center', gap: 1 }}>
            <Box sx={{ position: 'relative', top: '50%', transform: 'translateY(10%)' }}>
              <IconToken tokenName={token.symbol} sx={{ width: '36px', height: '36px' }} />
              <IconToken
                tokenName={selectedNetwork == 'solana' ? TokenName.SOL : TokenName.ETH}
                sx={{ position: 'absolute', right: '-6px', bottom: 6, width: '12px', height: '12px' }}
              />
            </Box>
            <Typography variant="body2">{token.symbol}</Typography>
          </Stack>
          <ArrowDropDown />
        </Box>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          sx={{
            mr: 2,
          }}
        >
          <Box sx={{ p: '16px 20px', bgcolor: '#303030', width: '400px', maxHeight: '420px', height: '100%' }}>
            <Typography sx={{ fontWeight: 700, color: '#FFFFFF', overflowY: 'hidden' }}>Select a network</Typography>
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                mt: 1,
                '& .selectedNetwork': {
                  border: '1px solid',
                  borderimage: 'linear-gradient(to right, #F2F9A5, #FEFFF3) 1',
                  color: '#FFFFFF',
                  bgcolor: '#444443',
                },
              }}
            >
              {Object.values(mapNameNetwork).map((item) => {
                return (
                  <Box
                    key={item.name}
                    sx={{
                      p: 2.5,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                    className={clsx({ selectedNetwork: selectedNetwork === item.id })}
                    onClick={() => {
                      handleChangeNetworkInput(item.id as TNetwork);
                    }}
                  >
                    {item.icon}
                    <Typography variant="body2" sx={{ fontWeight: 700, mt: 1 }}>
                      {item.name}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Popover>
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
