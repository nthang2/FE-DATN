import { ArrowDropDown } from '@mui/icons-material';
import { Box, FormHelperText, Popover, Skeleton, Stack, Typography } from '@mui/material';
import clsx from 'clsx';
import { ReactNode, useCallback, useMemo, useState } from 'react';
import { mapNameNetwork } from 'src/constants/network';
import { listTokenAvailable as listTokenAvailableETH } from 'src/constants/tokens/evm-ecosystem/mapNameToInfoEthereum';
import { listTokenAvailableSOLUniversal as listTokenAvailableSOL } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import useQueryAllPriceByName from 'src/hooks/useQueryAllPriceByName';
import { TokenName } from 'src/libs/crypto-icons';
import { IconToken } from 'src/libs/crypto-icons/common/IconToken';
import useGetAllBalanceEVM from 'src/states/wallets/evm-blockchain/hooks/useGetAllBalanceEVM';
import useFetchAllSolTokenBalances from 'src/states/wallets/solana-blockchain/hooks/useFetchAllSolTokenBalances';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';
import { BN } from 'src/utils';
import { formatAddress, formatNumber, roundNumber } from 'src/utils/format';
import { useDepositCrossState } from '../../state/hooks';

type TNetwork = 'ethereum' | 'solana';

type Props = {
  subValue?: string | ReactNode;
  readonly?: boolean;
  onClickMax?: () => void;
  loading?: boolean;
  maxValue?: string | ReactNode;
  endAdornment?: ReactNode;
  inputProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
  selectProps?: { handleChangeSelect?: (address: string) => void; value: string; disabled?: boolean };
  error?: string;
  selectOptions?: string[];
  hideDropdownIcon?: boolean;
  handleChangeNetwork?: (network: string) => void;
};

export default function DepositCustomInput(props: Props) {
  const {
    subValue,
    readonly = false,
    onClickMax,
    loading,
    maxValue,
    endAdornment,
    inputProps,
    selectProps,
    error,
    hideDropdownIcon,
    handleChangeNetwork,
  } = props;
  const [depositItems] = useDepositCrossState();
  const [selectedNetwork, setSelectedNetwork] = useState('solana');
  const { address: solanaAddress } = useSummarySolanaConnect();
  const { data: listBalanceEVM } = useGetAllBalanceEVM();
  const { allSlpTokenBalances: listBalanceSOL } = useFetchAllSolTokenBalances(solanaAddress);
  const { data: listPrice } = useQueryAllPriceByName();

  const inputValue = inputProps?.value ? roundNumber(Number(inputProps.value), 8) : undefined;
  const options = useCallback(() => {
    if (hideDropdownIcon) {
      return {
        solana: [listTokenAvailableSOL.USDAI],
        ethereum: [listTokenAvailableETH.USDAI],
      };
    }

    return {
      //remove USDAI from the list when is it deposit input
      solana: Object.values(listTokenAvailableSOL).filter((token) => token.address !== listTokenAvailableSOL.USDAI.address),
      ethereum: Object.values(listTokenAvailableETH).filter((token) => token.address !== listTokenAvailableETH.USDAI.address),
    };
  }, [hideDropdownIcon]);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectToken, setSelectToken] = useState(options()[selectedNetwork as TNetwork][0]);
  const id = anchorEl ? `${hideDropdownIcon}_popover_header` : undefined;

  const optionByNetwork = useMemo(() => {
    const allOptions = options()[selectedNetwork as TNetwork];
    const result = allOptions.filter((item) => {
      return !depositItems.some((option) => option.address === item.address);
    });

    return result;
  }, [options, selectedNetwork, depositItems]);

  const handleClick = () => {
    const el = document.getElementById(`${hideDropdownIcon}_popover_header`);
    setAnchorEl(el);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeNetworkInput = (network: string) => {
    setSelectedNetwork(network);

    const newOptions = options()[network as TNetwork];
    const token = newOptions[0];
    setSelectToken(token);
    if (selectProps?.handleChangeSelect) {
      selectProps?.handleChangeSelect(token.address);
    }
    if (handleChangeNetwork) {
      handleChangeNetwork(network);
    }
  };

  return (
    <Box mb={1}>
      <Box
        id={`${hideDropdownIcon}_popover_header`}
        sx={{
          position: 'relative',
          display: 'flex',
          py: 2,
          px: { xs: 1, md: 2.5 },
          height: '83px',
          placeItems: 'center',
          bgcolor: 'background.secondary',
          borderRadius: '16px',
          border: `1px solid`,
          borderColor: error ? 'error.main' : '#666662',
          color: '#fff',
        }}
      >
        {Boolean(selectProps) && (
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
            onClick={() => {
              handleClick();
            }}
          >
            {selectProps && selectProps.disabled ? (
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
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ position: 'relative', top: '50%', transform: 'translateY(10%)' }}>
                  <IconToken tokenName={selectToken?.symbol as TokenName} sx={{ width: '36px', height: '36px' }} />
                  <IconToken
                    tokenName={selectedNetwork == 'solana' ? TokenName.SOL : TokenName.ETH}
                    sx={{ position: 'absolute', right: '-6px', bottom: 6, width: '12px', height: '12px' }}
                  />
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {selectToken?.symbol}
                </Typography>
              </Box>
            )}
            <ArrowDropDown />
          </Box>
        )}
        {
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
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
              {!(selectProps && selectProps.disabled) && (
                <Box sx={{ mt: 2 }}>
                  <Typography sx={{ color: '#FFFFFF', fontWeight: 700 }}>Select a token</Typography>
                  {optionByNetwork?.map((o) => {
                    if (!o) return null;
                    const displayOption =
                      optionByNetwork.length <= 1 ? true : !depositItems.find((deposit) => deposit.address === o.address);
                    const balance = selectedNetwork === 'ethereum' ? listBalanceEVM?.[o.symbol] : listBalanceSOL.data?.[o.symbol];
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
                          display: displayOption ? 'flex' : 'none',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer',
                        }}
                        key={o.address}
                        onClick={() => {
                          if (selectProps?.handleChangeSelect) {
                            setSelectToken(o);
                            selectProps?.handleChangeSelect(o.address);
                            handleClose();
                          }
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
              )}
            </Box>
          </Popover>
        }
        <Box sx={{ width: '-webkit-fill-available' }}>
          {loading ? (
            <Skeleton
              variant="rounded"
              width={'50%'}
              height={'40px'}
              sx={{
                marginX: '20px',
              }}
            />
          ) : (
            <>
              <input
                readOnly={readonly}
                type="number"
                {...inputProps}
                value={inputValue}
                style={{
                  display: 'block',
                  border: 'none',
                  outline: 'none',
                  background: 'none',
                  fontSize: '24px',
                  fontFamily: 'inherit',
                  fontWeight: '700',
                  width: '100%',
                  color: '#fff',
                  ...inputProps?.style,
                }}
              />
              {subValue ? (
                <Typography variant="body3" sx={{ color: 'text.secondary' }}>
                  ${roundNumber(Number(subValue), 6)}
                </Typography>
              ) : null}
            </>
          )}
        </Box>
        <Box sx={{ alignItems: 'center', gap: 1.5, height: '100%', display: 'flex' }}>
          {maxValue ? (
            <Box>
              <Typography variant="h5" sx={{ cursor: 'pointer', fontWeight: 400 }} onClick={onClickMax}>
                Max
              </Typography>
              <Typography variant="body3">{maxValue}</Typography>
            </Box>
          ) : null}

          {endAdornment}
        </Box>
      </Box>
      <FormHelperText sx={{ px: 1, py: 0, minHeight: '20px' }} error>
        <Typography variant="body3">{error}</Typography>
      </FormHelperText>
    </Box>
  );
}
