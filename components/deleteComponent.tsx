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
import { MenuItem, Switch } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import customAxios from "@/Context/axios";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
interface PropsData {
  _id: string;
  name?: string;
  mail?: string;
  file?: string | undefined;
  dateat?: string;
  onClose: () => void;
}
export default function DeleteDialog(props: PropsData) {
  const queryClient = useQueryClient();
  const [open, setOpen] = React.useState(false);
  const { deleteData } = useMyContext();

  const { mutate: deleteTodo } = useMutation({
    mutationFn: (id: string) => deleteData(id),
    onSuccess: () => {
      console.log("Delete Success ID");
      queryClient.invalidateQueries(["todos"]);
    },
  });

  const onCreateTodo = () => {
    deleteTodo(props._id);
    handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if (props.onClose) {
      props.onClose();
    }
  };

  return (
    <>
      <MenuItem onClick={handleClickOpen}>Delete</MenuItem>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          "Hard Delete" : "Delete"
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to  "hard delete" : "delete" this
            item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              onCreateTodo();
            }}
            color="primary"
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
