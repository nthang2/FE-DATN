import { Box, Popover, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import CustomTextField from 'src/components/CustomForms/CustomTextField';
import { listNetwork } from '../../constant';
import { mapNameNetwork } from '../../network';
import ListWalletSolana from './ListWalletSolana';

const DestinationDialog = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedNetwork, setSelectedNetwork] = useState<string>('');
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Box onClick={handleClick} sx={{ position: 'relative' }}>
        <CustomTextField
          fullWidth
          variant="outlined"
          disabled
          placeholder="Select network, wallet and connect wallet..."
          InputProps={{
            endAdornment: (
              <Box
                sx={{
                  height: '48px',
                  width: '131px',
                  border: '1px solid #666662',
                  borderRadius: '8px',
                  bgcolor: 'secondary.dark',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0.5,
                  gap: 1,
                }}
              >
                <Box sx={{ width: '20px', height: '20px', borderRadius: '50%', bgcolor: 'text.secondary' }} />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Network
                </Typography>
              </Box>
            ),
            sx: { px: 2, py: 1, fontSize: '14px', height: 'unset' },
          }}
          inputProps={{ style: { padding: 0, paddingTop: 1 } }}
          sx={{ mt: 1 }}
        />
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }} />
      </Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: {
            width: anchorEl ? anchorEl.getBoundingClientRect().width : undefined,
            border: '1px solid',
            borderColor: 'background.border',
          },
        }}
      >
        <Box sx={{ width: '100%', px: 2, py: 2.5, bgcolor: '#303030' }}>
          <Stack gap={2} direction="column" mb={2}>
            <Typography variant="body1" fontWeight={600}>
              Select a network
            </Typography>

            <Stack gap={1}>
              {listNetwork.map((network) => {
                const networkInfo = mapNameNetwork[network];

                return (
                  <Box
                    key={networkInfo.id}
                    className="flex-center"
                    flexDirection="column"
                    sx={{
                      borderRadius: '8px',
                      p: 1,
                      gap: 1,
                      width: '82px',
                      height: '70px',
                      cursor: 'pointer',
                      border: '1px solid transparent',
                      ':hover': { bgcolor: 'secondary.dark', borderColor: 'primary.main' },
                      bgcolor: selectedNetwork === networkInfo.id ? 'secondary.dark' : 'transparent',
                      borderColor: selectedNetwork === networkInfo.id ? 'primary.main' : 'transparent',
                    }}
                    onClick={() => setSelectedNetwork(networkInfo.id)}
                  >
                    {networkInfo.icon}
                    <Typography variant="body2" fontWeight={600}>
                      {networkInfo.name}
                    </Typography>
                  </Box>
                );
              })}
              <Box></Box>
            </Stack>
          </Stack>

          <ListWalletSolana />
        </Box>
      </Popover>
    </Box>
  );
};

export default DestinationDialog;
