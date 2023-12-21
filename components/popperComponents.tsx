import * as React from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { Button } from "@mui/material";
import { useMyContext } from "@/Context/dataContext";

interface MyProviderProps {
  sorfdelete: number[];
  datahard: number[];
}

export default function PopperComponent(props: MyProviderProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { deleteDatahard, unsorfdelete } = useMyContext();



  const handleUnDeleteClick = () => {
    props.sorfdelete.forEach((id) => unsorfdelete(id));
    handleClose();
  };

  const handleDeleteClick = () => {
    props.datahard.forEach((id) => deleteDatahard(id));
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <div>
      <Button aria-describedby={id} type="button" color="error" variant="outlined"onClick={handleClick}>
        Delete
      </Button>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <ClickAwayListener onClickAway={handleClose}>
          <Box sx={{ width: "200px", marginLeft: 10 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleUnDeleteClick}
            >
              UnDelete
            </Button>

            <Button
              variant="contained"
              color="secondary"
              fullWidth
              sx={{ marginTop: 2 }}
              onClick={handleDeleteClick}
            >
              Delete
            </Button>
          </Box>
        </ClickAwayListener>
      </Popper>
    </div>
  );
}
