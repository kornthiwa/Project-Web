// // context.tsx
// import React, { useCallback, useContext, useState, FC, useEffect } from "react";
// import { createContext } from "react";

// interface MyProviderProps {
//   children: React.ReactNode;
// }

// interface DataContext {
//   data: DataContextItem[];
//   filterdata: DataContextItem[];
// }

// interface DataContextItem {
//   active: boolean;
//   id: number;
//   todo: string;
//   creactedat?: Date;
//   updatedat?: Date;
//   priority: number;
//   type: string;
//   image: File | null;
//   status: number;
//   deletestatus: boolean;
// }

// const MyContext = createContext<DataContext | undefined>(undefined);

// const MyProvider: FC<MyProviderProps> = ({ children }) => {
//   const [data, setData] = useState<DataContextItem[]>([]);
//   const [filterdata, setFilterdata] = useState<DataContextItem[]>([]);

//   useEffect(() => {
//     const randomData = generateRandomDataContext(); // Assuming you have a function named generateRandomDataContext
//     setData(randomData);
//     setFilterdata(randomData);
//   }, []);

//   const addData = useCallback(
//     (newData: DataContextItem) => {
//       if (!newData.todo) {
//         throw new Error("Todo is required");
//       }

//       setData((prevData) => [...prevData, newData]);
//       setFilterdata((prevFilterData) => [...prevFilterData, newData]);
//     },
//     [] // No dependencies needed here
//   );

//   const deleteDatasorf = useCallback(
//     (idData: number) => {
//       const index = data.findIndex((item) => item.id === idData);
//       if (index === -1) {
//         throw new Error("Data not found");
//       }

//       setData((prevData) =>
//         prevData.map((item) =>
//           item.id === idData ? { ...item, deletestatus: true } : item
//         )
//       );
//       setFilterdata((prevFilterData) =>
//         prevFilterData.map((item) =>
//           item.id === idData ? { ...item, deletestatus: true } : item
//         )
//       );
//     },
//     [data] // Add data as a dependency
//   );

//   const editData = useCallback(
//     (id: number, updatedData: DataContextItem) => {
//       if (!updatedData.todo) {
//         throw new Error("Todo is required");
//       }

//       const index = data.findIndex((item) => item.id === id);
//       if (index === -1) {
//         throw new Error("Data not found");
//       }

//       setData((prevData) =>
//         prevData.map((item) =>
//           item.id === id ? { ...item, ...updatedData } : item
//         )
//       );
//       setFilterdata((prevFilterData) =>
//         prevFilterData.map((item) =>
//           item.id === id ? { ...item, ...updatedData } : item
//         )
//       );
//     },
//     [data] // Add data as a dependency
//   );

//   const deleteDatahard = useCallback(
//     (iddata: number) => {
//       const index = data.findIndex((item) => item.id === iddata);
//       if (index === -1) {
//         throw new Error("Data not found");
//       }

//       setData((prevData) => prevData.filter((item) => item.id !== iddata));
//       setFilterdata((prevFilterData) =>
//         prevFilterData.filter((item) => item.id !== iddata)
//       );
//     },
//     [data] // Add data as a dependency
//   );

//   const unsorfdelete = useCallback(
//     (idData: number) => {
//       const index = data.findIndex((item) => item.id === idData);
//       if (index === -1) {
//         throw new Error("Data not found");
//       }

//       setData((prevData) =>
//         prevData.map((item) =>
//           item.id === idData ? { ...item, deletestatus: false } : item
//         )
//       );
//       setFilterdata((prevFilterData) =>
//         prevFilterData.map((item) =>
//           item.id === idData ? { ...item, deletestatus: false } : item
//         )
//       );
//     },
//     [data] // Add data as a dependency
//   );

//   return (
//     <MyContext.Provider
//       value={{
//         data,
//         addData,
//         deleteDatasorf,
//         editData,
//         deleteDatahard,
//         unsorfdelete,
//         filterdata,
//       }}
//     >
//       {children}
//     </MyContext.Provider>
//   );
// };

// const useMyContext = () => {
//   const context = useContext(MyContext);
//   if (!context) {
//     throw new Error("useMyContext must be used within a MyProvider");
//   }
//   retur
