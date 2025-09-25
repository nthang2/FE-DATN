import { PublicKey } from '@solana/web3.js';
import { NETWORK } from 'src/constants';

export const vaultProgramId =
  NETWORK === 'devnet' ? 'BCaAj6hcBtKYVKUm1RnEyvE29Y1iu5ieLTq7CueN3vD3' : 'GtTBznMzJiND5niGV3az8LLnUbNLphqkJVHDKuCt2VYy';
export const liquidatorProgramId =
  NETWORK === 'devnet' ? 'HZcLmwCeKFfuvwihVNa7XJRiWXHm3PXg3vZ3rdcrA5w3' : 'CeuU7yCrwBt3pSj1UazU7heT6jQiBr9yWasY3NyJTcMo';
export const lendingProgramId =
  NETWORK === 'devnet' ? 'vdstH476bZ8hdb8TvFS5bsn1RPBVuczpYQyBRgAceHq' : '3APJcbC2iHEFGv4y6a8Fi5nQ5u75ML85TQreSr7cpRDs';

export const ctrAdsSolana = {
  oracle: new PublicKey('GKRTJNwFFztK9LqaBU7kSg2sngDVwQkbsQEBQJhVMQ4k'),
  lending: new PublicKey(lendingProgramId),
  vault: new PublicKey(vaultProgramId),
  liquidator: new PublicKey(liquidatorProgramId),
  jupiter: new PublicKey('JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4'),
};
