import { TokenName } from 'crypto-token-icon';
import { SolanaDevnetTokenInfo } from './SolanaDevnetTokenInfo';

export const usdcDevSolanaDevnet = new SolanaDevnetTokenInfo({
  address: 'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr',
  decimals: 6,
  symbol: TokenName.USDC,
  prettyName: 'USDC Dev',
  isNative: false,
  isToken2022: false,
});

export const usdaiSolanaDevnet = new SolanaDevnetTokenInfo({
  address: '8XtWqQ5zbrxoRpic5Zavv5oqd2sFCEoBov9EydCLS3HE',
  decimals: 6,
  symbol: TokenName.USDAI,
  prettyName: 'USDAI',
  isNative: false,
  isToken2022: false,
});

export const solanaDevnet = new SolanaDevnetTokenInfo({
  address: 'So11111111111111111111111111111111111111112',
  decimals: 9,
  symbol: TokenName.SOL,
  prettyName: 'Solana',
  coingeckoId: 'solana',
  isToken2022: false,
  isNative: true,
  ratio: '0.6',
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
  address: 'C2R669FocBZ1HiNN1G1Pug4HaBwjPhV4hLm1YLDEp9BV',
  decimals: 6,
  symbol: TokenName.MAX,
  prettyName: 'MAX',
  isNative: false,
  isToken2022: false,
  oracle: 'oraim8c9d1nkfuQk9EzGYEUGxqL3MHQYndRw1huVo5h',
  ratio: '0.95',
});

export const token2SolanaDevnet = new SolanaDevnetTokenInfo({
  address: 'HH1KH7dSajYre5rwRKLUc9XqAePYjsKM6mfC831hNwsX',
  decimals: 6,
  symbol: TokenName.TRUMP,
  prettyName: 'TRUMP',
  isNative: false,
  isToken2022: false,
  oracle: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  ratio: '0.3',
});

export const token3SolanaDevnet = new SolanaDevnetTokenInfo({
  address: '4N2YoUvm7rM8F2y9wKNexoC7JBwMXbb8bfwtwZwdvdTv',
  decimals: 6,
  symbol: TokenName.AI16Z,
  prettyName: 'ai16z',
  isNative: false,
  isToken2022: false,
  oracle: 'oraiyuR7hz6h7ApC56mb52CJjPZBB34USTjzaELoaPk',
  ratio: '0.4',
});

//TOKEN_1=3eURz91ZVhdVBghyet6wcDwsBTcsGxeMA2ovMkWku3Y8
//TOKEN_2=7FWWHpj9U6jnzkFaDg5kWVCw74gGzrhiSrKFkPU7ycDi
//TOKEN_3=EvBgWJhp6k1CSW1hPC7hVMQeT8Psm54wTk2DyR5JtHNP
