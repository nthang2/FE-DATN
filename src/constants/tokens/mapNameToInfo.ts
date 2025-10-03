import { mapNameNetwork } from '../network';
import { findTokenInfoByTokenEVM } from './evm-ecosystem/mapNameToInfoEthereum';
import { findTokenInfoByToken as findTokenInfoByTokenSOL } from './solana-ecosystem/mapNameToInfoSolana';

export const findTokenInfoByToken = (token: string, network: string) => {
  if (network.toLowerCase() === mapNameNetwork.solana.name.toLowerCase()) {
    return findTokenInfoByTokenSOL(token);
  } else if (network.toLowerCase() === mapNameNetwork.ethereum.name.toLowerCase()) {
    return findTokenInfoByTokenEVM(token);
  }
};
