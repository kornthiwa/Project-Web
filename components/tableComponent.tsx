import * as React from "react";
import { useMyContext } from "@/Context/dataContext";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteDialog from "./deleteComponent";
import FormEdidDialog from "./edidComponent";
import CardDialog from "./cardComponents";
import { Box, Button, Switch, styled } from "@mui/material";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import PersonIcon from "@mui/icons-material/Person";

const MyStyledDataGrid = styled(DataGrid)`
  .MuiDataGrid-columnHeaders,
  .MuiDataGrid-columnHeaderTitle {
    background-color: #ffcaca;
  }
  .MuiDataGrid-footerContainer {
    background-color: #ffcaca;
  }
  .MuiDataGrid-main {
    background-color: #ffe8e8;
  }
`;

const columns: GridColDef[] = [
  {
    field: "active",
    headerName: "Active",
    width: 100,
    disableColumnMenu: true,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      const { row } = params;
      return (
        <>
          {row.active ? (
            <PersonIcon color="primary" />
          ) : (
            <PersonIcon color="disabled" />
          )}{" "}
        </>
      );
    },
  },
  {
    field: "_id",
    headerName: "ID",
    width: 50,
    disableColumnMenu: true,
    align: "left",
    headerAlign: "center",
  },
  {
    field: "todo",
    headerName: "ToDo",
    width: 150,
    disableColumnMenu: true,
    align: "center",
    headerAlign: "center",
  },

  {
    field: "creactedat",
    headerName: "Createdat",
    type: "date",
    width: 150,
    disableColumnMenu: true,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "updatedat",
    headerName: "Updatedat",
    type: "datetime",
    width: 150,
    disableColumnMenu: true,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "priority",
    headerName: "Priority",
    type: "number",
    width: 100,
    disableColumnMenu: true,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      const { row } = params;

      return (
        <>
          {row.priority === 1 && <PriorityHighIcon color="disabled" />}
          {row.priority === 2 && <PriorityHighIcon color="primary" />}
          {row.priority === 3 && <PriorityHighIcon color="error" />}
        </>
      );
    },
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
    disableColumnMenu: true,
    align: "center",
  },
  {
    field: "status",
    headerName: "Status",
    width: 200,
    align: "center",
    sortable: false,
    headerAlign: "center",
    disableColumnMenu: true,
    renderCell: (params) => {
      const { row } = params;

      return (
        <>
          {row.status === 10 && (
            <Button variant="outlined">ยังไม่กรอกข้อมูล</Button>
          )}
          {row.status === 20 && (
            <Button variant="contained">กำลังกรอกข้อมูล</Button>
          )}
          {row.status === 30 && (
            <Button variant="contained" color="success">
              กรอกข้อมูลสำเร็จ
            </Button>
          )}
        </>
      );
    },
  },

  {
    field: "view",
    headerName: "View",
    width: 80,
    align: "center",
    sortable: false,
    disableColumnMenu: true,
    headerAlign: "center",
    renderCell: (params) => {
      const { row } = params;

      return (
        <>
          <CardDialog
            _id={row._id}
            name={row.name}
            priority={row.priority}
            type={row.type}
            image={row.image.url}
            status={row.status}
            creactedat={row.creactedat}
            updatedat={row.updatedat}
          />
        </>
      );
    },
  },
  {
    field: "edid",
    headerName: "Edid",
    width: 80,
    align: "center",
    sortable: false,
    disableColumnMenu: true,
    headerAlign: "center",
    renderCell: (params) => {
      const { row } = params;
      return (
        <>
          <FormEdidDialog
            _id={row._id}
            todo={row.todo}
            image={row.image}
            status={row.status}
            priority={row.priority}
            type={row.type}
            active={row.active}
            deletestatus={row.deletestatus}
          />
        </>
      );
    },
  },
  {
    field: "delete",
    headerName: "Delete",
    width: 250,
    align: "center",
    sortable: false,
    disableColumnMenu: true,
    headerAlign: "center",
    renderCell: (params) => {
      const { row } = params;

      return (
        <>
          <DeleteDialog
            _id={row._id}
            name={row.name}
            mail={row.mail}
            file={row.file}
            dateat={row.dateat}
          />
        </>
      );
    },
  },
];
interface DataContext {
  active: boolean;
  _id: any;
  todo: string;
  creactedat?: Date;
  updatedat?: Date;
  priority: number;
  type: string;
  image: File | null;
  status: number;
  deletestatus: boolean;
}
interface PropsDataContext {
  data?: DataContext[];
}

export default function TableComponents(props: PropsDataContext) {
  const { filterdata,data } = useMyContext();
  const filter = filterdata.filter((num) => num.deletestatus !== true);

  return (
    <>
      <Box style={{ height: 400, width: "100%" }}>
        <MyStyledDataGrid
          rows={data}
          columns={columns}
          getRowId={(row) => row._id}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 20, 50]}
          checkboxSelection={false}
          rowSelection
        />
      </Box>
    </>
  );
}
