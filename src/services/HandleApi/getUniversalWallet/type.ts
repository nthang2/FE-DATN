export type TTransactionHistoryBody = { chainId: string; walletAddress: string };

export type TTransactonHistoryItem = {
  universalWallet: string | null;
  actions: Array<{
    requestId: number;
    sourceWallet: string;
    sourceChainId: number;
    destinationWallet: string;
    destinationChainId: number;
    deadline: number;
    action: boolean;
    transactionHash: string;
    timestamp: number;
    execution: Array<{
      step: string;
      tx: number | null;
      success: boolean;
      message: string;
      timestamp: number;
    }>;
    state: string;
  }>;
};
