import { Stack, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import ButtonLoading from 'src/components/General/ButtonLoading/ButtonLoading';
import ValueWithStatus from 'src/components/General/ValueWithStatus/ValueWithStatus';
import { findTokenInfoByToken, listTokenAvailable, mapNameToInfoSolana } from 'src/constants/tokens/solana-ecosystem/mapNameToInfoSolana';
import { SolanaEcosystemTokenInfo } from 'src/constants/tokens/solana-ecosystem/SolanaEcosystemTokenInfo';
import useAsyncExecute from 'src/hooks/useAsyncExecute';
import useQueryAllTokensPrice from 'src/hooks/useQueryAllTokensPrice';
import useJupiterQuote from 'src/hooks/useQueryHook/queryMyPortfolio/useJupiterQuote';
import useMyPortfolio from 'src/hooks/useQueryHook/queryMyPortfolio/useMyPortfolio';
import useQueryRedeemConfig from 'src/hooks/useQueryHook/queryMyPortfolio/useQueryRedeemConfig';
import { useCrossModeState } from 'src/states/hooks';
import { BN } from 'src/utils';
import { validate } from 'src/utils/validateForm';
import { calcCollateralAmountRaw } from '../../utils';
import RepayCustomInput from '../InputCustom/RepayCustomInput';
import { defaultRepayFormValue, TRepayForm } from './type';
import { decimalFlood } from 'src/utils/format';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { TokenName } from 'src/libs/crypto-icons';
import { mapNameToIcon } from 'src/libs/crypto-icons/constants/iconMappings';

interface IProps {
  token?: SolanaEcosystemTokenInfo;
}

const RepayWithCollateral = (props: IProps) => {
  const { token } = props;
  const [repayValue, setRepayValue] = useState<TRepayForm>(
    defaultRepayFormValue(token?.address || Object.values(listTokenAvailable)[0].address)
  );
  const { data, status: redeemConfigStatus, refetch: refetchRedeem } = useQueryRedeemConfig(repayValue.selectedToken);
  const { data: listPrice } = useQueryAllTokensPrice();
  const { mutateAsync } = useJupiterQuote();
  const [crossMode] = useCrossModeState();
  const { asyncExecute, loading: submitLoading } = useAsyncExecute();
  const { asset, refetch: refetchAsset } = useMyPortfolio();
  const [helperText, setHelperText] = useState<string | undefined>();

  const usdaiInfo = mapNameToInfoSolana[TokenName.USDAI];
  const IconUsdai = mapNameToIcon[TokenName.USDAI];

  const collateralAmount = useMemo(() => {
    const { amountInWei } = calcCollateralAmountRaw(listPrice, repayValue.repayInput, repayValue.selectedToken);
    return amountInWei;
  }, [listPrice, repayValue.repayInput, repayValue.selectedToken]);

  const maxRepayAmount = useMemo(() => {
    if (data && data.redeemConfig) {
      const selectedTokenInfo = findTokenInfoByToken(repayValue.selectedToken);
      if (!selectedTokenInfo) return 0;

      const percentLoan = BN(asset?.[selectedTokenInfo.address].usdaiToRedeem.toFixed(5) || 0)
        .multipliedBy(data.redeemConfig.maxUsdaiRate)
        .dividedBy(10000);
      const maxValue = BN(Number(data.redeemConfig.maxUsdaiAmount)).dividedBy(`1e${usdaiInfo.decimals}`).toNumber();

      return Math.min(maxValue, Number(decimalFlood(percentLoan.toString(), 4)));
    }

    return 0;
  }, [asset, data, repayValue.selectedToken, usdaiInfo.decimals]);

  const handleChangeInput = (key: keyof TRepayForm, value: string) => {
    if (data && data.redeemConfig) {
      const minValue = BN(Number(data.redeemConfig.minUsdaiAmount)).dividedBy(`1e${usdaiInfo.decimals}`).toNumber();

      const errMessage = validate(value, {
        min: minValue,
        max: maxRepayAmount,
      });
      setHelperText(errMessage.error[0]);
      setRepayValue({ ...repayValue, [key]: value });
    }
  };

  const handleSubmit = async () => {
    if (data && data.redeemConfig) {
      await asyncExecute({
        fn: async () => await mutateAsync({ ...repayValue, slippageBps: data.redeemConfig.slippageBps }),
        onSuccess: async () => {
          setRepayValue(defaultRepayFormValue(token?.address || Object.values(listTokenAvailable)[0].address));
          await refetchAsset();
          await refetchRedeem();
        },
      });
    }
  };

  return (
    <Stack direction={'column'} gap={3}>
      <Stack direction={'column'} gap={0.5}>
        <Stack justifyContent={'space-between'}>
          <Typography variant="body2" sx={{ color: 'info.main' }}>
            Your Repay:
          </Typography>

          <ValueWithStatus
            status={[redeemConfigStatus]}
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

          {/* <Typography variant="body2" sx={{ color: 'info.main' }}>
            Available: {decimalFlood(availableRepay || 0, 5)}
          </Typography> */}
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
        />
      </Stack>

      <Stack justifyContent={'space-between'} borderTop={'1px solid #323326'} borderBottom={'1px solid #323326'} paddingY={2}>
        <Typography variant="body1" sx={{ color: 'info.main' }}>
          Action
        </Typography>

        <Stack gap={1} alignItems={'center'}>
          <Typography variant="body2" sx={{ color: 'info.main' }}>
            Redeem
          </Typography>
          <IconUsdai />
          <Typography variant="body2" sx={{ color: 'info.main' }}>
            USDAI
          </Typography>
        </Stack>
      </Stack>

      <ButtonLoading
        variant="contained"
        onClick={handleSubmit}
        loading={submitLoading}
        disabled={!!helperText || !BN(repayValue.repayInput).gt(0)}
      >
        Redeem
      </ButtonLoading>
    </Stack>
  );
};

export default RepayWithCollateral;
