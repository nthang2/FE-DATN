import { Box, MenuItem, Select, SelectProps, Skeleton, Stack, Typography } from '@mui/material';
import { Icon, TokenName } from 'crypto-token-icon';
import { ReactNode } from 'react';
import { findTokenInfoByToken, mapNameToInfoSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';

type Props = {
  subValue?: string | ReactNode;
  readonly?: boolean;
  onClickMax?: () => void;
  loading?: boolean;
  maxValue?: string | ReactNode;
  endAdornment?: ReactNode;
  inputProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
  selectProps?: SelectProps<string>;
};

export default function BorrowCustomInput(props: Props) {
  const { subValue, readonly = false, onClickMax, loading, maxValue, endAdornment, inputProps, selectProps } = props;
  const options = Object.values(mapNameToInfoSolana).map((item) => item.address);

  return (
    <Box
      sx={(theme) => ({
        position: 'relative',
        display: 'flex',
        py: 2,
        px: { xs: 1, md: 2.5 },
        height: '83px',
        marginBottom: '16px',
        placeItems: 'center',
        bgcolor: theme.palette.background.secondary,
        borderRadius: '16px',
        border: '1px solid #666662',
        color: '#fff',
      })}
    >
      {Boolean(selectProps) && (
        <Select
          id="demo-select"
          {...selectProps}
          disabled={readonly}
          sx={{
            border: '1px solid #666662',
            mr: 2,
            ...selectProps?.sx,
          }}
        >
          {options.map((item) => {
            const tokenInfo = findTokenInfoByToken(item);

            return (
              <MenuItem value={item} key={item} sx={{ px: 2 }}>
                <Stack>
                  <Icon tokenName={tokenInfo?.symbol as TokenName} sx={{ mr: 1 }} />
                  {tokenInfo?.symbol}
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
              onWheel={(event) => event.currentTarget.blur()}
              {...inputProps}
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
                ${subValue}
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
  );
}
