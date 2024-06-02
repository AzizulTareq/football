import React from "react";
import { Box, Modal, Typography } from "@mui/material";

const CustomModal = ({ open, onClose, children }) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          bgColor: "white",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
          Selected Players
        </Typography>
        {children}
      </Box>
    </Modal>
  );
};

export default CustomModal;
