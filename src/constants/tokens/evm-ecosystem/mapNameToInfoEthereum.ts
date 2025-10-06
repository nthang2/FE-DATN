import { TokenName } from 'src/libs/crypto-icons';
import { isDevNet } from '../solana-ecosystem/mapNameToInfoSolana';
import {
  findTokenInfoByTokenEVMDevnet,
  findTokenNameEthereumDevnet,
  mapNameToInfoEthereumDevnet,
} from './list-tokens/ethereum-testnet/mapNameToInfoEthereum';
import { EthereumChainTokenInfo } from './list-tokens/ethereum/EthereumChainTokenInfo';
import {
  findTokenInfoByTokenEVMMainnet,
  findTokenNameEthereumMainnet,
  mapNameToInfoEthereumMainnet,
} from './list-tokens/ethereum/mapNameToInfoEthereum';

export const mapNameToInfoEthereum: Record<string, EthereumChainTokenInfo> = isDevNet
  ? mapNameToInfoEthereumDevnet
  : mapNameToInfoEthereumMainnet;

export type TEthereumToken = keyof typeof mapNameToInfoEthereum;

export const findTokenNameEthereum = isDevNet ? findTokenNameEthereumMainnet : findTokenNameEthereumDevnet;

export const findTokenInfoByTokenEVM = isDevNet ? findTokenInfoByTokenEVMDevnet : findTokenInfoByTokenEVMMainnet;

export const listTokenAvailable = isDevNet
  ? {
      [TokenName.USDC]: mapNameToInfoEthereum[TokenName.USDC],
      [TokenName.USDAI]: mapNameToInfoEthereum[TokenName.USDAI],
    }
  : {
      [TokenName.USDC]: mapNameToInfoEthereum[TokenName.USDC],
      [TokenName.USDAI]: mapNameToInfoEthereum[TokenName.USDAI],
    };
