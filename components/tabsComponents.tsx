import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useMyContext } from "@/Context/dataContext";

import TableComponents from "./tableComponent";
import {
  Alert,
  Autocomplete,
  CircularProgress,
  TextField,
} from "@mui/material";
import { useQuery } from "react-query";
interface DataContext {
  _id?: any;
  active?: boolean;
  todo?: string;
  priority?: number;
  type?: string;
  image?: {
    image: string;
    name: string;
  };
  status?: number;
  deletestatus?: boolean;
}
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
  const { getTodo } = useMyContext();

  const { data, isLoading, error } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodo,
  });

  if (error && error instanceof Error) {
    <Alert severity="error">
      <p>เกิดข้อผิดพลาดในการดึงข้อมูล</p>
      <p>{error.message}</p>
    </Alert>;
  }
  const [value, setValue] = React.useState<number>(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
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
            <Autocomplete
              options={["dd"]}
              onChange={(event, value) => console.log(value)}
              onInputChange={(event, value) => console.log(value)}
              renderInput={(params) => <TextField {...params} label="Select" />}
            />
            <TableComponents data={data || undefined} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <TableComponents
              data={data?.filter(
                (item: any) => item.status === 10 && item.deletestatus === false
              )}
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <TableComponents
              data={data?.filter(
                (item: any) => item.status === 20 && item.deletestatus === false
              )}
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <TableComponents
              data={data?.filter(
                (item: any) => item.status === 30 && item.deletestatus === false
              )}
            />
          </CustomTabPanel>
        </>
      )}
    </Box>
  );
}
