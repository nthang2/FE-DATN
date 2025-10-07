import { ArrowDropDown, SettingsOutlined } from '@mui/icons-material';
import { Box, Divider, FormHelperText, Popover, Stack, Typography } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { clsx } from 'clsx';
import { useMemo, useState } from 'react';
import CustomTextField from 'src/components/CustomForms/CustomTextField';
import ButtonLoading from 'src/components/General/ButtonLoading/ButtonLoading';
import ValueWithStatus from 'src/components/General/ValueWithStatus/ValueWithStatus';
import { mapNameNetwork } from 'src/constants/network';
import { listTokenAvailable as listTokenAvailableETH } from 'src/constants/tokens/evm-ecosystem/mapNameToInfoEthereum';
import { listTokenAvailableSOLUniversal as listTokenAvailableSOL } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { SolanaEcosystemTokenInfo } from 'src/constants/tokens/solana-ecosystem/SolanaEcosystemTokenInfo';
import { LendingContractUniversal } from 'src/contracts/solana/contracts/LendingContractUniversal/LendingContractUniversal';
import useBurnEVM from 'src/hooks/mutations/useBurnEVM';
import useAsyncExecute from 'src/hooks/useAsyncExecute';
import useQueryAllPriceByName from 'src/hooks/useQueryAllPriceByName';
import useQueryDepositValue from 'src/hooks/useQueryHook/queryMyPortfolio/useQueryDepositValue';
import useMyPortfolioUniversalInfo from 'src/hooks/useQueryHook/queryMyPortfolioUniversal/useMyPortfolioUniversal';
import { TokenName } from 'src/libs/crypto-icons';
import { IconToken } from 'src/libs/crypto-icons/common/IconToken';
import useGetBalanceUniversal from 'src/states/wallets/hooks/useGetBalanceUniversal';
// import useGetAllBalanceEVM from 'src/states/wallets/evm-blockchain/hooks/useGetAllBalanceEVM';
import useSummaryFirstActiveConnect from 'src/states/wallets/hooks/useSummaryFirstActiveConnect';
import { BN } from 'src/utils';
import { decimalFlood, formatAddress, formatNumber } from 'src/utils/format';
import useGetListWallet from 'src/views/UniversalWallet/hooks/useGetListWallet';
import CheckHealthFactor from './CheckHealthFactor';

type TNetwork = 'ethereum' | 'solana';

export default function RepayModal({ token }: { token: SolanaEcosystemTokenInfo }) {
  const wallet = useWallet();
  const { address, networkName, chainId } = useSummaryFirstActiveConnect();

  const { data: listWallet } = useGetListWallet(chainId, address);
  const { asyncExecute, loading } = useAsyncExecute();
  const { mutateAsync: asyncExecuteEVM } = useBurnEVM();
  const { refetch: refetchDepositValue } = useQueryDepositValue();
  const { status: statusMyPortfolioInfo, refetch: refetchMyPortfolioInfo, assetByTokenName } = useMyPortfolioUniversalInfo();
  const { balance } = useGetBalanceUniversal({ address, network: networkName });

  const [valueRepay, setValueRepay] = useState<string>('');
  const [valueInUSD, setValueInUSD] = useState<string>('0');
  const [valueRepayHelperText, setValueRepayHelperText] = useState<string | undefined>(undefined);
  const [selectedNetwork, setSelectedNetwork] = useState('solana');
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  // const { data: listBalanceEVM } = useGetAllBalanceEVM();
  const { data: listPrice } = useQueryAllPriceByName();

  const id = anchorEl ? `popover_redeem` : undefined;
  const options = useMemo(() => {
    return {
      solana: [listTokenAvailableSOL.USDAI],
      ethereum: [listTokenAvailableETH.USDAI],
    };
  }, []);

  const optionByNetwork = useMemo(() => {
    return options[selectedNetwork as TNetwork];
  }, [selectedNetwork, options]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = event.currentTarget;
    setAnchorEl(el);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const assetTokenInfo = useMemo(() => {
    return assetByTokenName?.[token.symbol];
  }, [assetByTokenName, token.symbol]);

  const maxValue = useMemo(() => {
    if (!assetTokenInfo || !balance) return '';
    const usdaiBalance = balance?.[TokenName.USDAI];
    if (usdaiBalance.lt(assetTokenInfo.usdaiToRedeem)) {
      return usdaiBalance.toString();
    }

    return assetTokenInfo.usdaiToRedeem.toString();
  }, [assetTokenInfo, balance]);

  const handleMax = () => {
    if (assetByTokenName?.[token.symbol] != undefined) {
      // setValueRepay(Number(maxValue).toFixed(token.decimals));
      setValueRepay(decimalFlood(maxValue, token.decimals));
      const _valueInUSD = BN(assetByTokenName?.[token.symbol]?.priceUSD).multipliedBy(maxValue).toString();
      setValueInUSD(_valueInUSD);
    }
  };

  const handleChangeValueDeposit = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValueRepay(e.target.value);
    const _valueInUSD = BN(e.target.value).toString();
    setValueInUSD(_valueInUSD);
  };

  const handleChangeNetworkInput = (network: string) => {
    setSelectedNetwork(network);
  };

  const handleRepay = async () => {
    if (!address) return;
    let hash = '';
    if (networkName === mapNameNetwork.solana.name) {
      const lendingContract = new LendingContractUniversal(wallet);
      const maxRepay = maxValue;
      const isMaxValue = Number(maxRepay) === Number(valueRepay);

      hash = await lendingContract.repay(Number(valueRepay), token.address, isMaxValue, listWallet?.universalWallet);
    } else {
      hash = await asyncExecuteEVM({ burnAmount: valueRepay, selectedToken: token.address });
    }
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
        <Typography variant="body2" sx={{ fontWeight: 500, color: 'info.main' }}>
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
              <IconToken tokenName={TokenName.USDAI} sx={{ width: '36px', height: '36px' }} />
              <IconToken
                tokenName={selectedNetwork == 'solana' ? TokenName.SOL : TokenName.ETH}
                sx={{ position: 'absolute', right: '-6px', bottom: 6, width: '12px', height: '12px' }}
              />
            </Box>
            <Typography variant="body2">USDAI</Typography>
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
                      handleChangeNetworkInput(item.id);
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
            <Box sx={{ mt: 2 }}>
              <Typography sx={{ color: '#FFFFFF', fontWeight: 700 }}>Select a token</Typography>
              {optionByNetwork.map((o) => {
                if (!o) return null;
                // const displayOption = optionByNetwork.length <= 1 ? true : !depositItems.find((deposit) => deposit.address === o.address);
                // const balance = selectedNetwork === 'ethereum' ? listBalanceEVM?.[o.symbol] : listBalanceSOL.data?.[o.symbol];
                const price = listPrice?.[o.symbol]?.price || 0;
                const valueInUsd = BN(balance || 0)
                  .times(BN(price))
                  .toString();

                return (
                  <Box
                    sx={{
                      borderBottom: '1px solid #565652',
                      '&:last-child': { border: 'none' },
                      padding: '4px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                    }}
                    key={o.address}
                    onClick={() => {
                      handleClose();
                    }}
                  >
                    <Stack>
                      {mapNameNetwork[selectedNetwork]?.icon}
                      <Box sx={{ ml: 1 }}>
                        <Typography sx={{ color: '#FFFFFF', fontWeight: 600 }}>{mapNameNetwork[selectedNetwork].name}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="caption2" sx={{ color: 'text.secondary' }}>
                            {o.symbol}
                          </Typography>
                          <Typography variant="caption2" sx={{ color: 'text.secondary' }}>
                            {formatAddress(o.address)}
                          </Typography>
                        </Box>
                      </Box>
                    </Stack>
                    <Box>
                      <Typography sx={{ fontWeight: 600, color: '#FFFFFF' }}>{balance?.toString() || 0}</Typography>
                      <Typography variant="caption2" sx={{ fontWeight: 600, color: '#FFFFFF' }}>
                        {formatNumber(valueInUsd, { prefix: '$' })}
                      </Typography>
                    </Box>
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
      <Typography variant="body2" sx={{ fontWeight: 500, color: 'info.main', mt: 3 }}>
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
          <Typography variant="body2" sx={{ color: 'info.main', minWidth: '100px' }}>
            Debt
          </Typography>
          <Box className="flex-center" sx={{ ml: 4 }}>
            <IconToken tokenName={TokenName.USDAI} sx={{ mr: 1 }} />
            <Box>
              <Typography sx={{ fontWeight: 600, ml: 1 }}>{formatNumber(BN(maxValue).minus(Number(valueRepay) || 0))}</Typography>
              <Typography variant="body3" sx={{ fontWeight: 600, ml: 1, color: 'info.main' }}>
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
          <Typography variant="body2" sx={{ color: 'info.main', minWidth: '100px' }}>
            Health factor:
          </Typography>
          <CheckHealthFactor token={token} depositAmount={'0'} mintAmount={`-${valueRepay || '0'}`} />
        </Box>
      </Box>
      <Box className="flex-space-between" sx={{ mt: 3 }}>
        <Typography variant="body2" sx={{ fontWeight: 500, color: 'info.main' }}>
          Action
        </Typography>
        <SettingsOutlined sx={{ color: 'info.main' }} />
      </Box>
      <Box className={clsx(['box', 'flex-space-between'])} sx={{ border: '#666662 solid 1px', position: 'relative' }}>
        <Box className="flex-center">
          <IconToken tokenName={TokenName.USDAI} />
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
