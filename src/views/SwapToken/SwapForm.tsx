import SwapVerticalCircleOutlinedIcon from '@mui/icons-material/SwapVerticalCircleOutlined';
import { IconButton, Stack, Typography } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { useMemo, useState } from 'react';
import ButtonLoading from 'src/components/General/ButtonLoading/ButtonLoading';
import ValueWithStatus from 'src/components/General/ValueWithStatus/ValueWithStatus';
import { findTokenInfoByToken, findTokenNameSolana, mapNameToInfoSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { LendingContract } from 'src/contracts/solana/contracts/LendingContract/LendingContract';
import useAsyncExecute from 'src/hooks/useAsyncExecute';
import { TokenName } from 'src/libs/crypto-icons';
import useSolanaBalanceToken from 'src/states/wallets/solana-blockchain/hooks/useSolanaBalanceToken';
import useSummarySolanaConnect from 'src/states/wallets/solana-blockchain/hooks/useSummarySolanaConnect';
import { decimalFlood } from 'src/utils/format';
import RepayCustomInput from '../MyPortfolio/components/InputCustom/RepayCustomInput';
import { listTokenAvailableSwap } from './constant';
import SwapInfo from './SwapInfo';
import useSwapConfig from 'src/hooks/useQueryHook/querySwap/useSwapConfig';

const usdaiInfo = mapNameToInfoSolana[TokenName.USDAI];
const defaultTokenAddress = Object.values(listTokenAvailableSwap)[0]?.address as string;

export default function SwapForm() {
  const wallet = useWallet();
  const { address } = useSummarySolanaConnect();
  const { asyncExecute, loading } = useAsyncExecute();
  const { data: swapConfig } = useSwapConfig();

  const [usdaiAmount, setUsdaiAmount] = useState('');
  const [selectTokenAmount, setSelectTokenAmount] = useState('');
  const [isReverse, setIsReverse] = useState(false);
  const [selectedToken, setSelectedToken] = useState(defaultTokenAddress);
  const [isValidate, setIsValidate] = useState(false);

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

  const selectedTokenInfo = useMemo(() => {
    return findTokenInfoByToken(selectedToken);
  }, [selectedToken]);

  const swapFee = useMemo(() => {
    if (!swapConfig) return 0;
    const stablecoin = swapConfig.stablecoins.find((stablecoin) => {
      return stablecoin.address.toString() === selectedTokenInfo?.address;
    });

    if (isReverse) return stablecoin?.fee1 || 0;
    return stablecoin?.fee0 || 0;
  }, [swapConfig, isReverse, selectedTokenInfo]);

  const handleReverse = () => {
    setIsReverse(!isReverse);
    setUsdaiAmount('');
    setSelectTokenAmount('');
  };

  const handleChangeAmount = (value: number | string) => {
    if (value === undefined || value === '') {
      setUsdaiAmount('');
      setSelectTokenAmount('');
      return;
    }

    const feeValue = (swapFee / 100) * (Number(value) / 100);
    const amountAfterFee = Number(value) - feeValue < 0 ? 0 : Number(value) - feeValue;

    if (isReverse) {
      setUsdaiAmount(amountAfterFee.toString());
      setSelectTokenAmount(value.toString());
    } else {
      setUsdaiAmount(value.toString());
      setSelectTokenAmount(amountAfterFee.toString());
    }
  };

  const handleChangeSelectToken = (value: string) => {
    setSelectedToken(value);
    setSelectTokenAmount('');
    setUsdaiAmount('');
  };

  const handleSwap = async () => {
    if (!wallet) return;
    const swapTokenContract = new LendingContract(wallet);
    const transactionHash = await swapTokenContract.swapToken(selectedToken, Number(selectTokenAmount), isReverse);

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
              value: usdaiAmount,
              onChange: (e) => handleChangeAmount(e.target.value),
              disabled: isReverse,
              placeholder: '0',
            }}
            selectOptions={[usdaiInfo.address]}
            maxValue={!isReverse ? usdaiBalance.toString() : undefined}
            subValue
            onClickMax={() => handleChangeAmount(usdaiBalance.toNumber())}
            rule={{
              max: {
                max: usdaiBalance.toNumber(),
                message: 'Input cannot exceed balance',
              },
            }}
            _onError={(error) => setIsValidate(!!error)}
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
              value: selectTokenAmount,
              disabled: !isReverse,
              onChange: (e) => handleChangeAmount(e.target.value),
              placeholder: '0',
            }}
            selectOptions={Object.values(listTokenAvailableSwap).map((token) => token.address)}
            subValue
            maxValue={isReverse ? selectTokenBalance.toString() : undefined}
            onClickMax={() => handleChangeAmount(selectTokenBalance.toNumber())}
            rule={{
              max: {
                max: selectTokenBalance.toNumber(),
                message: 'Input cannot exceed balance',
              },
            }}
            _onError={(error) => setIsValidate(!!error)}
          />
        </Stack>
      </Stack>

      <SwapInfo selectedToken={selectedToken} amount={selectTokenAmount} />

      <ButtonLoading
        fullWidth
        loading={loading}
        variant="contained"
        disabled={isValidate}
        onClick={() =>
          asyncExecute({
            fn: handleSwap,
            onSuccess: () => {
              refetchSelectTokenBalance();
              refetchUsdaiBalance();
              setUsdaiAmount('');
              setSelectTokenAmount('');
            },
          })
        }
      >
        Swap
      </ButtonLoading>
    </>
  );
}
