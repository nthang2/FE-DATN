import { BACKEND_URL, URL_JUPITER_API, URL_METEORA_API } from './baseUrl';
import { TLiquidationLeaderboardParams } from './HandleApi/getLeaderboard/type';

export const apiUrl = {
  getTokenPrice: (address: string) => `${BACKEND_URL}/tokens/price?tokenAddress=${address}`,
  getLendingMetrics: () => `${BACKEND_URL}/lending/metrics`,
  getLendingMetricsCrossMode: () => `${BACKEND_URL}/lending/metrics/cross-mode`,
  getLiquidationLeaderboard: ({
    user,
    collateral,
    healthFactorThreshold,
    sortBy,
    reverse,
    excludeCollateral,
  }: TLiquidationLeaderboardParams) => {
    const _user = user ? `&user=${user}` : '';
    const _collateral = collateral ? `&collateral=${collateral}` : '';
    // eslint-disable-next-line no-extra-boolean-cast
    const checkFinalParam = Boolean(_user || _collateral) ? '' : '&';
    return `${BACKEND_URL}/lending/liquidates/risk_loans?'${_user}${_collateral}${checkFinalParam}&healthFactorThreshold=${healthFactorThreshold}&sortBy=${sortBy}&reverse=${reverse}&excludeCollateral=${excludeCollateral}`;
  },
  getMyPortfolioInfo: (userAddress: string) => `${BACKEND_URL}/lending/users/${userAddress}`,
  getMyPortfolioCrossModeInfo: (userAddress: string) => `${BACKEND_URL}/lending/users/${userAddress}/cross-mode`,
  getLiquidatorRewardList: (userAddress: string) => `${BACKEND_URL}/liquidator-pool/users/${userAddress}`,
  getJupiterQuote: (param: string) => `${URL_JUPITER_API}/quote?${param}`,
  jupiterSwapInstructions: () => `${URL_JUPITER_API}/swap-instructions`,
  getUsdaiInPool: () => `${BACKEND_URL}/tokens/usdai/liquidity-pool`,
  getMeteoraTokenPrice: (tokenAddress: string) => `${URL_METEORA_API}/pair/${tokenAddress}`,
  getPoolApr: () => `${BACKEND_URL}/liquidator-pool/apr`,
  getHealthFactor: (userAddress: string) => `${BACKEND_URL}/lending/users/${userAddress}/health-factor`,
  getHealthFactorCrossMode: (userAddress: string) => `${BACKEND_URL}/lending/users/${userAddress}/cross-mode/health-factor`,

  // Dashboard
  getMetrics: () => `${BACKEND_URL}/lending/metrics`,
  getMetricsCrossMode: () => `${BACKEND_URL}/lending/metrics/cross-mode`,
  getEarningMetrics: (day: number) => `${BACKEND_URL}/staking/tvl-history?nDays=${day}`,
  getTopDepositors: () => `${BACKEND_URL}/staking/users`,
  getAudits: () => `${BACKEND_URL}/yield-aggregator/audit`,
  getRebalanceActions: (page: number, pageSize: number) =>
    `${BACKEND_URL}/yield-aggregator/collateral-allocation/rebalance-actions?pageIndex=${page}&pageSize=${pageSize}`,
  getProtocolPositions: () => `${BACKEND_URL}/yield-aggregator/collateral-allocation/protocol-positions`,
  getVaultsPositions: () => `${BACKEND_URL}/yield-aggregator/collateral-allocation/positions`,

  // Universal Wallet
  generateMessage: (chainId: string, walletAddress: string, sourceWalletAddress: string, sourceChainId: string) =>
    `${BACKEND_URL}/universal/wallet-linking/generate-message?chainId=${chainId}&walletAddress=${walletAddress}&sourceWalletAddress=${sourceWalletAddress}&sourceChainId=${sourceChainId}`,
  createUniversalWallet: (address: string) => `${BACKEND_URL}/liquidator-pool/users/${address}`,
  walletLinkingRequest: () => `${BACKEND_URL}/universal/wallet-linking/request`,
  signMessage: () => `${BACKEND_URL}/universal/wallet-linking/submit-signature`,
  listWalletLinkingRequests: (chainId: string, walletAddress: string) =>
    `${BACKEND_URL}/universal/wallet-linking/universal-wallet?chainId=${chainId}&walletAddress=${walletAddress}`,
  getUniversalWalletTransactionHistory: (userAddress: string, chainId: string) =>
    `${BACKEND_URL}/universal/wallet-linking/actions?chainId=${chainId}&walletAddress=${userAddress}`,
  //Universal Lending
  universalLendingRequestEVM: () => `${BACKEND_URL}/universal/lending/request`,
  getMyPortfolioUniversal: (userAddress: string, chainId: string) =>
    `${BACKEND_URL}/universal/lending/position?chainId=${chainId}&walletAddress=${userAddress}`,
  getUniversalHealthFactor: () => `${BACKEND_URL}/universal/lending/health-factor`,
  getPortfolioCrossTransactionsHistory: (userAddress: string, chainId: string) =>
    `${BACKEND_URL}/universal/lending/actions?chainId=${chainId}&walletAddress=${userAddress}`,
  simulateTransaction: () => `${BACKEND_URL}/universal/lending/simulate`,
};
