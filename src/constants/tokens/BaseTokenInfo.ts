import { TokenName } from 'src/libs/crypto-icons';
export class BaseTokenInfo {
  constructor(
    public prettyName: string,
    public symbol: TokenName,
    public decimals: number,
    public address: string,
    public network: { id: string | number; name: string },
    public isNative: boolean,
    public coingeckoId?: string,
    public oracle?: string,
    public ratio?: string
  ) {}
}
