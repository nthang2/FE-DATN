import { MenuItem, SelectProps, Stack, Typography } from '@mui/material';
import { CustomSelect } from 'src/components/General/CustomSelect/CustomSelect';
import { mapNameNetwork } from 'src/constants/network';
import { findTokenInfoByToken } from 'src/constants/tokens/mapNameToInfo';
import { IconToken } from 'src/libs/crypto-icons/common/IconToken';
import { TokenName } from 'src/libs/crypto-icons/types';

type IProps = SelectProps & {
  options: string[];
  readonly?: boolean;
  hideDropdownIcon?: boolean;
  network?: string;
};

const CustomSelectToken = ({ options, readonly, hideDropdownIcon, network, ...selectProps }: IProps) => {
  return (
    <CustomSelect
      disabled={readonly}
      sx={{
        border: '1px solid #666662',
        '& .MuiSvgIcon-root.Mui-disabled': {
          display: hideDropdownIcon ? 'none' : 'block',
        },
        bgcolor: 'transparent !important',
        height: '40px',
        borderRadius: '8px',
        '&:hover': {
          bgcolor: 'transparent',
        },
        ...selectProps?.sx,
      }}
      {...selectProps}
    >
      {options.map((item) => {
        const tokenInfo = findTokenInfoByToken(item, network || mapNameNetwork.solana.id);

        return (
          <MenuItem
            value={item}
            key={item}
            sx={{
              px: 2,
              '&:focus': {
                display: 'none',
              },
            }}
          >
            <Stack sx={{ alignItems: 'center' }}>
              <IconToken tokenName={tokenInfo?.symbol as TokenName} sx={{ mr: 1 }} />
              <Typography variant="body2">{tokenInfo?.symbol}</Typography>
            </Stack>
          </MenuItem>
        );
      })}
    </CustomSelect>
  );
};

export default CustomSelectToken;
