import { PublicKey } from '@solana/web3.js';
export type TJupiterSwapBody = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  quoteResponse: any;
  userPublicKey: string;
  destinationTokenAccount: PublicKey;
  wrapAndUnwrapSol: boolean;
  useSharedAccounts: boolean;
  dynamicComputeUnitLimit: boolean;
};

export type TJupiterQuoteParam = {
  inputMint: string;
  outputMint: string;
  amount: string;
  slippageBps: number;
  onlyDirectRoutes: string;
  userPublicKey: string;
  maxAccounts: number;
  excludeDexes: string;
};

export type TSwapResp = {
  swapInstruction: {
    accounts: {
      isSigner: boolean;
      isWritable: boolean;
      pubkey: string;
    }[];
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};
