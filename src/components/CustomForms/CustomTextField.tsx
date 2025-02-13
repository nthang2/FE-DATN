import { TextField, TextFieldProps } from '@mui/material';
import { useRef } from 'react';
import { TOptionValidate, validate } from 'src/utils/validateForm';

type TProp = TextFieldProps & {
  onError?: (error: string | string[]) => void;
  rule?: TOptionValidate;
};

const CustomTextField = (props: TProp) => {
  const { onError, onChange, rule, ...rest } = props;
  const ref = useRef<string | undefined>(undefined);

  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (!onChange) return undefined;
    if (rule) {
      const { error } = validate(event.target.value, rule);
      ref.current = error[0];

      if (onError && error[0]) {
        onError(error[0]);
      }
    }

    onChange(event);
  };

  return <TextField onChange={handleOnChange} helperText={ref.current} error={Boolean(ref.current)} {...rest} />;
};

export default CustomTextField;
