import React from "react";
import styled from "styled-components";
import { TextField } from "@mui/material";
const StyledTextField1 = styled(TextField)`
  & .MuiTextField-root {
  }
  & .MuiInput-underline:after {
    border-bottom-color: white;
  }
`;



const StyledTextField = styled(TextField)`
  background: white;
  & label.Mui-focused {
    color: red;
    background-color: pink;
  }
 
  & .MuiInput-underline:after {
    border-bottom-color: white;
  }
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: red;
    }
    &:hover fieldset {
       border-color: blue;
    }
    &.Mui-focused fieldset {
       border-color: green;
    }
  }
`;
export default function App() {
  return (
    <div>
<TextField/>
      <StyledTextField1 variant="outlined" label="outlined withStyles" />
      <br />
      
      <StyledTextField variant="standard" label="standard styled-comp" />
      <StyledTextField variant="outlined" label="outlined styled-comp" />
    </div>
  );
}