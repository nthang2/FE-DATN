export type TSortBuy = 'healthFactor' | 'collateralValue' | 'debtAmount';

export const filterLiquidationConfigs = {
  user: { value: 'user', label: 'User' },
  collateral: { value: 'collateral', label: 'Collateral' },
};

export const liquidationTableHead: Array<{ label: string; sort?: TSortBuy; width?: string }> = [
  { label: 'Rank' },
  { label: 'User', width: '200' },
  { label: 'Collateral' },
  { label: 'Collateral Amount' },
  { label: 'Collateral Value' },
  { label: 'Debt Amount', sort: 'debtAmount' },
  // { label: 'Collateral to Claim' },
  // { label: 'Repay Amount' },
  { label: 'Health Factor', sort: 'healthFactor' },
  { label: 'Liquidation price' },
  { label: 'Status', width: '112' },
];

export const checkStatus = (healthFactor: number) => {
  if (healthFactor < 1.2) {
    return { text: 'High risk', color: 'orange' };
  } else if (healthFactor < 1) {
    return { text: 'Ready for liquidation', color: 'red' };
  } else {
    return { text: '--', color: 'text.primary' };
  }
};
