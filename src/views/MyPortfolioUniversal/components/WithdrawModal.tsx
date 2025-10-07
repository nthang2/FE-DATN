import { ArrowDropDown, SettingsOutlined } from '@mui/icons-material';
import { Box, Divider, FormHelperText, Popover, Stack, Typography } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { clsx } from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import CustomTextField from 'src/components/CustomForms/CustomTextField';
import ButtonLoading from 'src/components/General/ButtonLoading/ButtonLoading';
import ValueWithStatus from 'src/components/General/ValueWithStatus/ValueWithStatus';
import { mapNameChainId } from 'src/constants/chainId';
import { mapNameNetwork } from 'src/constants/network';
import { EthereumChainTokenInfo } from 'src/constants/tokens/evm-ecosystem/list-tokens/ethereum/EthereumChainTokenInfo';
import { SolanaEcosystemTokenInfo } from 'src/constants/tokens/solana-ecosystem/SolanaEcosystemTokenInfo';
import { LendingContractUniversal } from 'src/contracts/solana/contracts/LendingContractUniversal/LendingContractUniversal';
import useWithdrawEVM from 'src/hooks/mutations/useWithdrawEVM';
import useAsyncExecute from 'src/hooks/useAsyncExecute';
import useGetTotalDepositedUniversal from 'src/hooks/useContract/useGetLiquidityWithdrawCap';
import useQueryAllTokensPrice from 'src/hooks/useQueryAllTokensPrice';
import useQueryDepositValue from 'src/hooks/useQueryHook/queryMyPortfolio/useQueryDepositValue';
import useMyPortfolioUniversalInfo from 'src/hooks/useQueryHook/queryMyPortfolioUniversal/useMyPortfolioUniversal';
import { TokenName } from 'src/libs/crypto-icons';
import { IconToken } from 'src/libs/crypto-icons/common/IconToken';
import useGetBalanceUniversalByToken from 'src/states/wallets/hooks/useGetBalanceUniversalByToken';
import useSummaryFirstActiveConnect from 'src/states/wallets/hooks/useSummaryFirstActiveConnect';
import { BN } from 'src/utils';
import { decimalFlood, formatNumber } from 'src/utils/format';
import useGetListWallet from 'src/views/UniversalWallet/hooks/useGetListWallet';
import { TNetwork } from '../type';
import CheckHealthFactor from './CheckHealthFactor';

export default function WithdrawModal({ token }: { token: SolanaEcosystemTokenInfo | EthereumChainTokenInfo }) {
  const wallet = useWallet();
  const { address, networkName, chainId } = useSummaryFirstActiveConnect();
  const { mutateAsync: withdrawEVM } = useWithdrawEVM();
  const { data: listWallet } = useGetListWallet(chainId, address);
  const { data: tokensPrice, status: statusQueryAllTokensPrice } = useQueryAllTokensPrice();
  const { asyncExecute, loading } = useAsyncExecute();
  const { balance, refetch: refetchBalance } = useGetBalanceUniversalByToken({
    address,
    network: networkName,
    token: token.symbol as TokenName,
  });
  const { asset, status: statusMyPortfolioInfo, refetch: refetchMyPortfolioInfo, assetByTokenName } = useMyPortfolioUniversalInfo();
  const { refetch: refetchDepositedValue } = useQueryDepositValue();
  const { data: totalDeposited } = useGetTotalDepositedUniversal({ chainId: Number(chainId), tokenName: token.symbol });

  const [valueWithdraw, setValueWithdraw] = useState<string>('');
  const [valueInUSD, setValueInUSD] = useState<string>('0');
  const [valueWithdrawHelperText, setValueWithdrawHelperText] = useState<string | undefined>(undefined);
  const [selectedNetwork, setSelectedNetwork] = useState<TNetwork>('solana');
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const collateral = useMemo(() => {
    return assetByTokenName?.[token.symbol]
      ? formatNumber(BN(assetByTokenName?.[token.symbol].depositedAmount).minus(Number(valueWithdraw)))
      : '--';
  }, [assetByTokenName, token.symbol, valueWithdraw]);

  const handleChangeValueWithdraw = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValueWithdraw(e.target.value);
    if (!tokensPrice) return;
    const _valueInUSD = BN(e.target.value).times(BN(tokensPrice[token.address].price)).toString();
    setValueInUSD(_valueInUSD);
  };

  const maxValue = useMemo(() => {
    if (!assetByTokenName?.[token.symbol]) return '';
    return assetByTokenName?.[token.symbol]?.maxWithdrawable.toString();
  }, [assetByTokenName, token.symbol]);

  const id = anchorEl ? `popover_withdraw` : undefined;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = event.currentTarget;
    setAnchorEl(el);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeNetworkInput = (network: TNetwork) => {
    setSelectedNetwork(network);
  };

  const handleMax = () => {
    if (asset) {
      setValueWithdraw(Number(maxValue).toFixed(token.decimals));
      if (!tokensPrice) return;
      const _valueInUSD = BN(maxValue).times(BN(tokensPrice[token.address].price)).toString();
      setValueInUSD(_valueInUSD);
    }
  };

  const handleWithdraw = async () => {
    if (!address) return;
    let hash = '';
    if (networkName === mapNameNetwork.solana.name) {
      const lendingContract = new LendingContractUniversal(wallet);
      const depositoryVault = await lendingContract.getDepositoryVault(token.address);
      const loanAccount = await lendingContract.getLoan(token.address);

      if (BN(loanAccount.collateralAmount).isGreaterThan(depositoryVault.amount.toString())) {
        toast.error('Protocol has insufficient funds');
        return;
      }

      hash = await lendingContract.withdraw(Number(valueWithdraw), token.address, listWallet?.universalWallet);
    } else {
      hash = await withdrawEVM({ withdrawAmount: valueWithdraw, selectedToken: token.address });
    }
    setValueWithdraw('');
    setValueInUSD('0');
    refetchBalance();
    refetchDepositedValue();
    refetchMyPortfolioInfo();

    return hash;
  };

  useEffect(() => {
    if (totalDeposited && chainId) {
      if (BN(totalDeposited.deposited.toString()).isLessThan(BN(valueWithdraw))) {
        setValueWithdrawHelperText(`Not enough liquidity to withdraw on chain ${mapNameChainId[chainId]}`);
      }
    }
  }, [chainId, totalDeposited, valueWithdraw]);

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
                {formatNumber(BN(collateral).times(BN(tokensPrice?.[token.address]?.price || 0)), { fractionDigits: 4, prefix: '$' })}
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
            <CheckHealthFactor token={token} depositAmount={`-${valueWithdraw || '0'}`} mintAmount={`0`} />
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
