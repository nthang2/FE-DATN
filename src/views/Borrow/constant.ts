import { listTokenAvailable } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { TokenName } from 'src/libs/crypto-icons';

export const marks = [
  {
    value: 1,
  },
  {
    value: 35,
  },
];

export const labelMark = [
  {
    label: 'Conservative',
  },
  {
    label: 'Moderate',
  },
  {
    label: 'Aggressive',
  },
  {
    label: 'Liquidation',
  },
];

export const defaultBorrowValue = {
  address: Object.values(listTokenAvailable)[0]?.address as string,
  value: '0',
  price: 0,
};

export const liquidationThreshold = {
  [TokenName.MAX]: 0.35,
  [TokenName.USDC]: 0.98,
  [TokenName.ORAI]: 0.45,
  [TokenName.SOL]: 0.65,
  [TokenName.VIRTUAL]: 0.35,
  [TokenName.scORAI]: 0.45,
};

export const actionType = {
  DEPOSIT: 0,
  WITHDRAW: 1,
  MINT: 2,
  REPAY: 3,
};

export const ethFeeAmount = '0.000001';
