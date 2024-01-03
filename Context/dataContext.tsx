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
  createUser: (variables: DataContext) => Promise<void>;
  editData: ( id: string, datafrom: DataContext ) => Promise<void>;
  deleteData: (id: string) => Promise<void>;
  getTodo: () => Promise<DataContext[]>;
}


const MyContext = createContext<MyContextProps | undefined>(undefined);
const queryClient = new QueryClient();
interface MyProviderProps {
  children: ReactNode;
}

export const MyProvider: FC<MyProviderProps> = ({ children }) => {

  const getTodo = async (): Promise<DataContext[]> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const response = await customAxios.get("api/todolist");
      return response.data;
    } catch (error) {
      console.error("Error fetching todo list:", error);
      throw error;
    }
  };

  const createUser = async (data: DataContext) => {
    console.log(data);
    try {
      const response = await customAxios.post("api/todolist/", data);
      return response.data;
    } catch (error) {
      console.error("Error creating todo list:", error);
      throw error;
    }
  };

  const editData = async (id: string, updatedData: DataContext) => {
    console.log(updatedData);
    try {
      const response = await customAxios.patch(
        `api/todolist/${id}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating todo list:", error);
      throw error;
    }
  };

  const deleteData = async (id: string):Promise<void> => {
    try {
      const response = await customAxios.delete(`api/todolist/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error updating todo list:", error);
      throw error;
    }
  };
  return (
    <MyContext.Provider
      value={{
        
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
