import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CardDialog from "./cardComponents";
import FormEdidDialog from "./edidComponent";
import DeleteDialog from "./deleteComponent";

const ITEM_HEIGHT = 48;
interface DataContext {
  _id: any;
  active: boolean;
  todo: string;
  priority: number;
  type: string;
  createdAt: Date;
  updatedAt: Date;
  image: {
    image: string;
    name: string;
  };
  status: number;
  deletestatus: boolean;
}
export default function MenuListComponent(porps: DataContext) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {

    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        <CardDialog
                  _id={porps._id}
                  todo={porps.todo}
                  priority={porps.priority}
                  type={porps.type}
                  status={porps.status}
                  onClose={handleClose}
                  createdAt={porps.createdAt}
                  updatedAt={porps.updatedAt} image={porps.image}        />
        <FormEdidDialog
          active={porps.active}
          _id={porps._id}
          todo={porps.todo}
          priority={porps.priority}
          type={porps.type}
          status={porps.status}
          image={porps.image} 
          onClose={handleClose}
        />
        <DeleteDialog _id={porps._id} onClose={handleClose} />
      </Menu>
    </div>
  );
}
