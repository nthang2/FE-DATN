import { Stack, Tooltip, Typography, TypographyProps } from '@mui/material';
import InfoOutlineIcon from '@mui/icons-material/InfoOutlined';

interface IProps extends TypographyProps {
  content: string;
  tooltipText: string;
  showToolTip?: boolean;
}

const StabilityQuestionTooltip = (props: IProps) => {
  const { content, sx, showToolTip, tooltipText, ...rest } = props;

  return (
    <Stack sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant="body1" fontWeight={700} color="primary" sx={sx} {...rest}>
        {content}
      </Typography>
      {showToolTip && (
        <Tooltip title={tooltipText}>
          <InfoOutlineIcon sx={{ fontSize: '16px', ml: 1, color: '#D9D9D9' }} />
        </Tooltip>
      )}
    </Stack>
  );
};

export default StabilityQuestionTooltip;
