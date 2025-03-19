import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import CustomTextField from 'src/components/CustomForms/CustomTextField';
import { defaultRpc } from 'src/constants';
import { useGlobalRpcState } from 'src/states/hooks';

type TypeListRpc = {
  value: string;
  label: string;
  rpc?: string;
};

const listOptionRpc: TypeListRpc[] = [
  { value: '1', label: 'Default', rpc: defaultRpc },
  { value: '0', label: 'Custom' },
];

const urlRegex = /[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/;

const ModalSettingAccount = () => {
  const [rpcState, setRpcState] = useGlobalRpcState();
  const [radioValue, setRadioValue] = useState(rpcState === defaultRpc ? '1' : '0');
  const [inputValue, setInputValue] = useState(rpcState === defaultRpc ? '' : rpcState);
  const [isValid, setIsValid] = useState(false);
  const inputRef = useRef<HTMLInputElement>();

  const handleChangeRadio = (_e: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setRadioValue(value);
  };

  const handleConfirmSetting = () => {
    if (radioValue === '0') {
      setRpcState(inputValue);
    } else {
      const optionRpc = listOptionRpc.find((item) => item.value === radioValue);
      setRpcState(optionRpc?.rpc || defaultRpc);
    }

    location.reload();
  };

  useEffect(() => {
    if (radioValue === '0' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [radioValue]);

  return (
    <FormControl sx={{ width: '100%' }}>
      <FormLabel id="setting-rpc-custom">
        <Typography sx={{ mb: 2 }} color="#fff">
          RPC End Point
        </Typography>
      </FormLabel>
      <RadioGroup name="radio-buttons-group" sx={{ mb: 1 }} value={radioValue} onChange={handleChangeRadio}>
        {listOptionRpc.map((option) => (
          <FormControlLabel
            value={option.value}
            sx={{
              opacity: radioValue === option.value ? 1 : 0.6,
            }}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>

      <CustomTextField
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={radioValue !== '0'}
        inputRef={inputRef}
        variant="outlined"
        rule={{
          validate: (value) => {
            if (urlRegex.test(value.toString())) {
              return undefined;
            }

            return 'Please enter valid url';
          },
        }}
        _onError={(error) => (error ? setIsValid(false) : setIsValid(true))}
      />

      <Button onClick={handleConfirmSetting} variant="outlined" disabled={radioValue === '0' && !isValid} sx={{ mt: 2 }}>
        Confirm
      </Button>
    </FormControl>
  );
};

export default ModalSettingAccount;
