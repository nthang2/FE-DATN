import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import ButtonLoading from 'src/components/General/ButtonLoading/ButtonLoading';
import NoData from 'src/components/StatusData/NoData';
import { chainIconNetwork, chainNetwork } from 'src/states/wallets/constants/chainIcon';
import { formatAddress } from 'src/utils/format';
import { listWalletTableHead } from '../../constant';
import useGetListWallet from '../../hooks/useGetListWallet';
import useRemoveWallet from '../../hooks/useRemoveWallet';
import { useSourceWalletState } from '../../state/hooks';

const ListWallet = () => {
  const [sourceWalletState] = useSourceWalletState();
  const { address, chainId } = sourceWalletState;
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
          {listWallet?.wallets?.length && listWallet?.wallets?.length > 0 ? (
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
              <TableCell colSpan={listWalletTableHead.length}>
                <Box className="flex-center">
                  <NoData text="No information !" />
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListWallet;
