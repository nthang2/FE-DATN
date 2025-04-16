export type TRepayForm = { repayInput: string; selectedToken: string };

export const defaultRepayFormValue = (collateralAddress: string): TRepayForm => ({
  repayInput: '0',
  selectedToken: collateralAddress,
});
