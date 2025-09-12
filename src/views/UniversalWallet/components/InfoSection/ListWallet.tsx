import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { listWalletTableHead } from '../../constant';
// import Failed from 'src/components/StatusData/Failed';
// import JPowLoading from 'src/components/StatusData/Loading';
// import NoData from 'src/components/StatusData/NoData';
import { formatAddress } from 'src/utils/format';
import useRemoveWallet from '../../hooks/useRemoveWallet';
import useSummaryConnect from 'src/states/wallets/hooks/useSummaryConnect';
import ButtonLoading from 'src/components/General/ButtonLoading/ButtonLoading';
import useGetListWallet from '../../hooks/useGetListWallet';
import { chainIconNetwork, chainNetwork } from 'src/states/wallets/constants/chainIcon';

const ListWallet = () => {
  const { address, chainId } = useSummaryConnect();
  const { mutateAsync: removeWallet, isPending: loading } = useRemoveWallet();
  const { data: listWallet } = useGetListWallet(chainId, address);

  const asyncRemoveWallet = async (wallet: string, network: string) => {
    if (wallet === address) {
      await removeWallet({ wallet, network });
    }
  };

  return (
    <TableContainer sx={{ mt: 2, borderRadius: '14px' }}>
      <Table>
        <TableHead>
          <TableRow>
            {listWalletTableHead.map((h, i) => {
              return (
                <TableCell key={i} width={h.width}>
                  <Typography variant="caption2" sx={{ color: 'info.main' }}>
                    {h.label}
                  </Typography>
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>

        <TableBody>
          {listWallet?.wallets ? (
            listWallet?.wallets.map((item) => {
              const IconNetwork = chainIconNetwork[item.chainId];
              const network = Object.keys(chainNetwork).find((key) => chainNetwork[key] === item.chainId.toString());

              return (
                <TableRow key={item.key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>
                    <Box className="flex-start" gap={1}>
                      {IconNetwork && <IconNetwork />}
                      <Typography variant="body2" sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                        {network}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{formatAddress(item.walletAddress)}</TableCell>
                  <TableCell>
                    <ButtonLoading
                      variant="contained"
                      disabled={item.walletAddress !== address}
                      sx={{ height: '32px' }}
                      color="secondary"
                      loading={item.walletAddress === address && loading}
                      onClick={() => asyncRemoveWallet(item.walletAddress, item.chainId.toString())}
                    >
                      Remove
                    </ButtonLoading>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {/* <TableCell colSpan={liquidationTableHead.length}>
                <Box className="flex-center">
                  {liquidation.status == 'fetching' && <JPowLoading />}
                  {liquidation.status == 'error' && <Failed />}
                  {liquidation.status == 'success' && liquidation.data && liquidation.data.numberOfDocs == 0 && <NoData />}
                </Box>
              </TableCell> */}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListWallet;
