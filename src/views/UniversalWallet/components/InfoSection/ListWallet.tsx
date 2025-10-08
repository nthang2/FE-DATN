import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import ButtonLoading from 'src/components/General/ButtonLoading/ButtonLoading';
import NoData from 'src/components/StatusData/NoData';
import { mapNameNetwork } from 'src/constants/network';
import { chainIconNetwork, chainNetwork } from 'src/states/wallets/constants/chainIcon';
import useSummaryConnect from 'src/states/wallets/hooks/useSummaryConnect';
import { formatAddress } from 'src/utils/format';
import { listWalletTableHead } from '../../constant';
import useGetListWallet from '../../hooks/useGetListWallet';
import useRemoveWallet from '../../hooks/useRemoveWallet';
import { useSourceNetworkState, useSourceWalletState } from '../../state/hooks';

const ListWallet = () => {
  const [sourceWalletState] = useSourceWalletState();
  const [sourceNetworkState] = useSourceNetworkState();
  const listConnected = useSummaryConnect();
  const { address } = sourceWalletState;
  const chainId = sourceNetworkState === mapNameNetwork.solana.id ? '2' : '1';
  const { mutateAsync: removeWallet, isPending: loading } = useRemoveWallet();
  const { data: listWallet } = useGetListWallet(chainId, address);
  const [loadingAddress, setLoadingAddress] = useState<string>('');

  const asyncRemoveWallet = async (wallet: string, network: string) => {
    setLoadingAddress(wallet);
    await removeWallet({ wallet, network });

    setLoadingAddress('');
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
              const isFirstWallet = item.walletAddress === listWallet?.firstWallet;
              const isRemoveAllWallet = listWallet.wallets.length === 1;
              const isCanRemoveFirstWallet = isFirstWallet ? !isRemoveAllWallet : false;
              const isConnected =
                listConnected.findIndex((wallet) => wallet.address.toLowerCase() === item.walletAddress.toLowerCase()) > -1;

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
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <ButtonLoading
                        variant="contained"
                        disabled={!isConnected || isCanRemoveFirstWallet}
                        sx={{ height: '32px' }}
                        color="secondary"
                        loading={item.walletAddress === loadingAddress && loading}
                        onClick={() => asyncRemoveWallet(item.walletAddress, item.chainId.toString())}
                      >
                        Remove
                      </ButtonLoading>

                      <Tooltip
                        title={'Cannot remove the first wallet or the wallet was not connected.'}
                        sx={{ display: !isConnected || isCanRemoveFirstWallet ? 'flex' : 'none' }}
                        placement="top-start"
                        arrow={false}
                      >
                        <InfoOutlinedIcon />
                      </Tooltip>
                    </Box>
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
