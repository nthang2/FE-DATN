import { Box, FormHelperText, MenuItem, Select, SelectProps, Skeleton, Stack, Typography } from '@mui/material';
import { ReactNode, useEffect, useReducer, useRef } from 'react';
import { NumericFormat } from 'react-number-format';
import { findTokenInfoByToken, listTokenAvailable } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import useQueryAllTokensPrice from 'src/hooks/useQueryAllTokensPrice';
import { TokenName } from 'src/libs/crypto-icons';
import { IconToken } from 'src/libs/crypto-icons/common/IconToken';
import { BN, regexConfigValue } from 'src/utils';
import { roundNumber } from 'src/utils/format';
import { TOptionValidate, validate } from 'src/utils/validateForm';

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
  rule?: TOptionValidate;
  _onError?: (error: string | undefined) => void;
  resetFlag?: boolean;
};

export default function RepayCustomInput(props: Props) {
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
    selectOptions,
    rule,
    _onError,
    resetFlag,
  } = props;
  const { data: listPrice } = useQueryAllTokensPrice();
  const ref = useRef<string | undefined>(undefined);
  const [, rerender] = useReducer((x) => x + 1, 0);

  const options = selectOptions ? selectOptions : Object.values(listTokenAvailable).map((item) => item.address);
  const inputValue = inputProps?.value ? roundNumber(Number(inputProps.value), 8) : '';
  const tokenPrice = listPrice?.[selectProps?.value || 0];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { defaultValue, ...restInputProps } = inputProps || {};

  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (!inputProps || !inputProps.onChange) return undefined;
    const inputValue = regexConfigValue(event.target.value);

    if (rule) {
      const { error } = validate(inputValue, rule);
      ref.current = error[0];

      if (_onError) {
        _onError(error[0]);
      }
    }

    inputProps.onChange({ ...event, target: { ...event.target, value: inputValue } } as React.ChangeEvent<HTMLInputElement>);
  };

  useEffect(() => {
    ref.current = undefined;
    rerender();
  }, [resetFlag]);

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
          borderColor: error || ref.current ? 'error.main' : '#666662',
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
              '& .MuiSelect-icon': {
                color: selectProps?.disabled ? 'transparent' : 'white',
              },
              ...selectProps?.sx,
            }}
            renderValue={(value) => {
              const tokenInfo = findTokenInfoByToken(value);

              return (
                <Stack sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                  <IconToken tokenName={tokenInfo?.symbol as TokenName} sx={{ mr: 1 }} />
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
                      <IconToken tokenName={tokenInfo?.symbol as TokenName} sx={{ mr: 1 }} />
                      <Typography variant="body2">{tokenInfo?.symbol}</Typography>
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
              <NumericFormat
                displayType="input"
                readOnly={readonly}
                {...restInputProps}
                type="text"
                value={inputValue}
                onChange={handleOnChange}
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
                  ~$
                  {BN(tokenPrice?.price)
                    .multipliedBy(inputValue || 0)
                    .toFixed(2)}
                </Typography>
              ) : null}
            </>
          )}
        </Box>
        <Box sx={{ alignItems: 'center', gap: 1.5, height: '100%', display: 'flex' }}>
          {maxValue ? (
            <Box>
              <Typography variant="h5" sx={{ cursor: 'pointer', fontWeight: 600, color: '#FFD8F0', mr: 0.5 }} onClick={onClickMax}>
                Max
              </Typography>
            </Box>
          ) : null}

          {endAdornment}
        </Box>
      </Box>

      <FormHelperText sx={{ px: 1, py: 1, minHeight: '20px' }} error hidden={!ref.current}>
        <Typography variant="body3">{ref.current}</Typography>
      </FormHelperText>
    </Box>
  );
}
