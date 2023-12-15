import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import { useMyContext } from "../Context/dataContext";
import { Box, Checkbox, IconButton, MenuItem, Select } from "@mui/material";
import { FileUploadOutlined } from "@mui/icons-material";

interface PropsData {
  active: boolean;
  id: number;
  name: string;
  email: string;
  creactedat: Date;
  updatedat?: Date;
  priority: number;
  type: string;
  image: File | null;
  status: number;
  deletestatus: boolean;
}

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const { data, addData } = useMyContext();

  const formik = useFormik({
    initialValues: {
      active: false,
      id: 0,
      name: "",
      email: "",
      creactedat: new Date(),
      priority: 1,
      type: "",
      image: null,
      status: 10,
      deletestatus: false,
    },

    onSubmit: (values: PropsData, { resetForm }) => {
      const newData: PropsData = {
        active: values.active,
        id: data.length + 1,
        name: values.name,
        email: values.email,
        creactedat: new Date(),
        priority: values.priority,
        type: values.type,
        image: values.image,
        status: values.status,
        deletestatus: values.deletestatus,
      };
      console.log(newData);

      addData(newData);
      handleClose();
      resetForm();
    },
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue("active", event.target.checked);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files?.[0] || null;
    formik.setFieldValue("image", file);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        เพิ่มข้อมูล
      </Button>
      <Dialog open={open} fullWidth>
        <DialogTitle>Formข้อมูล</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <Box margin={2}>
            Active
            <Checkbox
              checked={formik.values.active}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          </Box>
          <Box margin={2}>
            <TextField
              fullWidth
              id="name"
              label="Name"
              variant="outlined"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </Box>
          <Box margin={2}>
            <TextField
              fullWidth
              id="email"
              label="Email"
              variant="outlined"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </Box>
          <Box margin={2}>
            <TextField
              fullWidth
              id="type"
              label="Type"
              variant="outlined"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.type}
            />
          </Box>

          <Box margin={2}>
            <TextField
              variant="outlined"
              type="text"
              label={
                formik.values.image?.name
                  ? formik.values.image?.name
                  : "Uploadfile"
              }
              fullWidth
              disabled
              value={formik.values.image?.name}
              InputProps={{
                endAdornment: (
                  <IconButton component="label">
                    <FileUploadOutlined />
                    <input
                      type="file"
                      hidden
                      name="[licenseFile]"
                      onChange={handleFileChange}
                    />
                  </IconButton>
                ),
              }}
            />
          </Box>
          <Box margin={2}>
            Status
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formik.values.status}
              fullWidth
              onChange={(event) =>
                formik.setFieldValue("status", event.target.value)
              }
            >
              <MenuItem value={10}>ยังไม่ทำ</MenuItem>
              <MenuItem value={20}>กำลังทำ</MenuItem>
              <MenuItem value={30}>ทำเสร็จแล้ว</MenuItem>
            </Select>
          </Box>

          <Box margin={2}>
            Priority
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formik.values.priority}
              fullWidth
              onChange={(event) =>
                formik.setFieldValue("priority", event.target.value)
              }
            >
              <MenuItem value={1}>Low</MenuItem>
              <MenuItem value={2}>Medium</MenuItem>
              <MenuItem value={3}>High</MenuItem>
            </Select>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={(e: any) => formik.handleSubmit(e)}>
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
