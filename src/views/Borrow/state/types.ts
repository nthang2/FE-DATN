export type TBorrowItem = {
  address: string;
  value: string;
};

export type TBorrowState = {
  depositItems: TBorrowItem[];
  borrowItem: TBorrowItem;
  submitBorrow: boolean;
};

export type TBorrowFunctionName = 'setBorrowState';
export type TDepositFunctionName = 'setDepositState' | 'addDepositItem' | 'removeItem';
