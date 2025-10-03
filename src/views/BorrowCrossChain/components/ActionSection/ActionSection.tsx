import { Table, TableBody, TableContainer, Typography } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { useMemo, useState } from 'react';
import { BoxCustom } from 'src/components/General/CustomBox/CustomBox';
import { mapNameNetwork } from 'src/constants/network';
import { LendingContractUniversal } from 'src/contracts/solana/contracts/LendingContractUniversal/LendingContractUniversal';
import useBorrowEVM from 'src/hooks/mutations/useBorrowEVM';
import useDepositEVM from 'src/hooks/mutations/useDepositEVM';
import useQueryDepositValue from 'src/hooks/useQueryHook/queryMyPortfolio/useQueryDepositValue';
import useSummaryFirstActiveConnect from 'src/states/wallets/hooks/useSummaryFirstActiveConnect';
import useFetchAllSolTokenBalances from 'src/states/wallets/solana-blockchain/hooks/useFetchAllSolTokenBalances';
import useGetListWallet from 'src/views/UniversalWallet/hooks/useGetListWallet';
import {
  useBorrowCrossState,
  useBorrowCrossSubmitState,
  useDepositCrossState,
  useSelectedNetworkBorrowState,
  useSelectedNetworkDepositState,
} from '../../state/hooks';
import { TBorrowCrossItem } from '../../state/types';
import BorrowTableRow from './BorrowTableRow';
import DepositTableRow from './DepositTableRow';
import useInvestedValueUniversal from 'src/hooks/useQueryHook/queryBorrowUniversal/useInvestedValueUniversal';

const ActionSection = () => {
  const wallet = useWallet();
  const [borrowState] = useBorrowCrossState();
  const [depositItems] = useDepositCrossState();
  const [isSubmitted, setIsSubmitted] = useBorrowCrossSubmitState();
  const { refetch: refetchDeposited } = useQueryDepositValue();
  const { maxBorrowPrice } = useInvestedValueUniversal();
  const { address, chainId } = useSummaryFirstActiveConnect();
  const { allSlpTokenBalances } = useFetchAllSolTokenBalances(address);
  const { data: listWallet } = useGetListWallet(chainId, address);
  const { mutateAsync: depositEVM } = useDepositEVM();
  const { mutateAsync: borrowEVM } = useBorrowEVM();
  const [borrowNetwork] = useSelectedNetworkBorrowState();
  const [depositNetwork] = useSelectedNetworkDepositState();

  console.log('🚀 ~ ActionSection ~ listWallet:', borrowState);

  const initDepositItems = useMemo(() => {
    return [...depositItems].filter((item) => !!item.value && item.value !== '0');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitted]);

  const initBorrowItems = useMemo(() => {
    return borrowState;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitted]);

  const [actionStatus, setActionStatus] = useState<boolean[]>(() => {
    const result = [...initDepositItems, initBorrowItems].filter((item) => !!item.value && item.value !== '0');
    return Array(result.length).fill(false);
  });

  const handChangeActionStatus = (index: number) => {
    const result = actionStatus.map((item, i) => {
      if (index === i) {
        return true;
      }

      return item;
    });
    const isAllActionDone = result.every((item) => item);
    setActionStatus(result);
    if (isAllActionDone) {
      setIsSubmitted(false);
    }
  };

  const handleDeposit = async (depositItem: TBorrowCrossItem, index: number) => {
    if (!address) return;
    let hash = '';

    if (depositNetwork === mapNameNetwork.solana.name) {
      const lendingContract = new LendingContractUniversal(wallet);
      hash = await lendingContract.deposit(Number(depositItem.value), depositItem.address, listWallet?.universalWallet);
    } else {
      hash = await depositEVM({ depositAmount: depositItem.value, selectedToken: depositItem.address });
    }

    await refetchDeposited();
    await allSlpTokenBalances.refetch();
    handChangeActionStatus(index);

    return hash;
  };

  const handleBorrow = async () => {
    if (!address) return;
    let hash = '';

    if (borrowNetwork.toLowerCase() === mapNameNetwork.solana.name.toLowerCase()) {
      const lendingContract = new LendingContractUniversal(wallet);
      const isBorrowMaxValue = Number(borrowState.price) === maxBorrowPrice;
      hash = await lendingContract.borrow(Number(borrowState.value), borrowState.address, isBorrowMaxValue, listWallet?.universalWallet);
    } else {
      hash = await borrowEVM({ borrowAmount: borrowState.value, selectedToken: borrowState.address });
    }
    handChangeActionStatus(actionStatus.length - 1);

    return hash;
  };

  return (
    <BoxCustom p="24px 20px" hidden={!isSubmitted}>
      <Typography variant="h6" mb={3.5}>
        Actions
      </Typography>
      <TableContainer
        sx={{
          border: '1px solid #474744',
          borderRadius: 2,
          bgcolor: '#333331',
        }}
      >
        <Table>
          <TableBody>
            {initDepositItems.map((item, index) => (
              <DepositTableRow
                actionStatus={actionStatus[index]}
                index={index}
                key={index}
                depositItem={item}
                onClick={() => handleDeposit(item, index)}
              />
            ))}
            <BorrowTableRow
              actionStatus={actionStatus[actionStatus.length - 1]}
              index={actionStatus.length - 1}
              borrowItem={initBorrowItems}
              onClick={handleBorrow}
            />
          </TableBody>
        </Table>
      </TableContainer>
    </BoxCustom>
  );
};

export default ActionSection;
