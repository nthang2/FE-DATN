import { TokenName } from 'crypto-token-icon';
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
  address: mapNameToInfoSolana.TRUMP.address,
  value: '0',
  price: 0,
};

export const optionSelectValue = {
  [TokenName.TRUMP]: mapNameToInfoSolana[TokenName.TRUMP],
  [TokenName.MAX]: mapNameToInfoSolana[TokenName.MAX],
  [TokenName.AI16Z]: mapNameToInfoSolana[TokenName.AI16Z],
};
