import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMyContext } from "@/Context/dataContext";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
interface PropsData {
  id: number;
  name?: string;
  mail?: string;
  file?: string | undefined;
  dateat?: string;
  checked: boolean;
}
export default function DeleteDialog(props: PropsData) {
  const [open, setOpen] = React.useState(false);

  const { deleteDatasorf, deleteDatahard } = useMyContext();
  const [checked, setChecked] = React.useState(true);
  const handleClickOpen = () => {
    setChecked(props.checked);
    setOpen(true);
  };

  function handleConfirmButtonClick(id: number) {
    if (checked) {
      deleteDatahard(id);
    } else {
      deleteDatasorf(id);
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        startIcon={<DeleteIcon />}
        onClick={handleClickOpen}
        color="error"
      >
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {checked ? "HardDelete" : "Delete"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              handleConfirmButtonClick(props.id);
            }}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
