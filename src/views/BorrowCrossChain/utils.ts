import { findTokenInfoByToken as findTokenInfoByToken } from 'src/constants/tokens/mapNameToInfo';
import { TPriceList } from 'src/services/HandleApi/getPriceToken/getPriceToken';
import { parseSignature, parseCompactSignature, compactSignatureToSignature } from 'viem';

export const convertToUsd = (address: string, value: string, network: string, listPrice?: TPriceList) => {
  const tokenInfo = findTokenInfoByToken(address, network);
  if (!tokenInfo || !listPrice) return 0;
  const tokenPrice = listPrice?.[address]?.price || 1;

  return Number(value) * tokenPrice;
};

export const convertToAmountToken = (address: string, value: string, network: string, listPrice?: TPriceList) => {
  const tokenInfo = findTokenInfoByToken(address, network);
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

export function toRSV(signature: `0x${string}`) {
  const parsed = parseSignature(signature);

  // 65-byte RSV: v is present
  if (parsed.v !== undefined) {
    const yParity = parsed.v >= 35n ? (parsed.v - 35n) % 2n : parsed.v - 27n;
    const vLegacy = Number(yParity) + 27;
    return { r: parsed.r, s: parsed.s, v: vLegacy };
  }

  // 64-byte EIP-2098: derive from yParity
  const { r, s, yParity } = compactSignatureToSignature(parseCompactSignature(signature));
  return { r, s, v: Number(yParity) + 27 };
}
