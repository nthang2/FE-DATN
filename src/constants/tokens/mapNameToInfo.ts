import { mapNameNetwork } from '../network';
import { findTokenInfoByTokenEVM } from './evm-ecosystem/mapNameToInfoEthereum';
import { findTokenInfoByToken as findTokenInfoByTokenSOL } from './solana-ecosystem/mapNameToInfoSolana';
import { listTokenAvailableUniversal as listTokenAvailableSOL } from './solana-ecosystem/mapNameToInfoSolana';
import { listTokenAvailable as listTokenAvailableEVM } from './evm-ecosystem/mapNameToInfoEthereum';
import { TokenName } from 'src/libs/crypto-icons';
import { SolanaDevnetTokenInfo } from './solana-ecosystem/solana-devnet/SolanaDevnetTokenInfo';
import { EthereumChainTokenInfo } from './evm-ecosystem/list-tokens/ethereum/EthereumChainTokenInfo';

export const findTokenInfoByToken = (token: string, network: string) => {
  if (network.toLowerCase() === mapNameNetwork.solana.name.toLowerCase()) {
    return findTokenInfoByTokenSOL(token);
  } else if (network.toLowerCase() === mapNameNetwork.ethereum.name.toLowerCase()) {
    return findTokenInfoByTokenEVM(token);
  }
};

export const listTokenAvailableUniversal = (network: string) => {
  if (network.toLowerCase() === mapNameNetwork.solana.name.toLowerCase()) {
    return listTokenAvailableSOL as Record<TokenName, SolanaDevnetTokenInfo | undefined>;
  } else if (network.toLowerCase() === mapNameNetwork.ethereum.name.toLowerCase()) {
    return listTokenAvailableEVM as Record<TokenName, EthereumChainTokenInfo | undefined>;
  }
};
