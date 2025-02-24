export const filterLiquidationConfigs = {
  user: { value: 'user', label: 'User' },
  collateral: { value: 'collateral', label: 'Collateral' },
};

export const liquidationTableHead = ['Rank', 'User', 'Collateral', 'Collateral Amount', 'Debt Amount', 'Health Factor', 'Status'];

export const checkStatus = (healthFactor: number) => {
  if (healthFactor < 1.2) {
    return 'High risk';
  } else if (healthFactor < 1) {
    return 'Ready for liquidation';
  } else {
    return '--';
  }
};
