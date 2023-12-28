import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import {
  Box,
  Button,
  Grid,
  MenuItem,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

interface DataContext {
  _id?: any;
  active?: boolean;
  todo?: string;
  priority?: number;
  type?: string;
  createdAt: Date;
    updatedAt: Date;
  image?: {
    image:string,
    name:string
  },
    status?: number;
  deletestatus?: boolean;
  onClose? : ()=>void;
}
export default function CardDialog(props: DataContext) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

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
    <React.Fragment>
      <MenuItem onClick={handleClickOpen}>View</MenuItem>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        fullWidth
      >
        <DialogTitle id="responsive-dialog-title">
          ข้อมูล ID {props._id}
        </DialogTitle>
        <DialogContent>
            <Grid container spacing={1}>
              <Grid item xs={12} md={12} sx={{ width: "auto", height: "auto" }}>
              <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={props.image?.image || undefined}
                    alt="Image"
                  />
                </Card>
              </Grid>
              <Grid item xs={12} md={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                      <Box>ToDo</Box>
                      <Box>{props.todo}</Box>
                  </Grid>

                  <Grid item xs={4}>
                    <Box>CreactedAT</Box>
                    <Box> {props.createdAt?.toString()}</Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box>UpdatedAT</Box>
                    <Box> {props.updatedAt?.toString()}</Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box>Priority</Box>
                    <Box>
                      {" "}
                      {props.priority === 1 && (
                        <>
                          <PriorityHighIcon color="disabled" /> Low
                        </>
                      )}
                      {props.priority === 2 && (
                        <>
                          <PriorityHighIcon color="primary" /> Medium
                        </>
                      )}
                      {props.priority === 3 && (
                        <>
                          <PriorityHighIcon color="error" />
                          High
                        </>
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
        
                      <Box>Type</Box>
                      <Box> {props.type}</Box>
                
                  </Grid>
                  <Grid item xs={4}>
                    <Box>Status</Box>
                    <Box>
                      {props.status === 1 && (
                        <Button variant="outlined">ยังไม่กรอกข้อมูล</Button>
                      )}
                      {props.status === 2 && (
                        <Button variant="contained">กำลังกรอกข้อมูล</Button>
                      )}
                      {props.status === 3 && (
                        <Button variant="contained" color="success">
                          กรอกข้อมูลสำเร็จ
                        </Button>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
