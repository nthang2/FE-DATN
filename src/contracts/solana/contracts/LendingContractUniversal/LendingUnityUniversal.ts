import { ctrAdsSolana } from 'src/constants/contractAddress/solana';
import { idlLending, IdlLending } from '../../idl/lending/lending';
import { SolanaContractAbstract } from '../SolanaContractAbstract';
import { CONTROLLER_SEED, DEPOSITORY_TYPE1_SEED } from './constant';

export class LendingUniversalUtils extends SolanaContractAbstract<IdlLending> {
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
}
