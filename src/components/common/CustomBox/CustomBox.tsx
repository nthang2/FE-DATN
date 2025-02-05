import { Box, styled } from '@mui/material';

export const BoxCustom = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.content,
  paddingTop: theme.spacing(2.3),
  paddingBottom: theme.spacing(2.3),
  paddingLeft: theme.spacing(3.3),
  paddingRight: theme.spacing(3.3),
  borderRadius: '14px',
  [theme.breakpoints.down('xsm')]: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2.5),
    paddingRight: theme.spacing(2.5),
  },
}));
