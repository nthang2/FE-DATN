export type TValidateCase = {
  min: (param: { min: number; message?: string }) => string | undefined;
  max: (param: { max: number; message?: string }) => string | undefined;
};

export type TOptionValidate = Partial<{
  min: { min: number; message?: string };
  max: { max: number; message?: string };
  validate: (value: string | number) => string | undefined;
}>;

export const validate = (value: string | number, rule: TOptionValidate) => {
  const validateFunc = {
    min: ({ min, message }) => {
      const errMessage = message || `Input value must greater than ${min}`;
      return Number(value) < min ? errMessage : undefined;
    },
    max: ({ max, message }) => {
      const errMessage = message || `Input value must smaller than ${max}`;
      return Number(value) > max ? errMessage : undefined;
    },
  } as TValidateCase;

  const result: (string | undefined)[] = [];

  for (const [key, validateItem] of Object.entries(rule)) {
    if (typeof validateItem === 'function') {
      result.push(validateItem(value));
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const status = validateFunc[key as keyof TValidateCase](validateItem as any);
      result.push(status);
    }
  }

  const isError = result.every((item) => Boolean(item));

  return { isError: isError, error: result };
};
