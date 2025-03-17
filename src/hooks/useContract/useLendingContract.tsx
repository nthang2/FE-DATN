import { WalletContextState } from '@solana/wallet-adapter-react';
import { useCallback } from 'react';
import { LendingContract } from 'src/contracts/solana/contracts/LendingContract/LendingContract';
import { LendingCrossContract } from 'src/contracts/solana/contracts/LendingContract/LendingCrossContract';
import { useCrossModeState } from 'src/states/hooks';

const useLendingContract = () => {
  const [crossMode] = useCrossModeState();

  const initLendingContract = useCallback(
    (wallet: WalletContextState) => {
      if (crossMode) {
        return new LendingCrossContract(wallet);
      }

      return new LendingContract(wallet);
    },
    [crossMode]
  );

  return { initLendingContract, crossMode };
};

export default useLendingContract;
