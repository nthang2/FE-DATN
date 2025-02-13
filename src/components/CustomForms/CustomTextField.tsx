import { TextField, TextFieldProps } from '@mui/material';
import { useRef } from 'react';
import { TOptionValidate, validate } from 'src/utils/validateForm';

type TProp = TextFieldProps & {
  _onError?: (error: string | undefined) => void;
  rule?: TOptionValidate;
};

const CustomTextField = (props: TProp) => {
  const { _onError, onChange, rule, ...rest } = props;
  const ref = useRef<string | undefined>(undefined);

  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (!onChange) return undefined;
    if (rule) {
      const { error } = validate(event.target.value, rule);
      ref.current = error[0];

      if (_onError) {
        _onError(error[0]);
      }
    }

    onChange(event);
  };

  return <TextField onChange={handleOnChange} helperText={ref.current} error={Boolean(ref.current)} {...rest} />;
};

export default CustomTextField;
