import { TokenName } from 'src/libs/crypto-icons';
import { EvmTokenInfo } from '../../EvmTokenInfo';
import { Address } from 'viem';

export class EthereumChainTokenInfo extends EvmTokenInfo {
  constructor(input: {
    prettyName: string;
    symbol: TokenName;
    decimals: number;
    address: Address;
    isNative: boolean;
    coingeckoId?: string;
    ratio?: string;
  }) {
    super({
      prettyName: input.prettyName,
      symbol: input.symbol,
      decimals: input.decimals,
      address: input.address,
      network: { id: 1, name: 'Ethereum' },
      isNative: input.isNative,
      coingeckoId: input.coingeckoId,
      ratio: input.ratio,
    });
  }
}
