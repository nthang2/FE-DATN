import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { IconButton, Tooltip, TooltipProps } from '@mui/material';

type ITooltipInfo = Omit<TooltipProps, 'children'>;

const TooltipInfo = (props: ITooltipInfo) => {
  return (
    <Tooltip {...props}>
      <IconButton>
        <InfoOutlinedIcon />
      </IconButton>
    </Tooltip>
  );
};

export default TooltipInfo;
