import { useMutation } from '@tanstack/react-query';
import { ctrAdsEVM } from 'src/constants/contractAddress/evm';
import { findTokenInfoByTokenEVMMainnet } from 'src/constants/tokens/evm-ecosystem/list-tokens/ethereum/mapNameToInfoEthereum';
import { universalWalletAbi } from 'src/contracts/evm/abi/universalWallet';
import useSwitchToSelectedChain from 'src/hooks/useSwitchToSelectedChain';
import { TokenName } from 'src/libs/crypto-icons';
import { config } from 'src/states/wallets/evm-blockchain/config';
import useSummaryEVMConnect from 'src/states/wallets/evm-blockchain/hooks/useSummaryEVMConnect';
import { BN } from 'src/utils';
import { handleNotifyEVM } from 'src/utils/notify';
import { actionType, ethFeeAmount } from 'src/views/Borrow/constant';
import { toRSV } from 'src/views/Borrow/utils';
import { encodePacked, keccak256, pad, parseEther, toBytes } from 'viem';
import { readContract, signMessage, waitForTransactionReceipt, writeContract } from 'wagmi/actions';

interface IProps {
  borrowAmount: string;
  selectedToken: string;
  isMax?: boolean;
}

const useBorrowEVM = () => {
  const { switchToChainSelected } = useSwitchToSelectedChain();
  const { chainId, address } = useSummaryEVMConnect();

  const mutation = useMutation({
    mutationKey: ['useBorrowEVM'],
    mutationFn: async (props: IProps) => {
      try {
        const { borrowAmount, selectedToken, isMax } = props;
        const tokenInfo = findTokenInfoByTokenEVMMainnet(selectedToken as TokenName);
        const deadline = Math.floor(new Date().getTime() / 1000) + 8 * 24 * 60 * 60;
        const maxAmount = BN(2).pow(64).minus(1);
        const amount = isMax
          ? BN(maxAmount).toNumber()
          : BN(borrowAmount)
              .multipliedBy(BN(10).pow(BN(tokenInfo?.decimals ?? 6)))
              .toNumber();

        await switchToChainSelected();
        const nonce = await readContract(config, {
          abi: universalWalletAbi,
          address: ctrAdsEVM.universalWallet as `0x${string}`,
          functionName: 'nonces',
          args: [address as `0x${string}`],
        });

        const packed = encodePacked(
          ['uint8', 'bytes32', 'uint8', 'bytes32', 'uint128', 'uint64', 'uint64'],
          [
            Number(chainId),
            pad(address as `0x${string}`, { size: 32 }),
            actionType.MINT,
            pad(tokenInfo?.address as `0x${string}`, { size: 32 }),
            BigInt(amount),
            nonce,
            BigInt(deadline),
          ]
        );

        const msgHash = keccak256(packed);
        const msgHashBytes = toBytes(msgHash);
        const signature = await signMessage(config, {
          message: { raw: msgHashBytes },
        });
        const compactSignature = toRSV(signature);

        const tx = await writeContract(config, {
          abi: universalWalletAbi,
          address: ctrAdsEVM.universalWallet as `0x${string}`,
          functionName: 'requestMint',
          args: [BigInt(amount), BigInt(deadline), { r: compactSignature.r, s: compactSignature.s, v: Number(compactSignature.v) }],
          value: parseEther(ethFeeAmount),
        });

        await waitForTransactionReceipt(config, { hash: tx });

        await handleNotifyEVM({
          chainId: Number(chainId),
          user: address as `0x${string}`,
          actionType: actionType.MINT,
          token: tokenInfo?.address as `0x${string}`,
          amount: amount,
        });

        return '';
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  });

  return mutation;
};

export default useBorrowEVM;
