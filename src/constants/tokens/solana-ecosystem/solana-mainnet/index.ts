import { TokenName } from 'crypto-token-icon';
import { SolanaMainnetTokenInfo } from './SolanaMainnetTokenInfo';

export const solTokenSolana = new SolanaMainnetTokenInfo({
  address: 'SolanaNative',
  decimals: 9,
  symbol: TokenName.SOL,
  prettyName: 'Salana',
  coingeckoId: 'solana',
  isToken2022: false,
  isNative: true,
});

export const usdaiSolanaMainnet = new SolanaMainnetTokenInfo({
  address: 'DYeTA4ZQhEwoJ5imjq1Q3zgwfTgkh4WmdfFHAq3jLrv3',
  decimals: 6,
  symbol: TokenName.USDAI,
  prettyName: 'USDAI',
  isNative: false,
  isToken2022: false,
});

export const oraiSolanaMainnet = new SolanaMainnetTokenInfo({
  address: 'oraiyuR7hz6h7ApC56mb52CJjPZBB34USTjzaELoaPk',
  decimals: 6,
  symbol: TokenName.ORAI,
  prettyName: 'ORAI',
  isNative: false,
  isToken2022: false,
  oracle: 'Fjqvpsvz9tGCB8td2pDHcvKSKgkUmbJzhcqS3g6rhEhr',
  ratio: '0.4',
});

export const usdcSolanaMainnet = new SolanaMainnetTokenInfo({
  address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  decimals: 6,
  symbol: TokenName.USDC,
  prettyName: 'USDC',
  isNative: false,
  isToken2022: false,
  oracle: 'GVVBXQmnQW1bggzegakxSBoioVsbHCvCrnY2LwvZkvFu',
  ratio: '0.95',
});

export const trumpTokenSolana = new SolanaMainnetTokenInfo({
  address: '6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN',
  decimals: 6,
  symbol: TokenName.TRUMP,
  prettyName: 'Official Trump',
  coingeckoId: 'official-trump',
  isToken2022: false,
  isNative: false,
  oracle: 'CsRhK1jeEih7oMHD3m8PL2b9jMw6xDzrHvDgP6sz6xer',
});

export const maxTokenSolana = new SolanaMainnetTokenInfo({
  address: 'oraim8c9d1nkfuQk9EzGYEUGxqL3MHQYndRw1huVo5h',
  decimals: 6,
  symbol: TokenName.MAX,
  prettyName: 'MAX',
  coingeckoId: 'max-2',
  isToken2022: false,
  isNative: false,
  oracle: '56YXkoHyCn2aRTc6RCi7nMRGXwNuSdF7p4pe2s5AjHoP',
  ratio: '0.3',
});

export const ai16zTokenSolana = new SolanaMainnetTokenInfo({
  address: 'HeLp6NuQkmYB4pYWo2zYs22mESHXPQYzXbB8n4V98jwC',
  decimals: 9,
  symbol: TokenName.AI16Z,
  prettyName: 'ai16z',
  coingeckoId: 'ai16z',
  isToken2022: true,
  isNative: false,
  oracle: '95Af7sxjVyunTTikaJQymK3rVwDtEVBtbnStXGMSR9wE',
});
