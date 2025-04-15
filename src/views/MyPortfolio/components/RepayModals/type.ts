export type TRepayForm = { repayInput: string; collateralInput: string; selectedToken: string };

export const defaultRepayFormValue = (collateralAddress: string): TRepayForm => ({
  repayInput: '0',
  collateralInput: '0',
  selectedToken: collateralAddress,
});
