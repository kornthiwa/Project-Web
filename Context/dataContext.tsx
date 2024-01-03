// context.tsx
import React, { useCallback, useEffect } from "react";
import { createContext, useContext, FC, ReactNode } from "react";
import customAxios from "./axios";
import { QueryClient, QueryClientProvider } from "react-query";
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

interface MyContextProps {
  data: any;
  createUser: (data: DataContext) => void;
  editData: (id: number, datafrom: DataContext) => void;
  deleteData: (id: number) => void;
  getTodo: () => void;
}

const MyContext = createContext<MyContextProps | undefined>(undefined);
const queryClient = new QueryClient();
interface MyProviderProps {
  children: ReactNode;
}

export const MyProvider: FC<MyProviderProps> = ({ children }) => {
  const [data, setData] = React.useState<any>([]);


  const getTodo = async ():Promise<DataContext[]> => {
    // Add delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Fetch data from API
    try {
      const response = await customAxios.get("api/todolist");
      // Return data
      return response.data;
    } catch (error) {
      // Handle errors
      console.error("Error fetching todo list:", error);
      throw error;
    }
  };
  
  
  const createUser = (data: DataContext) => {
    console.log(data);

    if (data) {
      customAxios
        .post("api/todolist/", data)
        .then((response) => {
          console.log("User created successfully:", response.data);
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error creating user:", error);
        });
    }
  };

  const editData = (id: number, updatedData: DataContext) => {
    console.log(updatedData);

    if (data) {
      customAxios
        .patch(`api/todolist/${id}`, updatedData)
        .then((response) => {
          console.log("Data updated successfully:", response.data);
          setData((prevData: DataContext[]) =>
            prevData.map((item: DataContext) =>
              item._id === id ? { ...item, ...response.data } : item
            )
          );
        })
        .catch((error) => {
          console.error("Error updating data:", error);
        });
    }
  };

  const deleteData = (id: number) => {
    if (id) {
      customAxios
        .delete(`api/todolist/${id}`)
        .then((response) => {
          console.log("Data Delete successfully:", response.data);
          setData((prevData: DataContext[]) =>
            prevData.map((item: DataContext) =>
              item._id === id ? { ...item, ...response.data } : item
            )
          );
        })
        .catch((error) => {
          console.error("Error updating data:", error);
        });
    }
  };

  return (
    <MyContext.Provider
      value={{
        data,
        createUser,
        editData,
        deleteData,
        getTodo,
      }}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
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
