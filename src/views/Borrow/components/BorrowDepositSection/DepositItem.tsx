import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { IconButton } from '@mui/material';
import { useBorrowSubmitState } from '../../state/hooks';
import { TBorrowItem } from '../../state/types';
import DepositCustomInput from '../InputCustom/DepositCustomInput';

interface IProps {
  item: TBorrowItem;
  index: number;
  handleChangeInput: (index: number, value: string) => void;
  handleChangeSelectInput: (index: number, value: string) => void;
  handleRemoveItem: (index: number) => void;
}

const DepositItem = (props: IProps) => {
  const { item, handleChangeInput, handleChangeSelectInput, index, handleRemoveItem } = props;
  const [isSubmitted] = useBorrowSubmitState();

  return (
    <DepositCustomInput
      readonly={isSubmitted}
      inputProps={{
        onChange: (e) => {
          handleChangeInput(index, e.target.value);
        },
        value: item.value,
      }}
      selectProps={{
        onChange: (e) => handleChangeSelectInput(index, e.target.value),
        value: item.address,
      }}
      key={index}
      endAdornment={
        <IconButton onClick={() => handleRemoveItem(index)} sx={{ display: isSubmitted ? 'none' : 'flex' }} hidden={isSubmitted}>
          <CloseOutlinedIcon fontSize="large" />
        </IconButton>
      }
      subValue={item.price}
      error={item.error}
    />
  );
};

export default DepositItem;
