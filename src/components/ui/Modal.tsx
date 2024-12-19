import React from 'react';
import { Modal as ModalMUI, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ModalWrapperProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  width?: string | number;
  height?: string | number;
}

export const Modal: React.FC<ModalWrapperProps> = ({
                                                     open,
                                                     onClose,
                                                     title,
                                                     children,
                                                     width = '500px',
                                                     height = 'auto',
                                                   }) => {
  return (
    <ModalMUI
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width,
          height,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        {title && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography id="modal-title" variant="h6" component="h2">
              {title}
            </Typography>
            <IconButton onClick={onClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>
        )}
        <Box id="modal-description">{children}</Box>
      </Box>
    </ModalMUI>
  );
};

export default Modal;
