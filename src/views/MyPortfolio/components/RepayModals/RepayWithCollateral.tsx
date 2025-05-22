import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import ButtonLoading from 'src/components/General/ButtonLoading/ButtonLoading';
import ValueWithStatus from 'src/components/General/ValueWithStatus/ValueWithStatus';
import { findTokenInfoByToken, listTokenAvailable, mapNameToInfoSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { SolanaEcosystemTokenInfo } from 'src/constants/tokens/solana-ecosystem/SolanaEcosystemTokenInfo';
import useAsyncExecute from 'src/hooks/useAsyncExecute';
import useJupiterQuote from 'src/hooks/useQueryHook/queryMyPortfolio/useJupiterQuote';
import useQueryRedeemConfig from 'src/hooks/useQueryHook/queryMyPortfolio/useQueryRedeemConfig';
import useRedeemWithCollateral from 'src/hooks/useQueryHook/queryMyPortfolio/useRedeemWithCollateral';
import { TokenName } from 'src/libs/crypto-icons';
import { useCrossModeState } from 'src/states/hooks';
import { BN } from 'src/utils';
import { decimalFlood } from 'src/utils/format';
import { validate } from 'src/utils/validateForm';
import { usePriorityFeeState, useSlippageToleranceState } from '../../state/hooks';
import RepayCustomInput from '../InputCustom/RepayCustomInput';
import RepayWithCollateralInfo from './RepayWithCollateralInfo';
import { defaultRepayFormValue, TRepayForm } from './type';
import { useDebounce } from 'use-debounce';
import useQueryAllTokensPrice from 'src/hooks/useQueryAllTokensPrice';
import clsx from 'clsx';
import { IconToken } from 'src/libs/crypto-icons/common/IconToken';
import useMyPortfolio from 'src/hooks/useQueryHook/queryMyPortfolio/useMyPortfolio';
interface IProps {
  token?: SolanaEcosystemTokenInfo;
}

const RepayWithCollateral = (props: IProps) => {
  const { token } = props;
  const usdaiInfo = mapNameToInfoSolana[TokenName.USDAI];

  const [helperText, setHelperText] = useState<string | undefined>();
  const [repayValue, setRepayValue] = useState<TRepayForm>(
    defaultRepayFormValue(token?.address || Object.values(listTokenAvailable)[0].address)
  );

  const { data: listTokenPrice } = useQueryAllTokensPrice();
  const { mutateAsync } = useRedeemWithCollateral();
  const [crossMode] = useCrossModeState();
  const { asyncExecute, loading: submitLoading } = useAsyncExecute();
  const [slippageTolerance] = useSlippageToleranceState();
  const [priorityFee] = usePriorityFeeState();
  const { data: redeemConfig, status: statusRedeemConfig } = useQueryRedeemConfig(repayValue.selectedToken);
  const { refetch: refetchMyPortfolioInfo } = useMyPortfolio();
  const [debounceRepayInput] = useDebounce(repayValue.repayInput, 500);
  const { data: jupiterQuote, refetch: refetchJupiterQuote } = useJupiterQuote({
    repayInput: debounceRepayInput,
    selectedToken: repayValue.selectedToken,
    slippageBps: slippageTolerance,
  });

  const usdaiAmount = useMemo(() => {
    if (!jupiterQuote) return 0;

    return BN(jupiterQuote?.outAmount)
      .div(BN(10).pow(BN(usdaiInfo.decimals)))
      .toNumber();
  }, [jupiterQuote, usdaiInfo.decimals]);

  const maxRepayAmount = useMemo(() => {
    if (!redeemConfig || !redeemConfig?.loan || !listTokenPrice) return 0;

    const { selectedToken } = repayValue;
    const selectTokenPrice = listTokenPrice[selectedToken].price;
    const usdaiPrice = listTokenPrice[usdaiInfo.address].price;
    const selectTokenInfo = findTokenInfoByToken(selectedToken);

    const collateralAmount = redeemConfig.loan.collateralAmount?.toNumber();
    const mintedValue = (redeemConfig.loan.mintedAmount * usdaiPrice) / BN(10).pow(usdaiInfo.decimals).toNumber();

    const collateralValue =
      (Number(collateralAmount) * selectTokenPrice) /
      BN(10)
        .pow(selectTokenInfo?.decimals || 0)
        .toNumber();
    const usdaiInPool = redeemConfig?.usdaiInPool?.balance.usdai * usdaiPrice - 1000;
    const maxCollateralAmount = Math.min(mintedValue, usdaiInPool) / selectTokenPrice;

    if (crossMode) {
      const maxCollateralValue = Math.min(mintedValue, collateralValue, usdaiInPool);
      const result = maxCollateralValue / selectTokenPrice;

      return result;
    }

    return Math.min(maxCollateralAmount, collateralAmount);
  }, [redeemConfig, listTokenPrice, repayValue, usdaiInfo.address, usdaiInfo.decimals, crossMode]);

  const handleChangeInput = (key: keyof TRepayForm, value: string) => {
    const errMessage = validate(value, {
      max: maxRepayAmount,
    });
    setHelperText(errMessage.error[0]);
    setRepayValue({ ...repayValue, [key]: value });
  };

  const handleChangeSelect = (value: string) => {
    setRepayValue({ selectedToken: value, repayInput: '0' });
  };

  const handleSubmit = async () => {
    const slippageBps = slippageTolerance * 100;

    await asyncExecute({
      fn: async () => await mutateAsync({ ...repayValue, slippageBps: slippageBps, priorityFee: priorityFee }),
      onSuccess: async () => {
        setRepayValue(defaultRepayFormValue(token?.address || Object.values(listTokenAvailable)[0].address));
        await refetchJupiterQuote();
        await refetchMyPortfolioInfo();
      },
    });
  };

  useEffect(() => {
    //set default token if token not in list available collateral
    if (redeemConfig && crossMode && redeemConfig?.loan?.listAvailableCollateral) {
      if (redeemConfig?.loan?.listAvailableCollateral.indexOf(repayValue.selectedToken) === -1) {
        setRepayValue(defaultRepayFormValue(redeemConfig?.loan?.listAvailableCollateral[0]));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redeemConfig]);

  return (
    <Stack
      direction={'column'}
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
      <Stack direction={'column'} gap={0.5}>
        <Stack justifyContent={'space-between'}>
          <Typography variant="body2" sx={{ color: 'info.main' }}>
            Repay with:
          </Typography>

          <ValueWithStatus
            status={[statusRedeemConfig]}
            value={
              <Typography variant="body2" sx={{ color: 'info.main' }}>
                Repayable amount: {decimalFlood(maxRepayAmount, 6)}
              </Typography>
            }
          />
        </Stack>

        <RepayCustomInput
          selectProps={{
            value: repayValue.selectedToken,
            onChange: (e) => handleChangeSelect(e.target.value),
            disabled: !crossMode,
          }}
          inputProps={{
            value: repayValue.repayInput,
            onChange: (e) => handleChangeInput('repayInput', e.target.value),
          }}
          error={helperText}
          maxValue={maxRepayAmount}
          selectOptions={redeemConfig?.loan?.listAvailableCollateral || []}
          subValue
          onClickMax={() => handleChangeInput('repayInput', String(maxRepayAmount) || '0')}
        />
      </Stack>

      <ArrowDownwardIcon sx={{ height: '32px', width: '32px', color: 'info.main', margin: '0 auto' }} />

      <Stack direction={'column'} gap={0.5}>
        <Stack justifyContent={'space-between'}>
          <Typography variant="body2" sx={{ color: 'info.main' }}>
            Your Repay:
          </Typography>
        </Stack>

        <RepayCustomInput
          selectProps={{
            value: usdaiInfo.address,
            disabled: true,
          }}
          selectOptions={[usdaiInfo.address]}
          inputProps={{
            value: usdaiAmount.toString() || '0',
            disabled: true,
          }}
          subValue
        />
      </Stack>

      <RepayWithCollateralInfo
        priceImpact={jupiterQuote?.priceImpactPct}
        minExpected={jupiterQuote?.otherAmountThreshold}
        token={token || usdaiInfo}
        usdaiRepay={usdaiAmount.toString() || '0'}
        mintedAmount={redeemConfig?.loan?.mintedAmount?.toString() || '0'}
      />

      <Box className={clsx(['box', 'flex-space-between'])} sx={{ border: '#666662 solid 1px', position: 'relative' }}>
        <Box className="flex-center">
          <IconToken tokenName={TokenName.USDAI} />
          <Typography sx={{ ml: 1, fontWeight: 600 }}>Redeem {TokenName.USDAI}</Typography>
        </Box>
        <ButtonLoading
          disabled={!!helperText || !BN(repayValue.repayInput).gt(0)}
          size="small"
          loading={submitLoading}
          variant="contained"
          onClick={handleSubmit}
        >
          Redeem
        </ButtonLoading>
      </Box>
    </Stack>
  );
};

export default RepayWithCollateral;
