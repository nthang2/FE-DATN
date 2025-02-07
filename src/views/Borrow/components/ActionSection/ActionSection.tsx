import { Button, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { BoxCustom } from 'src/components/Common/CustomBox/CustomBox';

const tempData = [
  {
    index: 1,
    title: 'Deposit ETH',
    value: '0,001',
    status: 'Deposit',
    symbol: 'ETH',
  },
  {
    index: 2,
    title: 'Deposit ETH',
    value: '0,002',
    status: 'Deposit',
    symbol: 'WETH',
  },
];

const ActionSection = () => {
  return (
    <BoxCustom p="24px 20px">
      <Typography variant="h6" mb={3.5}>
        Actions
      </Typography>

      <TableContainer sx={{ border: '1px solid #474744', borderRadius: 2, bgcolor: '#333331' }}>
        <Table>
          <TableBody>
            {tempData.map((item) => (
              <TableRow sx={{ padding: 3 }} key={item.index}>
                <TableCell width={100}>{item.index}</TableCell>
                <TableCell width={200}>{item.title}</TableCell>
                <TableCell width={400}>
                  <Stack gap={0.5}>
                    <Typography variant="body1">{item.value}</Typography>
                    <Typography variant="body1" color="secondary">
                      {item.symbol}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Button variant="contained" disabled>
                    {item.status}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BoxCustom>
  );
};

export default ActionSection;
