import { PublicKey } from '@solana/web3.js';
import { NETWORK } from 'src/constants';

export const vaultProgramId =
  NETWORK === 'devnet' ? 'BCaAj6hcBtKYVKUm1RnEyvE29Y1iu5ieLTq7CueN3vD3' : 'GtTBznMzJiND5niGV3az8LLnUbNLphqkJVHDKuCt2VYy';
export const lendingProgramId =
  NETWORK === 'devnet' ? 'HtSzqFJCFwpRKarN8PBfk2kEXwUzJLUJvhiG52sKpZWZ' : '3APJcbC2iHEFGv4y6a8Fi5nQ5u75ML85TQreSr7cpRDs';

export const ctrAdsSolana = {
  //3APJcbC2iHEFGv4y6a8Fi5nQ5u75ML85TQreSr7cpRDs
  oracle: new PublicKey('95Af7sxjVyunTTikaJQymK3rVwDtEVBtbnStXGMSR9wE'),
  lending: new PublicKey(lendingProgramId),
  vault: new PublicKey(vaultProgramId),
};
