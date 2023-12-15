import * as React from "react";
import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useMyContext } from "@/Context/dataContext";
import Grid from "@mui/material/Grid";
import {
  Autocomplete,
  Button,
  Checkbox,
  Switch,
  TextField,
} from "@mui/material";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import Snackbars from "./snackbar";
import DeleteDialog from "./deleteComponent";
import CardDialog from "./cardComponents";
import FormEdidDialog from "./edidComponent";
import TableComponents from "./tableComponent";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number | string;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="samp">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}


interface DataContext {
  active?: boolean;
  id?: number;
  name?: string;
  email?: string;
  creactedat?: Date;
  updatedat?: Date;
  priority: number;
  type?: string;
  image?: File | null;
  status?: number;
  deletestatus?: boolean;}

export default function TabsComponent() {
  const [value, setValue] = React.useState<number>(0);
  const { data, deleteDatasorf, deleteDatahard, unsorfdelete ,FilterData} = useMyContext();
  const [selectedDelelte, setSelectedDelelte] = useState<number[]>([]);
  const [checked, setChecked] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const fulldata = data.map((user) => user.name);




  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  
  const switchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleCheckboxChangeDelete = (id: number) => {
    if (selectedDelelte.includes(id)) {
      setSelectedDelelte(
        selectedDelelte.filter((selectedId) => selectedId !== id)
      );
    } else {
      setSelectedDelelte([...selectedDelelte, id]);
    }
  };

  const handleDeleteSorf = () => {
    selectedDelelte.forEach((id) => {
      {
        checked ? unsorfdelete(id) : deleteDatahard(id);
      }
    });
    setSelectedDelelte([]);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
      console.log("Deleting Sorf with IDs:", selectedDelelte);
      console.log(open);
    }, 2000);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="ข้อมูลทั้งหมด" {...a11yProps(0)} />
          <Tab label="ยังไม่กรอกข้อมูล" {...a11yProps(1)} />
          <Tab label="กำลังกรอกข้อมูล" {...a11yProps(2)} />
          <Tab label="กรอกข้อมูลสำเร็จ" {...a11yProps(3)} />
          <Tab label="SoftDelete" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Autocomplete
      options={fulldata}
      // value={}
      onChange={(even,value:any) => FilterData(value)}
      onInputChange={(even,value)=>FilterData(value)}
      renderInput={(params) => (
        <TextField {...params} label="Select" />
      )}
    />
      

        <TableComponents />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {data
          .filter((item) => item.status === 10 && item.deletestatus === false)
          .map((filteredItem) => (
            <Grid
              container
              spacing={2}
              key={filteredItem.id}
              textAlign="left"
              margin={1}
            >
              <Grid item xs={1}>
                ID: {filteredItem.id}
              </Grid>
              <Grid item xs={1}>
                Name: {filteredItem.name}
              </Grid>
              <Grid item xs={2}>
                Email: {filteredItem.email}
              </Grid>
              <Grid item xs={2}>
                Createdat: {filteredItem.creactedat?.toDateString()}
              </Grid>
              <Grid item xs={2}>
                Updatedat: {filteredItem.updatedat?.toDateString()}
              </Grid>
              <Grid item xs={1}>
                Type: {filteredItem.type}
              </Grid>
              <Grid item xs={1}>
                Priority:{" "}
                {filteredItem.priority === 1 && (
                  <PriorityHighIcon color="disabled" />
                )}
                {filteredItem.priority === 2 && (
                  <PriorityHighIcon color="primary" />
                )}
                {filteredItem.priority === 3 && (
                  <PriorityHighIcon color="error" />
                )}
              </Grid>
              <Grid item xs={2}>
                Status:{" "}
                {filteredItem.status === 10 && (
                  <Button variant="outlined">ยังไม่กรอกข้อมูล</Button>
                )}
                {filteredItem.status === 20 && (
                  <Button variant="contained">กำลังกรอกข้อมูล</Button>
                )}
                {filteredItem.status === 30 && (
                  <Button variant="contained" color="success">
                    กรอกข้อมูลสำเร็จ
                  </Button>
                )}
              </Grid>
            </Grid>
          ))}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {data
          .filter((item) => item.status === 20 && item.deletestatus === false)
          .map((filteredItem) => (
            <Grid
              container
              spacing={2}
              key={filteredItem.id}
              textAlign="left"
              margin={1}
            >
              <Grid item xs={1}>
                ID: {filteredItem.id}
              </Grid>
              <Grid item xs={1}>
                Name: {filteredItem.name}
              </Grid>
              <Grid item xs={2}>
                Email: {filteredItem.email}
              </Grid>
              <Grid item xs={2}>
                Createdat: {filteredItem.creactedat?.toDateString()}
              </Grid>
              <Grid item xs={2}>
                Updatedat: {filteredItem.updatedat?.toDateString()}
              </Grid>
              <Grid item xs={1}>
                Type: {filteredItem.type}
              </Grid>
              <Grid item xs={1}>
                Priority:{" "}
                {filteredItem.priority === 1 && (
                  <PriorityHighIcon color="disabled" />
                )}
                {filteredItem.priority === 2 && (
                  <PriorityHighIcon color="primary" />
                )}
                {filteredItem.priority === 3 && (
                  <PriorityHighIcon color="error" />
                )}
              </Grid>
              <Grid item xs={2}>
                Status:{" "}
                {filteredItem.status === 10 && (
                  <Button variant="outlined">ยังไม่กรอกข้อมูล</Button>
                )}
                {filteredItem.status === 20 && (
                  <Button variant="contained">กำลังกรอกข้อมูล</Button>
                )}
                {filteredItem.status === 30 && (
                  <Button variant="contained" color="success">
                    กรอกข้อมูลสำเร็จ
                  </Button>
                )}
              </Grid>
            </Grid>
          ))}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        {data
          .filter((item) => item.status === 30 && item.deletestatus === false)
          .map((filteredItem) => (
            <Grid
              container
              spacing={2}
              key={filteredItem.id}
              textAlign="left"
              margin={1}
            >
              <Grid item xs={1}>
                ID: {filteredItem.id}
              </Grid>
              <Grid item xs={1}>
                Name: {filteredItem.name}
              </Grid>
              <Grid item xs={2}>
                Email: {filteredItem.email}
              </Grid>
              <Grid item xs={2}>
                Createdat: {filteredItem.creactedat?.toDateString()}
              </Grid>
              <Grid item xs={2}>
                Updatedat: {filteredItem.updatedat?.toDateString()}
              </Grid>
              <Grid item xs={1}>
                Type: {filteredItem.type}
              </Grid>
              <Grid item xs={1}>
                Priority:{" "}
                {filteredItem.priority === 1 && (
                  <PriorityHighIcon color="disabled" />
                )}
                {filteredItem.priority === 2 && (
                  <PriorityHighIcon color="primary" />
                )}
                {filteredItem.priority === 3 && (
                  <PriorityHighIcon color="error" />
                )}
              </Grid>
              <Grid item xs={2}>
                Status:{" "}
                {filteredItem.status === 10 && (
                  <Button variant="outlined">ยังไม่กรอกข้อมูล</Button>
                )}
                {filteredItem.status === 20 && (
                  <Button variant="contained">กำลังกรอกข้อมูล</Button>
                )}
                {filteredItem.status === 30 && (
                  <Button variant="contained" color="success">
                    กรอกข้อมูลสำเร็จ
                  </Button>
                )}
              </Grid>
            </Grid>
          ))}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <Switch
          checked={checked}
          onChange={switchChange}
          inputProps={{ "aria-label": "controlled" }}
        />
        {checked ? (
          <Button
            variant="contained"
            color="success"
            onClick={handleDeleteSorf}
          >
            UnDelete
          </Button>
        ) : (
          <Button variant="contained" color="error" onClick={handleDeleteSorf}>
            Delete
          </Button>
        )}{" "}
        <Snackbars opensn={open} />
        {data
          .filter((item) => item.deletestatus === true)
          .map((filteredItem) => (
            <Grid
              container
              spacing={2}
              key={filteredItem.id}
              textAlign="left"
              margin={1}
            >
              <Checkbox
                checked={selectedDelelte.includes(filteredItem.id)}
                onChange={() => handleCheckboxChangeDelete(filteredItem.id)}
                inputProps={{ "aria-label": "controlled" }}
              />
              <Grid item xs={1}>
                ID: {filteredItem.id}
              </Grid>
              <Grid item xs={1}>
                Name: {filteredItem.name}
              </Grid>
              <Grid item xs={1}>
                Email: {filteredItem.email}
              </Grid>
              <Grid item xs={2}>
                Createdat: {filteredItem.creactedat?.toDateString()}
              </Grid>
              <Grid item xs={2}>
                Updatedat: {filteredItem.updatedat?.toDateString()}
              </Grid>
              <Grid item xs={1}>
                Type: {filteredItem.type}
              </Grid>
              <Grid item xs={1}>
                Priority:{" "}
                {filteredItem.priority === 1 && (
                  <PriorityHighIcon color="disabled" />
                )}
                {filteredItem.priority === 2 && (
                  <PriorityHighIcon color="primary" />
                )}
                {filteredItem.priority === 3 && (
                  <PriorityHighIcon color="error" />
                )}
              </Grid>
              <Grid item xs={2}>
                Status:{" "}
                {filteredItem.status === 10 && (
                  <Button variant="outlined">ยังไม่กรอกข้อมูล</Button>
                )}
                {filteredItem.status === 20 && (
                  <Button variant="contained">กำลังกรอกข้อมูล</Button>
                )}
                {filteredItem.status === 30 && (
                  <Button variant="contained" color="success">
                    กรอกข้อมูลสำเร็จ
                  </Button>
                )}
              </Grid>
            </Grid>
          ))}
      </CustomTabPanel>
    </Box>
  );
}
