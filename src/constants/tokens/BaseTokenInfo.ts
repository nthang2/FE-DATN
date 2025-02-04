import { TokenName } from 'crypto-token-icon';

export class BaseTokenInfo {
    constructor(
        public prettyName: string,
        public symbol: TokenName,
        public decimals: number,
        public address: string,
        public network: { id: string | number; name: string },
        public isNative: boolean,
        public coingeckoId?: string
    ) {}
}
