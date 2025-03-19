import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import CustomTextField from 'src/components/CustomForms/CustomTextField';
import { useGlobalRpcState } from 'src/states/hooks';

const listOptionRpc = [
  { value: '1', label: 'Default' },
  { value: '0', label: 'Custom' },
];

const urlRegex = /[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/;

const ModalSettingAccount = () => {
  const [radioValue, setRadioValue] = useState('1');
  const [inputValue, setInputValue] = useState('');
  const [, setRpcState] = useGlobalRpcState();
  const [isValid, setIsValid] = useState(false);
  const inputRef = useRef<HTMLInputElement>();

  const handleChangeRadio = (_e: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setRadioValue(value);
  };

  const handleConfirmSetting = () => {
    setRpcState(inputValue);
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

      <Button onClick={handleConfirmSetting} variant="outlined" disabled={!isValid} sx={{ mt: 2 }}>
        Confirm
      </Button>
    </FormControl>
  );
};

export default ModalSettingAccount;
