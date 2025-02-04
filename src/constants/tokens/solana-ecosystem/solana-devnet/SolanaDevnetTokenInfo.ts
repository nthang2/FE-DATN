import { TokenName } from 'crypto-token-icon';
import { SolanaEcosystemTokenInfo } from '../SolanaEcosystemTokenInfo';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

export class SolanaDevnetTokenInfo extends SolanaEcosystemTokenInfo {
    constructor(input: { prettyName: string; symbol: TokenName; decimals: number; address: string; isNative: boolean; coingeckoId?: string; isToken2022: boolean }) {
        super({
            prettyName: input.prettyName,
            symbol: input.symbol,
            decimals: input.decimals,
            address: input.address,
            network: { id: WalletAdapterNetwork.Devnet, name: 'Solana Devnet' },
            isNative: input.isNative,
            coingeckoId: input.coingeckoId,
            isToken2022: input.isToken2022,
        });
    }
}
