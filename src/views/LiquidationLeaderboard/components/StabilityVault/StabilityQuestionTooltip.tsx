import { Tooltip, Typography, TypographyProps } from '@mui/material';
import React from 'react';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

interface IProps extends TypographyProps {
  content: string;
  tooltipText: string;
}

const StabilityQuestionTooltip = (props: IProps) => {
  const { content, tooltipText, sx, ...rest } = props;

  return (
    <Typography variant="body1" fontWeight={700} color="primary" sx={{ display: 'flex', alignItems: 'center', ...sx }} {...rest}>
      {content}
      <Tooltip title={tooltipText}>
        <HelpOutlineIcon sx={{ fontSize: '20px', ml: 1, color: '#D9D9D9' }} />
      </Tooltip>
    </Typography>
  );
};

export default StabilityQuestionTooltip;
