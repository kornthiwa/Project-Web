import * as React from "react";
import { useMyContext } from "@/Context/dataContext";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, Switch } from "@mui/material";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import PersonIcon from "@mui/icons-material/Person";
import CardDialog from "@/components/cardComponents";
import DeleteDialog from "@/components/deleteComponent";
import FormEdidDialog from "@/components/edidComponent";
import PopperComponent from "@/components/popperComponents";

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
    field: "id",
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
            _id={row.id}
            todo={row.todo}
            priority={row.priority}
            type={row.type}
            image={row.image}
            status={row.status}
            createdAt={row.creactedat}
            updatedAt={row.updatedat}
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
            _id={row.id}
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
            _id={row.id}
            name={row.name}
            file={row.file}
            dateat={row.dateat} onClose={function (): void {
              throw new Error("Function not implemented.");
            } }          />
        </>
      );
    },
  },
];


export default function DataTable() {
  const { data } =
  useMyContext();
  const [ deleteid, setDelete] = React.useState<number[]>([]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
  rows={data.filter((item:any) => item.deletestatus === true)}
  columns={columns}
  initialState={{
    pagination: {
      paginationModel: { page: 0, pageSize: 5 },
    },
  }}
  pageSizeOptions={[5, 10]}
  checkboxSelection
  onRowSelectionModelChange={(rowSelectionModel, details) => {
    const numericIds = rowSelectionModel.map((id) => parseInt(String(id), 10));
    setDelete(numericIds);
    console.log(rowSelectionModel);
    console.log(numericIds);
  }}
/>
      <PopperComponent sorfdelete={deleteid} datahard={deleteid} />
    </div>
  );
}