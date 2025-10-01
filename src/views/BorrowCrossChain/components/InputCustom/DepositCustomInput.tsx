import { ArrowDropDown } from '@mui/icons-material';
import { Box, FormHelperText, Popover, Skeleton, Stack, Typography } from '@mui/material';
import clsx from 'clsx';
import { ReactNode, useState } from 'react';
import { mapNameNetwork } from 'src/constants/network';
import { listTokenAvailable as listTokenAvailableETH } from 'src/constants/tokens/evm-ecosystem/list-tokens/ethereum/mapNameToInfoEthereum';
import { listTokenAvailable as listTokenAvailableSOL } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { TokenName } from 'src/libs/crypto-icons';
import { IconToken } from 'src/libs/crypto-icons/common/IconToken';
import { formatAddress, formatNumber, roundNumber } from 'src/utils/format';
import { useDepositCrossState } from '../../state/hooks';

type Props = {
  subValue?: string | ReactNode;
  readonly?: boolean;
  onClickMax?: () => void;
  loading?: boolean;
  maxValue?: string | ReactNode;
  endAdornment?: ReactNode;
  inputProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
  selectProps?: { handleChangeSelect: (address: string) => void; value: string; disabled?: boolean };
  error?: string;
  selectOptions?: string[];
  hideDropdownIcon?: boolean;
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
  } = props;
  const [depositItems] = useDepositCrossState();

  const inputValue = inputProps?.value ? roundNumber(Number(inputProps.value), 8) : undefined;
  const options = {
    solana: Object.values(listTokenAvailableSOL),
    ethereum: Object.values(listTokenAvailableETH),
  };

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedNetwork, setSelectedNetwork] = useState<string>('solana');
  const [selectToken, setSelectToken] = useState(options[selectedNetwork as 'ethereum' | 'solana'][0]);
  console.log('🚀 ~ DepositCustomInput ~ selectToken:', selectToken);

  const handleClick = () => {
    const el = document.getElementById('popover_header');
    setAnchorEl(el);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const id = Boolean(anchorEl) ? 'popover_header' : undefined;

  return (
    <Box mb={1}>
      <Box
        id={'popover_header'}
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
              gap: '16px',
              height: '47px',
              bgcolor: '#444443',
            }}
            aria-describedby={id}
            onClick={() => {
              if (!(selectProps && selectProps.disabled)) {
                handleClick();
              }
            }}
          >
            {selectProps && selectProps.disabled ? (
              <Stack sx={{ alignItems: 'center' }}>
                <IconToken tokenName={TokenName.USDAI} sx={{ mr: 1 }} />
                <Typography variant="body2">USDAI</Typography>
              </Stack>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconToken tokenName={selectToken?.symbol as TokenName} />
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {selectToken?.symbol}
                </Typography>
                <Box sx={{ display: hideDropdownIcon ? 'none' : 'flex' }}>
                  <ArrowDropDown />
                </Box>
              </Box>
            )}
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
              border: '1px solid rgba(102, 102, 98, 1)',
              mr: 2,
            }}
          >
            <Box sx={{ p: '16px 20px', bgcolor: '#303030', width: '420px', maxHeight: '420px', height: '100%' }}>
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
                        setSelectedNetwork(item.id);
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
                {options[selectedNetwork as 'ethereum' | 'solana'].map((o) => {
                  const displayOption = !depositItems.find((deposit) => deposit.address === o.address);
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
                        setSelectToken(o);
                        selectProps?.handleChangeSelect(o.address);
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
                        <Typography sx={{ fontWeight: 600, color: '#FFFFFF' }}>0</Typography>
                        <Typography variant="caption2" sx={{ fontWeight: 600, color: '#FFFFFF' }}>
                          {formatNumber(o, { prefix: '$' })}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
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
