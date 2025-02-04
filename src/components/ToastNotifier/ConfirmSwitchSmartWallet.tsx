import { Box, Button, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { formatAddress } from 'src/utils/format';

export function confirmSwitchSmartWallet(address: string, handleSwitchSmartWallet: () => void) {
    return toast.info(
        <Box>
            <Typography variant="subtitle1" color="black">
                Do you want to switch to {formatAddress(address, 6, 6)}
            </Typography>
            <Typography variant="subtitle2">Note: Every transaction of Smart Wallet will work on this address.</Typography>

            <Box textAlign={'right'} mt={2}>
                <Button size="small" sx={{ mr: 1 }} variant="outlined" color="error" onClick={() => toast.dismiss()}>
                    Cancel
                </Button>
                <Button
                    size="small"
                    variant="contained"
                    onClick={() => {
                        handleSwitchSmartWallet();
                        toast.dismiss();
                    }}
                >
                    Confirm
                </Button>
            </Box>
        </Box>,
        {
            position: 'top-center',
            autoClose: 10000,
            style: { placeItems: 'start' },
        }
    );
}
