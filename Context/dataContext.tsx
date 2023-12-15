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
  addData: (newData: DataContext) => void;
  deleteDatasorf: (idData: number) => void;
  editData: (id: number, datafrom: DataContext) => void;
  deleteDatahard: (id: number) => void;
  unsorfdelete: (id: number) => void;
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

  const addData = (newData: DataContext) => {
    setData((prevData) => [...prevData, newData]);
  };

  const deleteDatasorf = (idData: number) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === idData ? { ...item, deletestatus: true } : item
      )
    );
  };

  const unsorfdelete = (idData: number) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === idData ? { ...item, deletestatus: false } : item
      )
    );
  };

  const deleteDatahard = (iddata: number) => {
    setData((prevData) => prevData.filter((item) => item.id !== iddata));
  };

  const editData = (id: number, updatedData: DataContext) => {
    setData((prevData) => {
      const updatedDataIndex = prevData.findIndex((item) => item.id === id);
      if (updatedDataIndex !== -1) {
        return prevData.map((item, index) => {
          if (index === updatedDataIndex) {
            return { ...item, ...updatedData };
          }
          return item;
        });
      }
      return prevData;
    });
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
