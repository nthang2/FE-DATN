import { mapNameToInfoSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';

export const marks = [
  {
    value: 37,
  },
  {
    value: 51,
  },
  {
    value: 80,
  },
  {
    value: 84,
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

export interface IDepositItem {
  address: string;
  value: string;
}

export const defaultBorrowValue = {
  address: mapNameToInfoSolana.TRUMP.address,
  value: '0',
};
