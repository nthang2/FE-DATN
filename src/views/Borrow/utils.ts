import { findTokenInfoByToken } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { TPriceList } from 'src/services/HandleApi/getPriceToken/getPriceToken';

export const convertToUsd = (address: string, value: string, listPrice?: TPriceList) => {
  const tokenInfo = findTokenInfoByToken(address);
  if (!tokenInfo || !listPrice) return 0;
  const tokenPrice = listPrice[tokenInfo.symbol].price || 1;

  return Number(value) * tokenPrice;
};

export const validateDepositItem = (value: number) => {
  let error;
  if (Number(value) <= 0) {
    error = 'Deposit value must greater than 0';
  }

  return error;
};
