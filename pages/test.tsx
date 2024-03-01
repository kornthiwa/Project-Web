import { useQuery } from "react-query";
import axios from "axios";

const useMedicalSearch = ({ patientID, doctorID }) => {
  return useQuery("searchMedical", async () => {
    const { data } = await axios.get(
      "https://busy-gray-piglet-suit.cyclic.app/patient",
      {
        params: {
          patient: patientID,
          doctor: doctorID,
        },
      }
    );
    return data;
  });
};

const SearchComponent = () => {
  const { data, isLoading, isError } = useMedicalSearch({
    patientID: "123",
    doctorID: "456",
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};

export default SearchComponent;
