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
  
  
  const createUser = async(data: DataContext) => {
    console.log(data);
    try {
      const response = await customAxios.post("api/todolist/", data);
      // Return data
      return response.data;
    } catch (error) {
      // Handle errors
      console.error("Error creating todo list:", error);
      throw error;
    }
     
    
  };

  const editData = async(id: number, updatedData: DataContext) => {
    console.log(updatedData);
    try {
      const response = await customAxios .patch(`api/todolist/${id}`, updatedData);
      // Return data
      return response.data;
    } catch (error) {
      // Handle errors
      console.error("Error updating todo list:", error);
      throw error;
    }
   
  };

  const deleteData = async(id: number) => {
    try {
      const response = await customAxios .delete(`api/todolist/${id}`);
      // Return data
      return response.data;
    } catch (error) {
      // Handle errors
      console.error("Error updating todo list:", error);
      throw error;
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
