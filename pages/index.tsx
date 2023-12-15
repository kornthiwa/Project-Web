import TableComponents from "@/components/tableComponent";
import { Box } from "@mui/material";
import FormDialog from "@/components/formdailog";
import { useMyContext } from "../Context/dataContext";
import TabsComponent from "@/components/tabsComponents";
import Snackbars from "@/components/snackbar";
export default function Home() {
  const {  } = useMyContext();

  


  return (
    <>
    <Box sx={{ bgcolor: "blue", width: "full", height: "full" }}>
      <Box sx={{ width: "auto", height: "auto", bgcolor: "white", margin: 3 }}>
        {/* <TableComponents /> */}
        <FormDialog />
        <TabsComponent />
      </Box>
    </Box>

  
    </>
  );
}
