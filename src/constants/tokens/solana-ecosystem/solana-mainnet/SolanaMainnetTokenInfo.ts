import { TokenName } from 'src/libs/crypto-icons';
import { SolanaEcosystemTokenInfo } from '../SolanaEcosystemTokenInfo';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

export class SolanaMainnetTokenInfo extends SolanaEcosystemTokenInfo {
  constructor(input: {
    prettyName: string;
    symbol: TokenName;
    decimals: number;
    address: string;
    isNative: boolean;
    coingeckoId?: string;
    isToken2022: boolean;
    oracle?: string;
    ratio?: string;
  }) {
    super({
      prettyName: input.prettyName,
      symbol: input.symbol,
      decimals: input.decimals,
      address: input.address,
      network: { id: WalletAdapterNetwork.Mainnet, name: 'Solana' },
      isNative: input.isNative,
      coingeckoId: input.coingeckoId,
      isToken2022: input.isToken2022,
      oracle: input.oracle,
      ratio: input.ratio,
    });
  }
}
