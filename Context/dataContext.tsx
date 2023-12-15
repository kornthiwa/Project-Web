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
  generateRandomDataContext:()=>void;
}

const MyContext = createContext<MyContextProps | undefined>(undefined);

interface MyProviderProps {
  children: ReactNode;
}

export const MyProvider: FC<MyProviderProps> = ({ children }) => {

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
  const generateRandomDataContext = (): DataContext[] => {
    const randomData: DataContext[] = [];
  
    for (let i = 1; i <= 100; i++) {
      const newData: DataContext = {
        active: Math.random() < 0.5,
        id: i,
        name: `User ${i}`,
        creactedat: new Date(),
        updatedat: new Date(),
        priority: Math.floor(Math.random() * 3) + 1,
        type: Math.random() < 0.5 ? "User" : "Admin",
        image: null,
        status: Math.random() < 0.33 ? 10 : Math.random() < 0.66 ? 20 : 30,
        deletestatus: Math.random() < 0.2,
      };
  
      randomData.push(newData);
    }
  
    // เพิ่มข้อมูลเข้า state
    setData((prevData) => [...prevData, ...randomData]);
    setFilterdata((prevData) => [...prevData, ...randomData]);
  
    // คืนค่าข้อมูลสุ่มทั้งหมด
    return randomData;
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
        generateRandomDataContext
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
