import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useMyContext } from "@/Context/dataContext";

import TableComponents from "./tableComponent";
import {
  Autocomplete,

  TextField,
} from "@mui/material";

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

export default function TabsComponent() {
  const { data, deleteDatahard, unsorfdelete, FilterData, filterdata } =
    useMyContext();
  const [value, setValue] = React.useState<number>(0);
  // const fulldata = data?.map((user) => user.todo);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {/* <Autocomplete
          options={fulldata}
          // value={}
          onChange={(event, value) => FilterData(value as string)}
          onInputChange={(event, value) => FilterData(value as string)}
          renderInput={(params) => <TextField {...params} label="Select" />}
        /> */}

        <TableComponents />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TableComponents
          // data={filterdata.filter(
          //   (item) => item.status === 10 && item.deletestatus === false
          // )}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      <TableComponents
          // data={filterdata.filter(
          //   (item) => item.status === 20 && item.deletestatus === false
          // )}
        />

      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
      <TableComponents
          // data={filterdata.filter(
          //   (item) => item.status === 30 && item.deletestatus === false
          // )}
        />
      </CustomTabPanel>
     
    </Box>
  );
}
