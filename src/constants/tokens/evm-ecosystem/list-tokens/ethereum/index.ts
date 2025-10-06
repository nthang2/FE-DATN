import { TokenName } from 'src/libs/crypto-icons';
import { EthereumChainTokenInfo } from './EthereumChainTokenInfo';

export const ethEthereum = new EthereumChainTokenInfo({
  address: '0xeth',
  decimals: 18,
  symbol: TokenName.ETH,
  prettyName: 'Ethereum',
  isNative: true,
  coingeckoId: 'ethereum',
});

export const usdcEthereum = new EthereumChainTokenInfo({
  address: '0x05D17b37CD833745E92Cd3F2B728724C44072969',
  decimals: 18,
  symbol: TokenName.USDC,
  prettyName: 'USD Coin',
  isNative: false,
  coingeckoId: 'usd-coin',
  ratio: '0.95',
});

export const usdtEthereum = new EthereumChainTokenInfo({
  address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  decimals: 6,
  symbol: TokenName.USDT,
  prettyName: 'Tether',
  isNative: false,
  coingeckoId: 'tether',
});

export const scORAIEthereum = new EthereumChainTokenInfo({
  address: '0xEC66D61F47b9411c900B367556D77810Ec2e253D',
  decimals: 18,
  symbol: TokenName.scORAI,
  prettyName: 'Staking Compound ORAI',
  isNative: false,
  coingeckoId: 'scorai',
});

export const oraiEthereum = new EthereumChainTokenInfo({
  address: '0x4c11249814f11b9346808179cf06e71ac328c1b5',
  decimals: 18,
  symbol: TokenName.ORAI,
  prettyName: 'Oraichain',
  isNative: false,
  coingeckoId: 'oraichain-token',
});

export const bnbEthereum = new EthereumChainTokenInfo({
  address: '0xB8c77482e45F1F44dE1745F52C74426C631bDD52',
  decimals: 18,
  symbol: TokenName.BNB,
  prettyName: 'Binance Coin',
  isNative: false,
  coingeckoId: 'binancecoin',
});

export const usdaiEthereum = new EthereumChainTokenInfo({
  address: '0xAC7Faf2d8b654e2e7cbD14624893aD85Acc881bF',
  decimals: 6,
  symbol: TokenName.USDAI,
  prettyName: 'USDAI',
  isNative: false,
  coingeckoId: 'usdai',
});
