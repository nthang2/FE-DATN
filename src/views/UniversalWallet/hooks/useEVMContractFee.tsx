import { useQuery } from '@tanstack/react-query';
import { ctrAdsEVM } from 'src/constants/contractAddress/evm';
import { universalWalletAbi } from 'src/contracts/evm/abi/universalWallet';
import { config } from 'src/states/wallets/evm-blockchain/config';
import { readContract } from 'wagmi/actions';

const useEVMContractFee = () => {
  const query = useQuery({
    queryKey: ['useEVMContractFee'],
    queryFn: async () => {
      const response = await readContract(config, {
        address: ctrAdsEVM.universalWallet as `0x${string}`,
        abi: universalWalletAbi,
        functionName: 'ethFee',
      });

      return response || BigInt(0);
    },
  });

  return query;
};

export default useEVMContractFee;
