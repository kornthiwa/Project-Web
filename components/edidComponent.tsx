import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMyContext } from "../Context/dataContext";
import {
  Box,
  CardMedia,
  Checkbox,
  IconButton,
  MenuItem,
  Select,
} from "@mui/material";
import { FileUploadOutlined } from "@mui/icons-material";
interface DataContext {
  _id?: any;
  active?: boolean;
  todo?: string;
  priority?: number;
  type?: string;
  image?: {
    image:string,
    name:string
  },
    status?: number;
  deletestatus?: boolean;

  onClose ?: ()=>void;

}

export default function FormEdidDialog(props: DataContext) {
  const [open, setOpen] = React.useState(false);
  const { data, editData } = useMyContext();

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
      active: props.active,
      _id: props._id,
      todo: props.todo,
      status: props.status,
      image: props.image,
      priority: props.priority,
      type: props.type,
      deletestatus: props.deletestatus,
    },
    validationSchema: validationSchema,
    onSubmit: (values: DataContext, { resetForm }) => {
      const editedData: DataContext = {
        active: values.active,
        _id: props._id,
        todo: values.todo,
        status: values.status,
        image: values.image,
        priority: values.priority,
        type: values.type,
        deletestatus: values.deletestatus,
      };

      editData(props._id, editedData);
      handleClose();
      resetForm();
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (props.onClose) {
      props.onClose();
    }
    setOpen(false);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue("active", event.target.checked);
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files?.[0] || null;

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string;
        const inputImage = {
          image: base64String,
          name: file.name,
        };
        formik.setFieldValue("image", inputImage);
        console.log(inputImage);
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <MenuItem onClick={handleClickOpen}>Edid</MenuItem>

      <Dialog open={open} fullWidth>
        <DialogTitle>Formแก้ไขข้อมูล</DialogTitle>
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
              id="todo"
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
              label="Uploadfile"
              fullWidth
              value={formik.values.image?.name || props.image?.name }
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
