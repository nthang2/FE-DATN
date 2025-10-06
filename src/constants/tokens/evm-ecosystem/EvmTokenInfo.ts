import { TokenName } from 'src/libs/crypto-icons';
import { BaseTokenInfo } from '../BaseTokenInfo';

export class EvmTokenInfo extends BaseTokenInfo {
  constructor(input: {
    prettyName: string;
    symbol: TokenName;
    decimals: number;
    address: string;
    network: { id: string | number; name: string };
    isNative: boolean;
    coingeckoId?: string;
    oracle?: string;
    ratio?: string;
  }) {
    super(
      input.prettyName,
      input.symbol,
      input.decimals,
      input.address,
      input.network,
      input.isNative,
      input.coingeckoId,
      input.oracle,
      input.ratio
    );
  }
}
