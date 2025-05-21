import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent, DialogTitle, Divider, IconButton, Stack, Typography } from '@mui/material';
import { usePriorityFeeState, useSlippageToleranceState } from '../../state/hooks';
import RadioButton from './RadioButton';

const slippageOptions = [
  {
    value: 0.1,
    label: '0.1%',
  },
  {
    value: 0.5,
    label: '0.5%',
  },
  {
    value: 0.7,
    label: '0.7%',
  },
  {
    value: 1,
    label: '1%',
  },
];

const priorityFeeOptions = [
  {
    value: 'normal',
    label: 'Normal',
  },
  {
    value: 'turbo',
    label: 'Turbo',
  },
  {
    value: 'custom',
    label: 'Custom',
  },
];

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalSettingTrans = (props: IProps) => {
  const { isOpen, onClose } = props;
  const [slippageTolerance, setSlippageTolerance] = useSlippageToleranceState();
  const [priorityFee, setPriorityFee] = usePriorityFeeState();

  const handleChangeSlippageTolerance = (value: number) => {
    setSlippageTolerance(value);
  };

  const handleChangePriorityFee = (value: string) => {
    setPriorityFee(value);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth={'xs'}>
      <DialogTitle>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography variant="h6" component="h2">
            Setting Transaction
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Stack direction={'column'} gap={2}>
          <Typography>Slippage Tolerance</Typography>
          <Stack direction={'row'} gap={2}>
            {slippageOptions.map((option) => (
              <RadioButton
                isSelected={slippageTolerance === option.value}
                onClick={() => handleChangeSlippageTolerance(option.value)}
                label={`${option.value}`}
              />
            ))}
          </Stack>
          <Typography variant="body3" color={'text.secondary'}>
            The slippage tolerance is the maximum difference between the expected price and the price at which the transaction is executed.
          </Typography>

          <Divider sx={{ borderColor: '#ffffff1f' }} />
        </Stack>

        <Stack direction={'column'} gap={2} mt={3}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Priority Fee
          </Typography>
          <Stack direction={'row'} gap={2}>
            {priorityFeeOptions.map((option) => (
              <RadioButton
                isSelected={priorityFee === option.value}
                onClick={() => handleChangePriorityFee(option.value)}
                label={option.label}
              />
            ))}
          </Stack>
          <Typography variant="body3" color={'text.secondary'}>
            The priority fee is paid to the Solana network. This additional fee helps boost how a transaction is prioritized against others,
            resulting in faster transaction execution times.
          </Typography>

          <Divider sx={{ borderColor: '#ffffff1f' }} />
        </Stack>

        {/* <Stack direction={'row'} justifyContent={'space-between'} mt={3} gap={2}>
          <Button fullWidth variant={'contained'}>
            Apply
          </Button>
          <Button fullWidth variant={'outlined'}>
            Cancel
          </Button>
        </Stack> */}
      </DialogContent>
    </Dialog>
  );
};

export default ModalSettingTrans;
