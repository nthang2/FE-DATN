import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { Icon, TokenName } from 'crypto-token-icon';
import { PlusIcon } from 'src/assets/icons';
import { BoxCustom } from 'src/components/Common/CustomBox/CustomBox';
import TooltipInfo from 'src/components/Common/TooltipInfo/TooltipInfo';
import BorrowCustomInput from 'src/components/CustomForm/InputCustom/BorrowCustomInput';
import { findTokenInfoByToken } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import useQueryAllTokensPrice from 'src/hooks/useQueryAllTokensPrice';
import { defaultBorrowValue } from '../../constant';
import { useBorrowSubmitState, useDepositState } from '../../state/hooks';
import { convertToUsd } from '../../utils';

const DepositSection = () => {
  const [depositItems, setDepositState] = useDepositState();
  const [isSubmitted] = useBorrowSubmitState();
  const { data: listPrice } = useQueryAllTokensPrice();

  const handleRemoveItem = (index: number) => {
    if (depositItems.length === 1) return;
    const newArr = [...depositItems];
    newArr.splice(index, 1);

    setDepositState(newArr);
  };

  const handleAddItem = () => {
    if (depositItems.length <= 10) {
      setDepositState((prev) => [...prev, defaultBorrowValue]);
    }
  };

  const handleChangeSelectInput = (index: number, value: string) => {
    const cloneArr = depositItems.map((item, arrIndex) => {
      if (arrIndex === index) {
        return { ...item, address: value };
      }

      return item;
    });

    setDepositState(cloneArr);
  };

  const handleChangeInput = (index: number, value: string) => {
    const cloneArr = depositItems.map((item, arrIndex) => {
      if (arrIndex === index) {
        return { ...item, value: value, price: convertToUsd(item.address, value, listPrice) };
      }

      return item;
    });

    setDepositState(cloneArr);
  };

  return (
    <Box>
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
            disabled={isSubmitted}
            onClick={handleAddItem}
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
          {depositItems.map((item, index) => {
            return (
              <BorrowCustomInput
                readonly={isSubmitted}
                inputProps={{
                  onChange: (e) => handleChangeInput(index, e.target.value),
                  value: item.value,
                }}
                selectProps={{
                  onChange: (e) => handleChangeSelectInput(index, e.target.value),
                  value: item.address,
                }}
                key={index}
                endAdornment={
                  <IconButton onClick={() => handleRemoveItem(index)} sx={{ display: isSubmitted ? 'none' : 'block' }} hidden={isSubmitted}>
                    <CloseOutlinedIcon fontSize="large" />
                  </IconButton>
                }
                subValue={item.price}
              />
            );
          })}
        </Box>
      </BoxCustom>

      <Stack bgcolor="#333331" p="16px 20px" borderRadius="0px 0px 16px 16px" alignItems="center">
        <Stack>
          {depositItems.slice(0, 2).map((item, index) => {
            const tokenInfo = findTokenInfoByToken(item.address);
            return <Icon key={index} tokenName={tokenInfo?.symbol as TokenName} sx={{ mr: '1px', width: '16px', height: '16px' }} />;
          })}
        </Stack>

        <Typography ml={1} variant="body1">
          Already deposited ~ $6.30
        </Typography>
      </Stack>
    </Box>
  );
};

export default DepositSection;
