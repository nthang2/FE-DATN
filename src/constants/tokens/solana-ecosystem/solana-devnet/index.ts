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
