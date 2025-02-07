import { Address } from 'src/constants';

export type TokenPriceInfo = {
  address: Address;
  type: string;
  name: string;
  price: number;
  decimals: number;
};
