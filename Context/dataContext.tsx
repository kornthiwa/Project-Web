// context.tsx
import React, { useCallback, useEffect } from "react";
import { createContext, useContext, FC, ReactNode } from "react";
import customAxios from "./axios";

interface DataContext {
  _id?: any;
  active?: boolean;
  todo?: string;
  priority?: number;
  type?: string;
  image?: {
    image:string,
    name:string
  },
    status?: number;
  deletestatus?: boolean;
}

interface MyContextProps {
  data: any;
  filterdata: DataContext[];
  createUser: (data: DataContext) => void;

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
  const [data, setData] = React.useState<any>([]);
  const [filterdata, setFilterdata] = React.useState<DataContext[]>([]);

  const FilterData = (name: string) => {
    let filteredData;

    if (name) {
      filteredData = data.filter((item) => item.todo.includes(name));
    } else {
      filteredData = data;
    }

    setFilterdata(filteredData);
  };

  useEffect(() => {
      customAxios
        .get("users/")
        .then((response) => {
          console.log("User created successfully:", response.data);
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error creating user:", error);
        });
   console.log("API GET");
    console.log(data);
  }, []);
 

  const createUser = (data: DataContext) => {
    console.log(data);

    if (data) {
      customAxios
        .post("users/", data)
        .then((response) => {
          console.log("User created successfully:", response.data);
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error creating user:", error);
        });
    }
  };

  const deleteDatasorf = (idData: number) => {
    setData((prevData) =>
      prevData.map((item) =>
        item._id === idData ? { ...item, deletestatus: true } : item
      )
    );
    setFilterdata((prevData) =>
      prevData.map((item) =>
        item._id === idData ? { ...item, deletestatus: true } : item
      )
    );
    console.log("SordDelete สำเร็จ");
  };

  const unsorfdelete = (idData: number | number[]) => {
    setData((prevData) =>
      prevData.map((item) =>
        item._id === idData ? { ...item, deletestatus: false } : item
      )
    );
    setFilterdata((prevData) =>
      prevData.map((item) =>
        item._id === idData ? { ...item, deletestatus: false } : item
      )
    );
    console.log("UnSordDelete สำเร็จ");
  };

  const deleteDatahard = (iddata: number | number[]) => {
    setData((prevData) => prevData.filter((item) => item._id !== iddata));
    setFilterdata((prevData) => prevData.filter((item) => item._id !== iddata));
    console.log("Delete ข้อมูลสำเร็จ");
  };

  const editData = (id: number, updatedData: DataContext) => {
    console.log(updatedData);
    
    if (data) {
      customAxios
        .put(`users/${id}`, updatedData)
        .then((response) => {
          console.log("User created successfully:", response.data);
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error creating user:", error);
        });
    }
  };

  return (
    <MyContext.Provider
      value={{
        data,
        createUser,
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
