import { Box, Stack, Typography } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { Icon, TokenName } from 'crypto-token-icon';
import { useMemo, useState } from 'react';
import CustomTextField from 'src/components/CustomForms/CustomTextField';
import ButtonLoading from 'src/components/General/ButtonLoading/ButtonLoading';
import ValueWithStatus from 'src/components/General/ValueWithStatus/ValueWithStatus';
import { mapNameToInfoSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { LiquidatorContract } from 'src/contracts/solana/contracts/LiquidatorContract';
import useAsyncExecute from 'src/hooks/useAsyncExecute';
import useQueryAllTokensPrice from 'src/hooks/useQueryAllTokensPrice';
import useGetVaultInfo from 'src/hooks/useQueryHook/queryLiquidation/useGetVaultInfo';
import { BN } from 'src/utils';
import { formatNumber } from 'src/utils/format';

const UnstakeModal = () => {
  const wallet = useWallet();
  const [input, setInput] = useState('');
  const { asyncExecute, loading } = useAsyncExecute();
  const { data: vaultInfo, status: vaultStatus, refetch: refetchVaultInfo } = useGetVaultInfo();
  const { data: priceList, status: priceStatus } = useQueryAllTokensPrice();

  const maxWithdrawAbleUsd = useMemo(() => {
    if (!vaultInfo) return 0;
    if (!priceList) return vaultInfo.maxWithdrawable;
    const usdaiInfo = mapNameToInfoSolana[TokenName.USDAI];

    return BN(vaultInfo.maxWithdrawable).multipliedBy(priceList[usdaiInfo.address]?.price || 1);
  }, [vaultInfo, priceList]);

  const handleMax = () => {
    setInput(vaultInfo?.maxWithdrawable.toString() || '0');
  };

  const handleWithdraw = () => {
    if (!wallet) return;

    asyncExecute({
      fn: async () => {
        const contract = new LiquidatorContract(wallet);
        await contract.withdraw(input);
      },
      onSuccess: async () => {
        setInput('0');
        await refetchVaultInfo();
      },
    });
  };

  return (
    <Box
      sx={{
        '.box': {
          display: 'flex',
          py: 2,
          height: '82px',
          placeItems: 'center',
          borderRadius: '16px',
          alignItems: 'center',
          mt: 1,
          color: '#fff',
          px: 2,
        },
      }}
    >
      <Box className="flex-space-between">
        <Typography variant="body2" sx={{ fontWeight: 500, color: '#888880' }}>
          Amount
        </Typography>
        <ValueWithStatus
          status={[vaultStatus]}
          value={
            <Typography variant="body3" sx={{ color: 'text.secondary' }}>
              Max: {vaultInfo?.maxWithdrawable || 0}
            </Typography>
          }
        />
      </Box>
      <Box
        className="box"
        sx={{
          bgcolor: 'background.secondary',
        }}
      >
        <Stack
          sx={{
            alignItems: 'center',
            px: 2,
            py: 2,
            mr: 2,
            border: '1px solid rgba(102, 102, 98, 1)',
            borderRadius: '8px',
            bgcolor: 'secondary.dark',
          }}
        >
          <Icon tokenName={TokenName.USDAI} sx={{ mr: 1 }} />
          <Typography variant="body2">{TokenName.USDAI}</Typography>
        </Stack>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box sx={{ py: 2 }}>
            <CustomTextField
              type="number"
              variant="filled"
              fullWidth
              focused={true}
              placeholder="0"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'background.secondary', // Đổi màu nền
                },
                '& .MuiInputBase-input': {
                  bgcolor: 'background.secondary',
                  fontSize: '24px',
                  fontFamily: 'inherit',
                  outline: 'none',
                  fontWeight: '700',
                  padding: 0,
                  mr: '12px',
                  // py: 0,
                  color: '#fff',
                  '&::placeholder': {
                    color: 'text.tertiary',
                    opacity: 0.6,
                  },
                  width: '100%',
                },
                '& .MuiFilledInput-root': {
                  backgroundColor: 'background.secondary',
                  '&:before, &:after': {
                    display: 'none',
                  },
                },
                '& .MuiFilledInput-root.Mui-focused': {
                  backgroundColor: 'background.secondary',
                },
              }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              helperText={undefined}
            />
            <ValueWithStatus
              status={[vaultStatus, priceStatus]}
              value={
                <Typography variant="body3" sx={{ color: 'text.secondary' }}>
                  {formatNumber(maxWithdrawAbleUsd, { fractionDigits: 2, suffix: '$' })}
                </Typography>
              }
            />
          </Box>
        </Box>
        <Box sx={{ alignItems: 'center', gap: 1.5, height: '100%', display: 'flex' }}>
          <Typography variant="h5" sx={{ cursor: 'pointer', fontWeight: 600, color: '#FCFFD8' }} onClick={handleMax}>
            Max
          </Typography>
        </Box>
      </Box>

      <ButtonLoading sx={{ mt: 4 }} variant="contained" loading={loading} fullWidth onClick={handleWithdraw}>
        Confirm
      </ButtonLoading>
    </Box>
  );
};

export default UnstakeModal;
