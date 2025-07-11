import SwapVerticalCircleOutlinedIcon from '@mui/icons-material/SwapVerticalCircleOutlined';
import { IconButton, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import ButtonLoading from 'src/components/General/ButtonLoading/ButtonLoading';
import ValueWithStatus from 'src/components/General/ValueWithStatus/ValueWithStatus';
import { findTokenNameSolana, listTokenAvailable, mapNameToInfoSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { TokenName } from 'src/libs/crypto-icons';
import useSolanaBalanceToken from 'src/states/wallets/solana-blockchain/hooks/useSolanaBalanceToken';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';
import { decimalFlood } from 'src/utils/format';
import RepayCustomInput from '../MyPortfolio/components/InputCustom/RepayCustomInput';
import { useWallet } from '@solana/wallet-adapter-react';
import useAsyncExecute from 'src/hooks/useAsyncExecute';
import SwapInfo from './SwapInfo';
import { LendingContract } from 'src/contracts/solana/contracts/LendingContract/LendingContract';

const usdaiInfo = mapNameToInfoSolana[TokenName.USDAI];
const defaultTokenAddress = Object.values(listTokenAvailable)[0]?.address as string;

export default function SwapForm() {
  const wallet = useWallet();
  const { address } = useSummarySolanaConnect();
  const { asyncExecute, loading } = useAsyncExecute();

  const [usdaiAmount, setUsdaiAmount] = useState(0);
  const [selectTokenAmount, setSelectTokenAmount] = useState(0);
  const [isReverse, setIsReverse] = useState(false);
  const [selectedToken, setSelectedToken] = useState(defaultTokenAddress);

  const {
    balance: selectTokenBalance,
    isLoading: isLoadingSelectTokenBalance,
    refetch: refetchSelectTokenBalance,
  } = useSolanaBalanceToken(address, findTokenNameSolana[selectedToken]!);
  const {
    balance: usdaiBalance,
    isLoading: isLoadingUsdaiBalance,
    refetch: refetchUsdaiBalance,
  } = useSolanaBalanceToken(address, TokenName.USDAI);

  const handleReverse = () => {
    setIsReverse(!isReverse);
    setUsdaiAmount(0);
    setSelectTokenAmount(0);
  };

  const handleChangeAmount = (value: number) => {
    const maxBalance = !isReverse ? usdaiBalance.toNumber() : selectTokenBalance.toNumber();
    const validatedValue = Math.min(value, maxBalance);
    setUsdaiAmount(value);
    setSelectTokenAmount(value);
  };

  const handleChangeSelectToken = (value: string) => {
    setSelectedToken(value);
    setSelectTokenAmount(0);
    setUsdaiAmount(0);
  };

  const handleSwap = async () => {
    if (!wallet) return;
    const swapTokenContract = new LendingContract(wallet);
    let transactionHash = '';
    transactionHash = await swapTokenContract.swapToken(selectedToken, selectTokenAmount, isReverse);
    return transactionHash;
  };

  return (
    <>
      <Stack direction={isReverse ? 'column-reverse' : 'column'} gap={2}>
        <Stack direction={'column'} gap={0.5}>
          <Stack justifyContent={'space-between'}>
            <Typography variant="body2" sx={{ color: 'info.main' }}>
              {!isReverse ? 'From' : 'To'}
            </Typography>

            <ValueWithStatus
              status={[isLoadingUsdaiBalance ? 'pending' : 'success']}
              value={
                <Typography variant="body2" sx={{ color: 'info.main' }}>
                  {!isReverse ? 'Balance' : 'Available'}: {decimalFlood(usdaiBalance.toString(), 6)}
                </Typography>
              }
            />
          </Stack>

          <RepayCustomInput
            selectProps={{
              value: usdaiInfo.address,
              disabled: true,
            }}
            inputProps={{
              value: usdaiAmount.toString() || '0',
              onChange: (e) => handleChangeAmount(Number(e.target.value)),
              disabled: isReverse,
            }}
            selectOptions={[usdaiInfo.address]}
            maxValue={!isReverse ? usdaiBalance.toString() : undefined}
            subValue
            onClickMax={() => handleChangeAmount(usdaiBalance.toNumber())}
          />
        </Stack>

        <IconButton onClick={handleReverse} sx={{ height: '40px', width: '40px', margin: '0 auto' }}>
          <SwapVerticalCircleOutlinedIcon
            sx={{ height: '32px', width: '32px', color: 'info.main', margin: '0 auto', ':hover': { color: 'primary.main' } }}
          />
        </IconButton>

        <Stack direction={'column'} gap={0.5}>
          <Stack justifyContent={'space-between'}>
            <Typography variant="body2" sx={{ color: 'info.main' }}>
              {!isReverse ? 'To' : 'From'}
            </Typography>

            <ValueWithStatus
              status={[isLoadingSelectTokenBalance ? 'pending' : 'success']}
              value={
                <Typography variant="body2" sx={{ color: 'info.main' }}>
                  {isReverse ? 'Balance' : 'Available'}: {decimalFlood(selectTokenBalance.toString(), 6)}
                </Typography>
              }
            />
          </Stack>

          <RepayCustomInput
            selectProps={{
              value: selectedToken,
              onChange: (e) => handleChangeSelectToken(e.target.value),
            }}
            inputProps={{
              value: selectTokenAmount.toString() || '0',
              disabled: !isReverse,
              onChange: (e) => handleChangeAmount(Number(e.target.value)),
            }}
            selectOptions={Object.values(listTokenAvailable).map((token) => token.address)}
            subValue
            maxValue={isReverse ? selectTokenBalance.toString() : undefined}
            onClickMax={() => handleChangeAmount(selectTokenBalance.toNumber())}
          />
        </Stack>
      </Stack>

      <SwapInfo />

      <ButtonLoading
        fullWidth
        loading={loading}
        variant="contained"
        onClick={() =>
          asyncExecute({
            fn: handleSwap,
            onSuccess: () => {
              refetchSelectTokenBalance();
              refetchUsdaiBalance();
              setUsdaiAmount(0);
              setSelectTokenAmount(0);
            },
          })
        }
      >
        Swap
      </ButtonLoading>
    </>
  );
}
