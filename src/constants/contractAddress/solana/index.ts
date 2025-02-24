import { PublicKey } from '@solana/web3.js';
import { NETWORK } from 'src/constants';

export const vaultProgramId =
  NETWORK === 'devnet' ? 'BCaAj6hcBtKYVKUm1RnEyvE29Y1iu5ieLTq7CueN3vD3' : 'GtTBznMzJiND5niGV3az8LLnUbNLphqkJVHDKuCt2VYy';
export const lendingProgramId =
  NETWORK === 'devnet' ? '7yqKNNqAy6Xg9wxSYzYgi2j7dXpSNJVE2SorLJp8ZAEY' : '3APJcbC2iHEFGv4y6a8Fi5nQ5u75ML85TQreSr7cpRDs';

export const ctrAdsSolana = {
  //3APJcbC2iHEFGv4y6a8Fi5nQ5u75ML85TQreSr7cpRDs
  oracle: new PublicKey('GKRTJNwFFztK9LqaBU7kSg2sngDVwQkbsQEBQJhVMQ4k'),
  lending: new PublicKey(lendingProgramId),
  vault: new PublicKey(vaultProgramId),
};
