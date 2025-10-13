import { ctrAdsSolana } from 'src/constants/contractAddress/solana';
import { idlLending, IdlLending } from '../../idl/lending/lending';
import { SolanaContractAbstract } from '../SolanaContractAbstract';
import { CONTROLLER_SEED, DEPOSITORY_TYPE1_SEED } from './constant';
import { getAccount, getAssociatedTokenAddressSync } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';

export class LendingUtilityUniversal extends SolanaContractAbstract<IdlLending> {
  constructor() {
    super(null, ctrAdsSolana.lending, idlLending);
  }

  async initialize(): Promise<string> {
    return '';
  }

  async getAccountType1Depository() {
    const controller = this.getPda(CONTROLLER_SEED);
    const depository = this.getPda(DEPOSITORY_TYPE1_SEED);

    const pdaController = await this.program.account.controller.fetch(controller);
    const pdaDepository = await this.program.account.type1Depository.fetch(depository);

    return {
      ...pdaController,
      ...pdaDepository,
    };
  }

  async getDepositoryVault(tokenAddress: string) {
    const depositoryPda = this.getPda(DEPOSITORY_TYPE1_SEED);
    const depositoryVault = getAssociatedTokenAddressSync(new PublicKey(tokenAddress), depositoryPda, true);
    const depository = await getAccount(this.provider.connection, depositoryVault);

    return depository;
  }
}
