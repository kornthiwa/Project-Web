import * as React from "react";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useMyContext } from "@/Context/dataContext";
import { useFormik } from "formik";
import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  styled,
} from "@mui/material";
import { FileUploadOutlined } from "@mui/icons-material";

const steps = ["Input", "UpLoad", "Save"];

interface PropsData {
  active: boolean;
  todo: string;
  priority: number;
  type: string;
  status: number;
  image?: {
    image:string,
    name:string
  }
}

const MyTextField = styled(TextField)`
  width: 100%;
  background: white;
  & label.Mui-focused {
    color: red;
  }
  & .MuiInput-underline:after {
    border-bottom-color: white;
  }
  & .MuiOutlinedInput-root {
    & fieldset {
      /* border-color: red; */
      border-radius: 10px;
    }
    &:hover fieldset {
      /* border-color: white; */
    }
    &.Mui-focused fieldset {
      /* border-color: white; */
    }
  }
`;

export default function StepperComponent() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };
  const [open, setOpen] = React.useState(false);
  const { data, createUser,  } = useMyContext();

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
      todo: "",
      priority: 1,
      type: "",
      status: 10,
      image: undefined,
      
    },
    validationSchema: validationSchema,
    onSubmit: (values: PropsData, { resetForm }) => {
      const newData: PropsData = {
        active: values.active,
        todo: values.todo,
        priority: values.priority,
        type: values.type,
        status: values.status,
        image:values.image
      };

      createUser(newData);
      handleReset();
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
  
    if (file) {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const inputImage = {
          image:base64String,
          name:file.name
        }
        formik.setFieldValue("image", inputImage);
        console.log(inputImage);
      };
  
      // Read the file as a data URL
      reader.readAsDataURL(file);
    }
  };
  
  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        เพิ่มข้อมูล
      </Button>

      <Dialog open={open} fullWidth>
        <DialogTitle>Formข้อมูล</DialogTitle>
        <DialogContent>
          {" "}
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const labelProps: {
                optional?: React.ReactNode;
                error?: boolean;
              } = {};
              if (
                index === 0 &&
                formik.touched.todo &&
                Boolean(formik.errors.todo)
              ) {
                labelProps.optional = (
                  <Typography variant="caption" color="error">
                    Required
                  </Typography>
                );
                labelProps.error = true;
              }

              return (
                <Step key={label}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </DialogContent>{" "}
        <DialogContent>
          {activeStep === steps.length - 1 && (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}></Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button onClick={handleBack} sx={{ mr: 1 }}>
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button
                  onClick={(e: any) => formik.handleSubmit(e)}
                  disabled={!formik.isValid || formik.isSubmitting}
                >
                  Save
                </Button>
              </Box>
            </React.Fragment>
          )}
          {activeStep === 0 && (
            <React.Fragment>
              <Box margin={2}>
                Active
                <Checkbox
                  checked={formik.values.active}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </Box>
              <Box margin={2}>
            
                <InputLabel shrink htmlFor="bootstrap-input">
                  TODO
                </InputLabel>
                <MyTextField
                  placeholder="ToDo"
                  id="todo"
                  variant="outlined"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.todo}
                  error={formik.touched.todo && Boolean(formik.errors.todo)}
                  helperText={formik.touched.todo && formik.errors.todo}
                />
              </Box>

              <Box margin={2}>
                {" "}
                <InputLabel shrink htmlFor="bootstrap-input">
                  TYPE
                </InputLabel>
                <MyTextField
                  placeholder="Type"
                  id="type"
                  variant="outlined"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.type}
                  error={formik.touched.type && Boolean(formik.errors.type)}
                  helperText={formik.touched.type && formik.errors.type}
                />
              </Box>

              <Box margin={2}>
                <InputLabel shrink htmlFor="bootstrap-input">
                  SELETE
                </InputLabel>
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
                <InputLabel shrink htmlFor="bootstrap-input">
                  PRIORITY
                </InputLabel>

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
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />

                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
          {activeStep === 1 && (
            <React.Fragment>
              <Box margin={2}>
                <TextField
                  variant="outlined"
                  type="text"
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
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button onClick={handleBack} sx={{ mr: 1 }}>
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />

                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
