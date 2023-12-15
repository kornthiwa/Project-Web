import * as Yup from "yup";
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
  todo: string;
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
  const { data, addData, generateRandomDataContext } = useMyContext();

  const validationSchema = Yup.object({
    active: Yup.boolean(),
    todo: Yup.string()
      .required("Name is required")
      .min(2, "Too Short!")
      .max(50, "Too Long!"),
    type: Yup.string()
      .required("Type is required")
      .min(2, "Too Short!")
      .max(50, "Too Long!"),
  });

  const formik = useFormik({
    initialValues: {
      active: false,
      id: 0,
      todo: "",
      creactedat: new Date(),
      priority: 1,
      type: "",
      image: null,
      status: 10,
      deletestatus: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values: PropsData, { resetForm }) => {
      const newData: PropsData = {
        active: values.active,
        id: data.length + 1,
        todo: values.todo,
        creactedat: new Date(),
        priority: values.priority,
        type: values.type,
        image: values.image,
        status: values.status,
        deletestatus: values.deletestatus,
      };

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
      <Button onClick={generateRandomDataContext}>Add Data 100 Row</Button>

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
              value={formik.values.todo}
              error={formik.touched.todo && Boolean(formik.errors.todo)}
              helperText={formik.touched.todo && formik.errors.todo}
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
              error={formik.touched.type && Boolean(formik.errors.type)}
              helperText={formik.touched.type && formik.errors.type}
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
              error={formik.touched.image && Boolean(formik.errors.image)}
              helperText={formik.touched.image && formik.errors.image}
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
          <Button
            onClick={(e: any) => formik.handleSubmit(e)}
            disabled={!formik.isValid || formik.isSubmitting}
          >
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
