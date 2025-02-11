import { Box, Typography } from '@mui/material';
import React, { ReactNode } from 'react';
import { FontOxanium } from 'src/constants';

export const sizeWalletIcon = '32px';
export type TWalletStatus =
  | 'Connected'
  | 'Disconnected'
  | 'Connecting'
  | 'Loading'
  | 'Disconnecting'
  | 'NotFound'
  | 'NotInstalled'
  | 'NotExist'
  | 'Rejected'
  | 'Error';

export const walletStatusViews: Record<TWalletStatus, ReactNode> = {
  Connected: (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box
        component={'span'}
        sx={{ width: '8px', height: '8px', borderRadius: '50%', bgcolor: '#118715', mr: 0.5, display: 'inline-block' }}
      ></Box>
      <Typography sx={{ fontSize: '12px', color: '#118715', fontFamily: FontOxanium }}>Connected</Typography>
    </Box>
  ),
  Connecting: <Typography sx={{ fontSize: '12px', color: '#616161', fontFamily: FontOxanium }}>Connecting...</Typography>,
  Loading: <Typography sx={{ fontSize: '12px', color: '#616161', fontFamily: FontOxanium }}>Connecting...</Typography>,
  Disconnected: <Typography sx={{ fontSize: '12px', color: '#616161', fontFamily: FontOxanium }}>Disconnected</Typography>,
  Disconnecting: <Typography sx={{ fontSize: '12px', color: '#616161', fontFamily: FontOxanium }}>Disconnecting...</Typography>,
  NotInstalled: <Typography sx={{ fontSize: '12px', color: '#616161', fontFamily: FontOxanium }}>Not Installed</Typography>,
  NotExist: <Typography sx={{ fontSize: '12px', color: '#616161', fontFamily: FontOxanium }}>Not Installed</Typography>,
  NotFound: <Typography sx={{ fontSize: '12px', color: '#616161', fontFamily: FontOxanium }}>Not Installed</Typography>,
  Rejected: <Typography sx={{ fontSize: '12px', color: 'error.main', fontFamily: FontOxanium }}>Rejected</Typography>,
  Error: <Typography sx={{ fontSize: '12px', color: 'error.main', fontFamily: FontOxanium }}>Error:</Typography>,
};

export default function BoxOptionWallet({
  icon,
  buttonF,
  name,
  status,
  mb,
  isConnected,
  textError,
}: {
  isConnected: boolean;
  icon: { key: string; replaceUrl: string };
  name: string;
  status: TWalletStatus;
  buttonF: React.ReactNode;
  textError?: string;
  mb?: number;
}) {
  return (
    <Box
      sx={({ palette }) => ({
        opacity: status == 'NotInstalled' ? 0.25 : 1,
        borderRadius: '16px',
        background: isConnected ? palette.background.button : palette.background.secondary,
        color: isConnected ? palette.common.black : palette.text.secondary,
        padding: '4px 6px',
        display: 'flex',
        gap: 1,
        placeItems: 'center',
        transition: 'opacity 0.3s',
        '& .button': { opacity: 0, transition: 'opacity 0.3s, background-color 0.3s, color 0.3s' },
        '&:hover': { opacity: 1, '& .button': { opacity: 1 } },
      })}
      mb={mb}
    >
      <img src={icon.replaceUrl} style={{ width: sizeWalletIcon, height: sizeWalletIcon, borderRadius: '10px' }}></img>
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: isConnected ? 700 : 600,
            color: '',
            fontFamily: FontOxanium,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {name}
        </Typography>
        <Box display={'flex'} sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {walletStatusViews[status]}
          {status == 'Error' && (
            <Typography sx={{ fontSize: '12px', color: 'error.main', fontFamily: FontOxanium, ml: 1 }}>{textError || 'Unknow'}</Typography>
          )}
        </Box>
      </Box>
      <Box ml="auto">{buttonF}</Box>
    </Box>
  );
}
