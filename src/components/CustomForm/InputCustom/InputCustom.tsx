import { Box, MenuItem, Select, SelectChangeEvent, Skeleton, Stack, Typography } from '@mui/material';
import { ReactNode, useState } from 'react';
import {
  findTokenInfoByToken,
  mapNameToInfoSolanaMainnet,
} from 'src/constants/tokens/solana-ecosystem/solana-mainnet/mapNameToInfoSolanaMainnet';

type Props = {
  value: string | null;
  onChange: (value: string) => void;
  subValue?: string | ReactNode;
  readonly?: boolean;
  onClickMax?: () => void;
  loading?: boolean;
  selected?: boolean;
  maxValue?: string | ReactNode;
  endAdornment?: ReactNode;
};

export default function InputCustom({
  value,
  onChange,
  subValue,
  readonly = false,
  onClickMax,
  loading,
  selected,
  maxValue,
  endAdornment,
}: Props) {
  const [select, setSelect] = useState(value || '');

  const options = Object.values(mapNameToInfoSolanaMainnet).map((item) => item.address);

  // handle select
  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelect(event.target.value);
  };

  return (
    <Box
      sx={(theme) => ({
        position: 'relative',
        display: 'flex',
        py: 2,
        px: { xs: 1, md: 2.5 },
        justifyContent: 'space-between',
        width: '100%',
        height: '83px',
        marginBottom: '16px',
        placeItems: 'center',
        bgcolor: theme.palette.background.secondary,
        borderRadius: '16px',
        border: '1px solid #666662',
        color: '#fff',
      })}
    >
      {selected && (
        <Select
          id="demo-select"
          value={select}
          onChange={(e) => handleChange(e)}
          sx={{
            border: '1px solid #666662',
          }}
          disabled={readonly}
        >
          {options.map((item) => (
            <MenuItem value={item} key={item} sx={{ px: 2 }}>
              <Stack>{findTokenInfoByToken(item)?.symbol}</Stack>
            </MenuItem>
          ))}
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
              }}
              type="number"
              value={value ? findTokenInfoByToken(value)?.symbol : ''}
              onChange={(e) => {
                onChange(e.target.value);
              }}
              onWheel={(event) => event.currentTarget.blur()}
            />
            {subValue ? (
              <Typography variant="subtitle1" sx={{ fontWeight: 400 }}>
                {subValue}
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
