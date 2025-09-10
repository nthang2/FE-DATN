import React from 'react';
import { ToggleButton, ToggleButtonGroup, ToggleButtonGroupProps, ToggleButtonProps, useTheme } from '@mui/material';

export type IToggleButton = {
  value: string;
  label: string | React.ReactNode;
};

interface IProps extends Omit<ToggleButtonGroupProps, 'value'> {
  value: string;
  handleToggleChange(event: React.MouseEvent<HTMLElement>, newAlignment: string): void;
  data: IToggleButton[];
  toggleBtnProps?: Omit<ToggleButtonProps, 'value'>;
}

const ToggleButtonGroupCustom = (props: IProps) => {
  const { value, handleToggleChange, data, sx, toggleBtnProps = {} as ToggleButtonProps, ...rest } = props;
  const { sx: sxBtn, ...btnProps } = toggleBtnProps;

  const theme = useTheme();

  return (
    <ToggleButtonGroup
      color="primary"
      value={value}
      defaultValue={value}
      exclusive
      onChange={handleToggleChange}
      aria-label="Platform"
      sx={{
        p: 0.5,
        borderRadius: '24px',
        background: theme.palette.background.secondary,
        '&.MuiTouchRipple-root': {
          display: 'none',
        },
        '&& .Mui-selected, && .Mui-selected:hover': {
          color: 'white',
          borderRadius: '24px',
          bgcolor: theme.palette.action.focus,
          // border: '1px solid',
          // borderColor: theme.palette.primary.main,
        },
        '& .MuiButtonBase-root': {
          paddingX: 2.5,
          paddingY: 0.5,
          lineHeight: 'normal',
        },
        ...sx,
      }}
      {...rest}
    >
      {data.map((item) => (
        <ToggleButton
          sx={{
            padding: '6px 16px',
            borderRadius: '24px',
            border: 'none',
            height: 'auto',
            '&.MuiTouchRipple-root': {
              display: 'none',
            },
            ...sxBtn,
          }}
          {...btnProps}
          value={item.value}
          key={item.value}
        >
          {item.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default ToggleButtonGroupCustom;
