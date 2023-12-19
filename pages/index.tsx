import { Box } from "@mui/material";
import StepperComponent from "@/components/stepperComponent";
import Tabletodo from "./tabletodo";
export default function Home() {
  return (
    <>
      <Box>
        <Box>
          <Tabletodo/>
          <StepperComponent/>
        </Box>
      </Box>
    </>
  );
}
