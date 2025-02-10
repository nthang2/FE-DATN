export type TBorrowItem = {
  address: string;
  value: string;
  price: number;
};

export type TBorrowFunctionName = 'setBorrowState';
export type TDepositFunctionName = 'setDepositState' | 'addDepositItem' | 'removeItem';
