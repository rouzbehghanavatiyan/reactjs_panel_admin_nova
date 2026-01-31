import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";

interface DeleteConfirmDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  open,
  title = "حذف آیتم",
  description = "آیا از حذف این آیتم اطمینان دارید؟",
  loading = false,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle bgcolor={"tomato"} color="white" >{title}</DialogTitle>

      <DialogContent>
        <Typography fontSize={14} mt={4} color="text.secondary">{description}</Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          انصراف
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          disabled={loading}
        >
          حذف
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
