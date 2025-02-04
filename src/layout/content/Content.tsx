import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

export default function Content() {
    return (
        <Box>
            <Outlet />
        </Box>
    );
}
