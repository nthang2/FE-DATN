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

export const wsolTokenSolana = new SolanaMainnetTokenInfo({
  address: 'So11111111111111111111111111111111111111112',
  decimals: 9,
  symbol: TokenName.WSOL,
  prettyName: 'Wrapped SOL',
  coingeckoId: '',
  isToken2022: false,
  isNative: false,
});

export const trumpTokenSolana = new SolanaMainnetTokenInfo({
  address: '6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN',
  decimals: 6,
  symbol: TokenName.TRUMP,
  prettyName: 'Official Trump',
  coingeckoId: 'official-trump',
  isToken2022: false,
  isNative: false,
});

export const maxTokenSolana = new SolanaMainnetTokenInfo({
  address: 'oraim8c9d1nkfuQk9EzGYEUGxqL3MHQYndRw1huVo5h',
  decimals: 6,
  symbol: TokenName.MAX,
  prettyName: 'MAX',
  coingeckoId: 'max-2',
  isToken2022: false,
  isNative: false,
});

export const ai16zTokenSolana = new SolanaMainnetTokenInfo({
  address: 'HeLp6NuQkmYB4pYWo2zYs22mESHXPQYzXbB8n4V98jwC',
  decimals: 9,
  symbol: TokenName.AI16Z,
  prettyName: 'ai16z',
  coingeckoId: 'ai16z',
  isToken2022: true,
  isNative: false,
});
