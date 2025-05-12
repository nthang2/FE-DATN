import { TokenName } from 'src/libs/crypto-icons';
import { BaseTokenInfo } from '../BaseTokenInfo';

export class SolanaEcosystemTokenInfo extends BaseTokenInfo {
  isToken2022: boolean;
  constructor(input: {
    prettyName: string;
    symbol: TokenName;
    decimals: number;
    address: string;
    network: { id: string | number; name: string };
    isNative: boolean;
    coingeckoId?: string;
    isToken2022: boolean;
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
    this.isToken2022 = input.isToken2022;
  }
}
