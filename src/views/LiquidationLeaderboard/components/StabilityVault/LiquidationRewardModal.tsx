import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import SkeletonTableBody from 'src/components/TableLoading/SkeletonTableBody';
import { LiquidatorContract } from 'src/contracts/solana/contracts/LiquidatorContract';
import useGetVaultInfo from 'src/hooks/useQueryHook/queryLiquidation/useGetVaultInfo';
import LiquidationRewardRow from './LiquidationRewardRow';
import { listTokenAvailable } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';

const tableHead = ['Token', 'Amount', 'Value', ''];

export type TLiquidationReward = {
  tokenName: string;
  amount: number;
  value: number;
};

const LiquidationRewardModal = () => {
  const wallet = useWallet();
  const { data: rewards, isLoading: rewardLoading, refetch } = useGetVaultInfo();

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
          <TableBody>
            {Object.keys(listTokenAvailable).map((tokenName) => {
              return (
                <LiquidationRewardRow
                  key={tokenName}
                  tokenName={tokenName}
                  data={rewards?.collaterals || []}
                  handleClaim={handleClaimReward}
                />
              );
            })}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
};

export default LiquidationRewardModal;
