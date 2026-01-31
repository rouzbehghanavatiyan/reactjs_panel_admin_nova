import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  maxWidth = "sm",
  children,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={maxWidth}>
      {title && (
        <DialogTitle
          sx={{
            bgcolor: "Highlight",
            color:"white",
            m: 0,
            p: 2,
            position: "relative",
            transform: "scaleX(-1)", 
            direction: "ltr",
          }}
        >
          <Box sx={{ transform: "scaleX(-1)", fontWeight: "bold" }}>
            {title}
          </Box>

          <IconButton
            onClick={onClose}
            aria-label="close"
            sx={{
              position: "absolute",
              left: 8, 
              top: 8,
              transform: "scaleX(-1)", 
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      )}

      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
