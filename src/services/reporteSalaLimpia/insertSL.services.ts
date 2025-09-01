import { insertData } from "../../services/reporteSalaLimpia/Insert.services";
import SalaLimpia from "../../interface/reporteSalaLimpia";

// Función reutilizable para crear un camión en la base de datos
export const PostReporteSalaLimpia = async (data: SalaLimpia) => {
  const tableName = "reportesalalimpia";
  try {
    const resp = await insertData(tableName, data);
//  console.log("esta es la respuesta xd", resp)
    return resp;
  } catch (error) {
    console.error("Error creating reporteSalaLimpia in DB:", error);
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

