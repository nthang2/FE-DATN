import { InputBase, styled } from '@mui/material';

export const Input = styled(InputBase)(({ theme }) => ({
  minWidth: '120px',
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiSelect-select': {
    display: 'flex',
    alignItems: 'center',
  },
  '& .MuiInputBase-input': {
    minWidth: '200px',
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '0.1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: `0 0 0 0.1rem #FFD8F0`,
    },
  },
}));
