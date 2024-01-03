import React, { useCallback, useEffect } from "react";
import { useMyContext } from "@/Context/dataContext";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Alert, Box, Button, Switch, styled } from "@mui/material";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import PersonIcon from "@mui/icons-material/Person";
import MenuListComponent from "./menulistComponents";
import { useQuery } from "react-query";

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
    width: 250,
    disableColumnMenu: true,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      const { row } = params;
      const date = new Date(row.createdAt);
      const formattedDatetime = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
      }).format(date);

      return <>{formattedDatetime}</>;
    },
  },
  {
    field: "updatedAt",
    headerName: "Updatedat",
    type: "datetime",
    width: 250,
    disableColumnMenu: true,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      const { row } = params;
      const date = new Date(row.updatedAt);
      const formattedDatetime = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
      }).format(date);

      return <>{formattedDatetime}</>;
    },
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
    field: " ",
    headerName: " ",
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
interface PropsDataContext {
  data: DataContext[]
}

export default function TableComponents(props: PropsDataContext) {
  return (
    <>
      <Box style={{ height: 400, width: "100%" }}>
        <MyStyledDataGrid
          rows={props.data || []} // Provide an empty array if data is null
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