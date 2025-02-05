import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { PlusIcon } from 'src/assets/icons';
import { BoxCustom } from 'src/components/Common/CustomBox/CustomBox';
import TooltipInfo from 'src/components/Common/TooltipInfo/TooltipInfo';
import InputCustom from 'src/components/CustomForm/InputCustom/InputCustom';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useState } from 'react';
import { solTokenSolana } from 'src/constants/tokens/solana-ecosystem/solana-mainnet';

const BorrowDepositSection = () => {
  const [arrDepositItems, setArrDepositItems] = useState([solTokenSolana.address]);

  const handleDecreaseCount = (index: number) => {
    if (arrDepositItems.length === 1) return;
    setArrDepositItems((prev) => {
      const newArr = [...prev];
      newArr.splice(index, 1);

      return newArr;
    });
  };

  return (
    <Stack gap={1.25}>
      <BoxCustom sx={{ flex: 1 }}>
        <Stack justifyContent="space-between" width="100%" mb={3.5}>
          <Typography variant="h6" alignItems="center" display="flex" gap={1} fontWeight={700}>
            Deposit
            <TooltipInfo title="info" />
          </Typography>

          <Button
            variant="text"
            sx={{
              color: 'text.secondary',
              ':hover': {
                color: '#000',
                '& path': {
                  fill: '#000',
                },
              },
            }}
            onClick={() => setArrDepositItems((prev) => [...prev, solTokenSolana.address])}
          >
            <Typography variant="body2" alignItems="center" display="flex" gap={1} fontWeight={700}>
              <span>
                <PlusIcon />
              </span>
              Add more
            </Typography>
          </Button>
        </Stack>

        <Box>
          {arrDepositItems.map((item, index) => (
            <InputCustom
              onChange={() => {}}
              value={item}
              selected
              endAdornment={
                <IconButton onClick={() => handleDecreaseCount(index)}>
                  <CloseOutlinedIcon fontSize="large" />
                </IconButton>
              }
            />
          ))}
        </Box>
      </BoxCustom>

      <BoxCustom sx={{ flex: 1 }}>
        <Typography variant="h6" alignItems="center" display="flex" gap={1} fontWeight={700} minHeight="44px" mb={3.5}>
          Borrow
        </Typography>
        <Box>
          <InputCustom onChange={() => {}} value={''} selected readonly />
        </Box>
      </BoxCustom>
    </Stack>
  );
};

export default BorrowDepositSection;
