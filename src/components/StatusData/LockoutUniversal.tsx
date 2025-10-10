import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Box, Button, Container, Typography } from '@mui/material';
import { BoxCustom } from '../General/CustomBox/CustomBox';
import { useNavigate } from 'react-router-dom';

const LockoutUniversal = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ mt: 5 }}>
      <BoxCustom display="flex" flexDirection="column" alignItems="center" gap={6} sx={{ padding: '50px' }}>
        <Box>
          <LockOutlinedIcon sx={{ fontSize: '50px' }} color="primary" />
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Typography textAlign="center" variant="h4">
            You need connect universal wallet to see this content
          </Typography>
          <Button variant="contained" onClick={() => navigate('/universal-wallet')}>
            Go to universal wallet
          </Button>
        </Box>
      </BoxCustom>
    </Container>
  );
};

export default LockoutUniversal;
