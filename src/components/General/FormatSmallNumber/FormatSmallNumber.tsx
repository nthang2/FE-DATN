import { Tooltip } from '@mui/material';
import { roundNumber } from 'src/utils/format';

type IProps = {
  value: number | undefined;
  decimal?: number;
  contentBeforeValue?: string;
  fallbackDisplay?: string;
};

const FormatSmallNumber = (props: IProps) => {
  const { value, decimal = 4, contentBeforeValue = '', fallbackDisplay = '0' } = props;

  if (!value || value.toString() === 'NaN' || value === 0) {
    return fallbackDisplay;
  }

  if (value > 0.001 || value < -0.001) {
    const roundedNumber = roundNumber(value, decimal);

    return (
      <div className="small_number" style={{ display: 'inline' }}>
        {contentBeforeValue}
        {value === 0 ? value.toString() : roundedNumber}
      </div>
    );
  }

  return (
    <Tooltip title={value.toString()} placement="bottom-start" arrow={false}>
      <div className="small_number" style={{ cursor: 'pointer', display: 'inline' }}>{`< ${contentBeforeValue}0.001`}</div>
    </Tooltip>
  );
};

export default FormatSmallNumber;
