import React from 'react';
import { ToggleButton, ToggleButtonGroup, ToggleButtonGroupProps } from '@mui/material';

export type IToggleButton = {
  value: string;
  label: string;
};

interface IProps extends Omit<ToggleButtonGroupProps, 'value'> {
  value: string;
  handleToggleChange(event: React.MouseEvent<HTMLElement>, newAlignment: string): void;
  data: IToggleButton[];
}

const ToggleButtonGroupCustom = (props: IProps) => {
  const { value, handleToggleChange, data, sx, ...rest } = props;

  return (
    <ToggleButtonGroup
      value={value}
      defaultValue={value}
      exclusive
      onChange={handleToggleChange}
      sx={{
        padding: '4px',
        height: 'auto',
        borderRadius: '12px',
        background: '#333331',
        color: 'white',
        '&.MuiTouchRipple-root': {
          display: 'none',
        },
        '&& .Mui-selected, && .Mui-selected:hover': {
          backgroundColor: '#595958',
          borderRadius: '12px',
          border: '1px solid #82827F',
          m: '2px',
        },
        '&& .MuiButtonBase-root:hover': {
          borderRadius: '12px',
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
          }}
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
