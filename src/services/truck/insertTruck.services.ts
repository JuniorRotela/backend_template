import { insertData } from "../../services/truck/Insert.services";
import Truck from "../../interface/truck";

// Función reutilizable para crear un camión en la base de datos
export const createTruckInDB = async (data: Truck) => {
  const tableName = "truck";
  try {
    const resp = await insertData(tableName, data);
//  console.log("esta es la respuesta xd", resp)
    return resp;
  } catch (error) {
    console.error("Error creating truck in DB:", error);
    throw error;
  }
};


// useEffect(() => {
//   const token = localStorage.getItem("authToken");
//   if (token) {
//       setIsAuthenticated(true);
//   } else {
//       setIsAuthenticated(false);
//   }
// }, []);

