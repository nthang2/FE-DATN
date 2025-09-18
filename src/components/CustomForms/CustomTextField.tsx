import { TextField, TextFieldProps } from '@mui/material';
import { useRef } from 'react';
import { regexConfigValue } from 'src/utils';
import { TOptionValidate, validate } from 'src/utils/validateForm';

type TProp = TextFieldProps & {
  _onError?: (error: string | undefined) => void;
  rule?: TOptionValidate;
  inputType?: string;
};

const CustomTextField = (props: TProp) => {
  const { _onError, onChange, rule, inputType, ...rest } = props;
  const ref = useRef<string | undefined>(undefined);

  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (!onChange) return undefined;
    const inputValue = inputType === 'number' ? regexConfigValue(event.target.value) : event.target.value;

    if (rule) {
      const { error } = validate(inputValue, rule);
      ref.current = error[0];

      if (_onError) {
        _onError(error[0]);
      }
    }

    onChange({ ...event, target: { ...event.target, value: inputValue } });
  };

  return <TextField onChange={handleOnChange} helperText={ref.current} error={Boolean(ref.current)} autoComplete="off" {...rest} />;
};

export default CustomTextField;
