import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent, DialogTitle, Divider, IconButton, Stack, Typography } from '@mui/material';
import RadioButton from '../../../views/MyPortfolio/components/RepayModals/RadioButton';

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
    value: 1,
    label: '1%',
  },
  {
    value: 3,
    label: '3%',
  },
];

const priorityFeeOptions = [
  {
    value: 1_000,
    label: 'Normal',
  },
  {
    value: 1_00_000,
    label: 'Turbo',
  },
  {
    value: 1_000_000,
    label: 'Fast',
  },
];

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  slippageTolerance: number;
  priorityFee: number;
  setSlippageTolerance: (value: number) => void;
  setPriorityFee: (value: number) => void;
  title?: string;
}

const ModalSettingTrans = (props: IProps) => {
  const { isOpen, onClose, slippageTolerance, priorityFee, setSlippageTolerance, setPriorityFee, title } = props;

  const handleChangeSlippageTolerance = (value: number) => {
    setSlippageTolerance(value);
  };

  const handleChangePriorityFee = (value: number) => {
    setPriorityFee(value);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth={'xs'}>
      <DialogTitle>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography variant="h6" component="h2">
            {title || 'Setting Transaction'}
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
                label={`${option.label}`}
              />
            ))}
          </Stack>
          <Typography variant="body3" color={'text.secondary'}>
            The slippage tolerance is the maximum difference between the expected price and the price at which the transaction is executed.
          </Typography>

          <Divider sx={{ borderColor: '#ffffff1f' }} />
        </Stack>

        <Stack direction={'column'} gap={2} mt={3}>
          <Typography id="modal-modal-title">Priority Fee</Typography>
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
      </DialogContent>
    </Dialog>
  );
};

export default ModalSettingTrans;
