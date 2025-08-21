export type TJupiterSwapBody = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  quoteResponse: any;
  userPublicKey: string;
};

export type TJupiterQuoteParam = {
  inputMint: string;
  outputMint: string;
  amount: string;
  slippageBps: number;
  maxAccounts?: number;
  excludeDexes?: string;
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
