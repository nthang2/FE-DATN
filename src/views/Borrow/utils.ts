import { findTokenInfoByToken } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { TPriceList } from 'src/services/HandleApi/getPriceToken/getPriceToken';

export const convertToUsd = (address: string, value: string, listPrice?: TPriceList) => {
  const tokenInfo = findTokenInfoByToken(address);
  if (!tokenInfo || !listPrice) return 0;
  const tokenPrice = listPrice?.[address]?.price || 1;

  return Number(value) * tokenPrice;
};

export const convertToAmountToken = (address: string, value: string, listPrice?: TPriceList) => {
  const tokenInfo = findTokenInfoByToken(address);
  if (!tokenInfo || !listPrice) return 0;
  const tokenPrice = listPrice[address]?.price || 1;

  return Number(value) / tokenPrice;
};

export const validateDepositItem = (value: number, balance?: number) => {
  let error;
  if (value > Number(balance || 0)) {
    error = 'Not enough balance to deposit';
  }

  return error;
};

export const validateBorrowItem = (value: number, borrowPercent: number, maxLtv: number) => {
  let error;
  if (value === 0) return error;
  if (Number(value) <= 0) {
    error = 'Deposit value must greater than 0';
  }

  if (borrowPercent > maxLtv) {
    error = 'Not enough collateral to borrow this amount';
  }

  return error;
};
