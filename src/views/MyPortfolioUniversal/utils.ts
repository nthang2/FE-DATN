import { AddressLookupTableAccount, ComputeBudgetProgram, PublicKey } from '@solana/web3.js';
import { TokenName } from 'src/libs/crypto-icons';
import { findTokenInfoByToken, mapNameToInfoSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { TPriceList } from 'src/services/HandleApi/getPriceToken/getPriceToken';
import { publicClientSol } from 'src/states/hooks';
import { BN } from 'src/utils';

export const getAddressLookupTableAccounts = async (keys: string[]): Promise<AddressLookupTableAccount[]> => {
  const connection = publicClientSol();
  const addressLookupTableAccountInfos = await connection.getMultipleAccountsInfo(keys.map((key) => new PublicKey(key)));

  return addressLookupTableAccountInfos.reduce((acc, accountInfo, index) => {
    const addressLookupTableAddress = keys[index];
    if (accountInfo) {
      const addressLookupTableAccount = new AddressLookupTableAccount({
        key: new PublicKey(addressLookupTableAddress),
        state: AddressLookupTableAccount.deserialize(accountInfo.data),
      });
      acc.push(addressLookupTableAccount);
    }
    return acc;
  }, new Array<AddressLookupTableAccount>());
};

export function addPriorityFee(microLamports: number = 0.001) {
  // Use custom value if provided, otherwise calculate from SOL
  return ComputeBudgetProgram.setComputeUnitPrice({
    microLamports: microLamports,
  });
}

export const calcCollateralAmountRaw = (listPrice: TPriceList | undefined, repayInput: string, selectedToken: string) => {
  const usdaiInfo = mapNameToInfoSolana[TokenName.USDAI];
  const selectedTokenInfo = findTokenInfoByToken(selectedToken);
  const repayInputInUsd = BN(listPrice?.[usdaiInfo.address]?.price || 0).multipliedBy(repayInput);
  const amount = BN(repayInputInUsd).dividedBy(listPrice?.[selectedToken]?.price || 0);

  return { amount: amount.multipliedBy(`1e${selectedTokenInfo?.decimals || 9}`), amountInWei: amount };
};
