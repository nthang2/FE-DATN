import { Select, SelectProps } from '@mui/material';

type IProps = SelectProps & {
  readonly?: boolean;
  hideDropdownIcon?: boolean;
  children?: React.ReactNode;
};

const CustomSelect = ({ readonly, hideDropdownIcon, children, MenuProps, ...selectProps }: IProps) => {
  return (
    <Select
      disabled={readonly}
      sx={{
        '& .MuiSvgIcon-root.Mui-disabled': {
          display: hideDropdownIcon ? 'none' : 'block',
        },
        height: '40px',
        borderRadius: '8px',
        ...selectProps?.sx,
      }}
      MenuProps={{
        sx: {
          '& .MuiMenuItem-root': {
            px: 2,
            '&:focus': {
              display: 'none',
            },
          },
          ...MenuProps?.sx,
        },
        ...MenuProps,
      }}
      {...selectProps}
    >
      {children}
    </Select>
  );
};

export default CustomSelect;
