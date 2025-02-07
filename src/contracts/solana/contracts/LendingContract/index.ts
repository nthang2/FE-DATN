import { Wallet } from '@project-serum/anchor';
import { SolanaContractAbstract } from '../SolanaContractAbstract';
import { ctrAdsSolana } from 'src/constants/contractAddress/solana';
import { IdlLending, idlLending } from '../../idl/lending/lending';

export class LendingContract extends SolanaContractAbstract<IdlLending> {
  constructor(wallet: Wallet) {
    super(wallet, ctrAdsSolana.lending, idlLending);
  }
  async initialize(): Promise<string> {
    return '';
  }
}
