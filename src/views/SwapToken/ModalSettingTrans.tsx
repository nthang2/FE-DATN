import ModalSettingFee from 'src/components/Modals/ModalSettingFee/ModalSettingFee';
import { usePriorityFeeSwapState, useSlippageSwapState } from './state/hooks';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalSettingTrans = (props: IProps) => {
  const { isOpen, onClose } = props;
  const [slippageTolerance, setSlippageTolerance] = useSlippageSwapState();
  const [priorityFee, setPriorityFee] = usePriorityFeeSwapState();

  const handleChangeSlippageTolerance = (value: number) => {
    setSlippageTolerance(value);
  };

  const handleChangePriorityFee = (value: number) => {
    setPriorityFee(value);
  };

  return (
    <ModalSettingFee
      isOpen={isOpen}
      onClose={onClose}
      slippageTolerance={slippageTolerance}
      priorityFee={priorityFee}
      setSlippageTolerance={handleChangeSlippageTolerance}
      setPriorityFee={handleChangePriorityFee}
      title="Setting Swap"
    />
  );
};

export default ModalSettingTrans;
