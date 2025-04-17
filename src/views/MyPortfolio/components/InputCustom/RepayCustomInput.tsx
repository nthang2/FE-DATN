import { Box, FormHelperText, MenuItem, Select, SelectProps, Skeleton, Stack, Typography } from '@mui/material';
import { Icon, TokenName } from 'crypto-token-icon';
import { ReactNode } from 'react';
import { findTokenInfoByToken, listTokenAvailable } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import useQueryAllTokensPrice from 'src/hooks/useQueryAllTokensPrice';
import { roundNumber } from 'src/utils/format';

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

export default function RepayCustomInput(props: Props) {
  const { subValue, readonly = false, onClickMax, loading, maxValue, endAdornment, inputProps, selectProps, error, selectOptions } = props;
  const { data: listPrice } = useQueryAllTokensPrice();

  const options = selectOptions ? selectOptions : Object.values(listTokenAvailable).map((item) => item.address);
  const inputValue = inputProps?.value ? roundNumber(Number(inputProps.value), 8) : undefined;

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
            disabled={readonly}
            sx={{
              border: '1px solid #666662',
              borderRadius: '8px',
              mr: 2,
              minWidth: '125px',
              ...selectProps?.sx,
            }}
            renderValue={(value) => {
              const tokenInfo = findTokenInfoByToken(value);

              return (
                <Stack sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                  <Icon tokenName={tokenInfo?.symbol as TokenName} sx={{ mr: 1 }} />
                  <Typography variant="body2">{tokenInfo?.symbol}</Typography>
                </Stack>
              );
            }}
            MenuProps={{
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'left',
              },
            }}
            {...selectProps}
          >
            {options.map((item) => {
              const tokenInfo = findTokenInfoByToken(item);
              const tokenPrice = listPrice?.[item];

              return (
                <MenuItem
                  value={item}
                  key={item}
                  sx={{
                    px: 2,
                  }}
                >
                  <Stack sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 3, width: '100%' }}>
                    <Stack>
                      <Icon tokenName={tokenInfo?.symbol as TokenName} sx={{ mr: 1 }} />
                      <Typography variant="body2">{tokenInfo?.symbol}</Typography>
                    </Stack>

                    <Stack direction="column" textAlign="right">
                      <Typography variant="body3" sx={{ color: 'text.secondary' }}>
                        Price
                      </Typography>
                      <Typography variant="body3">{tokenPrice?.price ? `$${roundNumber(tokenPrice.price, 6)}` : '-'}</Typography>
                    </Stack>
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
              <Typography variant="h5" sx={{ cursor: 'pointer', fontWeight: 600, color: '#FCFFD8', mr: 0.5 }} onClick={onClickMax}>
                Max
              </Typography>
            </Box>
          ) : null}

          {endAdornment}
        </Box>
      </Box>

      {error ? (
        <FormHelperText sx={{ px: 1, py: 0, minHeight: '20px' }} error>
          <Typography variant="body3">{error}</Typography>
        </FormHelperText>
      ) : null}
    </Box>
  );
}
