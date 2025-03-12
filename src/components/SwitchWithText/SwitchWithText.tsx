import { Switch, SwitchProps } from '@mui/material';

interface IProps extends SwitchProps {
  checkedText: string;
  uncheckedText: string;
}

export default function SwitchWithText(props: IProps) {
  const { checkedText, uncheckedText, sx, ...rest } = props;

  return (
    <div>
      <Switch
        sx={{
          '.MuiSwitch-root': {
            width: '250px',
            height: '24px',
            padding: '0px',
          },
          '.MuiSwitch-switchBase': {
            color: '#818181',
            padding: '1px',
            '&$checked': {
              '& + $track': {
                backgroundColor: 'primary.light',
              },
            },
          },
          '.MuiSwitch-thumb': {
            color: 'white',
            width: '50px',
            height: '20px',
            margin: '1px',
          },
          '.MuiSwitch-track': {
            borderRadius: '20px',
            backgroundColor: '#818181',
            opacity: '1 !important',
            '&:after, &:before': {
              color: 'white',
              fontSize: '11px',
              position: 'absolute',
              top: '6px',
            },
            '&:after': {
              content: `'${checkedText}'`,
              left: '8px',
            },
            '&:before': {
              content: `'${uncheckedText}'`,
              right: '7px',
            },
          },
          '.Mui-checked': {
            color: 'primary.light !important',
            transform: 'translateX(26px) !important',
          },
          ...sx,
        }}
        {...rest}
      />
    </div>
  );
}
