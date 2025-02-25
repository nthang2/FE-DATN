export type TSortBuy = 'healthFactor' | 'collateralValue' | 'debtAmount';

export const filterLiquidationConfigs = {
  user: { value: 'user', label: 'User' },
  collateral: { value: 'collateral', label: 'Collateral' },
};

export const liquidationTableHead: Array<{ label: string; sort?: TSortBuy }> = [
  { label: 'Rank' },
  { label: 'User' },
  { label: 'Collateral' },
  { label: 'Collateral Amount' },
  { label: 'Debt Amount', sort: 'debtAmount' },
  { label: 'Repay Amount' },
  { label: 'Collateral to Claim' },
  { label: 'Health Factor', sort: 'healthFactor' },
  { label: 'Status' },
];

export const checkStatus = (healthFactor: number) => {
  if (healthFactor < 1.2) {
    return 'High risk';
  } else if (healthFactor < 1) {
    return 'Ready for liquidation';
  } else {
    return '--';
  }
};
