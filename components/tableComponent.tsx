import * as React from "react";
import { useMyContext } from "@/Context/dataContext";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, Switch, styled } from "@mui/material";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import PersonIcon from "@mui/icons-material/Person";
import MenuListComponent from "./menulistComponents";

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
    field: "createdAt",
    headerName: "createdat",
    type: "datetime",
    width: 150,
    disableColumnMenu: true,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "updatedAt",
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
console.log(row.status);

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
    field: " ",
    headerName: " ",
    width: 250,
    align: "center",
    sortable: false,
    disableColumnMenu: true,
    headerAlign: "center",
    renderCell: (params) => {
      const { row } = params;

      return (
        <>
          <MenuListComponent
            createdAt={row.createdAt}
            updatedAt={row.updatedAt}
            _id={row._id}
            active={row.active}
            todo={row.todo}
            priority={row.priority}
            type={row.type}
            image={row.image}
            status={row.status}
            deletestatus={row.deletestatus}
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
  const { data } = useMyContext();

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
