export type TBorrowItem = {
  address: string;
  value: string;
  price: number;
  error?: string;
};

export type TBorrowFunctionName = 'setBorrowState';
export type TDepositFunctionName = 'setDepositState' | 'addDepositItem' | 'removeItem';
