import { Wallet } from '@project-serum/anchor/dist/cjs/provider';
import { idlAmmV3, IdlAmmV3 } from '../../idl/amm_v3/amm_v3';
import { SolanaContractAbstract } from '../SolanaContractAbstract';
import { ctrAdsSolana } from 'src/constants/contract-address/solana';

export class AmmV3Contract extends SolanaContractAbstract<IdlAmmV3> {
    constructor(wallet: Wallet) {
        super(wallet, ctrAdsSolana.AMM_V3, idlAmmV3);
    }
    async initialize(): Promise<string> {
        return '';
    }
}
