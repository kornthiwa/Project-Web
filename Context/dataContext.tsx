// context.tsx
import React from "react";
import {
  createContext,
  useContext,
  FC,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface DataContext {
  active: boolean;
  id: number;
  name: string;
  email: string;
  creactedat?: Date;
  updatedat?: Date;
  priority: number;
  type: string;
  image: File | null;
  status: number;
  deletestatus: boolean;
}

interface MyContextProps {
  data: DataContext[];
  filterdata: DataContext[];
  addData: (newData: DataContext) => void;

  deleteDatasorf: (idData: number) => void;
  editData: (id: number, datafrom: DataContext) => void;
  deleteDatahard: (id: number) => void;
  unsorfdelete: (id: number) => void;
  FilterData: (name: string) => void;
}

const MyContext = createContext<MyContextProps | undefined>(undefined);

interface MyProviderProps {
  children: ReactNode;
}

export const MyProvider: FC<MyProviderProps> = ({ children }) => {
  // const initialData: DataContext[] = [
  //   { id: 1, name: 'John Doe', email: 'john@example.com', priority: 1, type: 'User', image: null, status: 1, active: true, deletestatus: false },
  //   { id: 1, name: 'John Doe', email: 'john@example.com', priority: 1, type: 'User', image: null, status: 1, active: true, deletestatus: false },
  //   { id: 2, name: 'Jane Doe', email: 'jane@example.com', priority: 2, type: 'User', image: null, status: 1, active: true, deletestatus: false },
  //   { id: 3, name: 'John Doe', email: 'john@example.com', priority: 1, type: 'User', image: null, status: 1, active: true, deletestatus: false },
  //   { id: 4, name: 'Jane Doe', email: 'jane@example.com', priority: 2, type: 'User', image: null, status: 1, active: true, deletestatus: false },
  //   { id: 5, name: 'John Doe', email: 'john@example.com', priority: 1, type: 'User', image: null, status: 1, active: true, deletestatus: false },
  //   { id: 6, name: 'Jane Doe', email: 'jane@example.com', priority: 2, type: 'User', image: null, status: 1, active: true, deletestatus: false },
  //   { id: 7, name: 'John Doe', email: 'john@example.com', priority: 1, type: 'User', image: null, status: 1, active: true, deletestatus: false },
  //   { id: 8, name: 'Jane Doe', email: 'jane@example.com', priority: 2, type: 'User', image: null, status: 1, active: true, deletestatus: false },
  //   { id: 9, name: 'John Doe', email: 'john@example.com', priority: 1, type: 'User', image: null, status: 1, active: true, deletestatus: false },
  //   { id: 10, name: 'Jane Doe', email: 'jane@example.com', priority: 2, type: 'User', image: null, status: 1, active: true, deletestatus: false },
  //   { id: 11, name: 'Bob Smith', email: 'bob@example.com', priority: 3, type: 'Admin', image: null, status: 1, active: true, deletestatus: false },
  // ];
  const [data, setData] = React.useState<DataContext[]>([]);
  const [filterdata, setFilterdata] = React.useState<DataContext[]>([]);

  const FilterData = (name: string) => {
    let filteredData;

    if (name) {
      filteredData = data.filter((item) => item.name.includes(name));
    } else {
      filteredData = data;
    }

    setFilterdata(filteredData);
  };

  const addData = (newData: DataContext) => {
    setData((prevData) => [...prevData, newData]);
    setFilterdata((prevData) => [...prevData, newData]);

    console.log("เพิ่มข้อมูลสำเร็จ");
  };

  const deleteDatasorf = (idData: number) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === idData ? { ...item, deletestatus: true } : item
      )
    );
    setFilterdata((prevData) =>
      prevData.map((item) =>
        item.id === idData ? { ...item, deletestatus: true } : item
      )
    );
    console.log("SordDelete สำเร็จ");
  };

  const unsorfdelete = (idData: number) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === idData ? { ...item, deletestatus: false } : item
      )
    );
    setFilterdata((prevData) =>
      prevData.map((item) =>
        item.id === idData ? { ...item, deletestatus: false } : item
      )
    );
    console.log("UnSordDelete สำเร็จ");
  };

  const deleteDatahard = (iddata: number) => {
    setData((prevData) => prevData.filter((item) => item.id !== iddata));
    setFilterdata((prevData) => prevData.filter((item) => item.id !== iddata));
    console.log("Delete ข้อมูลสำเร็จ");
  };

  const editData = (id: number, updatedData: DataContext) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, ...updatedData } : item
      )
    );
    setFilterdata((prevFilterData) =>
      prevFilterData.map((item) =>
        item.id === id ? { ...item, ...updatedData } : item
      )
    );
    console.log("Edit สำเร็จ");
  };

  return (
    <MyContext.Provider
      value={{
        data,
        addData,
        deleteDatasorf,
        editData,
        deleteDatahard,
        unsorfdelete,
        filterdata,
        FilterData,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyProvider");
  }
  return context;
};
