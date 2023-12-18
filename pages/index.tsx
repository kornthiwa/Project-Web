import { Box } from "@mui/material";
import FormDialog from "@/components/formdailog";
import TabsComponent from "@/components/tabsComponents";
export default function Home() {
  return (
    <>
      <Box>
        <Box
          sx={{
            width: "auto",
            height: "600px",
            bgcolor: "white",
            margin: 10,
            boxShadow: 3,
            padding: 3,
          }}
        >
          <FormDialog />
          <TabsComponent />
        </Box>
      </Box>
    </>
  );
}
