import { ButtonProps } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ctrAdsEVM } from 'src/constants/contractAddress/evm';
import { mapNameNetwork } from 'src/constants/network';
import { findTokenInfoByToken } from 'src/constants/tokens/mapNameToInfo';
import { config } from 'src/states/wallets/evm-blockchain/config';
import useSummaryEVMConnect from 'src/states/wallets/evm-blockchain/hooks/useSummaryEVMConnect';
import { BN } from 'src/utils';
import { erc20Abi } from 'viem';
import { readContract, waitForTransactionReceipt, writeContract } from 'wagmi/actions';
import ButtonLoading from '../General/ButtonLoading/ButtonLoading';

type IProps = Omit<ButtonProps, 'loading'> & {
  tokenAddress: string;
  network: string;
  amount: string;
  actionButton: React.ReactNode;
};

const ButtonApproveEVM = (props: IProps) => {
  const { tokenAddress, network, amount, actionButton, ...rest } = props;
  const { address } = useSummaryEVMConnect();
  const tokenInfo = findTokenInfoByToken(tokenAddress, network);
  const [loading, setLoading] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  const rawAmount = BN(amount)
    .multipliedBy(BN(10).pow(tokenInfo?.decimals ?? 6))
    .toNumber();

  const { data: allowance } = useQuery({
    queryKey: ['useApproveEVM', tokenAddress, network, amount, address],
    queryFn: async () => {
      try {
        const allowance = await readContract(config, {
          abi: erc20Abi,
          address: tokenAddress as `0x${string}`,
          functionName: 'allowance',
          args: [address as `0x${string}`, ctrAdsEVM.universalWallet as `0x${string}`],
        });
        setIsApproved(Boolean(allowance && allowance >= BigInt(rawAmount)));

        return allowance;
      } catch (error) {
        console.log('error', error);
        return 0;
      }
    },
    enabled: !!tokenInfo && !!address?.length,
    staleTime: 0,
  });

  const handleApprove = async () => {
    if (!tokenInfo || allowance === undefined) return;
    if (!isApproved) {
      setLoading(true);

      const tx = await writeContract(config, {
        abi: erc20Abi,
        address: tokenInfo?.address as `0x${string}`,
        functionName: 'approve',
        args: [ctrAdsEVM.universalWallet as `0x${string}`, BigInt(rawAmount)],
      });
      await waitForTransactionReceipt(config, { hash: tx });

      setLoading(false);
      setIsApproved(true);
    }
  };

  return (
    <>
      {mapNameNetwork.solana.name.toLowerCase() === network.toLowerCase() || isApproved ? (
        actionButton
      ) : (
        <ButtonLoading disabled={amount === '0' || Number(amount) <= 0} loading={loading} onClick={handleApprove} {...rest}>
          Approve
        </ButtonLoading>
      )}
    </>
  );
};

export default ButtonApproveEVM;
