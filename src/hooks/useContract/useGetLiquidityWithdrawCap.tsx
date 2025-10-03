import { Program } from '@coral-xyz/anchor';
import { PublicKey } from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';
import BigNumber from 'bignumber.js';
import { ctrAdsSolana } from 'src/constants/contractAddress/solana';
import { listTokenAvailable as listTokenAvailableSol } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { SolanaDevnetTokenInfo } from 'src/constants/tokens/solana-ecosystem/solana-devnet/SolanaDevnetTokenInfo';
import { CROSSCHAIN_DEPOSITORY_TYPE1_SEED } from 'src/contracts/solana/contracts/LendingContract/constant';
import { idlLending } from 'src/contracts/solana/idl/lending/lending';
import { publicClientSol } from 'src/states/hooks';

const useGetTotalDepositedUniversal = (props: { chainId: number; tokenName: string }) => {
  const { chainId, tokenName } = props;

  const getPda = (programId: PublicKey, seed: string, ...tokens: (PublicKey | number)[]) => {
    const addressParam = tokens.map((token) => (token instanceof PublicKey ? token.toBuffer() : Buffer.from([token])));
    const [pda] = PublicKey.findProgramAddressSync([Buffer.from(seed), ...addressParam], programId);

    return pda;
  };

  const getTotalDeposited = async (chainIdInput: number, tokenNameInput: string) => {
    const program = new Program(idlLending, { publicKey: ctrAdsSolana.lending, connection: publicClientSol() });
    const tokenInSolana: SolanaDevnetTokenInfo | undefined = Object.values(listTokenAvailableSol).find(
      (item: SolanaDevnetTokenInfo) => item.symbol === tokenNameInput
    );
    const totalDeposited = await program.account.crosschainType1Depository.fetch(
      getPda(ctrAdsSolana.lending, CROSSCHAIN_DEPOSITORY_TYPE1_SEED, chainIdInput)
    );

    if (!tokenInSolana) {
      throw new Error('Token not found in total deposited');
    }

    const currentDeposited: { address: PublicKey; deposited: BigNumber } | undefined = totalDeposited.collateralTokens.find(
      (token) => token.address.toString() === tokenInSolana.address
    );

    if (!currentDeposited) {
      throw new Error('Token not found in total deposited');
    }

    return currentDeposited;
  };

  const query = useQuery({
    queryKey: ['getTotalDeposited', chainId, tokenName],
    queryFn: async () => await getTotalDeposited(chainId, tokenName),
  });

  return { ...query, getTotalDeposited };
};

export default useGetTotalDepositedUniversal;
