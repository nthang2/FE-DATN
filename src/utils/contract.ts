import { Connection, AddressLookupTableAccount, PublicKey } from '@solana/web3.js';

export const getAddressLookupTableAccounts = async (keys: string[], connection: Connection): Promise<AddressLookupTableAccount[]> => {
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
