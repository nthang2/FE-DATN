import { Box, FormHelperText, MenuItem, Select, SelectProps, Skeleton, Stack, Typography } from '@mui/material';
import { Icon, TokenName } from 'crypto-token-icon';
import { ReactNode } from 'react';
import { findTokenInfoByToken, listTokenAvailable } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { roundNumber } from 'src/utils/format';
import { useDepositState } from '../../state/hooks';

type Props = {
  subValue?: string | ReactNode;
  readonly?: boolean;
  onClickMax?: () => void;
  loading?: boolean;
  maxValue?: string | ReactNode;
  endAdornment?: ReactNode;
  inputProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
  selectProps?: SelectProps<string>;
  error?: string;
  selectOptions?: string[];
};

export default function DepositCustomInput(props: Props) {
  const { subValue, readonly = false, onClickMax, loading, maxValue, endAdornment, inputProps, selectProps, error } = props;
  const [depositItems] = useDepositState();

  const options = Object.values(listTokenAvailable).map((item) => item.address);
  const inputValue = inputProps?.value ? roundNumber(Number(inputProps.value), 3) : undefined;

  return (
    <Box mb={1}>
      <Box
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
          <Select
            id="demo-select"
            disabled={readonly}
            sx={{
              border: '1px solid #666662',
              mr: 2,
              ...selectProps?.sx,
            }}
            {...selectProps}
          >
            {options.map((item) => {
              const tokenInfo = findTokenInfoByToken(item);
              const displayOption = !depositItems.find((deposit) => deposit.address === item);

              return (
                <MenuItem
                  value={item}
                  key={item}
                  sx={{
                    px: 2,
                    display: displayOption ? 'flex' : 'none',
                  }}
                >
                  <Stack sx={{ alignItems: 'center' }}>
                    <Icon tokenName={tokenInfo?.symbol as TokenName} sx={{ mr: 1 }} />
                    <Typography variant="body2">{tokenInfo?.symbol}</Typography>
                  </Stack>
                </MenuItem>
              );
            })}
          </Select>
        )}
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
