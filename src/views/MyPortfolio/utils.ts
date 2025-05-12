import { AddressLookupTableAccount, ComputeBudgetProgram, PublicKey } from '@solana/web3.js';
import { TokenName } from 'src/libs/crypto-icons';
import { findTokenInfoByToken, mapNameToInfoSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { TPriceList } from 'src/services/HandleApi/getPriceToken/getPriceToken';
import { publicClientSol } from 'src/states/hooks';
import { BN } from 'src/utils';

export async function getAddressLookupTableAccounts(keys: string[]): Promise<AddressLookupTableAccount[]> {
  if (!keys || keys.length === 0) return [];
  const connection = publicClientSol();

  try {
    const addressLookupTableAccountInfos = await connection.getMultipleAccountsInfo(keys.map((key) => new PublicKey(key)));

    return addressLookupTableAccountInfos.reduce((acc, accountInfo, index) => {
      const addressLookupTableAddress = keys[index];
      if (accountInfo) {
        try {
          const addressLookupTableAccount = new AddressLookupTableAccount({
            key: new PublicKey(addressLookupTableAddress),
            state: AddressLookupTableAccount.deserialize(accountInfo.data),
          });
          acc.push(addressLookupTableAccount);
          console.log(`Loaded lookup table with ${addressLookupTableAccount.state.addresses.length} addresses`);
        } catch (e) {
          console.error(`Error deserializing lookup table ${addressLookupTableAddress}`, e);
        }
      }
      return acc;
    }, new Array<AddressLookupTableAccount>());
  } catch (error) {
    console.error('Error fetching lookup tables:', error);
    return [];
  }
}

export function addPriorityFee() {
  // Use custom value if provided, otherwise calculate from SOL
  const microLamports = 500_000;
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
