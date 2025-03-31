import { Table, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import SkeletonTableBody from 'src/components/TableLoading/SkeletonTableBody';
import { LiquidatorContract } from 'src/contracts/solana/contracts/LiquidatorContract';
import useGetRewardList from 'src/hooks/useQueryHook/queryLiquidation/useGetRewardList';
import LiquidationRewardRow from './LiquidationRewardRow';

const tableHead = ['Token', 'Amount', 'Value', ''];

export type TLiquidationReward = {
  tokenName: string;
  amount: number;
  value: number;
};

const LiquidationRewardModal = () => {
  const wallet = useWallet();
  const { data: rewards, isLoading: rewardLoading, refetch } = useGetRewardList();

  const handleClaimReward = async (tokenAddress: string) => {
    if (!wallet) return;
    const contract = new LiquidatorContract(wallet);
    await contract.claim(tokenAddress);
    await refetch();
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {tableHead.map((header) => (
              <TableCell key={header} align="left">
                <Typography variant="caption2" sx={{ color: '#888880' }}>
                  {header}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {rewardLoading ? (
          <SkeletonTableBody cols={4} rows={3} />
        ) : (
          <LiquidationRewardRow data={rewards?.collaterals || []} handleClaim={handleClaimReward} />
        )}
      </Table>
    </TableContainer>
  );
};

export default LiquidationRewardModal;
