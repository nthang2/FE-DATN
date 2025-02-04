import { DialogProps } from '@mui/material';
import { ReactNode } from 'react';

export type TModalData = {
    open: boolean;
    title: string | ReactNode;
    modalProps?: Omit<DialogProps, 'open'>;
    conditionOpen?: boolean | (() => boolean);
    content?: ReactNode;
};

export type TModalFunctionName = 'setModalData' | 'openModal' | 'closeModal';
