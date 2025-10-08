export type TBorrowCrossItem = {
  address: string;
  value: string;
  price: number;
  error?: string;
  network: string;
};

export type TBorrowCrossFunctionName = 'setBorrowCrossState';
export type TDepositCrossFunctionName = 'setDepositCrossState' | 'addDepositCrossItem' | 'removeCrossItem';
