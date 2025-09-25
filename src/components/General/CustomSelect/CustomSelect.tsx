import { Select, styled, Theme } from '@mui/material';

export const CustomSelect = styled(Select)(({ theme, hideDropdownIcon }: { theme: Theme; hideDropdownIcon?: boolean }) => ({
  border: '1px solid',
  borderColor: theme.palette.background.border,
  '& .MuiSvgIcon-root.Mui-disabled': {
    display: hideDropdownIcon ? 'none' : 'block',
  },
  height: '40px',
  borderRadius: '8px',
  '&:hover': {
    bgcolor: theme.palette.primary.main,
  },
  [theme.breakpoints.down('xsm')]: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2.5),
    paddingRight: theme.spacing(2.5),
  },
}));
