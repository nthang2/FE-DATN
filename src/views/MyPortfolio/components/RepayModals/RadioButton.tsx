import React from 'react';
import { Button, ButtonProps } from '@mui/material';
interface IProps extends ButtonProps {
  isSelected: boolean;
  label: string;
}

const RadioButton = (props: IProps) => {
  const { isSelected, sx, label, ...rest } = props;

  return (
    <Button variant={isSelected ? 'contained' : 'outlined'} sx={{ px: 5, ...sx }} {...rest}>
      {label}
    </Button>
  );
};

export default RadioButton;
