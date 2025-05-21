import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Stack, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import ButtonLoading from 'src/components/General/ButtonLoading/ButtonLoading';
import ValueWithStatus from 'src/components/General/ValueWithStatus/ValueWithStatus';
import { listTokenAvailable, mapNameToInfoSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { SolanaEcosystemTokenInfo } from 'src/constants/tokens/solana-ecosystem/SolanaEcosystemTokenInfo';
import useAsyncExecute from 'src/hooks/useAsyncExecute';
import useQueryAllTokensPrice from 'src/hooks/useQueryAllTokensPrice';
import useRedeemWithCollateral from 'src/hooks/useQueryHook/queryMyPortfolio/useRedeemWithCollateral';
import { TokenName } from 'src/libs/crypto-icons';
import { useCrossModeState } from 'src/states/hooks';
import { BN } from 'src/utils';
import { validate } from 'src/utils/validateForm';
import { calcCollateralAmountRaw } from '../../utils';
import RepayCustomInput from '../InputCustom/RepayCustomInput';
import RepayWithCollateralInfo from './RepayWithCollateralInfo';
import { defaultRepayFormValue, TRepayForm } from './type';
import { usePriorityFeeState } from '../../state/hooks';
import { useSlippageToleranceState } from '../../state/hooks';
interface IProps {
  token?: SolanaEcosystemTokenInfo;
}

const RepayWithCollateral = (props: IProps) => {
  const { token } = props;
  const [repayValue, setRepayValue] = useState<TRepayForm>(
    defaultRepayFormValue(token?.address || Object.values(listTokenAvailable)[0].address)
  );
  const { data: listPrice } = useQueryAllTokensPrice();
  const { mutateAsync } = useRedeemWithCollateral();
  const [crossMode] = useCrossModeState();
  const { asyncExecute, loading: submitLoading } = useAsyncExecute();
  const [helperText, setHelperText] = useState<string | undefined>();
  const [slippageTolerance] = useSlippageToleranceState();
  const [priorityFee] = usePriorityFeeState();

  const usdaiInfo = mapNameToInfoSolana[TokenName.USDAI];

  const collateralAmount = useMemo(() => {
    const { amountInWei } = calcCollateralAmountRaw(listPrice, repayValue.repayInput, repayValue.selectedToken);
    return amountInWei;
  }, [listPrice, repayValue.repayInput, repayValue.selectedToken]);

  const maxRepayAmount = useMemo(() => {
    return 1;
  }, []);

  const handleChangeInput = (key: keyof TRepayForm, value: string) => {
    const errMessage = validate(value, {
      max: maxRepayAmount,
    });
    setHelperText(errMessage.error[0]);
    setRepayValue({ ...repayValue, [key]: value });
  };

  const handleSubmit = async () => {
    const slippageBps = slippageTolerance * 100;

    await asyncExecute({
      fn: async () => await mutateAsync({ ...repayValue, slippageBps: slippageBps, priorityFee: priorityFee }),
      onSuccess: async () => {
        setRepayValue(defaultRepayFormValue(token?.address || Object.values(listTokenAvailable)[0].address));
      },
    });
  };

  return (
    <Stack direction={'column'}>
      <Stack direction={'column'} gap={0.5}>
        <Stack justifyContent={'space-between'}>
          <Typography variant="body2" sx={{ color: 'info.main' }}>
            Your Repay:
          </Typography>

          <ValueWithStatus
            status={['success']}
            value={
              <Typography variant="body2" sx={{ color: 'info.main' }}>
                Repayable amount: {maxRepayAmount}
              </Typography>
            }
          />
        </Stack>

        <RepayCustomInput
          selectProps={{
            value: usdaiInfo.address,
            disabled: true,
          }}
          selectOptions={[usdaiInfo.address]}
          inputProps={{
            value: repayValue.repayInput,
            onChange: (e) => handleChangeInput('repayInput', e.target.value),
          }}
          maxValue={maxRepayAmount}
          onClickMax={() => handleChangeInput('repayInput', String(maxRepayAmount) || '0')}
          error={helperText}
        />
      </Stack>

      <ArrowDownwardIcon sx={{ height: '32px', width: '32px', color: 'info.main', margin: '0 auto' }} />

      <Stack direction={'column'} gap={0.5}>
        <Stack justifyContent={'space-between'}>
          <Typography variant="body2" sx={{ color: 'info.main' }}>
            Repay with:
          </Typography>
        </Stack>

        <RepayCustomInput
          selectProps={{
            value: repayValue.selectedToken,
            onChange: (e) => handleChangeInput('selectedToken', e.target.value),
            disabled: !crossMode,
          }}
          inputProps={{
            value: collateralAmount.toFixed(6),
            disabled: true,
          }}
          subValue
        />
      </Stack>

      <RepayWithCollateralInfo />

      <ButtonLoading
        variant="contained"
        onClick={handleSubmit}
        loading={submitLoading}
        disabled={!!helperText || !BN(repayValue.repayInput).gt(0)}
        sx={{ mt: 2 }}
      >
        Redeem
      </ButtonLoading>
    </Stack>
  );
};

export default RepayWithCollateral;
