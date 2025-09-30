import { TokenName } from 'src/libs/crypto-icons';
import { SolanaDevnetTokenInfo } from './SolanaDevnetTokenInfo';

export const usdcDevSolanaDevnet = new SolanaDevnetTokenInfo({
  address: '2rMFB6q3J9rjdCBQ5b6nSodSnvsvcy2VChN9P3EkYMfo',
  decimals: 6,
  symbol: TokenName.USDC,
  prettyName: 'USDC Dev',
  isNative: false,
  isToken2022: false,
});

export const scOraiSolanaMainnet = new SolanaDevnetTokenInfo({
  address: 'oraiHES5kVRKK62M8T3KkTpFeKg8UBJz1RJ3d69MSAC',
  decimals: 6,
  symbol: TokenName.scORAI,
  prettyName: 'Staking Compound ORAI',
  coingeckoId: 'staking-compound-orai',
  isNative: false,
  isToken2022: false,
  oracle: 'GKRTJNwFFztK9LqaBU7kSg2sngDVwQkbsQEBQJhVMQ4k',
  ratio: '0.4',
});

export const usdaiSolanaDevnet = new SolanaDevnetTokenInfo({
  address: '7cBW2SiCLDPgpG5ebz5TBsPPnTkTS9eN4Sx6Nzm3Px7X',
  decimals: 6,
  symbol: TokenName.USDAI,
  prettyName: 'USDAI',
  isNative: false,
  isToken2022: false,
});

export const solanaDevnet = new SolanaDevnetTokenInfo({
  address: '2MLgrmLV7PabhyuuSdjLoG5jCc592pH9K8cLP7t292Np',
  decimals: 9,
  symbol: TokenName.SOL,
  prettyName: 'Solana',
  coingeckoId: 'solana',
  isToken2022: false,
  isNative: true,
  ratio: '0.67',
});

export const usdtSolanaDevnet = new SolanaDevnetTokenInfo({
  address: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
  decimals: 6,
  symbol: TokenName.USDT,
  prettyName: 'USDT',
  isNative: false,
  isToken2022: false,
  oracle: 'GKRTJNwFFztK9LqaBU7kSg2sngDVwQkbsQEBQJhVMQ4k',
  ratio: '0.95',
});

export const oraiSolanaDevnet = new SolanaDevnetTokenInfo({
  address: 'oraiyuR7hz6h7ApC56mb52CJjPZBB34USTjzaELoaPk',
  decimals: 6,
  symbol: TokenName.ORAI,
  prettyName: 'ORAI',
  isNative: false,
  isToken2022: false,
});

export const token1SolanaDevnet = new SolanaDevnetTokenInfo({
  address: '7FWWHpj9U6jnzkFaDg5kWVCw74gGzrhiSrKFkPU7ycDi',
  decimals: 9,
  symbol: TokenName.MAX,
  prettyName: 'MAX',
  isNative: false,
  isToken2022: false,
  oracle: 'oraim8c9d1nkfuQk9EzGYEUGxqL3MHQYndRw1huVo5h',
  ratio: '0.3',
});

export const token2SolanaDevnet = new SolanaDevnetTokenInfo({
  address: 'EvBgWJhp6k1CSW1hPC7hVMQeT8Psm54wTk2DyR5JtHNP',
  decimals: 9,
  symbol: TokenName.TRUMP,
  prettyName: 'TRUMP',
  isNative: false,
  isToken2022: false,
  oracle: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  ratio: '0.4',
});

export const token3SolanaDevnet = new SolanaDevnetTokenInfo({
  address: '3eURz91ZVhdVBghyet6wcDwsBTcsGxeMA2ovMkWku3Y8',
  decimals: 9,
  symbol: TokenName.AI16Z,
  prettyName: 'ai16z',
  isNative: false,
  isToken2022: false,
  oracle: 'oraiyuR7hz6h7ApC56mb52CJjPZBB34USTjzaELoaPk',
  ratio: '0.95',
});

export const virtualSolanaDevnet = new SolanaDevnetTokenInfo({
  address: '3iQL8BFS2vE7mww4ehAqQHAsbmRNCrPxizWAT2Zfyr9y',
  decimals: 9,
  symbol: TokenName.VIRTUAL,
  prettyName: '$VIRTUAL',
  isNative: false,
  isToken2022: false,
  oracle: 'GKRTJNwFFztK9LqaBU7kSg2sngDVwQkbsQEBQJhVMQ4k',
  ratio: '0.3',
});

//TOKEN_1=3eURz91ZVhdVBghyet6wcDwsBTcsGxeMA2ovMkWku3Y8
//TOKEN_2=7FWWHpj9U6jnzkFaDg5kWVCw74gGzrhiSrKFkPU7ycDi
//TOKEN_3=EvBgWJhp6k1CSW1hPC7hVMQeT8Psm54wTk2DyR5JtHNP
